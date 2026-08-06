namespace $ {

	$mol_style_define( $bog_figmol_deploy, {

		Note: {
			padding: $mol_gap.block,
			color: $mol_theme.shade,
			maxWidth: '34rem',
		},

		Listing_title: {
			padding: $mol_gap.block,
			font: {
				weight: 'bold',
			},
		},

		Listing: {
			padding: {
				top: 0,
				bottom: $mol_gap.block,
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
			gap: 0,
		},

		File: {
			gap: $mol_gap.text,
			maxWidth: '34rem',
			font: {
				family: 'monospace',
			},
		},

		File_name: {
			flex: {
				grow: 1,
			},
		},

		File_size: {
			color: $mol_theme.shade,
		},

	} )

}
