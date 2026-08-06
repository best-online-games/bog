namespace $ {

	$mol_style_define( $bog_figmol_app_pages, {

		flex: {
			direction: 'column',
			shrink: 0,
		},
		gap: $mol_gap.text,
		padding: $mol_gap.text,
		border: {
			bottom: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		Head: {
			flex: {
				direction: 'row',
				shrink: 0,
			},
			align: {
				items: 'center',
			},
		},

		Caption: {
			flex: {
				grow: 1,
			},
			color: $mol_theme.shade,
			font: {
				size: '0.6875rem',
				weight: 'bold',
			},
			textTransform: 'uppercase',
			letterSpacing: '0.05em',
		},

		Add: {
			flex: {
				shrink: 0,
			},
			padding: 0,
			minHeight: '1.5rem',
		},

		List: {
			flex: {
				direction: 'column',
				shrink: 0,
			},
			gap: '1px',
		},

		Drop: {
			flex: {
				shrink: 0,
			},
			gap: $mol_gap.text,
			justify: {
				content: 'flex-start',
			},
			font: {
				size: '0.8125rem',
			},
			color: '#ef4444',
		},

	} )

}
