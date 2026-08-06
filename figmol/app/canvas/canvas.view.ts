namespace $.$$ {

	const figmol_size_min = 8
	const figmol_zoom_min = 0.1
	const figmol_zoom_max = 4

	/** Kinds whose caption a double click opens for typing, right on the canvas. */
	const figmol_captioned = [ 'text', 'button', 'bui_button', 'bui_badge', 'bui_alert' ]

	type Draft = {
		id: string,
		rect: readonly number[],
	}

	type Point = {
		clientX: number,
		clientY: number,
	}

	/**
	 * The editing surface.
	 *
	 * Two coordinate systems meet here. Nodes are stored in sheet pixels; the
	 * viewport adds `pan` (screen pixels) and `zoom` on top through a single CSS
	 * transform on `World`. Every conversion goes through `sheet_point`, which
	 * measures the sheet element and therefore stays correct no matter how the
	 * page around the canvas is laid out.
	 *
	 * Shapes are a tree in the DOM and a flat keyed factory here: `Shape( id )`
	 * makes one view per node wherever that node sits, and a frame gets its kid
	 * views handed to it. Selection, editing and the drag in progress therefore
	 * stay in one object instead of being threaded down every nesting level.
	 *
	 * Dragging is deliberately split in two: the live rectangle sits in the
	 * `draft` atom so that a pointermove costs one repaint, and only pointerup
	 * writes it into the Baza. Writing on every move would turn a single drag
	 * into hundreds of CRDT units.
	 */
	export class $bog_figmol_app_canvas extends $.$bog_figmol_app_canvas {

		/* -------------------------------------------------------------- shapes */

		@ $mol_mem
		shapes() {
			return this.shape_kids( this.store().root_id() )
		}

		shape_id( id: string ) {
			return id
		}

		@ $mol_mem_key
		shape_kids( id: string ): readonly $mol_view[] {
			return this.store().kids( id ).map( kid => this.Shape( kid ) )
		}

		@ $mol_mem_key
		shape_selected( id: string ) {
			return this.selected() === id
		}

		@ $mol_mem_key
		shape_editing( id: string ) {
			return this.editing() === id
		}

		@ $mol_mem_key
		shape_dropping( id: string ) {
			return this.drop_target() === id
		}

		/** Live rectangle while dragging, stored one otherwise. */
		@ $mol_mem_key
		shape_rect( id: string ): readonly number[] {
			const draft = this.draft()
			if( draft?.id === id ) return draft.rect
			return this.store().rect( id )
		}

		/** Rectangle of the node under the pointer, alive only during a drag. */
		@ $mol_mem
		draft( next?: Draft | null ) {
			return next ?? null
		}

		/** Frame the current drag would drop into. Empty means the sheet itself. */
		@ $mol_mem
		drop_target( next?: string ) {
			return next ?? ''
		}

		/* ------------------------------------------------------------ measuring */

		@ $mol_mem
		armed() {
			return this.editable() && this.tool() !== 'select'
		}

		@ $mol_mem
		world_transform() {
			return `translate(${ this.pan_x() }px, ${ this.pan_y() }px) scale(${ this.zoom() })`
		}

		@ $mol_mem
		sheet_width_style() {
			return this.sheet_width() + 'px'
		}

		@ $mol_mem
		sheet_height_style() {
			return this.sheet_height() + 'px'
		}

		/**
		 * Middle of the visible area, in sheet pixels.
		 *
		 * This is where a block picked from the palette goes — no pointer told it
		 * where, and the middle of what the user is looking at beats a fixed corner
		 * of a sheet that may be scrolled far away. Measured on the spot rather
		 * than memoized: panning does not repaint anything, so a remembered answer
		 * would go stale without ever being invalidated.
		 */
		center(): readonly number[] {

			const node = $mol_wire_probe( ()=> this.dom_node() ) as HTMLElement | undefined
			if( !node ) return [ 0, 0 ]

			const rect = node.getBoundingClientRect()

			return this.sheet_point({
				clientX: rect.left + rect.width / 2,
				clientY: rect.top + rect.height / 2,
			})
		}

		/** Client point in sheet coordinates. */
		sheet_point( event: Point ) {
			const rect = this.Sheet().dom_node().getBoundingClientRect()
			const zoom = this.zoom()
			return [
				( event.clientX - rect.left ) / zoom,
				( event.clientY - rect.top ) / zoom,
			]
		}

		/**
		 * Element of a shape that is already on screen, `null` otherwise. Probed
		 * rather than asked for: `dom_node()` would happily build a detached node
		 * for a shape nobody rendered, and measuring that gives zeroes.
		 */
		shape_dom( id: string ) {
			if( !id ) return null
			const shape = this.Shape( id )
			return $mol_wire_probe( ()=> shape.dom_node() ) as HTMLElement | undefined ?? null
		}

		/**
		 * Top-left of a node in sheet pixels, measured from the DOM. Asking the
		 * node itself would only work outside an auto layout — inside one the
		 * coordinates are the layout's business, and this is the way to learn
		 * where an element actually ended up.
		 */
		node_origin( id: string ): readonly number[] {
			if( !id || id === this.store().root_id() ) return [ 0, 0 ]
			const node = this.shape_dom( id )
			if( !node ) return [ 0, 0 ]
			const rect = node.getBoundingClientRect()
			const sheet = this.Sheet().dom_node().getBoundingClientRect()
			const zoom = this.zoom()
			return [ ( rect.left - sheet.left ) / zoom, ( rect.top - sheet.top ) / zoom ]
		}

		/**
		 * Deepest container under the pointer, empty for the sheet itself. Everything
		 * at or below `held` is skipped: a frame cannot be dropped into itself.
		 * Depth decides rather than z-order, so a frame inside a frame wins.
		 */
		frame_at( point: Point, held: string ) {

			const store = this.store()
			let res = ''
			let deepest = -1

			for( const id of store.node_ids() ) {

				if( !store.container( id ) ) continue
				if( held && store.inside( id, held ) ) continue

				const node = this.shape_dom( id )
				if( !node ) continue

				const rect = node.getBoundingClientRect()
				if( point.clientX < rect.left || point.clientX > rect.right ) continue
				if( point.clientY < rect.top || point.clientY > rect.bottom ) continue

				const depth = store.depth( id )
				if( depth <= deepest ) continue

				deepest = depth
				res = id

			}

			return res
		}

		/**
		 * Where the pointer sits among the kids of a frame. Only an auto layout
		 * cares about the answer — free placement appends, since order there means
		 * nothing but which shape draws on top.
		 */
		drop_index( parent: string, point: Point, held: string ) {

			const store = this.store()
			const kids = store.kids( parent )

			if( !store.auto_layout( parent ) ) return kids.length

			const row = store.direction( parent ) === 'row'
			const along = row ? point.clientX : point.clientY
			let res = 0

			for( const kid of kids ) {

				if( kid === held ) continue

				const node = this.shape_dom( kid )
				if( !node ) continue

				const rect = node.getBoundingClientRect()
				const center = row ? ( rect.left + rect.right ) / 2 : ( rect.top + rect.bottom ) / 2
				if( along > center ) ++res

			}

			return res
		}

		/* ----------------------------------------------------- pointer gesture */

		/**
		 * Gesture state is kept in plain fields on purpose. A `@$mol_mem` cell
		 * read by several handlers resets to its default between events: every
		 * handler is a fresh fiber and killing the previous one drops the only
		 * subscriber of the cell.
		 */
		mode = '' as '' | 'pan' | 'move' | 'resize'
		grab_id = ''
		grab_corner = ''
		grab_x = 0
		grab_y = 0
		last_x = 0
		last_y = 0
		grab_flow = false
		grab_rect = [ 0, 0, 0, 0 ] as readonly number[]
		grab_sheet = [ 0, 0 ] as readonly number[]
		grab_pan = [ 0, 0 ] as readonly number[]

		@ $mol_action
		pointer_down( event?: PointerEvent ) {

			if( !event ) return null
			if( !event.isPrimary ) return null

			const host = event.currentTarget as HTMLElement
			const target = event.target as Element

			// A press inside the inline editor belongs to the editor: no capture,
			// no default prevented, so the caret lands where it was clicked.
			if( target.closest( '[figmol_edit]' ) ) return null

			this.grab_x = event.clientX
			this.grab_y = event.clientY
			this.last_x = event.clientX
			this.last_y = event.clientY
			this.mode = ''

			const tool = this.tool()

			if( this.editable() && tool !== 'select' ) {
				event.preventDefault()
				this.node_add( tool, event )
				this.tool( 'select' )
				return null
			}

			event.preventDefault()

			// Capture keeps the moves coming when the pointer leaves the canvas.
			// It refuses a pointer that is no longer down, which is a race rather
			// than a mistake — the gesture still works through plain bubbling.
			try {
				host.setPointerCapture( event.pointerId )
			} catch( error ) {
				$mol_fail_log( error )
			}

			host.focus()

			if( this.editing() ) this.editing( '' )

			const handle = target.closest( '[figmol_handle]' )
			const shape = target.closest( '[figmol_node]' )
			const id = shape?.getAttribute( 'figmol_node' ) ?? ''

			// A press on a shape picks it whoever is looking, and starts a drag only
			// for somebody who may write. Read only, it goes on to pan the sheet.
			if( id && event.button === 0 ) {

				this.selected( id )

				if( this.editable() ) {

					this.grab_id = id
					this.grab_rect = this.shape_rect( id )
					this.grab_flow = this.store().flow( id )
					this.grab_sheet = this.node_origin( id )

					if( handle ) {
						this.mode = 'resize'
						this.grab_corner = handle.getAttribute( 'figmol_handle' ) ?? 'se'
					} else {
						this.mode = 'move'
					}

					return null
				}
			}

			if( !id ) this.selected( '' )

			this.mode = 'pan'
			this.grab_pan = [ this.pan_x(), this.pan_y() ]

			return null
		}

		@ $mol_action
		pointer_move( event?: PointerEvent ) {

			if( !event ) return null
			if( !this.mode ) return null

			this.last_x = event.clientX
			this.last_y = event.clientY

			const shift_x = event.clientX - this.grab_x
			const shift_y = event.clientY - this.grab_y

			if( this.mode === 'pan' ) {
				this.pan_x( this.grab_pan[ 0 ] + shift_x )
				this.pan_y( this.grab_pan[ 1 ] + shift_y )
				return null
			}

			const zoom = this.zoom()
			const move_x = shift_x / zoom
			const move_y = shift_y / zoom

			const [ x, y, w, h ] = this.grab_rect

			if( this.mode === 'move' ) {

				this.drop_target( this.frame_at( event, this.grab_id ) )

				// A node inside an auto layout has nowhere to go on its own: the
				// frame decides where it sits, and the drag only picks the order.
				if( !this.grab_flow ) this.draft({
					id: this.grab_id,
					rect: [ Math.round( x + move_x ), Math.round( y + move_y ), w, h ],
				})

				return null
			}

			const corner = this.grab_corner
			let x2 = x, y2 = y, w2 = w, h2 = h

			if( corner.includes( 'e' ) ) w2 = Math.max( figmol_size_min, w + move_x )
			if( corner.includes( 's' ) ) h2 = Math.max( figmol_size_min, h + move_y )

			if( corner.includes( 'w' ) ) {
				w2 = Math.max( figmol_size_min, w - move_x )
				x2 = x + w - w2
			}

			if( corner.includes( 'n' ) ) {
				h2 = Math.max( figmol_size_min, h - move_y )
				y2 = y + h - h2
			}

			this.draft({
				id: this.grab_id,
				rect: [ Math.round( x2 ), Math.round( y2 ), Math.round( w2 ), Math.round( h2 ) ],
			})

			return null
		}

		/**
		 * Everything is written before any of the gesture state is cleared:
		 * handlers are retried when something inside throws a promise, and a
		 * retry that found the fields already reset would lose the drag.
		 */
		@ $mol_action
		pointer_up( event?: PointerEvent ) {

			// Where the gesture ended is normally the last move, but a pointer can
			// be released without ever having moved through a handler — a synthetic
			// drag, a lost capture — and the release itself carries the position.
			if( event && event.isPrimary ) {
				this.last_x = event.clientX
				this.last_y = event.clientY
			}

			const moving = this.mode === 'move'
			const id = this.grab_id
			const draft = this.draft()

			if( moving && id ) this.node_settle( id )
			else if( draft ) this.store().rect_set( draft.id, draft.rect )

			this.mode = ''
			this.grab_id = ''
			this.draft( null )
			this.drop_target( '' )

			return null
		}

		/**
		 * Commits a finished drag. The frame under the pointer decides where the
		 * node lands: another frame takes it in, the one it already sits in either
		 * reorders it — that is what a drag inside an auto layout means — or just
		 * moves it about.
		 *
		 * Coordinates are recomputed against the new frame, from where the shape
		 * actually was on screen rather than from its stored X and Y. Inside an
		 * auto layout those two disagree, and pulling an element out onto the
		 * sheet has to leave it where the pointer left it.
		 */
		@ $mol_action
		node_settle( id: string ) {

			const store = this.store()
			const root = store.root_id()
			const point = { clientX: this.last_x, clientY: this.last_y }

			const parent = store.parent( id ) || root
			const target = this.frame_at( point, id ) || root
			const index = this.drop_index( target, point, id )

			const draft = this.draft()

			if( target === parent && !store.auto_layout( target ) ) {
				if( draft ) store.rect_set( draft.id, draft.rect )
				return
			}

			const zoom = this.zoom()
			const sheet_x = this.grab_sheet[ 0 ] + ( this.last_x - this.grab_x ) / zoom
			const sheet_y = this.grab_sheet[ 1 ] + ( this.last_y - this.grab_y ) / zoom
			const origin = this.node_origin( target )

			store.node_reparent( id, target, index, sheet_x - origin[ 0 ], sheet_y - origin[ 1 ] )
		}

		/**
		 * Places what the armed tool says, inside the frame under the pointer.
		 *
		 * Everything that can suspend is read up front: reaching the site Land may
		 * still be pending, and the handler is retried once it resolves. Nothing is
		 * written before that point, so the retry cannot duplicate the node.
		 */
		@ $mol_action
		node_add( kind: string, event: PointerEvent ) {

			const store = this.store()
			const parent = this.frame_at( event, '' ) || store.root_id()
			if( !parent ) return

			const point = this.sheet_point( event )
			const origin = this.node_origin( parent )

			const text =
				kind === 'text' ? this.text_default()
				: kind === 'button' ? this.button_default()
				: ''

			const id = store.node_add( kind, parent, point[ 0 ] - origin[ 0 ], point[ 1 ] - origin[ 1 ], text )
			if( id ) this.selected( id )

		}

		/**
		 * Double click opens the caption for typing. The editor lives inside the
		 * shape, so what gets edited is what is seen; focus is handed over through
		 * `bring()`, which waits for the field to be in the document.
		 *
		 * What was double clicked cannot simply be read off the event. The press
		 * that came first captured the pointer on the canvas, and the browser
		 * retargets the click events that follow onto whatever holds the capture —
		 * so `event.target` is the canvas itself. The press already resolved the
		 * shape and selected it, which is the answer being looked for here; the hit
		 * test stays as the first guess for the cases where nothing was captured.
		 */
		@ $mol_action
		pointer_edit( event?: MouseEvent ) {

			if( !event ) return null
			if( !this.editable() ) return null

			const target = event.target as Element
			const shape = target.closest( '[figmol_node]' )
			const id = shape?.getAttribute( 'figmol_node' ) || this.selected()
			if( !id ) return null

			if( !figmol_captioned.includes( this.store().kind( id ) ) ) return null

			event.preventDefault()
			this.selected( id )
			this.editing( id )
			this.Shape( id ).Editor().bring()

			return null
		}

		@ $mol_action
		wheel_zoom( event?: WheelEvent ) {

			if( !event ) return null

			event.preventDefault()

			if( !event.ctrlKey && !event.metaKey ) {
				this.pan_x( this.pan_x() - event.deltaX )
				this.pan_y( this.pan_y() - event.deltaY )
				return null
			}

			const rect = ( this.dom_node() as HTMLElement ).getBoundingClientRect()
			const screen_x = event.clientX - rect.left
			const screen_y = event.clientY - rect.top

			const zoom = this.zoom()
			const zoom_next = Math.min(
				figmol_zoom_max,
				Math.max( figmol_zoom_min, zoom * Math.exp( -event.deltaY / 400 ) ),
			)

			const world_x = ( screen_x - this.pan_x() ) / zoom
			const world_y = ( screen_y - this.pan_y() ) / zoom

			this.pan_x( screen_x - world_x * zoom_next )
			this.pan_y( screen_y - world_y * zoom_next )
			this.zoom( zoom_next )

			return null
		}

		context_menu( event?: MouseEvent ) {
			event?.preventDefault()
			return null
		}

		@ $mol_action
		deselect( next?: any ) {
			this.editing( '' )
			this.selected( '' )
			return null
		}

		/** Delete removes the selected element — unless a caption is being typed. */
		@ $mol_action
		drop( next?: any ) {
			if( !this.editable() ) return null
			if( this.editing() ) return null
			const id = this.selected()
			if( !id ) return null
			this.store().node_drop( id )
			this.selected( '' )
			return null
		}

	}

}
