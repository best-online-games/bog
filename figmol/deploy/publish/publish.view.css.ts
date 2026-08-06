namespace $ {

	$mol_style_define( $bog_figmol_deploy_publish, {

		flex: {
			direction: 'column',
		},
		gap: $mol_gap.block,
		padding: $mol_gap.block,
		maxWidth: '34rem',

		Fields: {
			gap: $mol_gap.text,
		},

		Token_hint: {
			gap: $mol_gap.text,
			flex: {
				wrap: 'wrap',
			},
			align: {
				items: 'baseline',
			},
			color: $mol_theme.shade,
			font: {
				size: '0.85rem',
			},
		},

		Name_hint: {
			color: $mol_theme.shade,
			font: {
				size: '0.85rem',
			},
		},

		Buttons: {
			gap: $mol_gap.space,
			flex: {
				wrap: 'wrap',
			},
		},

		/* An empty element means «nothing to report», so it takes up no room. */
		Conflict: {
			padding: $mol_gap.text,
			background: {
				color: $mol_theme.card,
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			':empty': {
				display: 'none',
			},
		},

		Problem: {
			padding: $mol_gap.text,
			border: {
				radius: $mol_gap.round,
			},
			color: '#ffffff',
			background: {
				color: '#c2263a',
			},
			':empty': {
				display: 'none',
			},
		},

		Steps: {
			gap: 0,
		},

		Step: {
			gap: $mol_gap.text,
			align: {
				items: 'baseline',
			},
			padding: {
				top: '0.15rem',
				bottom: '0.15rem',
				left: 0,
				right: 0,
			},
			'@': {
				bog_figmol_deploy_state: {
					wait: {
						opacity: 0.45,
					},
					/* The same keyframes $mol uses for a suspended view. */
					work: {
						animation: {
							name: 'mol_view_wait',
							duration: '1s',
							iterationCount: 'infinite',
						},
					},
					fail: {
						color: '#c2263a',
					},
				},
			},
		},

		Step_mark: {
			minWidth: '1.25rem',
			textAlign: 'center',
		},

		Step_note: {
			color: $mol_theme.shade,
			font: {
				size: '0.85rem',
			},
		},

		Links: {
			gap: $mol_gap.text,
			flex: {
				wrap: 'wrap',
			},
		},

		'@media': {
			'(prefers-reduced-motion: reduce)': {
				Step: {
					animation: {
						name: 'none',
					},
				},
			},
		},

	} )

}
