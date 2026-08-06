namespace $ {

	/**
	 * Plain description of a node to create, mirroring the fields of the schema.
	 *
	 * A palette entry and a whole section template are the same shape, which is
	 * what lets the store build both through one recursive write.
	 */
	export type $bog_figmol_blocks_spec = {
		readonly kind: string
		readonly x?: number
		readonly y?: number
		readonly w?: number
		readonly h?: number
		/** `row` | `column`. Empty means free placement of children. */
		readonly direction?: string
		readonly gap?: number
		readonly padding?: number
		/** `start` | `center` | `end` | `stretch` */
		readonly align?: string
		readonly props?: Readonly< Record< string, string > >
		readonly kids?: readonly $bog_figmol_blocks_spec[]
	}

	/** Size in sheet pixels a freshly placed element gets. */
	const figmol_blocks_size: Readonly< Record< string, readonly [ number, number ] > > = {
		text: [ 240, 40 ],
		image: [ 240, 160 ],
		button: [ 160, 44 ],
		rect: [ 220, 140 ],
		frame: [ 480, 320 ],
		bui_card: [ 320, 200 ],
		bui_button: [ 160, 40 ],
		bui_badge: [ 104, 26 ],
		bui_alert: [ 360, 96 ],
		bui_field: [ 240, 40 ],
		bui_progress: [ 240, 12 ],
		bui_tabs: [ 320, 44 ],
		bui_avatar: [ 48, 48 ],
	}

	const figmol_blocks_size_fallback = [ 160, 48 ] as const

	/**
	 * Layout and properties a fresh element starts with.
	 *
	 * The sample captions are deliberate: an empty card block on the canvas looks
	 * like a bug, and something readable is easier to edit than to invent.
	 */
	const figmol_blocks_preset: Readonly< Record< string, Omit< $bog_figmol_blocks_spec, 'kind' > > > = {
		frame: { direction: 'column', gap: 16, padding: 24, align: 'stretch' },
		bui_card: { direction: 'column', gap: 10, padding: 20, align: 'stretch' },
		bui_button: { props: { text: 'Button', variant: 'default' } },
		bui_badge: { props: { text: 'Badge', variant: 'default' } },
		bui_alert: { props: { text: 'Heads up', note: 'Something worth reading before you go on.' } },
		bui_field: { props: { text: 'you@example.com' } },
		bui_progress: { props: { value: '64', max: '100' } },
		bui_tabs: { props: { options: 'Overview | Activity | Settings' } },
	}

	/** Human name of a kind, used by the layers tree and the inspector. */
	const figmol_blocks_title: Readonly< Record< string, string > > = {
		text: 'Text',
		image: 'Image',
		button: 'Button',
		rect: 'Rectangle',
		frame: 'Frame',
		bui_card: 'Card',
		bui_button: 'Button',
		bui_badge: 'Badge',
		bui_alert: 'Alert',
		bui_field: 'Input',
		bui_progress: 'Progress',
		bui_tabs: 'Tabs',
		bui_avatar: 'Avatar',
	}

	/** Kinds whose children are drawn inside them rather than beside them. */
	const figmol_blocks_container = [ 'frame', 'bui_card' ]

	const figmol_blocks_feature = ( title: string, text: string ): $bog_figmol_blocks_spec => ({
		kind: 'bui_card',
		w: 320, h: 200,
		direction: 'column', gap: 10, padding: 24, align: 'stretch',
		kids: [
			{ kind: 'text', w: 260, h: 28, props: { text: title, size: '20', weight: 'bold' } },
			{ kind: 'text', w: 260, h: 96, props: { text, size: '15', color: '#475569' } },
		],
	})

	/** Aligned to the start, or the badge at the top would stretch across the card. */
	const figmol_blocks_plan = ( name: string, price: string, note: string ): $bog_figmol_blocks_spec => ({
		kind: 'bui_card',
		w: 300, h: 292,
		direction: 'column', gap: 12, padding: 24, align: 'start',
		kids: [
			{ kind: 'bui_badge', w: 104, h: 26, props: { text: name, variant: 'default' } },
			{ kind: 'text', w: 240, h: 48, props: { text: price, size: '36', weight: 'bold' } },
			{ kind: 'text', w: 240, h: 64, props: { text: note, size: '15', color: '#475569' } },
			{ kind: 'button', w: 240, h: 44, props: { text: 'Choose', uri: '#' } },
		],
	})

	const figmol_blocks_link = ( text: string ): $bog_figmol_blocks_spec => ({
		kind: 'text',
		w: 110, h: 24,
		props: { text, size: '14', color: '#e2e8f0' },
	})

	/**
	 * Ready made pieces of a page.
	 *
	 * A section is a factory rather than a kind of its own: what it drops on the
	 * canvas is ordinary frames, texts and blocks, so it can be taken apart with
	 * the same tools as anything drawn by hand and needs nothing special from the
	 * generator.
	 */
	const figmol_blocks_sections: Readonly< Record< string, $bog_figmol_blocks_spec > > = {

		hero: {
			kind: 'frame',
			w: 1040, h: 392,
			direction: 'column', gap: 20, padding: 56, align: 'center',
			props: { back: '#f8fafc' },
			kids: [
				{
					kind: 'text', w: 840, h: 68,
					props: {
						text: 'Build your site right in the browser',
						size: '44', weight: 'bold', align: 'center', color: '#0f172a',
					},
				},
				{
					kind: 'text', w: 720, h: 56,
					props: {
						text: 'Drag blocks onto the canvas, press Publish, and get a real project in your own repository.',
						size: '18', color: '#475569', align: 'center',
					},
				},
				{
					kind: 'frame', w: 380, h: 44,
					direction: 'row', gap: 12, padding: 0, align: 'center',
					kids: [
						{ kind: 'button', w: 180, h: 44, props: { text: 'Get started', uri: '#' } },
						{
							kind: 'button', w: 180, h: 44,
							props: { text: 'See how it works', uri: '#', back: '#ffffff', color: '#0f172a' },
						},
					],
				},
			],
		},

		features: {
			kind: 'frame',
			w: 1040, h: 300,
			direction: 'row', gap: 20, padding: 40, align: 'stretch',
			kids: [
				figmol_blocks_feature(
					'Local first',
					'Everything you draw lives in your own storage and syncs between your devices on its own.',
				),
				figmol_blocks_feature(
					'Real sources',
					'What you publish is a plain project: open it in an editor and keep going by hand.',
				),
				figmol_blocks_feature(
					'One click away',
					'Publishing creates the repository, pushes the code and turns Pages on for you.',
				),
			],
		},

		pricing: {
			kind: 'frame',
			w: 1040, h: 472,
			direction: 'column', gap: 28, padding: 48, align: 'center',
			kids: [
				{
					kind: 'text', w: 420, h: 48,
					props: { text: 'Pricing', size: '32', weight: 'bold', align: 'center', color: '#0f172a' },
				},
				{
					kind: 'frame', w: 960, h: 292,
					direction: 'row', gap: 20, padding: 0, align: 'stretch',
					kids: [
						figmol_blocks_plan( 'Starter', '$0', 'For trying the thing out on a weekend.' ),
						figmol_blocks_plan( 'Pro', '$12', 'For a site that people actually visit.' ),
						figmol_blocks_plan( 'Team', '$39', 'For everybody editing the same pages.' ),
					],
				},
			],
		},

		footer: {
			kind: 'frame',
			w: 1040, h: 120,
			direction: 'row', gap: 24, padding: 32, align: 'center',
			props: { back: '#0f172a' },
			kids: [
				{ kind: 'text', w: 320, h: 24, props: { text: '© Your Company', size: '14', color: '#94a3b8' } },
				{
					kind: 'frame', w: 400, h: 32,
					direction: 'row', gap: 20, padding: 0, align: 'center',
					kids: [
						figmol_blocks_link( 'Documentation' ),
						figmol_blocks_link( 'Source code' ),
						figmol_blocks_link( 'Contacts' ),
					],
				},
			],
		},

	}

	/**
	 * What the palette offers and what the sections are made of.
	 *
	 * Plain data on purpose: the store builds nodes out of it, the generator asks
	 * it which kinds hold children, and neither has to know about the other.
	 */
	export class $bog_figmol_blocks {

		/** Blocks borrowed from the component library, in palette order. */
		static readonly kinds: readonly string[] = [
			'bui_card',
			'bui_button',
			'bui_badge',
			'bui_alert',
			'bui_field',
			'bui_progress',
			'bui_tabs',
			'bui_avatar',
		]

		/** Composite templates, in palette order. */
		static readonly sections: readonly string[] = [ 'hero', 'features', 'pricing', 'footer' ]

		static title( kind: string ) {
			return figmol_blocks_title[ kind ] ?? kind
		}

		/** Whether a node of this kind draws other nodes inside itself. */
		static container( kind: string ) {
			return figmol_blocks_container.includes( kind )
		}

		/** A single fresh element, with the caption overridden when one is given. */
		static spec( kind: string, text: string ): $bog_figmol_blocks_spec {

			const size = figmol_blocks_size[ kind ] ?? figmol_blocks_size_fallback
			const preset = figmol_blocks_preset[ kind ] ?? {}
			const props = { ... preset.props } as Record< string, string >

			if( text ) props.text = text

			return { ... preset, kind, w: size[ 0 ], h: size[ 1 ], props }
		}

		static section( id: string ): $bog_figmol_blocks_spec | null {
			return figmol_blocks_sections[ id ] ?? null
		}

		static section_title( id: string ) {
			return id ? id[ 0 ].toUpperCase() + id.slice( 1 ) : id
		}

	}

}
