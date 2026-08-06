namespace $.$$ {

	/** Distance kept between one dropped block and the next. */
	const figmol_blocks_step = 40

	/** How close two blocks have to be before the second one steps aside. */
	const figmol_blocks_near = 12

	/** Nobody stacks twenty blocks on one spot, and the walk has to end somewhere. */
	const figmol_blocks_tries = 20

	/**
	 * The palette of ready made pieces: single blocks of the component library
	 * and whole sections built out of them.
	 *
	 * Neither arms a tool the way the primitives on the left do. A section is
	 * several hundred pixels tall and a card is a box with a look of its own —
	 * asking where to put those is a step nobody needs, so they land in the
	 * middle of what the user is looking at and get selected.
	 *
	 * Until the page has a frame to put anything into, the rows are disabled
	 * rather than silently doing nothing: reaching the Land takes a moment on a
	 * cold load, and a click that has no effect reads as a broken palette.
	 */
	export class $bog_figmol_app_blocks extends $.$bog_figmol_app_blocks {

		ready() {
			return this.store().ready()
		}

		override waiting() {
			return !this.ready()
		}

		@ $mol_mem
		kind_rows(): readonly $mol_view[] {
			return $bog_figmol_blocks.kinds.map( kind => this.Kind( kind ) )
		}

		kind_title( kind: string ) {
			return $bog_figmol_blocks.title( kind )
		}

		@ $mol_mem
		section_rows(): readonly $mol_view[] {
			return $bog_figmol_blocks.sections.map( id => this.Section( id ) )
		}

		section_title( id: string ) {
			return $bog_figmol_blocks.section_title( id )
		}

		/**
		 * Where a piece lands: centred on the viewport, then stepped aside while
		 * something already sits there — dropping three cards in a row should not
		 * pile them up on one another.
		 *
		 * Meaningless when the root frame lays its children out itself: the drop
		 * simply goes last, which is the same place by a different road.
		 */
		place( spec: $bog_figmol_blocks_spec | null ): readonly number[] {

			const spot = this.spot()

			let x = Math.max( 0, Math.round( ( spot[ 0 ] ?? 0 ) - ( spec?.w ?? 160 ) / 2 ) )
			let y = Math.max( 0, Math.round( ( spot[ 1 ] ?? 0 ) - ( spec?.h ?? 48 ) / 2 ) )

			for( let guard = 0; guard < figmol_blocks_tries && this.taken( x, y ); ++guard ) {
				x += figmol_blocks_step
				y += figmol_blocks_step
			}

			return [ x, y ]
		}

		/** Whether something on the page already starts at this very spot. */
		taken( x: number, y: number ) {

			const store = this.store()

			return store.kids( store.root_id() ).some( id => {
				const rect = store.rect( id )
				return Math.abs( rect[ 0 ] - x ) < figmol_blocks_near
					&& Math.abs( rect[ 1 ] - y ) < figmol_blocks_near
			} )
		}

		@ $mol_action
		kind_click( kind: string, next?: any ) {

			if( next === undefined ) return null

			const store = this.store()
			const at = this.place( $bog_figmol_blocks.spec( kind, '' ) )

			const id = store.node_add( kind, store.root_id(), at[ 0 ], at[ 1 ], '' )
			if( id ) this.selected( id )

			return null
		}

		@ $mol_action
		section_click( section: string, next?: any ) {

			if( next === undefined ) return null

			const store = this.store()
			const at = this.place( $bog_figmol_blocks.section( section ) )

			const id = store.section_add( section, store.root_id(), at[ 0 ], at[ 1 ] )
			if( id ) this.selected( id )

			return null
		}

	}

}
