namespace $ {

	/** One page of a site. `Root` holds the frame every canvas element lives in. */
	export class $bog_figmol_schema_page extends $giper_baza_entity.with({

		/** URL segment. Empty string is the index page. */
		Slug: $giper_baza_atom_text,

		Root: $giper_baza_atom_link.to( ()=> $bog_figmol_schema_node ),

	}) {}

}
