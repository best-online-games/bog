namespace $ {

	/**
	 * Root record of the user's own home Land — the one place the editor can
	 * reach without being told anything.
	 *
	 * It holds a link and nothing else. The site itself lives in a Land of its
	 * own, which is what makes it shareable: handing somebody the link of that
	 * Land shares the project, while the home Land stays private. Keeping the
	 * site here instead would have meant sharing the account.
	 */
	export class $bog_figmol_schema_home extends $giper_baza_dict.with({

		/** The site this user edits. Created on demand, see `$bog_figmol_store`. */
		Site: $giper_baza_atom_link.to( ()=> $bog_figmol_schema_site ),

	}) {}

}
