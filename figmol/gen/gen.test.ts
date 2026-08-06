namespace $ {

	/** Same trick as in the generator: keep generated identifiers out of the MAM graph. */
	const figmol_gen_test_sign = ( name: string )=> '$' + name

	const figmol_gen_test_site: $bog_figmol_gen_site = {
		title: 'My Site',
		theme: {
			back: '#ffffff',
			text: '#111111',
			accent: '#ff0066',
			font: 'Inter, sans-serif',
		},
		pages: [
			{
				title: 'Home',
				slug: '',
				root: {
					kind: 'frame',
					x: 0, y: 0, w: 1200, h: 800,
					kids: [
						{
							kind: 'frame',
							x: 40, y: 40, w: 480, h: 320,
							direction: 'column',
							gap: 16,
							padding: 24,
							align: 'stretch',
							kids: [
								{
									kind: 'text',
									w: 400, h: 48,
									props: { text: 'Hello\nworld', size: '32', weight: 'bold', color: '#101828' },
								},
								{
									kind: 'button',
									w: 200, h: 44,
									props: { text: 'Buy now', href: 'https://example.com/buy' },
								},
							],
						},
						{
							kind: 'image',
							x: 560, y: 40, w: 240, h: 160,
							props: { uri: 'https://example.com/pic.png', text: 'A picture' },
						},
					],
				},
			},
			{
				title: 'About',
				slug: 'about',
				root: {
					kind: 'frame',
					direction: 'column',
					gap: 8,
					padding: 32,
					align: 'center',
					kids: [
						{ kind: 'text', w: 600, h: 40, props: { text: 'About us' } },
					],
				},
			},
		],
	}

	const figmol_gen_test_files = ()=> $bog_figmol_gen.files( figmol_gen_test_site, { name: 'mysite', repo: 'alice/mysite' } )

	/** Every block borrowed from the component library, in one page. */
	const figmol_gen_test_blocks: $bog_figmol_gen_site = {
		title: 'Blocks',
		pages: [ {
			title: 'Home',
			slug: '',
			root: {
				kind: 'frame',
				direction: 'column', gap: 16, padding: 24, align: 'stretch',
				kids: [
					{
						kind: 'bui_card',
						w: 320, h: 200,
						direction: 'column', gap: 10, padding: 20, align: 'stretch',
						kids: [
							{ kind: 'text', w: 260, h: 28, props: { text: 'Local first' } },
							{ kind: 'bui_badge', w: 104, h: 26, props: { text: 'New', variant: 'outline' } },
						],
					},
					{ kind: 'bui_button', w: 160, h: 40, props: { text: 'Continue', variant: 'ghost' } },
					{ kind: 'bui_alert', w: 360, h: 96, props: { text: 'Heads up', note: 'Read this\nfirst' } },
					{ kind: 'bui_field', w: 240, h: 40, props: { text: 'you@example.com' } },
					{ kind: 'bui_progress', w: 240, h: 12, props: { value: '64', max: '80' } },
					{ kind: 'bui_tabs', w: 320, h: 44, props: { options: 'Overview | Activity |  | Overview' } },
					{ kind: 'bui_avatar', w: 48, h: 48, props: { uri: 'https://example.com/face.png' } },
				],
			},
		} ],
	}

	$mol_test({

		'every file of a repository is generated'() {

			const files = figmol_gen_test_files()

			$mol_assert_like(
				Object.keys( files ).sort(),
				[
					'.gitattributes',
					'.github/workflows/deploy.yml',
					'.gitignore',
					'index.html',
					'mysite.view.css.ts',
					'mysite.view.tree',
					'mysite.view.ts',
					'readme.md',
				],
			)

		},

		'a one page site needs no script'() {

			const files = $bog_figmol_gen.files({
				title: 'Solo',
				pages: [ { title: 'Home', slug: '', root: { kind: 'frame', kids: [] } } ],
			})

			$mol_assert_equal( 'solo.view.ts' in files, false )
			$mol_assert_ok( files[ 'solo.view.tree' ].includes( figmol_gen_test_sign( 'solo_page_home' ) ) )

		},

		'project name falls back and never collides with MAM itself'() {

			$mol_assert_equal( $bog_figmol_gen.plan( {}, { name: 'My Site!' } ).name, 'mysite' )
			$mol_assert_equal( $bog_figmol_gen.plan( {}, { name: 'mol' } ).name, 'molsite' )
			$mol_assert_equal( $bog_figmol_gen.plan( { title: 'Тест' } ).name, 'mysite' )
			$mol_assert_equal( $bog_figmol_gen.plan( { title: 'Blog 2026' } ).name, 'blog2026' )

		},

		'view.tree declares a component per page plus the shell'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			$mol_assert_ok( tree.includes( figmol_gen_test_sign( 'mysite' ) + ' ' + figmol_gen_test_sign( 'mol_view' ) + '\n' ) )
			$mol_assert_ok( tree.includes( figmol_gen_test_sign( 'mysite_page_home' ) + ' ' + figmol_gen_test_sign( 'mol_view' ) ) )
			$mol_assert_ok( tree.includes( figmol_gen_test_sign( 'mysite_page_about' ) + ' ' + figmol_gen_test_sign( 'mol_view' ) ) )

			$mol_assert_ok( tree.includes( '\tPage_home ' + figmol_gen_test_sign( 'mysite_page_home' ) ) )
			$mol_assert_ok( tree.includes( '\tPage_about ' + figmol_gen_test_sign( 'mysite_page_about' ) ) )

		},

		/** $mol names the browser tab after the root component unless it is told. */
		'the shell carries the title of the site'() {

			$mol_assert_ok( figmol_gen_test_files()[ 'mysite.view.tree' ].includes( '\ttitle \\My Site\n' ) )

			const nasty = $bog_figmol_gen.files( { title: 'One\nTwo' }, { name: 'nasty' } )
			$mol_assert_ok( nasty[ 'nasty.view.tree' ].includes( '\ttitle \\One Two\n' ) )

		},

		/** Without them the library blocks would paint themselves dark. */
		'the shell carries the palette the editor drew on'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			$mol_assert_ok( tree.includes( '\tattr *\n\t\t^\n' ) )
			$mol_assert_ok( tree.includes( '\t\tbog_builderui_base \\slate' ) )
			$mol_assert_ok( tree.includes( '\t\tbog_builderui_lights \\light' ) )

		},

		'navigation links carry the routing argument'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			$mol_assert_ok( tree.includes( '<= Nav_home ' + figmol_gen_test_sign( 'mol_link' ) ) )
			$mol_assert_ok( tree.includes( 'uri \\#!page=home' ) )
			$mol_assert_ok( tree.includes( 'uri \\#!page=about' ) )
			$mol_assert_ok( tree.includes( 'current <= nav_home_current false' ) )
			$mol_assert_ok( tree.includes( 'sub <= body /' + figmol_gen_test_sign( 'mol_view' ) ) )

		},

		'each kind of node maps onto its own component'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			$mol_assert_ok( tree.includes( '\t\t<= Node1 ' + figmol_gen_test_sign( 'mol_view' ) ) )
			$mol_assert_ok( tree.includes( '<= Node2 ' + figmol_gen_test_sign( 'mol_paragraph' ) ) )
			$mol_assert_ok( tree.includes( '<= Node3 ' + figmol_gen_test_sign( 'mol_link' ) ) )
			$mol_assert_ok( tree.includes( '<= Node4 ' + figmol_gen_test_sign( 'mol_image' ) ) )

			$mol_assert_ok( tree.includes( 'uri \\https://example.com/buy' ) )
			$mol_assert_ok( tree.includes( 'uri \\https://example.com/pic.png' ) )
			$mol_assert_ok( tree.includes( 'title \\A picture' ) )

		},

		'children of a frame are nested under its own sub'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]
			const rows = tree.split( '\n' )

			const frame = rows.findIndex( row => row.includes( '<= Node1 ' ) )
			$mol_assert_ok( frame >= 0 )
			$mol_assert_equal( rows[ frame + 1 ], '\t\t\tsub /' )
			$mol_assert_ok( rows[ frame + 2 ].startsWith( '\t\t\t\t<= Node2 ' ) )

		},

		'view.tree is indented with tabs only'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			for( const row of tree.split( '\n' ) ) {
				$mol_assert_equal( /^\t* /.test( row ), false )
			}

		},

		'user text never breaks a literal'() {

			const tree = figmol_gen_test_files()[ 'mysite.view.tree' ]

			$mol_assert_ok( tree.includes( 'title \\Hello world' ) )
			$mol_assert_equal( tree.includes( 'Hello\nworld' ), false )

			const nasty = $bog_figmol_gen.files({
				title: 'X',
				pages: [ {
					title: 'Home',
					root: { kind: 'frame', kids: [
						{ kind: 'text', props: { text: 'a\nb\tc\r\nd' } },
					] },
				} ],
			})

			// The shell carries a title of its own — the one being checked here is
			// the caption of the node, further in.
			const rows = nasty[ 'x.view.tree' ].split( '\n' )
				.filter( row => row.includes( 'title \\' ) && !row.startsWith( '\ttitle ' ) )
			$mol_assert_equal( rows.length, 1 )
			$mol_assert_ok( rows[ 0 ].endsWith( 'title \\a b c d' ) )

		},

		'free placement becomes absolute coordinates'() {

			const css = figmol_gen_test_files()[ 'mysite.view.css.ts' ]

			$mol_assert_ok( css.includes( "position: 'absolute'" ) )
			$mol_assert_ok( css.includes( "left: '40px'" ) )
			$mol_assert_ok( css.includes( "top: '40px'" ) )
			$mol_assert_ok( css.includes( "left: '560px'" ) )
			$mol_assert_ok( css.includes( "width: '240px'" ) )
			$mol_assert_ok( css.includes( "height: '160px'" ) )

		},

		'an auto layout frame becomes a flex container'() {

			const plan = $bog_figmol_gen.plan( figmol_gen_test_site, { name: 'mysite' } )
			const frame = plan.screens[ 0 ].units[ 0 ]

			$mol_assert_like( frame.style.flex, { direction: 'column' } )
			$mol_assert_equal( frame.style.gap, '16px' )
			$mol_assert_equal( frame.style.padding, '24px' )
			$mol_assert_like( frame.style.align, { items: 'stretch' } )

			const css = figmol_gen_test_files()[ 'mysite.view.css.ts' ]
			$mol_assert_ok( css.includes( "gap: '16px'" ) )
			$mol_assert_ok( css.includes( "padding: '24px'" ) )
			$mol_assert_ok( css.includes( "items: 'stretch'" ) )

		},

		'a child of a stretching column keeps only its height'() {

			const plan = $bog_figmol_gen.plan( figmol_gen_test_site, { name: 'mysite' } )
			const text = plan.screens[ 0 ].units[ 0 ].kids[ 0 ]

			$mol_assert_like( text.style.flex, { shrink: 0 } )
			$mol_assert_equal( text.style.minHeight, '48px' )
			$mol_assert_equal( text.style.width, undefined )
			$mol_assert_equal( text.style.position, undefined )

		},

		'a nested frame is a flex item and a flex container at once'() {

			const plan = $bog_figmol_gen.plan({
				title: 'X',
				pages: [ { root: { kind: 'frame', direction: 'column', align: 'center', kids: [
					{ kind: 'frame', w: 600, h: 80, direction: 'row', gap: 12, kids: [] },
				] } } ],
			})

			$mol_assert_like( plan.screens[ 0 ].units[ 0 ].style.flex, { shrink: 0, direction: 'row' } )

		},

		'a centered column keeps the width of its children'() {

			const plan = $bog_figmol_gen.plan( figmol_gen_test_site, { name: 'mysite' } )
			const text = plan.screens[ 1 ].units[ 0 ]

			$mol_assert_equal( text.style.width, '600px' )
			$mol_assert_equal( text.style.minHeight, '40px' )

		},

		'node properties reach the style sheet, garbage does not'() {

			const plan = $bog_figmol_gen.plan({
				title: 'X',
				pages: [ { root: { kind: 'frame', kids: [
					{ kind: 'text', props: {
						text: 'hi',
						color: '#101828',
						size: '32',
						weight: 'bold',
						back: 'rgba(1,2,3,.4)',
						radius: 'drop table',
						align: 'center',
					} },
				] } } ],
			})

			const style = plan.screens[ 0 ].units[ 0 ].style

			$mol_assert_equal( style.color, '#101828' )
			$mol_assert_like( style.font, { size: '32px', weight: 'bold' } )
			$mol_assert_equal( style.textAlign, 'center' )
			$mol_assert_equal( style.background, undefined )
			$mol_assert_equal( style.borderRadius, undefined )

		},

		'theme tokens land on the shell'() {

			const css = figmol_gen_test_files()[ 'mysite.view.css.ts' ]

			$mol_assert_ok( css.includes( "minHeight: '100vh'" ) )
			$mol_assert_ok( css.includes( "color: '#111111'" ) )
			$mol_assert_ok( css.includes( "family: 'Inter, sans-serif'" ) )
			$mol_assert_ok( css.includes( "'[mol_link_current]'" ) )
			$mol_assert_ok( css.includes( "color: '#ff0066'" ) )

		},

		'the style sheet defines every generated component'() {

			const css = figmol_gen_test_files()[ 'mysite.view.css.ts' ]
			const define = figmol_gen_test_sign( 'mol_style_define' )

			$mol_assert_ok( css.startsWith( 'namespace $ {' ) )
			$mol_assert_ok( css.includes( define + '( ' + figmol_gen_test_sign( 'mysite' ) + ', {' ) )
			$mol_assert_ok( css.includes( define + '( ' + figmol_gen_test_sign( 'mysite_page_home' ) + ', {' ) )
			$mol_assert_ok( css.includes( define + '( ' + figmol_gen_test_sign( 'mysite_page_about' ) + ', {' ) )
			$mol_assert_ok( css.includes( '\t\tNode1: {' ) )
			$mol_assert_ok( css.includes( '\t\tNode4: {' ) )

		},

		'the script routes between pages'() {

			const script = figmol_gen_test_files()[ 'mysite.view.ts' ]

			$mol_assert_ok( script.includes( 'namespace $.$$ {' ) )
			$mol_assert_ok( script.includes( 'export class ' + figmol_gen_test_sign( 'mysite' ) + ' extends $.' + figmol_gen_test_sign( 'mysite' ) ) )
			$mol_assert_ok( script.includes( figmol_gen_test_sign( 'mol_state_arg' ) + ".value( 'page' ) || 'home'" ) )
			$mol_assert_ok( script.includes( 'override body()' ) )
			$mol_assert_ok( script.includes( "case 'about': return [ this.Page_about() ]" ) )
			$mol_assert_ok( script.includes( 'default: return [ this.Page_home() ]' ) )
			$mol_assert_ok( script.includes( 'override nav_about_current()' ) )

		},

		'the entry point mounts the root component'() {

			const html = figmol_gen_test_files()[ 'index.html' ]

			$mol_assert_ok( html.startsWith( '<!doctype html>' ) )
			$mol_assert_ok( html.includes( 'mol_view_root="' + figmol_gen_test_sign( 'mysite' ) + '"' ) )
			$mol_assert_ok( html.includes( '<script src="web.js"></script>' ) )
			$mol_assert_ok( html.includes( '<title>My Site</title>' ) )

		},

		'html of a hostile title is escaped'() {

			const html = $bog_figmol_gen.files( { title: '<script>"x"' }, { name: 'evil' } )[ 'index.html' ]

			$mol_assert_equal( html.includes( '<title><script>' ), false )
			$mol_assert_ok( html.includes( '&lt;script&gt;&quot;x&quot;' ) )

		},

		'the workflow is structurally valid yaml'() {

			const yaml = figmol_gen_test_files()[ '.github/workflows/deploy.yml' ]
			const rows = yaml.split( '\n' )

			// A tab anywhere, an odd indent or a line that starts with anything but
			// a key, a sequence item or a comment would all break a YAML reader.
			$mol_assert_equal( yaml.includes( '\t' ), false )

			for( const row of rows ) {
				if( !row.trim() ) continue
				const indent = /^ */.exec( row )![ 0 ].length
				$mol_assert_equal( indent % 2, 0 )
				$mol_assert_equal( row, row.replace( /\s+$/, '' ) )
				$mol_assert_ok( /^ *(- )?[A-Za-z_#][\w.-]*:?/.test( row ) )
			}

			$mol_assert_ok( rows.includes( 'jobs:' ) )
			$mol_assert_ok( rows.includes( '        steps:' ) )
			$mol_assert_ok( rows.includes( '            - uses: hyoo-ru/mam_build@master2' ) )
			$mol_assert_ok( rows.includes( '                  package: "mysite"' ) )
			$mol_assert_ok( rows.includes( '                  folder: "mysite/-"' ) )
			$mol_assert_ok( rows.includes( 'name: "mysite"' ) )

		},

		'the readme lists the pages and the repository'() {

			const readme = figmol_gen_test_files()[ 'readme.md' ]

			$mol_assert_ok( readme.startsWith( '# My Site' ) )
			$mol_assert_ok( readme.includes( '`#!page=home`' ) )
			$mol_assert_ok( readme.includes( '`#!page=about`' ) )
			$mol_assert_ok( readme.includes( 'https://github.com/alice/mysite.git' ) )
			$mol_assert_ok( readme.includes( 'npm start mysite' ) )

		},

		'an empty site still produces a buildable project'() {

			const files = $bog_figmol_gen.files( {}, { name: 'blank' } )

			$mol_assert_ok( files[ 'blank.view.tree' ].includes( figmol_gen_test_sign( 'blank' ) + ' ' + figmol_gen_test_sign( 'mol_view' ) ) )
			$mol_assert_ok( files[ 'blank.view.tree' ].includes( figmol_gen_test_sign( 'blank_page_home' ) ) )
			$mol_assert_ok( files[ 'blank.view.css.ts' ].includes( 'namespace $ {' ) )

		},

		'every library block maps onto its own component'() {

			const tree = $bog_figmol_gen.files( figmol_gen_test_blocks, { name: 'blocks' } )[ 'blocks.view.tree' ]

			$mol_assert_ok( tree.includes( '<= Node1 ' + figmol_gen_test_sign( 'bog_builderui_card' ) ) )
			$mol_assert_ok( tree.includes( '<= Node3 ' + figmol_gen_test_sign( 'bog_builderui_badge' ) ) )
			$mol_assert_ok( tree.includes( '<= Node4 ' + figmol_gen_test_sign( 'bog_builderui_button' ) ) )
			$mol_assert_ok( tree.includes( '<= Node5 ' + figmol_gen_test_sign( 'bog_builderui_alert' ) ) )
			$mol_assert_ok( tree.includes( '<= Node6 ' + figmol_gen_test_sign( 'bog_builderui_field' ) ) )
			$mol_assert_ok( tree.includes( '<= Node7 ' + figmol_gen_test_sign( 'bog_builderui_progress' ) ) )
			$mol_assert_ok( tree.includes( '<= Node8 ' + figmol_gen_test_sign( 'bog_builderui_tabs' ) ) )
			$mol_assert_ok( tree.includes( '<= Node9 ' + figmol_gen_test_sign( 'bog_builderui_avatar' ) ) )

		},

		'a block is declared with the properties its component understands'() {

			const tree = $bog_figmol_gen.files( figmol_gen_test_blocks, { name: 'blocks' } )[ 'blocks.view.tree' ]

			$mol_assert_ok( tree.includes( 'title \\Continue' ) )
			$mol_assert_ok( tree.includes( 'variant \\ghost' ) )
			$mol_assert_ok( tree.includes( 'variant \\outline' ) )
			$mol_assert_ok( tree.includes( 'title \\Heads up' ) )
			$mol_assert_ok( tree.includes( 'text \\Read this first' ) )
			$mol_assert_ok( tree.includes( 'hint \\you@example.com' ) )
			$mol_assert_ok( tree.includes( 'value 64' ) )
			$mol_assert_ok( tree.includes( 'max 80' ) )
			$mol_assert_ok( tree.includes( 'uri \\https://example.com/face.png' ) )

		},

		/** A caption of a tab becomes its key, and two of them may not collide. */
		'tab captions become a dictionary'() {

			const plan = $bog_figmol_gen.plan( figmol_gen_test_blocks, { name: 'blocks' } )
			const tabs = plan.screens[ 0 ].units.find( unit => unit.kind === 'bui_tabs' )!

			$mol_assert_like( tabs.options, [
				[ 'overview', 'Overview' ],
				[ 'activity', 'Activity' ],
				[ 'overview2', 'Overview' ],
			] )

			const tree = $bog_figmol_gen.files( figmol_gen_test_blocks, { name: 'blocks' } )[ 'blocks.view.tree' ]
			$mol_assert_ok( tree.includes( '\t\t\toptions *' ) )
			$mol_assert_ok( tree.includes( '\t\t\t\toverview \\Overview' ) )

		},

		'an unknown look falls back to the plain one'() {

			const plan = $bog_figmol_gen.plan({
				title: 'X',
				pages: [ { root: { kind: 'frame', kids: [
					{ kind: 'bui_button', props: { text: 'Go', variant: 'rainbow' } },
				] } } ],
			})

			$mol_assert_equal( plan.screens[ 0 ].units[ 0 ].variant, 'default' )

		},

		/** A card holds nodes the same way a frame does, right down to the layout. */
		'a card lays its children out and keeps them'() {

			const plan = $bog_figmol_gen.plan( figmol_gen_test_blocks, { name: 'blocks' } )
			const card = plan.screens[ 0 ].units[ 0 ]

			$mol_assert_equal( card.kids.length, 2 )
			$mol_assert_equal( card.kids[ 0 ].title, 'Local first' )
			$mol_assert_like( card.style.flex, { shrink: 0, direction: 'column' } )
			$mol_assert_equal( card.style.gap, '10px' )
			$mol_assert_equal( card.style.margin, 0 )

			const tree = $bog_figmol_gen.files( figmol_gen_test_blocks, { name: 'blocks' } )[ 'blocks.view.tree' ]
			const rows = tree.split( '\n' )
			const at = rows.findIndex( row => row.includes( '<= Node1 ' ) )

			$mol_assert_equal( rows[ at + 1 ], '\t\t\tsub /' )
			$mol_assert_ok( rows[ at + 2 ].startsWith( '\t\t\t\t<= Node2 ' ) )

		},

		'a block that holds nothing gets no children'() {

			const plan = $bog_figmol_gen.plan({
				title: 'X',
				pages: [ { root: { kind: 'frame', kids: [
					{ kind: 'bui_badge', props: { text: 'Solo' }, kids: [ { kind: 'text', props: { text: 'lost' } } ] },
				] } } ],
			})

			$mol_assert_equal( plan.screens[ 0 ].units.length, 1 )
			$mol_assert_equal( plan.screens[ 0 ].units[ 0 ].kids.length, 0 )

		},

		'the style sheet names every block of a card'() {

			const css = $bog_figmol_gen.files( figmol_gen_test_blocks, { name: 'blocks' } )[ 'blocks.view.css.ts' ]

			$mol_assert_ok( css.includes( '\t\tNode1: {' ) )
			$mol_assert_ok( css.includes( '\t\tNode2: {' ) )
			$mol_assert_ok( css.includes( '\t\tNode9: {' ) )

		},

		'pages with the same slug get distinct names'() {

			const plan = $bog_figmol_gen.plan({
				title: 'X',
				pages: [
					{ title: 'One', slug: 'news' },
					{ title: 'Two', slug: 'news' },
				],
			})

			$mol_assert_equal( plan.screens[ 0 ].id, 'news' )
			$mol_assert_equal( plan.screens[ 1 ].id, 'news2' )

		},

	})

}
