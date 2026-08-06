namespace $ {

	$mol_style_define( $bog_figmol_app_row, {

		flex: {
			shrink: 0,
		},
		justify: {
			content: 'flex-start',
		},
		textAlign: 'left',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		padding: {
			top: '0.125rem',
			bottom: '0.125rem',
			left: $mol_gap.text,
			right: $mol_gap.text,
		},
		border: {
			radius: $mol_gap.round,
		},
		font: {
			size: '0.8125rem',
		},

		/**
		 * The current row takes the accent as its background, and the page colour
		 * as its text. `$mol_theme.focus` — what a pressed control uses — is the
		 * complement of `current` and would land orange on green here.
		 */
		'@': {
			figmol_active: {
				true: {
					background: {
						color: $mol_theme.current,
					},
					color: $mol_theme.back,
				},
			},
		},

	} )

}
