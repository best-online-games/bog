namespace $.$$ {

	$mol_style_define( $bog_effects, {
		Intro: {
			flex: { direction: 'column' },
			gap: $mol_gap.space,
			maxWidth: '50rem',
			width: '100%',
			margin: { left: 'auto', right: 'auto', top: $mol_gap.block, bottom: 0 },
			padding: $mol_gap.block,
			color: $mol_theme.shade,
		},
		Links: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: $mol_gap.block,
		},
	} )

	$mol_style_define( $bog_effects_card, {
		flex: { direction: 'column' },
		gap: $mol_gap.space,
		maxWidth: '50rem',
		width: '100%',
		margin: { left: 'auto', right: 'auto', top: $mol_gap.block, bottom: 0 },
		padding: $mol_gap.block,
		background: { color: $mol_theme.card },
		border: { radius: $mol_gap.round },

		Title: {
			font: { weight: 'bold', size: '1.125rem' },
		},
		Descr: {
			color: $mol_theme.shade,
			font: { size: '0.875rem' },
		},
		Content: {
			flex: { direction: 'column' },
			gap: $mol_gap.space,
		},
	} )

}
