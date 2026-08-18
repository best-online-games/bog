namespace $.$$ {
	// Синхронизация через Гипер Базу отключена: список мастеров пустой.
	// Чистки одного masters_default мало — masters() склеивает его с пирами
	// из бандленного сида, где зашит публичный мастер. Глушим сам masters().
	$giper_baza_yard.masters_default.length = 0
	$giper_baza_yard.masters = (): string[] => []


	export class $bog_forge_app extends $.$bog_forge_app {

		static {
			$bog_builderui_router.activate()
		}

		@ $mol_mem
		screen( next?: string ) {
			return $mol_state_arg.value( 'screen', next ) ?? 'home'
		}

		@ $mol_mem
		screen_body() {
			const pages = this.pages()
			const screen = this.screen()
			const page = ( pages as any )[ screen ]
			return page ? [ page ] : []
		}

		@ $mol_mem
		meta(): $bog_meta_data {
			const screen = this.screen()
			const titles: { [ k: string ]: $bog_meta_data } = {
				home: {
					title: 'forge',
					description: 'forge — built with $mol',
					og_title: 'forge',
					og_type: 'website',
				},
			}
			return titles[ screen ] ?? titles.home
		}

		override attr() {
			return { ... super.attr(), ... $bog_meta_attr( this ) }
		}

		api_base() {
			const meta = $mol_dom.document.querySelector( 'meta[name="api-base"]' ) as HTMLMetaElement | null
			const explicit = meta?.content?.trim()
			if( explicit ) return explicit
			// dev fallback: app on :9080 (mam dev) → api on :9092
			const loc = $mol_dom.location
			if( loc?.port === '9080' ) return 'http://localhost:9092'
			return ''
		}

		@ $mol_mem
		items(): readonly $bog_forge_item[] {
			return this.$.$mol_fetch.json( this.api_base() + '/api/items' ) as readonly $bog_forge_item[]
		}

		items_count() {
			return String( this.items().length )
		}

	}

}
