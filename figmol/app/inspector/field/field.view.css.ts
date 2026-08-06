namespace $ {

	/**
	 * Caption on the left, control on the right — one line per property.
	 *
	 * The panel is narrow by design, so every control in it is told to give way:
	 * a flex child refuses to go below its content width unless `minWidth` says
	 * otherwise, and one field that will not shrink pushes the whole panel into
	 * a horizontal scroll.
	 */
	$mol_style_define( $bog_figmol_app_inspector_field, {

		flex: {
			direction: 'row',
			shrink: 0,
			wrap: 'wrap',
		},
		align: {
			items: 'center',
		},
		gap: $mol_gap.text,

		Title: {
			flex: {
				shrink: 0,
			},
			width: '5rem',
			color: $mol_theme.shade,
			font: {
				size: '0.75rem',
			},
		},

		Content: {
			flex: {
				grow: 1,
				basis: '6rem',
			},
			minWidth: 0,
			gap: $mol_gap.text,
		},

		$mol_string: {
			minWidth: 0,
		},

		$mol_check_list: {
			flex: {
				wrap: 'wrap',
			},
			gap: '0.125rem',
		},

		$mol_check: {
			padding: {
				top: '0.125rem',
				bottom: '0.125rem',
				left: '0.375rem',
				right: '0.375rem',
			},
			font: {
				size: '0.75rem',
			},
		},

	} )

}
