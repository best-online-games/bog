namespace $.$$ {

	/** Longest caption a row shows before it starts cutting one. */
	const figmol_layers_snippet = 22

	/**
	 * The nodes of the current page as a tree, parents before their children.
	 *
	 * The order and the depth both come from the store, which already walks the
	 * tree for the drag code, so a row is a name and an indent and nothing more.
	 * Selection is shared with the canvas in both directions: a click here picks
	 * the element, and picking it on the sheet lights the row up.
	 *
	 * Reordering is left to the canvas. Dragging rows would be a second way to do
	 * what dropping a shape into a frame already does, with its own bugs.
	 */
	export class $bog_figmol_app_layers extends $.$bog_figmol_app_layers {

		@ $mol_mem
		rows(): readonly $mol_view[] {
			return this.store().node_ids().map( id => this.Row( id ) )
		}

		/** Kind of the element, plus the beginning of its caption when it has one. */
		@ $mol_mem_key
		row_title( id: string ) {

			const store = this.store()
			const name = $bog_figmol_blocks.title( store.kind( id ) )
			const text = store.text( id ).replace( /\s+/g, ' ' ).trim()

			if( !text ) return name

			const snippet = text.length > figmol_layers_snippet
				? text.slice( 0, figmol_layers_snippet ).trimEnd() + '…'
				: text

			return name + ' · ' + snippet
		}

		@ $mol_mem_key
		row_active( id: string ) {
			return this.selected() === id
		}

		@ $mol_mem_key
		row_indent( id: string ) {
			return ( 0.25 + this.store().depth( id ) * 0.75 ) + 'rem'
		}

		@ $mol_action
		row_click( id: string, next?: any ) {
			if( next === undefined ) return null
			this.selected( id )
			return null
		}

	}

}
