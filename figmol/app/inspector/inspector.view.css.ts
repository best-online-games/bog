namespace $ {

	$mol_style_define( $bog_figmol_app_inspector, {

		flex: {
			direction: 'column',
			shrink: 0,
		},
		gap: $mol_gap.text,
		padding: $mol_gap.block,
		width: '16rem',
		overflow: {
			x: 'hidden',
			y: 'auto',
		},
		background: {
			color: $mol_theme.card,
		},
		border: {
			left: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		Head: {
			flex: {
				shrink: 0,
			},
			font: {
				size: '0.875rem',
				weight: 'bold',
			},
		},

		Text: {
			minHeight: '4rem',
		},

		Drop: {
			flex: {
				shrink: 0,
			},
			gap: $mol_gap.text,
			justify: {
				content: 'flex-start',
			},
			margin: {
				top: $mol_gap.text,
			},
			color: '#ef4444',
		},

	} )

}
