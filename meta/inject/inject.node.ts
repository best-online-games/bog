namespace $ {

	const meta_attr_re = /\sdata-bog-meta\s*=\s*"([^"]*)"/gi

	export function $bog_meta_collect( html: string ): $bog_meta_data {
		let merged: $bog_meta_data = {}
		meta_attr_re.lastIndex = 0
		let match: RegExpExecArray | null
		while( ( match = meta_attr_re.exec( html ) ) !== null ) {
			const raw = match[ 1 ]
			if( !raw ) continue
			let parsed: $bog_meta_data
			try {
				parsed = JSON.parse( decode_entities( raw ) )
			} catch {
				continue
			}
			merged = $bog_meta_merge( merged, parsed )
		}
		return merged
	}

	export function $bog_meta_inject( html: string, canonical_url?: string ): string {
		const meta = $bog_meta_collect( html )
		const final: $bog_meta_data = canonical_url
			? { canonical: canonical_url, ... meta }
			: meta

		const compact = $bog_meta_compact( final )
		if( !compact ) return html

		const tags = build_tags( compact )
		if( !tags ) return html

		const stripped = strip_existing( html, compact )

		const head_close = stripped.indexOf( '</head>' )
		if( head_close < 0 ) return stripped
		return stripped.slice( 0, head_close ) + tags + stripped.slice( head_close )
	}

	// Remove tags for exactly the keys we are about to inject, so the injected
	// values are authoritative and never duplicated. Pre-existing tags for keys
	// we do NOT emit (e.g. og:site_name, twitter:card) are left untouched. Applied
	// only within <head> to avoid touching page content.
	function strip_existing( html: string, data: $bog_meta_data ): string {
		const head_close = html.indexOf( '</head>' )
		if( head_close < 0 ) return html
		let head = html.slice( 0, head_close )
		const rest = html.slice( head_close )

		const drop_meta = ( kind: 'name' | 'property', key: string )=> {
			const re = new RegExp( `[ \\t]*<meta\\b[^>]*\\b${ kind }\\s*=\\s*["']${ key.replace( /[:]/g, '\\$&' ) }["'][^>]*>\\s*\\n?`, 'gi' )
			head = head.replace( re, '' )
		}

		if( data.title ) {
			head = head.replace( /[ \t]*<title[^>]*>[\s\S]*?<\/title>\s*\n?/gi, '' )
			drop_meta( 'name', 'twitter:title' )
		}
		if( data.description ) drop_meta( 'name', 'description' )
		if( data.canonical ) {
			head = head.replace( /[ \t]*<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>\s*\n?/gi, '' )
			drop_meta( 'property', 'og:url' )
		}
		if( data.og_title ) drop_meta( 'property', 'og:title' )
		if( data.og_description ) drop_meta( 'property', 'og:description' )
		if( data.og_image ) {
			drop_meta( 'property', 'og:image' )
			drop_meta( 'name', 'twitter:image' )
		}
		if( data.og_type ) drop_meta( 'property', 'og:type' )
		if( data.alternates && data.alternates.length ) {
			head = head.replace( /[ \t]*<link\b[^>]*\brel\s*=\s*["']alternate["'][^>]*\bhreflang\s*=[^>]*>\s*\n?/gi, '' )
		}

		return head + rest
	}

	function build_tags( data: $bog_meta_data ): string {
		const out: string[] = []
		if( data.title ) {
			out.push( `<title>${ escape_html( data.title ) }</title>` )
			out.push( meta_tag( 'name', 'twitter:title', data.title ) )
		}
		if( data.description ) {
			out.push( meta_tag( 'name', 'description', data.description ) )
		}
		if( data.canonical ) {
			out.push( `<link rel="canonical" href="${ escape_attr( data.canonical ) }">` )
		}
		if( data.og_title ) out.push( meta_tag( 'property', 'og:title', data.og_title ) )
		if( data.og_description ) out.push( meta_tag( 'property', 'og:description', data.og_description ) )
		if( data.og_image ) {
			out.push( meta_tag( 'property', 'og:image', data.og_image ) )
			out.push( meta_tag( 'name', 'twitter:image', data.og_image ) )
		}
		if( data.og_type ) out.push( meta_tag( 'property', 'og:type', data.og_type ) )
		if( data.canonical ) out.push( meta_tag( 'property', 'og:url', data.canonical ) )
		if( data.alternates ) {
			for( const alt of data.alternates ) {
				if( !alt || !alt.lang || !alt.href ) continue
				out.push( `<link rel="alternate" hreflang="${ escape_attr( alt.lang ) }" href="${ escape_attr( alt.href ) }">` )
			}
		}

		return out.length ? '\n\t' + out.join( '\n\t' ) + '\n' : ''
	}

	function meta_tag( kind: 'name' | 'property', key: string, value: string ): string {
		return `<meta ${ kind }="${ escape_attr( key ) }" content="${ escape_attr( value ) }">`
	}

	function escape_attr( s: string ): string {
		return s
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
	}

	function escape_html( s: string ): string {
		return s
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
	}

	function decode_entities( s: string ): string {
		return s
			.replace( /&quot;/g, '"' )
			.replace( /&lt;/g, '<' )
			.replace( /&gt;/g, '>' )
			.replace( /&amp;/g, '&' )
	}

}
