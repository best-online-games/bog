namespace $ {

	/** Repository name rules, shared by the validator and the generator. */
	const figmol_deploy_name = /^[a-z][a-z0-9]*$/

	/** Occupied by MAM itself, so a generated project may not be named like this. */
	const figmol_deploy_reserved = [
		'mol', 'hyoo', 'bog', 'giper', 'node', 'mam', 'my', 'app', 'web', 'test', 'exam',
	]

	/** A workflow run, cut down to what publishing needs to know. */
	export type $bog_figmol_deploy_github_run = {
		readonly id?: number
		readonly name?: string
		/** `queued` | `in_progress` | `completed` */
		readonly status?: string
		/** `success` | `failure` | `cancelled` | … — only meaningful once completed. */
		readonly conclusion?: string | null
		readonly html_url?: string
		readonly head_sha?: string
	}

	/** Repository fields the publisher reads back. */
	export type $bog_figmol_deploy_github_repo = {
		readonly full_name?: string
		readonly html_url?: string
		readonly default_branch?: string
	}

	/** How far along a step of the pipeline is. */
	export type $bog_figmol_deploy_github_state = 'wait' | 'work' | 'done' | 'fail'

	/**
	 * The slice of the GitHub REST API that publishing a generated site needs.
	 *
	 * Request bodies are built by static pure methods and sent by instance
	 * actions, so the shape of every call can be checked in a test while the
	 * network part stays a thin wrapper over `$mol_fetch`.
	 *
	 * The token lives in the browser and is sent to `api.github.com` only — no
	 * backend of ours ever sees it.
	 */
	export class $bog_figmol_deploy_github extends $mol_object {

		/* --------------------------------------------------------- configuration */

		api() {
			return 'https://api.github.com'
		}

		/** Bearer token. Empty means the calls go out anonymous and get refused. */
		token() {
			return ''
		}

		message() {
			return 'Published from Figmol'
		}

		/** Branch the deploy workflow pushes the built bundle to. */
		branch_pages() {
			return 'gh-pages'
		}

		/** Fallback for a repository whose default branch is unknown. */
		branch_main() {
			return 'main'
		}

		/* ------------------------------------------------------------- persistence */

		/**
		 * Token remembered between visits.
		 *
		 * It is a secret, and `localStorage` is not a vault — but the alternative
		 * is retyping a forty character string on every publication, and the token
		 * is scoped to repositories the user created for this very purpose.
		 */
		static token_saved( next?: string ): string {
			return this.$.$mol_state_local.value< string >( 'bog_figmol_deploy_token', next ) ?? ''
		}

		/* ------------------------------------------------------------- pure helpers */

		/** Empty when the name is usable, a sentence explaining the refusal otherwise. */
		static name_error( name: string ) {
			if( !name ) return 'Enter a name for the repository'
			if( name.length > 60 ) return 'Sixty characters at most'
			if( !figmol_deploy_name.test( name ) ) return 'One lowercase word: latin letters and digits, starting with a letter'
			if( figmol_deploy_reserved.includes( name ) ) return 'This name is taken by MAM itself — pick another one'
			return ''
		}

		/** GitHub explains itself well, so its own wording is what the user sees. */
		static fail( code: number, body: string ) {

			let message = ''

			try {

				const data = JSON.parse( body ) as { message?: string, errors?: readonly any[] }
				message = String( data?.message ?? '' )

				const extra = ( data?.errors ?? [] )
					.map( item => String( item?.message ?? item?.code ?? '' ) )
					.filter( Boolean )
					.join( '; ' )

				if( extra ) message += ' (' + extra + ')'

			} catch {
				message = body.slice( 0, 200 )
			}

			return 'GitHub ' + code + ': ' + ( message.trim() || 'request failed' )
		}

		static repo_body( name: string, descr = '', homepage = '' ) {
			return {
				name,
				description: descr,
				homepage,
				private: false,
				has_issues: false,
				has_wiki: false,
				has_projects: false,
				/**
				 * An empty repository has no branch to commit onto, and the API for
				 * making the first one differs from the API for moving an existing
				 * one. One initial commit spares the pipeline that fork.
				 */
				auto_init: true,
			}
		}

		/**
		 * The whole file map as one tree.
		 *
		 * Without a `base_tree` the commit contains exactly these files and nothing
		 * else, so republishing a site never leaves an orphan behind — including
		 * the `README.md` that `auto_init` writes.
		 */
		static tree_body( files: Readonly< Record< string, string > >, base = '' ) {

			const tree = Object.keys( files ).sort().map( path => ( {
				path,
				mode: '100644',
				type: 'blob',
				content: files[ path ],
			} ) )

			return base ? { base_tree: base, tree } : { tree }
		}

		static commit_body( message: string, tree: string, parents: readonly string[] ) {
			return { message, tree, parents }
		}

		static ref_body( branch: string, sha: string ) {
			return { ref: 'refs/heads/' + branch, sha }
		}

		static pages_body( branch: string ) {
			return {
				build_type: 'legacy',
				source: { branch, path: '/' },
			}
		}

		static run_state( run: $bog_figmol_deploy_github_run | null ): $bog_figmol_deploy_github_state {
			if( !run ) return 'wait'
			if( run.status !== 'completed' ) return 'work'
			return run.conclusion === 'success' ? 'done' : 'fail'
		}

		/**
		 * The run of our own commit, if GitHub has registered it yet.
		 *
		 * Matching by commit matters on a republish: the previous run is still
		 * listed first for a few seconds and would be reported as the result.
		 */
		static run_pick( runs: readonly $bog_figmol_deploy_github_run[], sha: string ) {
			if( !sha ) return runs[ 0 ] ?? null
			return runs.find( run => run.head_sha === sha ) ?? null
		}

		static repo_uri( owner: string, name: string ) {
			return 'https://github.com/' + owner + '/' + name
		}

		/** A repository named after the account itself is served from the domain root. */
		static site_uri( owner: string, name: string ) {
			const root = owner.toLowerCase() + '.github.io'
			return name.toLowerCase() === root ? 'https://' + root + '/' : 'https://' + root + '/' + name + '/'
		}

		/** Prefilled form for a classic token with exactly the scopes we use. */
		static token_uri() {
			return 'https://github.com/settings/tokens/new?scopes=repo,workflow&description=Figmol'
		}

		/**
		 * Where the browser goes to ask the user for access.
		 *
		 * `workflow` is on the list because the pushed files include
		 * `.github/workflows/deploy.yml`, which GitHub refuses to accept from a
		 * token that only has `repo`.
		 */
		static oauth_uri( client_id: string, redirect: string, state: string ) {

			const args = new URLSearchParams( {
				client_id,
				redirect_uri: redirect,
				scope: 'repo workflow',
				state,
			} )

			return 'https://github.com/login/oauth/authorize?' + args.toString()
		}

		/* ------------------------------------------------------------- transport */

		headers( body: boolean ) {

			const res: Record< string, string > = {
				'accept': 'application/vnd.github+json',
				'x-github-api-version': '2022-11-28',
			}

			const token = this.token().trim()
			if( token ) res[ 'authorization' ] = 'Bearer ' + token
			if( body ) res[ 'content-type' ] = 'application/json'

			return res
		}

		@ $mol_action
		response( method: string, path: string, body?: unknown ) {
			return this.$.$mol_fetch.response( this.api() + path, {
				method,
				headers: this.headers( body !== undefined ),
				body: body === undefined ? undefined : JSON.stringify( body ),
			} )
		}

		/** Any success as JSON, anything else as an error carrying GitHub's message. */
		@ $mol_action
		json( method: string, path: string, body?: unknown ) {
			const res = this.response( method, path, body )
			if( !res.ok() ) throw new Error( $bog_figmol_deploy_github.fail( res.code(), res.text() ) )
			return res.json() as any
		}

		/* ------------------------------------------------------------- operations */

		@ $mol_action
		user() {
			return this.json( 'GET', '/user' ) as { login: string, name?: string, avatar_url?: string }
		}

		/** The repository, or null when the account has no such name yet. */
		@ $mol_action
		repo( owner: string, name: string ) {

			const res = this.response( 'GET', '/repos/' + owner + '/' + name )

			if( res.code() === 404 ) return null
			if( !res.ok() ) throw new Error( $bog_figmol_deploy_github.fail( res.code(), res.text() ) )

			return res.json() as $bog_figmol_deploy_github_repo
		}

		@ $mol_action
		repo_make( name: string, descr = '', homepage = '' ) {
			const body = $bog_figmol_deploy_github.repo_body( name, descr, homepage )
			return this.json( 'POST', '/user/repos', body ) as $bog_figmol_deploy_github_repo
		}

		/** Head commit of a branch, empty when there is no branch to speak of. */
		@ $mol_action
		head( owner: string, name: string, branch: string ) {

			const res = this.response( 'GET', '/repos/' + owner + '/' + name + '/git/ref/heads/' + branch )

			// 409 is what an empty repository answers — no branches at all yet.
			if( res.code() === 404 || res.code() === 409 ) return ''
			if( !res.ok() ) throw new Error( $bog_figmol_deploy_github.fail( res.code(), res.text() ) )

			return String( ( res.json() as any )?.object?.sha ?? '' )
		}

		/**
		 * The whole file map as a single commit on `branch`. Returns its sha.
		 *
		 * Four calls — tree, commit, ref — instead of one per file: the Trees API
		 * takes file contents inline, so a blob upload per file is not needed.
		 */
		@ $mol_action
		push( owner: string, name: string, files: Readonly< Record< string, string > >, branch: string ) {

			const klass = $bog_figmol_deploy_github
			const repo = '/repos/' + owner + '/' + name

			const base = this.head( owner, name, branch )

			const tree = String( this.json( 'POST', repo + '/git/trees', klass.tree_body( files ) )?.sha ?? '' )

			const commit = String( this.json(
				'POST',
				repo + '/git/commits',
				klass.commit_body( this.message(), tree, base ? [ base ] : [] ),
			)?.sha ?? '' )

			if( base ) this.json( 'PATCH', repo + '/git/refs/heads/' + branch, { sha: commit, force: true } )
			else this.json( 'POST', repo + '/git/refs', klass.ref_body( branch, commit ) )

			return commit
		}

		/**
		 * Turns Pages on for the `gh-pages` branch. Empty result means «not yet».
		 *
		 * The branch appears only after the first workflow run finishes, and until
		 * then GitHub refuses the source — hence a caller that keeps trying rather
		 * than an error.
		 */
		@ $mol_action
		pages( owner: string, name: string ) {

			const klass = $bog_figmol_deploy_github
			const body = klass.pages_body( this.branch_pages() )
			const path = '/repos/' + owner + '/' + name + '/pages'

			const made = this.response( 'POST', path, body )
			if( made.ok() ) return String( ( made.json() as any )?.html_url ?? klass.site_uri( owner, name ) )

			// Already on: only the source may need moving to our branch.
			if( made.code() === 409 ) {
				const moved = this.response( 'PUT', path, body )
				if( moved.ok() ) return klass.site_uri( owner, name )
				throw new Error( klass.fail( moved.code(), moved.text() ) )
			}

			if( made.code() === 404 || made.code() === 422 ) return ''

			throw new Error( klass.fail( made.code(), made.text() ) )
		}

		@ $mol_action
		runs( owner: string, name: string ) {
			const data = this.json( 'GET', '/repos/' + owner + '/' + name + '/actions/runs?per_page=10' )
			return ( data?.workflow_runs ?? [] ) as readonly $bog_figmol_deploy_github_run[]
		}

		/**
		 * Trades an OAuth code for a token through our own proxy.
		 *
		 * The exchange needs the client secret, which is why it cannot happen in
		 * the browser; the proxy holds the secret and stores nothing.
		 */
		@ $mol_action
		oauth_token( proxy: string, code: string ) {

			const res = this.$.$mol_fetch.response( proxy.replace( /\/+$/, '' ) + '/exchange', {
				method: 'POST',
				headers: { 'accept': 'application/json', 'content-type': 'application/json' },
				body: JSON.stringify( { code } ),
			} )

			if( !res.ok() ) throw new Error( $bog_figmol_deploy_github.fail( res.code(), res.text() ) )

			return String( ( res.json() as any )?.access_token ?? '' )
		}

	}

}
