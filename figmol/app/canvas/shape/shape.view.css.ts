namespace $ {

	/** Corner grip. Sticks out of the shape, hence no clipping on the shape itself. */
	/**
	 * A library block fills the box it was drawn as, and takes no clicks: a press
	 * anywhere on it has to reach the canvas, which is what selects and drags the
	 * element. The one exception is the card, whose children are shapes of their
	 * own and need their own presses.
	 */
	const figmol_block: $mol_style_properties = {
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		margin: 0,
		pointerEvents: 'none',
	}

	const figmol_handle: $mol_style_properties = {
		position: 'absolute',
		width: '0.5rem',
		height: '0.5rem',
		minWidth: '0.5rem',
		minHeight: '0.5rem',
		boxSizing: 'border-box',
		background: {
			color: '#ffffff',
		},
		border: {
			width: '1px',
			style: 'solid',
			color: '#2f7ff7',
		},
		borderRadius: '2px',
		zIndex: 3,
	}

	$mol_style_define( $bog_figmol_app_canvas_shape, {

		position: 'absolute',
		boxSizing: 'border-box',
		align: {
			items: 'center',
		},
		padding: 0,
		cursor: 'move',
		color: '#111827',
		font: {
			family: 'sans-serif',
			size: '1rem',
		},

		/**
		 * A caption has to be allowed to wrap inside the shape rather than run
		 * out of it, and that takes both halves: `$mol_view` ships with
		 * `flex-shrink: 0`, and a flex item will not go below its content width
		 * without `minWidth` set to zero.
		 */
		Label: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			minWidth: 0,
			overflow: 'hidden',
			whiteSpace: 'pre-wrap',
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			pointerEvents: 'none',
		},

		Picture: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			pointerEvents: 'none',
		},

		/**
		 * Typing happens in place, so the field borrows the look of the element it
		 * edits — colour, size and family all inherited. Anything of its own here
		 * would make the caption jump the moment editing ends.
		 */
		Editor: {
			flex: {
				grow: 1,
			},
			width: '100%',
			height: '100%',
			boxSizing: 'border-box',
			padding: {
				top: '0.25rem',
				bottom: '0.25rem',
				left: '0.5rem',
				right: '0.5rem',
			},
			background: {
				color: 'transparent',
			},
			color: 'inherit',
			fontSize: 'inherit',
			fontFamily: 'inherit',
			textAlign: 'inherit',
			borderRadius: '4px',
			boxShadow: '0 0 0 2px #2f7ff7',
			cursor: 'text',
			zIndex: 4,
		},

		/**
		 * Left unpositioned on purpose: a freely placed child is absolute, and
		 * with the card out of the way it lands against the shape itself — the
		 * same box the drag code measures.
		 */
		Bui_card: {
			...figmol_block,
			pointerEvents: 'auto',
			position: 'static',
			overflow: 'hidden',
		},

		Bui_button: { ...figmol_block },
		Bui_badge: { ...figmol_block },
		Bui_alert: { ...figmol_block, maxHeight: 'none' },
		Bui_field: { ...figmol_block },
		Bui_progress: { ...figmol_block },
		Bui_tabs: { ...figmol_block, maxWidth: 'none' },
		Bui_avatar: { ...figmol_block },

		Avatar_stub: {
			...figmol_block,
			align: {
				items: 'center',
			},
			justify: {
				content: 'center',
			},
			background: {
				color: '#e5e7eb',
			},
			color: '#9ca3af',
			borderRadius: '50%',
			overflow: 'hidden',
		},

		Avatar_icon: {
			width: '60%',
			height: '60%',
		},

		Handle_nw: {
			...figmol_handle,
			top: '-0.25rem',
			left: '-0.25rem',
			cursor: 'nwse-resize',
		},

		Handle_ne: {
			...figmol_handle,
			top: '-0.25rem',
			right: '-0.25rem',
			cursor: 'nesw-resize',
		},

		Handle_sw: {
			...figmol_handle,
			bottom: '-0.25rem',
			left: '-0.25rem',
			cursor: 'nesw-resize',
		},

		Handle_se: {
			...figmol_handle,
			bottom: '-0.25rem',
			right: '-0.25rem',
			cursor: 'nwse-resize',
		},

		'@': {

			figmol_kind: {

				rect: {
					background: {
						color: '#d1d5db',
					},
					borderRadius: '4px',
				},

				/**
				 * Outlined rather than filled: a frame is a box the layout lives
				 * in, and a published page paints nothing there unless the
				 * inspector says so. Filling it here would make a frame dropped
				 * on a dark section look like a hole in it.
				 */
				frame: {
					background: {
						color: 'transparent',
					},
					border: {
						width: '1px',
						style: 'dashed',
						color: '#9ca3af',
					},
				},

				text: {
					background: {
						color: 'transparent',
					},
				},

				button: {
					background: {
						color: '#2f7ff7',
					},
					color: '#ffffff',
					borderRadius: '6px',
					textAlign: 'center',
				},

				image: {
					background: {
						color: '#e5e7eb',
					},
					borderRadius: '4px',
				},

			},

			/**
			 * Laid out by the parent instead of by its own coordinates. Shrinking is
			 * off so a row of elements keeps the sizes the inspector shows.
			 */
			figmol_flow: {
				true: {
					position: 'relative',
					flex: {
						shrink: 0,
					},
				},
			},

			figmol_selected: {
				true: {
					zIndex: 2,
					boxShadow: '0 0 0 2px #2f7ff7',
				},
			},

			/** Frame the drag is aiming at. Comes last, so it wins over the frame look. */
			figmol_dropping: {
				true: {
					border: {
						width: '1px',
						style: 'dashed',
						color: '#2f7ff7',
					},
					background: {
						color: '#2f7ff714',
					},
				},
			},

		},

	} )

}
