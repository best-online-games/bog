namespace $.$$ {

	/**
	 * The pages of the site, and the fields of whichever one is open.
	 *
	 * Which page is current lives in the store — the canvas reads it to find its
	 * root frame — while the selected element lives in the app, and switching
	 * pages has to clear it: a node of the page just left would still be shown by
	 * the inspector and would still answer to Delete.
	 */
	export class $bog_figmol_app_pages extends $.$bog_figmol_app_pages {

		/** Fields and buttons are for whoever may write; the list is for everybody. */
		@ $mol_mem
		override panels(): readonly $mol_view[] {
			const res = [ this.Head(), this.List() ] as $mol_view[]
			if( this.editable() ) res.push( this.Field_title(), this.Field_slug(), this.Drop() )
			return res
		}

		@ $mol_mem
		override head_content(): readonly $mol_view[] {
			return this.editable() ? [ this.Caption(), this.Add() ] : [ this.Caption() ]
		}

		@ $mol_mem
		rows(): readonly $mol_view[] {
			return this.store().page_ids().map( id => this.Row( id ) )
		}

		/** A page with no title yet is still worth a line in the list. */
		page_title( id: string ) {
			return this.store().page_title( id ) || this.page_default()
		}

		@ $mol_mem_key
		page_active( id: string ) {
			return this.store().page_current() === id
		}

		@ $mol_action
		page_click( id: string, next?: any ) {
			if( next === undefined ) return null
			this.store().page_id( id )
			this.selected( '' )
			return null
		}

		/**
		 * A fresh page is numbered rather than named: a title typed into a dialog
		 * that has not been drawn yet is worth less than a title typed into the
		 * field right below the list.
		 */
		@ $mol_action
		page_add( next?: any ) {

			if( next === undefined ) return null

			const store = this.store()
			const count = store.page_ids().length + 1
			const id = store.page_add( this.page_default() + ' ' + count, 'page' + count )

			if( id ) {
				store.page_id( id )
				this.selected( '' )
			}

			return null
		}

		current_title( next?: string ) {
			return this.store().page_title( this.store().page_current(), next )
		}

		current_slug( next?: string ) {
			return this.store().page_slug( this.store().page_current(), next )
		}

		droppable() {
			return this.store().page_ids().length > 1
		}

		@ $mol_action
		page_drop( next?: any ) {
			if( next === undefined ) return null
			this.store().page_drop( this.store().page_current() )
			this.selected( '' )
			return null
		}

	}

}
