namespace $ {

	/**
	 * A store whose writes go into a plain object instead of into the Baza.
	 *
	 * Only the four raw writers are replaced — everything the journal does above
	 * them is the real code, which is the part worth testing: a Land of its own
	 * per case would test the Baza instead.
	 */
	const figmol_store_test_props = ( store: $bog_figmol_store )=> {

		const values = {} as Record< string, string >

		store.prop_read = ( id: string, key: string )=> values[ id + ':' + key ] ?? ''
		store.prop_write = ( id: string, key: string, val: string )=> { values[ id + ':' + key ] = val }

		return values
	}

	const figmol_store_test_nums = ( store: $bog_figmol_store )=> {

		const values = {} as Record< string, number >

		store.num_read = ( id: string, field: string )=> values[ id + ':' + field ] ?? 0
		store.num_write = ( id: string, field: string, val: number )=> { values[ id + ':' + field ] = val }

		return values
	}

	/** A frame with three children, none of which is anywhere near the Baza. */
	const figmol_store_test_kids = ( store: $bog_figmol_store, kids: string[] )=> {

		store.parent = ()=> 'root'
		store.kids = ( id: string )=> id === 'root' ? kids : []

		store.kid_cut = ( host: string, id: string )=> {
			kids.splice( 0, kids.length, ... kids.filter( kid => kid !== id ) )
		}

		store.kid_put = ( host: string, id: string, at: number )=> {
			const rest = kids.filter( kid => kid !== id )
			rest.splice( at < 0 ? rest.length : at, 0, id )
			kids.splice( 0, kids.length, ... rest )
		}

		return kids
	}

	$mol_test({

		'a write remembers the value it replaced'() {

			const store = new $bog_figmol_store
			const values = figmol_store_test_props( store )

			store.prop_edit( 'a', 'text', 'Hello' )
			$mol_assert_equal( values[ 'a:text' ], 'Hello' )

			$mol_assert_equal( store.can_undo(), true )
			$mol_assert_equal( store.can_redo(), false )

			store.undo()
			$mol_assert_equal( values[ 'a:text' ], '' )
			$mol_assert_equal( store.can_redo(), true )

			store.redo()
			$mol_assert_equal( values[ 'a:text' ], 'Hello' )

		},

		/** Typing a word is one step back, not one step per letter. */
		'a burst of writes into one field folds into a single step'() {

			const store = new $bog_figmol_store
			const values = figmol_store_test_props( store )

			store.prop_edit( 'a', 'text', 'H' )
			store.prop_edit( 'a', 'text', 'He' )
			store.prop_edit( 'a', 'text', 'Hey' )

			store.undo()

			$mol_assert_equal( values[ 'a:text' ], '' )
			$mol_assert_equal( store.can_undo(), false )

			store.redo()
			$mol_assert_equal( values[ 'a:text' ], 'Hey' )

		},

		'writes into different fields stay different steps'() {

			const store = new $bog_figmol_store
			const values = figmol_store_test_nums( store )

			store.num_edit( 'a', 'x', 10 )
			store.num_edit( 'a', 'y', 20 )

			store.undo()
			$mol_assert_equal( values[ 'a:y' ], 0 )
			$mol_assert_equal( values[ 'a:x' ], 10 )

			store.undo()
			$mol_assert_equal( values[ 'a:x' ], 0 )

		},

		'a write that changes nothing is not a step'() {

			const store = new $bog_figmol_store
			figmol_store_test_props( store )

			store.prop_edit( 'a', 'text', '' )

			$mol_assert_equal( store.can_undo(), false )

		},

		/**
		 * Deleting only unlinks the node — the Baza is append-only — so taking the
		 * deletion back puts the very same link where it was.
		 */
		'an element comes back where it was deleted from'() {

			const store = new $bog_figmol_store
			const kids = figmol_store_test_kids( store, [ 'a', 'b', 'c' ] )

			store.node_drop( 'b' )
			$mol_assert_like( kids, [ 'a', 'c' ] )

			store.undo()
			$mol_assert_like( kids, [ 'a', 'b', 'c' ] )

			store.redo()
			$mol_assert_like( kids, [ 'a', 'c' ] )

		},

		/** Undoing a step must not be recorded as a step of its own. */
		'walking the journal does not write into it'() {

			const store = new $bog_figmol_store
			const values = figmol_store_test_props( store )

			store.prop_edit( 'a', 'text', 'one' )
			store.prop_edit( 'b', 'text', 'two' )

			store.undo()
			store.undo()

			$mol_assert_equal( store.can_undo(), false )
			$mol_assert_equal( values[ 'a:text' ], '' )
			$mol_assert_equal( values[ 'b:text' ], '' )

			store.redo()
			store.redo()

			$mol_assert_equal( values[ 'a:text' ], 'one' )
			$mol_assert_equal( values[ 'b:text' ], 'two' )

		},

		/** A new change is a new future: whatever was undone is not coming back. */
		'a change after an undo drops the redo'() {

			const store = new $bog_figmol_store
			figmol_store_test_props( store )

			store.prop_edit( 'a', 'text', 'one' )
			store.undo()

			$mol_assert_equal( store.can_redo(), true )

			store.prop_edit( 'a', 'text', 'other' )

			$mol_assert_equal( store.can_redo(), false )

		},

		'an address naming nonsense falls back to the site of this account'() {

			const store = new $bog_figmol_store
			store.share_id = ()=> 'not a link at all'

			$mol_assert_equal( store.share_link(), null )

		},

	})

}
