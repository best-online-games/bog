namespace $.$$ {

	/**
	 * Tool palette. Picking a tool only arms it — the element itself appears on
	 * the next click on the canvas, which is what `$bog_figmol_app_canvas` does
	 * with the shared `tool` prop.
	 */
	export class $bog_figmol_app_tools extends $.$bog_figmol_app_tools {

		@ $mol_mem
		tool_buttons() {
			return this.tools().map( id => this.Tool( id ) )
		}

		tool_id( id: string ) {
			return id
		}

		@ $mol_mem_key
		tool_active( id: string ) {
			return this.tool() === id
		}

		tool_hint( id: string ) {
			switch( id ) {
				case 'select': return this.hint_select()
				case 'text': return this.hint_text()
				case 'image': return this.hint_image()
				case 'button': return this.hint_button()
				case 'rect': return this.hint_rect()
				case 'frame': return this.hint_frame()
			}
			return id
		}

		tool_content( id: string ): readonly $mol_view[] {
			switch( id ) {
				case 'select': return [ this.Icon_select() ]
				case 'text': return [ this.Icon_text() ]
				case 'image': return [ this.Icon_image() ]
				case 'button': return [ this.Icon_button() ]
				case 'rect': return [ this.Icon_rect() ]
				case 'frame': return [ this.Icon_frame() ]
			}
			return []
		}

		@ $mol_action
		tool_click( id: string, next?: any ) {
			if( next === undefined ) return null
			this.tool( id )
			return null
		}

	}

}
