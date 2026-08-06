namespace $.$$ {

	/**
	 * What the editor shows before there is anything to edit.
	 *
	 * The site is not created behind the user's back, and the reason is not
	 * politeness: grabbing a Land runs Proof-of-Work, and the task that computes
	 * it is remembered by the fiber that asked for it. A press of this button is
	 * one such fiber, and it keeps its half-done work when the Baza suspends it.
	 * The same call from a render would restart the proof on every retry and
	 * never get to the end of it.
	 */
	export class $bog_figmol_app_start extends $.$bog_figmol_app_start {

		@ $mol_action
		make( next?: any ) {
			if( next === undefined ) return null
			this.store().site_make( this.site_default(), this.page_default() )
			return null
		}

	}

}
