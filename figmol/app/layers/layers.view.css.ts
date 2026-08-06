namespace $ {

	$mol_style_define( $bog_figmol_app_layers, {

		flex: {
			direction: 'column',
			grow: 1,
			shrink: 1,
		},
		minHeight: 0,
		gap: $mol_gap.text,
		padding: $mol_gap.text,

		Head: {
			flex: {
				shrink: 0,
			},
			color: $mol_theme.shade,
			font: {
				size: '0.6875rem',
				weight: 'bold',
			},
			textTransform: 'uppercase',
			letterSpacing: '0.05em',
		},

		List: {
			flex: {
				grow: 1,
			},
			minHeight: 0,
		},

		Tree: {
			flex: {
				direction: 'column',
			},
			gap: '1px',
		},

	} )

}
