namespace $ {

	/**
	 * Own IndexedDB for this app. The dev server hosts a dozen Giper Baza builds
	 * on one origin, and therefore on one shared `$giper_baza_mine` database —
	 * unit formats from different builds collide there and the app dies with a
	 * blank screen. A private store keeps figmol independent of its neighbours.
	 */
	export class $bog_figmol_mine extends $giper_baza_mine_idb {

		@ $mol_memo.method
		static override async db() {

			return await this.$.$mol_db<{

				Unit: {
					Key: [ land: string, path: string ]
					Doc: [ ArrayBuffer ]
					Indexes: {}
				}

				Ball: {
					Key: [ land: string, path: string ]
					Doc: [ ArrayBuffer ]
					Indexes: {}
				}

			}>( 'bog_figmol_mine',
				mig => mig.store_make( 'Unit' ),
				mig => mig.store_make( 'Ball' ),
			)

		}

	}

	$.$giper_baza_mine = $bog_figmol_mine
	$.$giper_baza_mine_idb = $bog_figmol_mine

	/**
	 * The bundled peer seed (`web.baza`) may fail to parse in a given build, and
	 * `masters()` throws as a whole when it does — killing every sync and, with
	 * it, the home Land the editor stores its site in. Fall back to the
	 * explicitly configured masters instead.
	 */
	const figmol_masters = $giper_baza_yard.masters.bind( $giper_baza_yard )
	$giper_baza_yard.masters = ()=> {
		try {
			return figmol_masters()
		} catch( error ) {
			if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
			$mol_fail_log( error )
			return [ ... $giper_baza_yard.masters_default ]
		}
	}

}
