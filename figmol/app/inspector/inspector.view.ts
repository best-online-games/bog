namespace $.$$ {

	/**
	 * Properties of whatever is selected, in the panel on the right.
	 *
	 * Every field is a two-way binding straight onto the store, and the store
	 * writes straight into the Baza. There is no draft state and no Apply button
	 * on purpose: an inspector produces a handful of writes per minute, unlike a
	 * drag, so buffering them would only add a way for the panel and the canvas
	 * to disagree.
	 *
	 * Which rows show up depends on the kind of the node, and the rows themselves
	 * are ordinary named sub-views rather than a keyed factory — there is a fixed,
	 * small set of them, and naming each one keeps the bindings readable.
	 */
	export class $bog_figmol_app_inspector extends $.$bog_figmol_app_inspector {

		kind() {
			return this.store().kind( this.selected() )
		}

		kind_title() {
			switch( this.kind() ) {
				case 'text': return this.title_text()
				case 'image': return this.title_image()
				case 'button': return this.title_button()
				case 'frame': return this.title_frame()
				case 'rect': return this.title_rect()
				default: return $bog_figmol_blocks.title( this.kind() )
			}
		}

		@ $mol_mem
		rows(): readonly $mol_view[] {

			const id = this.selected()
			if( !id ) return []

			const kind = this.kind()
			const res = [ this.Head() ] as $mol_view[]

			// Coordinates of a node inside an auto layout would be a lie: the frame
			// places it, and typing into X there changes nothing anybody can see.
			if( !this.store().flow( id ) ) res.push( this.Field_x(), this.Field_y() )

			res.push( this.Field_w(), this.Field_h() )

			if( this.store().container( id ) ) res.push(
				this.Field_direction(),
				this.Field_gap(),
				this.Field_padding(),
				this.Field_align(),
			)

			res.push( ... this.kind_rows( kind ) )
			res.push( this.Drop() )

			return res
		}

		/** Rows that only one kind of element has any use for. */
		kind_rows( kind: string ): readonly $mol_view[] {
			switch( kind ) {
				case 'text': return [
					this.Field_text(),
					this.Field_size(),
					this.Field_weight(),
					this.Field_text_align(),
					this.Field_color(),
				]
				case 'button': return [ this.Field_label(), this.Field_uri(), this.Field_color(), this.Field_back() ]
				case 'image': return [ this.Field_uri() ]
				case 'rect': return [ this.Field_back() ]
				case 'frame': return [ this.Field_back() ]
				case 'bui_button': return [ this.Field_label(), this.Field_variant() ]
				case 'bui_badge': return [ this.Field_label(), this.Field_tone() ]
				case 'bui_alert': return [ this.Field_label(), this.Field_note() ]
				case 'bui_field': return [ this.Field_hint() ]
				case 'bui_progress': return [ this.Field_value(), this.Field_max() ]
				case 'bui_tabs': return [ this.Field_options() ]
				case 'bui_avatar': return [ this.Field_uri() ]
			}
			return []
		}

		x( next?: number ) {
			return this.store().x( this.selected(), next )
		}

		y( next?: number ) {
			return this.store().y( this.selected(), next )
		}

		w( next?: number ) {
			return this.store().w( this.selected(), next )
		}

		h( next?: number ) {
			return this.store().h( this.selected(), next )
		}

		/**
		 * A frame without a direction places its kids by hand. The switch spells
		 * that out as `free` rather than as an empty option — an unlabelled button
		 * next to Row and Column reads like a bug.
		 */
		direction( next?: string ) {
			const store = this.store()
			const id = this.selected()
			if( next !== undefined ) store.direction( id, next === 'free' ? '' : next )
			return store.direction( id ) || 'free'
		}

		gap( next?: number ) {
			return this.store().gap( this.selected(), next )
		}

		padding( next?: number ) {
			return this.store().padding( this.selected(), next )
		}

		align( next?: string ) {
			return this.store().align( this.selected(), next )
		}

		text( next?: string ) {
			return this.store().text( this.selected(), next )
		}

		note( next?: string ) {
			return this.store().note( this.selected(), next )
		}

		uri( next?: string ) {
			return this.store().uri( this.selected(), next )
		}

		variant( next?: string ) {
			return this.store().variant( this.selected(), next )
		}

		options( next?: string ) {
			return this.store().options( this.selected(), next )
		}

		color( next?: string ) {
			return this.store().color( this.selected(), next )
		}

		back( next?: string ) {
			return this.store().back( this.selected(), next )
		}

		weight( next?: string ) {
			return this.store().weight( this.selected(), next )
		}

		text_align( next?: string ) {
			return this.store().text_align( this.selected(), next )
		}

		font_size( next?: number ) {
			return this.store().font_size( this.selected(), next )
		}

		progress( next?: number ) {
			return this.store().progress( this.selected(), next )
		}

		progress_max( next?: number ) {
			return this.store().progress_max( this.selected(), next )
		}

		@ $mol_action
		node_drop( next?: any ) {
			if( next === undefined ) return null
			const id = this.selected()
			if( !id ) return null
			this.store().node_drop( id )
			this.selected( '' )
			return null
		}

	}

}
