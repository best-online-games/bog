namespace $ {

	$mol_style_define( $bog_figmol_app_start, {

		flex: {
			direction: 'column',
			grow: 1,
		},
		align: {
			items: 'center',
		},
		justify: {
			content: 'center',
		},
		gap: $mol_gap.block,
		padding: $mol_gap.block,
		textAlign: 'center',

		Title: {
			margin: 0,
			font: {
				size: '1.25rem',
				weight: 'bold',
			},
		},

		Hint: {
			maxWidth: '28rem',
			color: $mol_theme.shade,
		},

		Make: {
			flex: {
				grow: 0,
			},
		},

	} )

}
