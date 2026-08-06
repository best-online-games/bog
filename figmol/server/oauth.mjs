#!/usr/bin/env node

/**
 * Figmol OAuth proxy.
 *
 * The one thing a browser cannot do in the GitHub OAuth dance is the final
 * step: trading the code for a token needs the client secret, and a secret
 * shipped to a browser is not a secret. So that single request happens here.
 *
 * POST /exchange { code, redirect_uri? } -> { access_token, scope, token_type }
 * GET  /health                           -> ok
 *
 * Nothing is stored. The token is handed back to the caller and forgotten in
 * the same tick, and neither the code nor the token is ever written to the log.
 */

import http from 'node:http'

const port = Number( process.env.FIGMOL_OAUTH_PORT ?? 9093 )
const client_id = ( process.env.FIGMOL_OAUTH_CLIENT_ID ?? '' ).trim()
const client_secret = ( process.env.FIGMOL_OAUTH_CLIENT_SECRET ?? '' ).trim()

/** Comma separated list of editor origins allowed to call us. */
const origins = ( process.env.FIGMOL_OAUTH_ORIGINS ?? '' )
	.split( ',' )
	.map( item => item.trim().replace( /\/+$/, '' ) )
	.filter( Boolean )

/** A code is a short opaque string — anything longer is not one. */
const code_shape = /^[A-Za-z0-9_.-]{6,256}$/

/** Bodies are tiny; a bigger one is either a mistake or an attack. */
const body_limit = 4096

/** Exchanges per address per minute. Publishing needs one, ever. */
const rate_limit = 30
const rate_window = 60_000
const rate = new Map()

const exchange_uri = 'https://github.com/login/oauth/access_token'

const allowed = origin => origin && origins.includes( origin.replace( /\/+$/, '' ) )

const rate_ok = addr => {

	const now = Date.now()
	const seen = rate.get( addr )

	if( !seen || now - seen.since > rate_window ) {
		rate.set( addr, { since: now, count: 1 } )
		return true
	}

	seen.count += 1
	return seen.count <= rate_limit
}

/** Keeps the map from growing for every address that ever knocked. */
const rate_sweep = () => {
	const now = Date.now()
	for( const [ addr, seen ] of rate ) {
		if( now - seen.since > rate_window ) rate.delete( addr )
	}
}

const reply = ( res, code, data ) => {
	const body = JSON.stringify( data )
	res.writeHead( code, {
		'content-type': 'application/json; charset=utf-8',
		'content-length': Buffer.byteLength( body ),
		'cache-control': 'no-store',
	} )
	res.end( body )
}

const body_read = req => new Promise( ( done, fail ) => {

	let size = 0
	const parts = []

	req.on( 'data', chunk => {
		size += chunk.length
		if( size > body_limit ) {
			fail( new Error( 'body too large' ) )
			req.destroy()
			return
		}
		parts.push( chunk )
	} )

	req.on( 'end', () => done( Buffer.concat( parts ).toString( 'utf8' ) ) )
	req.on( 'error', fail )
} )

const exchange = async ( code, redirect_uri ) => {

	const form = { client_id, client_secret, code }
	if( redirect_uri ) form.redirect_uri = redirect_uri

	const res = await fetch( exchange_uri, {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'content-type': 'application/json',
			'user-agent': 'figmol-oauth-proxy',
		},
		body: JSON.stringify( form ),
	} )

	const data = await res.json().catch( () => ( {} ) )

	if( !res.ok ) return { code: 502, data: { error: 'github_unavailable', error_description: 'GitHub answered ' + res.status } }

	// GitHub reports a refused exchange with 200 and an `error` field.
	if( data.error ) return { code: 400, data: { error: data.error, error_description: data.error_description ?? '' } }
	if( !data.access_token ) return { code: 502, data: { error: 'no_token', error_description: 'GitHub returned no token' } }

	return {
		code: 200,
		data: {
			access_token: data.access_token,
			scope: data.scope ?? '',
			token_type: data.token_type ?? 'bearer',
		},
	}
}

const server = http.createServer( async ( req, res ) => {

	const origin = req.headers.origin ?? ''
	const cors = allowed( origin )

	if( cors ) {
		res.setHeader( 'access-control-allow-origin', origin )
		res.setHeader( 'vary', 'Origin' )
	}

	if( req.method === 'OPTIONS' ) {
		res.setHeader( 'access-control-allow-methods', 'POST, OPTIONS' )
		res.setHeader( 'access-control-allow-headers', 'content-type' )
		res.setHeader( 'access-control-max-age', '600' )
		res.writeHead( cors ? 204 : 403 )
		res.end()
		return
	}

	const path = ( req.url ?? '/' ).split( '?' )[ 0 ].replace( /\/+$/, '' ) || '/'

	if( req.method === 'GET' && path === '/health' ) {
		reply( res, 200, { ok: true, configured: Boolean( client_id && client_secret ), origins: origins.length } )
		return
	}

	if( req.method !== 'POST' || path !== '/exchange' ) {
		reply( res, 404, { error: 'not_found' } )
		return
	}

	if( !cors ) {
		reply( res, 403, { error: 'origin_not_allowed', error_description: 'Add this origin to FIGMOL_OAUTH_ORIGINS' } )
		return
	}

	if( !client_id || !client_secret ) {
		reply( res, 500, { error: 'not_configured', error_description: 'The proxy has no client id or secret' } )
		return
	}

	const addr = req.headers[ 'x-forwarded-for' ]?.split( ',' )[ 0 ].trim() || req.socket.remoteAddress || 'unknown'
	if( !rate_ok( addr ) ) {
		res.setHeader( 'retry-after', '60' )
		reply( res, 429, { error: 'too_many_requests' } )
		return
	}

	let form = {}

	try {
		form = JSON.parse( await body_read( req ) || '{}' )
	} catch {
		reply( res, 400, { error: 'bad_body', error_description: 'Expected a small JSON object' } )
		return
	}

	const code = String( form.code ?? '' )
	if( !code_shape.test( code ) ) {
		reply( res, 400, { error: 'bad_code' } )
		return
	}

	// A redirect back to anywhere but the editor would hand the token to a stranger.
	const redirect = String( form.redirect_uri ?? '' )
	if( redirect && !origins.some( item => redirect.startsWith( item + '/' ) || redirect === item ) ) {
		reply( res, 400, { error: 'bad_redirect' } )
		return
	}

	try {
		const out = await exchange( code, redirect )
		reply( res, out.code, out.data )
	} catch ( error ) {
		console.error( '[figmol-oauth] exchange failed:', error?.message ?? error )
		reply( res, 502, { error: 'github_unavailable' } )
	}
} )

setInterval( rate_sweep, rate_window ).unref()

server.listen( port, () => {
	console.log( '[figmol-oauth] listening on', port )
	if( !client_id || !client_secret ) console.warn( '[figmol-oauth] no client id/secret — /exchange will refuse every call' )
	if( !origins.length ) console.warn( '[figmol-oauth] no allowed origins — /exchange will refuse every call' )
} )
