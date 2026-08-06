namespace $ {

	/**
	 * Contents stay free of `<dollar>name` spellings on purpose — MAM finds
	 * dependencies by scanning sources with a regular expression, string
	 * literals included, and would go looking for a module named after them.
	 */
	const figmol_deploy_test_files = {
		'index.html': '<!doctype html>\n',
		'.github/workflows/deploy.yml': 'name: "mysite"\n',
		'mysite.view.tree': 'mysite mol_view\n',
	}

	$mol_test( {

		'a name is one lowercase word'() {

			const error = ( name: string )=> $bog_figmol_deploy_github.name_error( name )

			$mol_assert_equal( error( 'mysite' ), '' )
			$mol_assert_equal( error( 'site2024' ), '' )

			$mol_assert_ok( error( '' ) )
			$mol_assert_ok( error( 'My Site' ) )
			$mol_assert_ok( error( 'my-site' ) )
			$mol_assert_ok( error( 'my_site' ) )
			$mol_assert_ok( error( '2site' ) )
			$mol_assert_ok( error( 'a'.repeat( 61 ) ) )
		},

		'a name MAM owns is refused'() {
			$mol_assert_ok( $bog_figmol_deploy_github.name_error( 'mol' ) )
			$mol_assert_ok( $bog_figmol_deploy_github.name_error( 'app' ) )
		},

		'a tree carries every file inline, in a stable order'() {

			const body = $bog_figmol_deploy_github.tree_body( figmol_deploy_test_files )

			$mol_assert_like(
				body.tree.map( item => item.path ),
				[ '.github/workflows/deploy.yml', 'index.html', 'mysite.view.tree' ],
			)

			$mol_assert_like( body.tree[ 1 ], {
				path: 'index.html',
				mode: '100644',
				type: 'blob',
				content: '<!doctype html>\n',
			} )
		},

		'a tree without a base replaces the whole repository'() {

			const clean = $bog_figmol_deploy_github.tree_body( figmol_deploy_test_files )
			$mol_assert_equal( ( clean as { base_tree?: string } ).base_tree, undefined )

			const layered = $bog_figmol_deploy_github.tree_body( figmol_deploy_test_files, 'abc123' )
			$mol_assert_equal( ( layered as { base_tree?: string } ).base_tree, 'abc123' )
		},

		'a first commit has no parent, a next one has'() {

			$mol_assert_like(
				$bog_figmol_deploy_github.commit_body( 'Published', 'tree1', [] ),
				{ message: 'Published', tree: 'tree1', parents: [] },
			)

			$mol_assert_like(
				$bog_figmol_deploy_github.commit_body( 'Published', 'tree2', [ 'head1' ] ),
				{ message: 'Published', tree: 'tree2', parents: [ 'head1' ] },
			)
		},

		'a repository is public and starts with a commit'() {

			const body = $bog_figmol_deploy_github.repo_body( 'mysite', 'A site', 'https://alice.github.io/mysite/' )

			$mol_assert_equal( body.name, 'mysite' )
			$mol_assert_equal( body.private, false )
			$mol_assert_equal( body.auto_init, true )
			$mol_assert_equal( body.homepage, 'https://alice.github.io/mysite/' )
		},

		'pages are served from the root of the branch the workflow writes'() {
			$mol_assert_like(
				$bog_figmol_deploy_github.pages_body( 'gh-pages' ),
				{ build_type: 'legacy', source: { branch: 'gh-pages', path: '/' } },
			)
		},

		'a reference names a branch in full'() {
			$mol_assert_like(
				$bog_figmol_deploy_github.ref_body( 'main', 'sha1' ),
				{ ref: 'refs/heads/main', sha: 'sha1' },
			)
		},

		'a run is read as waiting, working, done or failed'() {

			const state = ( run: $bog_figmol_deploy_github_run | null )=> $bog_figmol_deploy_github.run_state( run )

			$mol_assert_equal( state( null ), 'wait' )
			$mol_assert_equal( state( { status: 'queued' } ), 'work' )
			$mol_assert_equal( state( { status: 'in_progress' } ), 'work' )
			$mol_assert_equal( state( { status: 'completed', conclusion: 'success' } ), 'done' )
			$mol_assert_equal( state( { status: 'completed', conclusion: 'failure' } ), 'fail' )
			$mol_assert_equal( state( { status: 'completed', conclusion: 'cancelled' } ), 'fail' )
		},

		'the run of our own commit wins over a newer stranger'() {

			const runs = [
				{ id: 2, head_sha: 'old', status: 'completed', conclusion: 'success' },
				{ id: 1, head_sha: 'new', status: 'queued' },
			]

			$mol_assert_equal( $bog_figmol_deploy_github.run_pick( runs, 'new' )?.id, 1 )
			$mol_assert_equal( $bog_figmol_deploy_github.run_pick( runs, 'none' ), null )
			$mol_assert_equal( $bog_figmol_deploy_github.run_pick( runs, '' )?.id, 2 )
			$mol_assert_equal( $bog_figmol_deploy_github.run_pick( [], 'new' ), null )
		},

		'a site lives in a folder, unless the repository is the account page'() {

			$mol_assert_equal(
				$bog_figmol_deploy_github.site_uri( 'Alice', 'mysite' ),
				'https://alice.github.io/mysite/',
			)

			$mol_assert_equal(
				$bog_figmol_deploy_github.site_uri( 'Alice', 'alice.github.io' ),
				'https://alice.github.io/',
			)

			$mol_assert_equal(
				$bog_figmol_deploy_github.repo_uri( 'Alice', 'mysite' ),
				'https://github.com/Alice/mysite',
			)
		},

		'a refusal keeps the wording GitHub used'() {

			$mol_assert_equal(
				$bog_figmol_deploy_github.fail( 422, JSON.stringify( {
					message: 'Repository creation failed',
					errors: [ { message: 'name already exists on this account' } ],
				} ) ),
				'GitHub 422: Repository creation failed (name already exists on this account)',
			)

			$mol_assert_equal(
				$bog_figmol_deploy_github.fail( 401, JSON.stringify( { message: 'Bad credentials' } ) ),
				'GitHub 401: Bad credentials',
			)

			$mol_assert_equal( $bog_figmol_deploy_github.fail( 502, '<html>oops</html>' ), 'GitHub 502: <html>oops</html>' )
			$mol_assert_equal( $bog_figmol_deploy_github.fail( 500, '' ), 'GitHub 500: request failed' )
		},

		'a token travels in the authorization header and nowhere else'() {

			const client = $bog_figmol_deploy_github.make( { token: ()=> ' ghp_secret ' } )

			$mol_assert_like( client.headers( false ), {
				'accept': 'application/vnd.github+json',
				'x-github-api-version': '2022-11-28',
				'authorization': 'Bearer ghp_secret',
			} )

			$mol_assert_equal( client.headers( true )[ 'content-type' ], 'application/json' )

			const anon = $bog_figmol_deploy_github.make( {} )
			$mol_assert_equal( anon.headers( false )[ 'authorization' ], undefined )
		},

		'the consent screen asks for the scopes a workflow push needs'() {

			const uri = $bog_figmol_deploy_github.oauth_uri( 'Iv1_abc', 'https://figmol.example/back', 'nonce1' )

			$mol_assert_ok( uri.startsWith( 'https://github.com/login/oauth/authorize?' ) )

			const args = new URLSearchParams( uri.split( '?' )[ 1 ] )

			$mol_assert_equal( args.get( 'client_id' ), 'Iv1_abc' )
			$mol_assert_equal( args.get( 'redirect_uri' ), 'https://figmol.example/back' )
			$mol_assert_equal( args.get( 'scope' ), 'repo workflow' )
			$mol_assert_equal( args.get( 'state' ), 'nonce1' )
		},

	} )

}
