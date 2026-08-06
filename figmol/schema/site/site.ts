namespace $ {

	/**
	 * A whole site built in the editor.
	 *
	 * It is the root pawn of a Land grabbed just for it, reachable from
	 * `$bog_figmol_schema_home`. Pages and every node of every page are plain
	 * pawns inside that same Land, so opening a project costs one Land sync and
	 * sharing it later is a matter of passing the link on.
	 */
	export class $bog_figmol_schema_site extends $giper_baza_entity.with({

		/** Pages in navigation order. The first one is the entry point. */
		Pages: $giper_baza_list_link.to( ()=> $bog_figmol_schema_page ),

		/** Theme tokens by name: `accent`, `back`, `font`… Plain strings for now. */
		Theme: $giper_baza_dict_to( $giper_baza_atom_text ),

	}) {}

}
