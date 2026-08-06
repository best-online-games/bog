namespace $.$$ {

	/**
	 * One element drawn on the sheet, and the frames it contains.
	 *
	 * A shape reads its own node out of the store, so nesting costs nothing: the
	 * canvas hands over the kid views and the shape puts them in its `sub`. What
	 * comes from the canvas instead of the store is the state of the interaction
	 * — what is selected, what is being edited, what the drag is aiming at — and
	 * the rectangle, which follows the pointer before it is written down.
	 *
	 * Placement has two modes. Outside an auto layout the shape is positioned
	 * absolutely from its own X and Y. Inside one it is a flex item and says so
	 * with `figmol_flow`: left and top are dropped, and the size the parent
	 * stretches is dropped as well, or the stretch would have nothing to do.
	 *
	 * The `figmol_node`, `figmol_handle` and `figmol_edit` attributes are the
	 * hit-test protocol: the canvas resolves what was grabbed by walking up from
	 * `event.target`, which keeps every pointer listener on a single element.
	 */
	export class $bog_figmol_app_canvas_shape extends $.$bog_figmol_app_canvas_shape {

		kind() {
			return this.store().kind( this.id() )
		}

		label( next?: string ) {
			return this.store().text( this.id(), next )
		}

		uri() {
			return this.store().uri( this.id() )
		}

		note() {
			return this.store().note( this.id() )
		}

		variant() {
			return this.store().variant( this.id() )
		}

		progress() {
			return this.store().progress( this.id() )
		}

		progress_max() {
			return this.store().progress_max( this.id() )
		}

		/** Captions of the tabs block, keyed the way the generated site keys them. */
		@ $mol_mem
		tab_options() {

			const res = {} as Record< string, string >

			this.store().options( this.id() ).split( '|' ).forEach( ( raw, index )=> {
				const title = raw.trim()
				if( !title ) return
				res[ title.toLowerCase().replace( /[^a-z0-9]+/g, '' ) || 'tab' + index ] = title
			} )

			return res
		}

		flow() {
			return this.store().flow( this.id() )
		}

		/**
		 * A block that hands its children to the library component instead of
		 * drawing them itself. The layout then belongs to that component, and
		 * this shape stays a plain box the drag code can measure.
		 */
		wrapped() {
			return this.kind() === 'bui_card'
		}

		/**
		 * Which of its own sizes this shape has to give up, because the cross axis
		 * of the parent stretches it. Empty when nothing is taken over.
		 */
		stretched() {
			if( !this.flow() ) return ''
			const store = this.store()
			const parent = store.parent( this.id() )
			if( store.align( parent ) !== 'stretch' ) return ''
			return store.direction( parent ) === 'row' ? 'height' : 'width'
		}

		style_left() {
			return this.flow() ? '' : ( this.rect()[ 0 ] ?? 0 ) + 'px'
		}

		style_top() {
			return this.flow() ? '' : ( this.rect()[ 1 ] ?? 0 ) + 'px'
		}

		style_width() {
			return this.stretched() === 'width' ? '' : ( this.rect()[ 2 ] ?? 120 ) + 'px'
		}

		style_height() {
			return this.stretched() === 'height' ? '' : ( this.rect()[ 3 ] ?? 48 ) + 'px'
		}

		/** Layout this node imposes on its kids, wherever that layout is applied. */
		layout_direction() {
			return this.store().container( this.id() ) ? this.store().direction( this.id() ) : ''
		}

		align_style() {
			switch( this.store().align( this.id() ) ) {
				case 'start': return 'flex-start'
				case 'center': return 'center'
				case 'end': return 'flex-end'
				default: return 'stretch'
			}
		}

		style_direction() {
			return this.wrapped() ? '' : this.layout_direction()
		}

		style_gap() {
			return this.style_direction() ? this.store().gap( this.id() ) + 'px' : ''
		}

		style_padding() {
			return !this.wrapped() && this.store().container( this.id() )
				? this.store().padding( this.id() ) + 'px'
				: ''
		}

		style_align() {
			return this.style_direction() ? this.align_style() : ''
		}

		inner_direction() {
			return this.wrapped() ? this.layout_direction() : ''
		}

		inner_gap() {
			return this.inner_direction() ? this.store().gap( this.id() ) + 'px' : ''
		}

		inner_padding() {
			return this.wrapped() ? this.store().padding( this.id() ) + 'px' : ''
		}

		inner_align() {
			return this.inner_direction() ? this.align_style() : ''
		}

		style_color() {
			return this.store().color( this.id() )
		}

		style_back() {
			return this.store().back( this.id() )
		}

		style_font_size() {
			const size = this.store().font_size( this.id() )
			return size > 0 ? size + 'px' : ''
		}

		style_weight() {
			const weight = this.store().weight( this.id() )
			return weight === 'normal' ? '' : weight
		}

		style_text_align() {
			const align = this.store().text_align( this.id() )
			return align === 'left' ? '' : align
		}

		/** The library component this kind is drawn with, `null` for a primitive. */
		bui(): $mol_view | null {
			switch( this.kind() ) {
				case 'bui_card': return this.Bui_card()
				case 'bui_button': return this.Bui_button()
				case 'bui_badge': return this.Bui_badge()
				case 'bui_alert': return this.Bui_alert()
				case 'bui_field': return this.Bui_field()
				case 'bui_progress': return this.Bui_progress()
				case 'bui_tabs': return this.Bui_tabs()
				case 'bui_avatar': return this.uri() ? this.Bui_avatar() : this.Avatar_stub()
			}
			return null
		}

		@ $mol_mem
		content(): readonly $mol_view[] {

			const res = [] as $mol_view[]
			const kind = this.kind()
			const bui = this.bui()

			if( this.editing() ) res.push( this.Editor() )
			else if( kind === 'image' ) { if( this.uri() ) res.push( this.Picture() ) }
			else if( bui ) res.push( bui )
			else if( kind !== 'rect' && kind !== 'frame' ) res.push( this.Label() )

			// A wrapped block was handed the kids already, and pushing them here
			// too would draw every one of them twice.
			if( !this.wrapped() ) res.push( ... this.kids() )

			if( this.selected() && this.editable() ) res.push(
				this.Handle_nw(),
				this.Handle_ne(),
				this.Handle_sw(),
				this.Handle_se(),
			)

			return res
		}

	}

}
