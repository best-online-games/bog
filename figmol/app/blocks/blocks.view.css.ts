namespace $ {

	$mol_style_define( $bog_figmol_app_blocks, {

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

		Sections_head: {
			flex: {
				shrink: 0,
			},
			margin: {
				top: $mol_gap.text,
			},
			color: $mol_theme.shade,
			font: {
				size: '0.6875rem',
				weight: 'bold',
			},
			textTransform: 'uppercase',
			letterSpacing: '0.05em',
		},

		/** Two blocks per line: the names are short and the panel is narrow. */
		Kinds: {
			display: 'grid',
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
			gap: '1px',
		},

		Sections: {
			display: 'grid',
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
			gap: '1px',
		},

		'@': {

			/**
			 * The page is not there yet. Dimmed rather than replaced by a spinner:
			 * the palette is the same palette a moment later, and swapping it out
			 * would make the panel jump for nothing.
			 */
			figmol_wait: {
				true: {
					opacity: 0.5,
				},
			},

		},

	} )

}
