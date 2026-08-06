namespace $ {

	$mol_style_define( $bog_figmol_app, {

		flex: {
			direction: 'column',
			grow: 1,
		},
		height: '100vh',
		overflow: 'hidden',
		background: {
			color: $mol_theme.back,
		},

		Head: {
			flex: {
				direction: 'row',
				shrink: 0,
			},
			align: {
				items: 'center',
			},
			gap: $mol_gap.space,
			padding: {
				top: $mol_gap.text,
				bottom: $mol_gap.text,
				left: $mol_gap.block,
				right: $mol_gap.block,
			},
			background: {
				color: $mol_theme.card,
			},
			border: {
				bottom: {
					width: '1px',
					style: 'solid',
					color: $mol_theme.line,
				},
			},
		},

		Title: {
			flex: {
				grow: 1,
			},
			font: {
				size: '1rem',
				weight: 'bold',
			},
			margin: 0,
		},

		/**
		 * Shrinking is spelled out because `$mol_view` ships with `flex-shrink: 0`:
		 * a long layer tree would otherwise make this row taller than the window,
		 * and the header would scroll out of a box nobody can scroll back.
		 */
		Editor: {
			flex: {
				direction: 'row',
				grow: 1,
				shrink: 1,
			},
			minHeight: 0,
		},

		/** Says why half the editor is missing, so nobody looks for the palette. */
		Readonly: {
			flex: {
				shrink: 0,
			},
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			background: {
				color: $mol_theme.back,
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.line,
				radius: $mol_gap.round,
			},
			color: $mol_theme.shade,
			font: {
				size: '0.75rem',
			},
			whiteSpace: 'nowrap',
		},

		Mine: {
			flex: {
				shrink: 0,
			},
			whiteSpace: 'nowrap',
		},

		/**
		 * Takes the right rail over from the inspector. Same width and same border,
		 * so opening it moves nothing else on the screen.
		 */
		Publish: {
			flex: {
				direction: 'column',
				shrink: 0,
			},
			width: '20rem',
			gap: $mol_gap.block,
			padding: $mol_gap.block,
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
		},

	} )

}
