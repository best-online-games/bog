namespace $.$$ {

	/**
	 * Left rail of the editor.
	 *
	 * Everything here reads the document, and only the palette writes into it —
	 * so a site opened by somebody else's link keeps the page list and the layer
	 * tree, and simply does without the middle panel.
	 */
	export class $bog_figmol_app_side extends $.$bog_figmol_app_side {

		@ $mol_mem
		override panels(): readonly $mol_view[] {
			if( !this.editable() ) return [ this.Pages(), this.Layers() ]
			return [ this.Pages(), this.Blocks(), this.Layers() ]
		}

	}

}
