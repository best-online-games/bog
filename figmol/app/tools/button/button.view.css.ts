namespace $ {

	$mol_style_define( $bog_figmol_app_tools_button, {

		flex: {
			shrink: 0,
		},
		justify: {
			content: 'center',
		},
		padding: $mol_gap.text,
		border: {
			radius: $mol_gap.round,
		},

		'@': {
			figmol_active: {
				true: {
					background: {
						color: $mol_theme.current,
					},
					color: $mol_theme.focus,
				},
			},
		},

	} )

}
