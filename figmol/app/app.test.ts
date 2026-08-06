namespace $ {

	$mol_test({

		'shape maps a rectangle onto absolute css'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.flow = ()=> false
			shape.stretched = ()=> ''
			shape.rect = ()=> [ 40, 60, 200, 120 ]

			$mol_assert_equal( shape.style_left(), '40px' )
			$mol_assert_equal( shape.style_top(), '60px' )
			$mol_assert_equal( shape.style_width(), '200px' )
			$mol_assert_equal( shape.style_height(), '120px' )

		},

		/**
		 * Inside an auto layout the frame decides where the element goes, so the
		 * element must not insist on coordinates of its own.
		 */
		'shape inside an auto layout gives up its own placement'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.flow = ()=> true
			shape.stretched = ()=> ''
			shape.rect = ()=> [ 40, 60, 200, 120 ]

			$mol_assert_equal( shape.style_left(), '' )
			$mol_assert_equal( shape.style_top(), '' )
			$mol_assert_equal( shape.style_width(), '200px' )

		},

		/** A stretched cross axis takes over the size, so the size steps aside. */
		'shape stretched by its frame drops the size along that axis'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.flow = ()=> true
			shape.stretched = ()=> 'width'
			shape.rect = ()=> [ 40, 60, 200, 120 ]

			$mol_assert_equal( shape.style_width(), '' )
			$mol_assert_equal( shape.style_height(), '120px' )

		},

		'shape shows corner grips only while selected'() {

			const plain = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			plain.kind = ()=> 'rect'
			$mol_assert_equal( plain.content().length, 0 )

			const picked = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			picked.kind = ()=> 'rect'
			picked.selected = ()=> true
			$mol_assert_equal( picked.content().length, 4 )

		},

		/** Grips that cannot be dragged are a promise the editor would not keep. */
		'shape of a site opened by link shows no grips'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.kind = ()=> 'rect'
			shape.selected = ()=> true
			shape.editable = ()=> false

			$mol_assert_equal( shape.content().length, 0 )

		},

		/** An `img` with an empty source draws the browser's broken image icon. */
		'an avatar with no picture draws a placeholder instead'() {

			const blank = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			blank.kind = ()=> 'bui_avatar'
			blank.uri = ()=> ''

			$mol_assert_equal( blank.content()[ 0 ], blank.Avatar_stub() )

			const filled = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			filled.kind = ()=> 'bui_avatar'
			filled.uri = ()=> 'https://example.com/face.png'

			$mol_assert_equal( filled.content()[ 0 ], filled.Bui_avatar() )

		},

		/** A frame draws the shapes of its kids and nothing else of its own. */
		'shape of a frame draws its kids'() {

			const kid = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape

			const frame = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			frame.kind = ()=> 'frame'
			frame.kids = ()=> [ kid ]

			$mol_assert_equal( frame.content().length, 1 )
			$mol_assert_equal( frame.content()[ 0 ], kid )

		},

		/** A block is drawn by the very component the published page will use. */
		'shape of a library block draws that component'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.kind = ()=> 'bui_badge'

			$mol_assert_equal( shape.content().length, 1 )
			$mol_assert_equal( shape.content()[ 0 ], shape.Bui_badge() )

		},

		/**
		 * A card takes the shapes of its children into the component, so pushing
		 * them into the shape as well would draw every one of them twice.
		 */
		'shape of a card hands its children over instead of drawing them'() {

			const kid = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape

			const card = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			card.kind = ()=> 'bui_card'
			card.kids = ()=> [ kid ]

			$mol_assert_equal( card.content().length, 1 )
			$mol_assert_equal( card.content()[ 0 ], card.Bui_card() )
			$mol_assert_equal( card.Bui_card().sub()[ 0 ], kid )

		},

		/** The layout of a card belongs to the component, not to the shape around it. */
		'shape of a card puts the layout on the component'() {

			const card = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			card.kind = ()=> 'bui_card'

			const store = card.store()
			store.container = ()=> true
			store.direction = ()=> 'row'
			store.gap = ()=> 12
			store.padding = ()=> 20

			$mol_assert_equal( card.style_direction(), '' )
			$mol_assert_equal( card.style_padding(), '' )
			$mol_assert_equal( card.inner_direction(), 'row' )
			$mol_assert_equal( card.inner_gap(), '12px' )
			$mol_assert_equal( card.inner_padding(), '20px' )

		},

		'tab captions become keyed options'() {

			const shape = new $bog_figmol_app_canvas_shape as $.$$.$bog_figmol_app_canvas_shape
			shape.store().options = ()=> 'Overview | Activity |  | Settings'

			$mol_assert_like( shape.tab_options(), {
				overview: 'Overview',
				activity: 'Activity',
				settings: 'Settings',
			} )

		},

		/** A layer is named by its kind, with the beginning of its caption after it. */
		'a layer row quotes the caption of its element'() {

			const layers = new $bog_figmol_app_layers as $.$$.$bog_figmol_app_layers

			const store = layers.store()
			store.kind = ( id: string )=> id === 'a' ? 'bui_card' : 'text'
			store.text = ( id: string )=> id === 'a' ? '' : 'A caption long enough to be cut short'
			store.depth = ( id: string )=> id === 'a' ? 0 : 1

			$mol_assert_equal( layers.row_title( 'a' ), 'Card' )
			$mol_assert_equal( layers.row_title( 'b' ), 'Text · A caption long enough…' )
			$mol_assert_equal( layers.row_indent( 'a' ), '0.25rem' )
			$mol_assert_equal( layers.row_indent( 'b' ), '1rem' )

		},

		'canvas keeps the point under the cursor while zooming'() {

			const canvas = new $bog_figmol_app_canvas as $.$$.$bog_figmol_app_canvas
			canvas.dom_node = ()=> ({
				getBoundingClientRect: ()=> ({ left: 0, top: 0 }),
			}) as any

			canvas.zoom( 1 )
			canvas.pan_x( 0 )
			canvas.pan_y( 0 )

			const before = ( 300 - canvas.pan_x() ) / canvas.zoom()

			canvas.wheel_zoom({
				clientX: 300,
				clientY: 200,
				deltaX: 0,
				deltaY: -400,
				ctrlKey: true,
				metaKey: false,
				preventDefault: ()=> {},
			} as any )

			$mol_assert_ok( canvas.zoom() > 1 )
			$mol_assert_equal(
				Math.round( ( 300 - canvas.pan_x() ) / canvas.zoom() ),
				Math.round( before ),
			)

		},

		/**
		 * Drop order is read off the screen rather than off the model: an auto
		 * layout is the only thing that knows where its kids ended up.
		 */
		'canvas picks the drop slot by the middle of each neighbour'() {

			const canvas = new $bog_figmol_app_canvas as $.$$.$bog_figmol_app_canvas

			const store = canvas.store()
			store.kids = ()=> [ 'a', 'b', 'c' ]
			store.auto_layout = ()=> true
			store.direction = ()=> 'column'

			const tops = { a: 0, b: 100, c: 200 } as Record< string, number >
			canvas.shape_dom = ( id: string )=> ({
				getBoundingClientRect: ()=> ({
					left: 0, right: 100,
					top: tops[ id ], bottom: tops[ id ] + 100,
				}),
			}) as any as HTMLElement

			$mol_assert_equal( canvas.drop_index( 'frame', { clientX: 10, clientY: 10 }, '' ), 0 )
			$mol_assert_equal( canvas.drop_index( 'frame', { clientX: 10, clientY: 120 }, '' ), 1 )
			$mol_assert_equal( canvas.drop_index( 'frame', { clientX: 10, clientY: 290 }, '' ), 3 )

			// The node being dragged is not one of the neighbours it is measured
			// against, or it would always claim the slot it already sits in.
			$mol_assert_equal( canvas.drop_index( 'frame', { clientX: 10, clientY: 290 }, 'a' ), 2 )

		},

		/** Free placement has no order to speak of, so a drop just appends. */
		'canvas appends when the frame places its kids by hand'() {

			const canvas = new $bog_figmol_app_canvas as $.$$.$bog_figmol_app_canvas

			const store = canvas.store()
			store.kids = ()=> [ 'a', 'b' ]
			store.auto_layout = ()=> false

			$mol_assert_equal( canvas.drop_index( 'frame', { clientX: 0, clientY: 0 }, '' ), 2 )

		},

		/** A block nobody pointed at goes into the middle of what is on screen. */
		'a block from the palette lands in the middle of the viewport'() {

			const blocks = new $bog_figmol_app_blocks as $.$$.$bog_figmol_app_blocks
			blocks.spot = ()=> [ 500, 300 ]

			const store = blocks.store()
			store.root_id = ()=> 'root'
			store.kids = ()=> []

			$mol_assert_like( blocks.place( { kind: 'bui_card', w: 320, h: 200 } ), [ 340, 200 ] )

		},

		'a block steps aside from whatever already sits there'() {

			const blocks = new $bog_figmol_app_blocks as $.$$.$bog_figmol_app_blocks
			blocks.spot = ()=> [ 500, 300 ]

			const store = blocks.store()
			store.root_id = ()=> 'root'
			store.kids = ()=> [ 'a' ]
			store.rect = ()=> [ 340, 200, 320, 200 ]

			$mol_assert_like( blocks.place( { kind: 'bui_card', w: 320, h: 200 } ), [ 380, 240 ] )

		},

		/** Nothing on this panel writes but the palette, so the rest stays put. */
		'a site opened by link keeps the lists and loses the palette'() {

			const own = new $bog_figmol_app_side as $.$$.$bog_figmol_app_side
			$mol_assert_like( own.panels(), [ own.Pages(), own.Blocks(), own.Layers() ] )

			const guest = new $bog_figmol_app_side as $.$$.$bog_figmol_app_side
			guest.editable = ()=> false
			$mol_assert_like( guest.panels(), [ guest.Pages(), guest.Layers() ] )

		},

		'the page list keeps its fields for an editor only'() {

			const own = new $bog_figmol_app_pages as $.$$.$bog_figmol_app_pages
			$mol_assert_equal( own.panels().length, 5 )
			$mol_assert_like( own.head_content(), [ own.Caption(), own.Add() ] )

			const guest = new $bog_figmol_app_pages as $.$$.$bog_figmol_app_pages
			guest.editable = ()=> false
			$mol_assert_like( guest.panels(), [ guest.Head(), guest.List() ] )
			$mol_assert_like( guest.head_content(), [ guest.Caption() ] )

		},

	})

}
