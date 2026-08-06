namespace $ {

	$mol_style_define( $bog_figmol_app_canvas, {

		flex: {
			grow: 1,
		},
		position: 'relative',
		overflow: 'hidden',
		outline: 'none',
		userSelect: 'none',
		touchAction: 'none',
		background: {
			color: $mol_theme.back,
		},

		World: {
			display: 'block',
			position: 'absolute',
			top: 0,
			left: 0,
			transformOrigin: '0 0',
		},

		Sheet: {
			display: 'block',
			position: 'relative',
			background: {
				color: '#ffffff',
			},
			boxShadow: '0 0.5rem 2rem #00000040',
		},

		'@': {
			figmol_armed: {
				true: {
					cursor: 'crosshair',
				},
			},
		},

	} )

}
