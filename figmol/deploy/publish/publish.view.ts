namespace $.$$ {

	/** Steps of the pipeline, in the order the user watches them happen. */
	const figmol_publish_steps = [ 'login', 'repo', 'push', 'build', 'pages', 'live' ]

	const figmol_publish_marks: Readonly< Record< string, string > > = {
		wait: '·',
		work: '⋯',
		done: '✓',
		fail: '✕',
	}

	/**
	 * Turns a generated file map into a live site on GitHub Pages.
	 *
	 * The panel knows nothing about where the files come from — an owner hands
	 * over a ready `path => text` map and the name it generated them for, which
	 * keeps the editor, the generator and the transport independent of each other.
	 *
	 * The whole publication is one detached fiber. It has to be: a build takes
	 * minutes, and a fiber owned by the click handler would be re-run from the
	 * top on every suspension of the surrounding render.
	 */
	export class $bog_figmol_deploy_publish extends $.$bog_figmol_deploy_publish {

		/** Repository content. An owner overrides this. */
		override files(): Readonly< Record< string, string > > {
			return {}
		}

		/**
		 * Token of the account, remembered by the browser.
		 *
		 * `$mol_state_local` is already a reactive cell, so no memoization of our
		 * own is needed — and an owner binding `token?` shadows this anyway.
		 */
		override token( next?: string ) {
			return this.$.$bog_figmol_deploy_github.token_saved( next )
		}

		@ $mol_mem
		github() {
			return this.$.$bog_figmol_deploy_github.make( {
				token: ()=> this.token(),
				message: ()=> this.commit_message(),
			} )
		}

		override token_uri() {
			return this.$.$bog_figmol_deploy_github.token_uri()
		}

		/* ------------------------------------------------------------------ state */

		/** Login of the account the token belongs to. */
		@ $mol_mem
		owner( next?: string ) {
			return next ?? ''
		}

		/** Address of the published site, once there is one. */
		@ $mol_mem
		site( next?: string ) {
			return next ?? ''
		}

		/** Log of the workflow run that built the site. */
		@ $mol_mem
		run_uri( next?: string ) {
			return next ?? ''
		}

		/** What went wrong, in GitHub's own words where possible. */
		@ $mol_mem
		problem( next?: string ) {
			return next ?? ''
		}

		/** Name of a repository that already exists and awaits a go-ahead. */
		@ $mol_mem
		conflict( next?: string ) {
			return next ?? ''
		}

		/** Name the user has agreed to overwrite. */
		@ $mol_mem
		confirmed( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		busy( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem_key
		stage( id: string, next?: $bog_figmol_deploy_github_state ) {
			return next ?? 'wait' as $bog_figmol_deploy_github_state
		}

		/** Detail shown next to a step — the account, the file count, the wait. */
		@ $mol_mem_key
		note( id: string, next?: string ) {
			return next ?? ''
		}

		/* -------------------------------------------------------------------- view */

		override publish_enabled() {
			return !this.busy()
		}

		@ $mol_mem
		override buttons(): readonly $mol_view[] {
			return this.conflict() ? [ this.Publish(), this.Overwrite() ] : [ this.Publish() ]
		}

		@ $mol_mem
		override name_bid() {
			const name = this.name().trim()
			if( !name ) return ''
			return this.$.$bog_figmol_deploy_github.name_error( name )
		}

		@ $mol_mem
		override conflict_rows() {
			return this.conflict() ? [ this.conflict_hint() ] : []
		}

		@ $mol_mem
		override problem_rows() {
			const problem = this.problem()
			return problem ? [ problem ] : []
		}

		steps(): readonly string[] {
			return figmol_publish_steps
		}

		@ $mol_mem
		step_rows() {
			return this.steps().map( id => this.Step( id ) )
		}

		@ $mol_mem_key
		override step_state( id: string ) {
			return this.stage( id ) as string
		}

		@ $mol_mem_key
		override step_mark( id: string ) {
			return figmol_publish_marks[ this.stage( id ) ] ?? ''
		}

		@ $mol_mem_key
		override step_note( id: string ) {
			return this.note( id )
		}

		@ $mol_mem_key
		override step_title( id: string ) {
			const titles: Readonly< Record< string, string > > = {
				login: this.step_title_login(),
				repo: this.step_title_repo(),
				push: this.step_title_push(),
				build: this.step_title_build(),
				pages: this.step_title_pages(),
				live: this.step_title_live(),
			}
			return titles[ id ] ?? id
		}

		@ $mol_mem
		link_rows() {
			const rows = [] as $mol_view[]
			if( this.site() ) rows.push( this.Link( 'site' ) )
			if( this.owner() ) rows.push( this.Link( 'repo' ) )
			if( this.run_uri() ) rows.push( this.Link( 'run' ) )
			return rows
		}

		@ $mol_mem_key
		override link_uri( id: string ) {
			const github = this.$.$bog_figmol_deploy_github
			if( id === 'site' ) return this.site()
			if( id === 'repo' ) return github.repo_uri( this.owner(), this.name().trim() )
			return this.run_uri()
		}

		@ $mol_mem_key
		override link_label( id: string ) {
			if( id === 'site' ) return this.link_label_site()
			if( id === 'repo' ) return this.link_label_repo()
			return this.link_label_run()
		}

		/* --------------------------------------------------------------- launching */

		@ $mol_action
		override publish( next?: any ) {
			if( next === undefined ) return null
			this.start( '' )
			return null
		}

		@ $mol_action
		override overwrite( next?: any ) {
			if( next === undefined ) return null
			this.start( this.conflict() )
			return null
		}

		/**
		 * Wipes the previous outcome and lets the pipeline go on its own.
		 *
		 * Nothing here waits for it: an awaited call would keep the click handler
		 * suspended for the whole build, and $mol re-runs a suspended handler from
		 * the beginning every time its promise resolves.
		 */
		@ $mol_action
		start( confirmed: string ) {

			this.problem( '' )
			this.conflict( '' )
			this.confirmed( confirmed )
			this.site( '' )
			this.run_uri( '' )

			for( const id of this.steps() ) {
				this.stage( id, 'wait' )
				this.note( id, '' )
			}

			this.busy( true )

			$mol_wire_async( this ).pipeline( this.name().trim(), this.files() )
		}

		/* --------------------------------------------------------------- pipeline */

		/** How long to keep asking GitHub about the build, and how often. */
		build_tries() {
			return 100
		}

		build_step() {
			return 5000
		}

		/** The branch appears right after the build, so this wait is a short one. */
		pages_tries() {
			return 12
		}

		pages_step() {
			return 5000
		}

		/**
		 * Never decorated and never called directly — `$mol_wire_async` gives it a
		 * fiber of its own, and a second wrapper on top of that one would only make
		 * the retries harder to follow.
		 *
		 * The one `catch` is here rather than around the individual calls on
		 * purpose: a failed publication has to leave the step log on screen with
		 * the failure marked, which an error plate over the whole panel would hide.
		 */
		pipeline( name: string, files: Readonly< Record< string, string > > ) {

			const github_class = this.$.$bog_figmol_deploy_github

			try {

				const wrong = github_class.name_error( name )
				if( wrong ) throw new Error( wrong )
				if( !this.token().trim() ) throw new Error( this.token_missing() )
				if( !Object.keys( files ).length ) throw new Error( this.nothing_hint() )

				const github = this.github()

				this.stage( 'login', 'work' )
				const owner = github.user().login
				this.owner( owner )
				this.note( 'login', owner )
				this.stage( 'login', 'done' )

				this.stage( 'repo', 'work' )
				const found = github.repo( owner, name )

				if( found && this.confirmed() !== name ) {
					this.stage( 'repo', 'wait' )
					this.conflict( name )
					this.busy( false )
					return
				}

				const repo = found ?? github.repo_make(
					name,
					this.repo_descr(),
					github_class.site_uri( owner, name ),
				)

				const branch = repo?.default_branch || github.branch_main()
				this.note( 'repo', owner + '/' + name )
				this.stage( 'repo', 'done' )

				this.stage( 'push', 'work' )
				const commit = github.push( owner, name, files, branch )
				this.note( 'push', Object.keys( files ).length + ' files → ' + branch )
				this.stage( 'push', 'done' )

				this.stage( 'build', 'work' )
				const run = this.build_wait( github, owner, name, commit )
				if( run?.html_url ) this.run_uri( run.html_url )

				const built = github_class.run_state( run )
				if( built !== 'done' ) {
					this.stage( 'build', 'fail' )
					throw new Error( run ? this.build_bad() : this.build_late() )
				}
				this.stage( 'build', 'done' )

				this.stage( 'pages', 'work' )
				const site = this.pages_wait( github, owner, name )
				if( !site ) {
					this.stage( 'pages', 'fail' )
					throw new Error( this.pages_late() )
				}
				this.stage( 'pages', 'done' )

				this.site( site )
				this.note( 'live', site )
				this.stage( 'live', 'done' )

			} catch( error: any ) {

				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				$mol_fail_log( error )

				this.problem( error?.message ?? String( error ) )
				for( const id of this.steps() ) {
					if( this.stage( id ) === 'work' ) this.stage( id, 'fail' )
				}

			}

			this.busy( false )
		}

		/** Polls until the run of our own commit is over, or until patience is. */
		build_wait(
			github: $bog_figmol_deploy_github,
			owner: string,
			name: string,
			commit: string,
		) {

			const github_class = this.$.$bog_figmol_deploy_github

			for( let attempt = 0; attempt < this.build_tries(); ++attempt ) {

				const run = github_class.run_pick( github.runs( owner, name ), commit )
				const state = github_class.run_state( run )

				if( state === 'done' || state === 'fail' ) return run

				this.note( 'build', Math.round( attempt * this.build_step() / 1000 ) + 's' )
				this.$.$mol_wait_timeout( this.build_step() )
			}

			return null
		}

		/** The `gh-pages` branch shows up only once the workflow has pushed it. */
		pages_wait( github: $bog_figmol_deploy_github, owner: string, name: string ) {

			for( let attempt = 0; attempt < this.pages_tries(); ++attempt ) {

				const site = github.pages( owner, name )
				if( site ) return site

				this.$.$mol_wait_timeout( this.pages_step() )
			}

			return ''
		}

	}

}
