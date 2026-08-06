namespace $ {

	/**
	 * One element on the canvas.
	 *
	 * Geometry is stored in sheet pixels, not in screen ones: pan and zoom are
	 * a property of the viewport, never of the document, so the same page looks
	 * identical on every device. `X` and `Y` are relative to the parent frame,
	 * and they are ignored outright once that frame has a `Direction` — an auto
	 * layout places its kids itself, in the order they sit in `Kids`.
	 *
	 * Layout fields matter only for `frame` kinds — a frame maps one to one onto
	 * a flex container, which is what makes the exported markup responsive.
	 */
	export class $bog_figmol_schema_node extends $giper_baza_dict.with({

		/**
		 * `text` | `image` | `button` | `rect` | `frame`, or one of the `bui_`
		 * blocks borrowed from the component library — see `$bog_figmol_blocks`.
		 */
		Kind: $giper_baza_atom_text,

		/**
		 * Everything kind specific, all of it stringly typed:
		 *
		 * - `text` — caption of anything that shows one
		 * - `note` — second line of an alert block
		 * - `uri` — source of an `image`, destination of a `button`
		 * - `color` — css color of the text, empty means inherit
		 * - `back` — css background color, empty means none
		 * - `size` — font size in pixels, empty means inherit
		 * - `weight` — `bold`, empty means normal
		 * - `align` — `center` or `right`, empty means left
		 * - `variant` — look of a block that has several
		 * - `value`, `max` — reading of a progress block
		 * - `options` — captions of a tabs block, separated by `|`
		 */
		Props: $giper_baza_dict_to( $giper_baza_atom_text ),

		X: $giper_baza_atom_real,
		Y: $giper_baza_atom_real,
		W: $giper_baza_atom_real,
		H: $giper_baza_atom_real,

		/** `row` | `column`. Empty means free placement of children. */
		Direction: $giper_baza_atom_text,
		Gap: $giper_baza_atom_real,
		Padding: $giper_baza_atom_real,
		/** `start` | `center` | `end` | `stretch` */
		Align: $giper_baza_atom_text,

		Kids: $giper_baza_list_link.to( ()=> $bog_figmol_schema_node ),

	}) {}

}
