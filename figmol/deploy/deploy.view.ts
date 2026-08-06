namespace $.$$ {

	/**
	 * A hand written site, small enough to read and wide enough to touch every
	 * generated file: two pages, a frame with auto layout, text, a button and an
	 * image.
	 */
	const figmol_deploy_demo: $bog_figmol_gen_site = {
		title: 'Figmol demo',
		theme: {
			back: '#ffffff',
			text: '#101828',
			accent: '#ff0066',
			font: 'Inter, sans-serif',
		},
		pages: [
			{
				title: 'Home',
				slug: '',
				root: {
					kind: 'frame',
					x: 0, y: 0, w: 1200, h: 720,
					kids: [
						{
							kind: 'frame',
							x: 48, y: 48, w: 520, h: 300,
							direction: 'column',
							gap: 16,
							padding: 24,
							align: 'stretch',
							kids: [
								{
									kind: 'text',
									w: 440, h: 56,
									props: { text: 'Built on a canvas', size: '34', weight: 'bold' },
								},
								{
									kind: 'text',
									w: 440, h: 72,
									props: { text: 'Every file in this repository is an ordinary MAM module.' },
								},
								{
									kind: 'button',
									w: 200, h: 44,
									props: { text: 'Read the sources', href: 'https://mol.hyoo.ru/' },
								},
							],
						},
						{
							kind: 'image',
							x: 620, y: 48, w: 280, h: 180,
							props: { uri: 'https://mol.hyoo.ru/mol/logo/logo.svg', text: 'A logo' },
						},
					],
				},
			},
			{
				title: 'About',
				slug: 'about',
				root: {
					kind: 'frame',
					direction: 'column',
					gap: 8,
					padding: 32,
					align: 'center',
					kids: [
						{ kind: 'text', w: 600, h: 40, props: { text: 'Made with Figmol', size: '24', weight: 'bold' } },
					],
				},
			},
		],
	}

	/**
	 * Bench for the publishing panel.
	 *
	 * It stands in for the editor: hands over a generated file map and the name
	 * those files were generated for, which is the whole contract between the two.
	 */
	export class $bog_figmol_deploy extends $.$bog_figmol_deploy {

		/** Regenerated on every rename — the module name has to match the repository. */
		@ $mol_mem
		override files(): Readonly< Record< string, string > > {
			const name = this.name().trim() || 'mysite'
			return this.$.$bog_figmol_gen.files( figmol_deploy_demo, { name } )
		}

		@ $mol_mem
		file_names() {
			return Object.keys( this.files() ).sort()
		}

		@ $mol_mem
		listing_rows() {
			return this.file_names().map( name => this.File( name ) )
		}

		override file_name( name: string ) {
			return name
		}

		@ $mol_mem_key
		override file_size( name: string ) {
			return ( this.files()[ name ]?.length ?? 0 ) + ' B'
		}

	}

}
