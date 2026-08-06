namespace $.$$ {

	/** How far an arrow key moves the selected element, and how far with Shift. */
	const figmol_app_nudge = 1
	const figmol_app_nudge_far = 10

	/** Where a field is being typed into, and the editor keeps its hands off. */
	const figmol_app_fields = 'input, textarea, [contenteditable="true"]'

	const figmol_app_arrows = [ 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown' ]

	/**
	 * Editor shell: a header strip, the tool palette, the canvas and the right
	 * rail — the inspector, or the publishing panel when that is open.
	 *
	 * `tool` and `selected` live here rather than inside the canvas because the
	 * palette and the inspector need them too. Both are plain declared props, so
	 * the `<=>` bindings of the children are the only writers and nothing
	 * shadows an override.
	 *
	 * The store is made here as well, and handed to both readers as a typed
	 * property. One instance means one answer to what a node is, and passing it
	 * down through view.tree keeps that answer typed on both ends.
	 */
	export class $bog_figmol_app extends $.$bog_figmol_app {

		/**
		 * Touching the site keeps the home Land subscribed while the editor is
		 * mounted. Without a reader the Land loses its last subscriber whenever
		 * the screen rebuilds, and destructing it walks into a circular
		 * subscription.
		 *
		 * The keyboard is hooked up here too — `listen` is memoized, so this
		 * happens once for as long as the app is on screen.
		 */
		override auto() {

			try {
				this.store().site()
			} catch( error ) {
				if( !$mol_promise_like( error ) ) $mol_fail_log( error )
			}

			this.listen()

			super.auto()
		}

		/* --------------------------------------------------------------- rights */

		/**
		 * Whether this window may change anything.
		 *
		 * A site opened by somebody else's link is readable and nothing more, and
		 * finding that out needs the Land — which suspends while it arrives. That
		 * is not an error and not a reason to blank the header out: the honest
		 * answer until the units are here is "no", and the atom recomputes itself
		 * once they are.
		 */
		@ $mol_mem
		editable() {
			try {
				return this.store().writable()
			} catch( error ) {
				if( !$mol_promise_like( error ) ) $mol_fail_log( error )
				return false
			}
		}

		/** Whether the address names a site instead of the one this account owns. */
		shared() {
			return !!this.store().share_link()
		}

		/* ---------------------------------------------------------------- header */

		@ $mol_mem
		override head_tools(): readonly $mol_view[] {

			const res = [ this.Title(), this.Status() ] as $mol_view[]

			if( this.editable() ) res.push( this.Share(), this.Publish_toggle() )
			else if( this.shared() ) res.push( this.Readonly(), this.Mine() )

			res.push( this.Theme_toggle() )

			return res
		}

		/**
		 * Address that opens this very site in somebody else's browser.
		 *
		 * The site is the root pawn of a Land of its own, and that Land is readable
		 * by anybody holding its link — so the link is the whole share mechanism,
		 * with nothing to grant and nothing to migrate.
		 */
		@ $mol_mem
		override share_uri() {
			const site = this.store().site()
			if( !site ) return ''
			return this.$.$mol_state_arg.make_link({ site: site.link().land().str })
		}

		/* -------------------------------------------------------------- publish */

		/**
		 * Name of the repository, suggested from the title of the site the first
		 * time the panel is opened and the user's business from then on.
		 */
		name_default() {
			const title = this.store().site()?.Title()?.val() ?? ''
			const name = title.toLowerCase().replace( /[^a-z0-9]+/g, '' ).replace( /^[0-9]+/, '' )
			return name || 'mysite'
		}

		/**
		 * Opens and closes the publishing rail.
		 *
		 * Everything that can suspend is read before anything is written: this
		 * handler is retried when a read of the site comes back as a promise, and a
		 * retry that found the flag already flipped would close the panel it has
		 * just opened.
		 */
		@ $mol_action
		override publish_toggle( next?: any ) {

			if( next === undefined ) return null

			const open = !this.publishing()
			const name = open && !this.publish_name() ? this.name_default() : ''

			if( name ) this.publish_name( name )
			this.publishing( open )

			return null
		}

		/**
		 * The repository the panel would push: the whole site, generated afresh.
		 *
		 * It is computed from the same `publish_name` the panel shows, and that
		 * matters — the module inside the sources and the repository they are
		 * pushed into have to carry one name, or the built bundle lands beside the
		 * page that looks for it.
		 */
		@ $mol_mem
		override publish_files(): Readonly< Record< string, string > > {

			const site = this.store().site()
			if( !site ) return {}

			const name = this.publish_name().trim() || 'mysite'
			const snap = this.$.$bog_figmol_gen_snap.site( site )

			return this.$.$bog_figmol_gen.files( snap, { name } )
		}

		/* ---------------------------------------------------------------- layout */

		/**
		 * Nothing to edit means nothing to show but the offer to start. Reading
		 * the site suspends while the home Land loads, and $mol shows its own
		 * waiting state for that — which is honest, the answer really is unknown.
		 *
		 * A site opened by link keeps the canvas and the panels that only read, so
		 * the visitor can walk the pages and the layers without being offered a
		 * single control that would fail.
		 */
		@ $mol_mem
		override editor_content(): readonly $mol_view[] {

			if( !this.store().site() ) return [ this.Start() ]

			const editable = this.editable()
			const res = [] as $mol_view[]

			if( editable ) res.push( this.Tools() )

			res.push( this.Side(), this.Canvas() )

			if( !editable ) return res

			if( this.publishing() ) res.push( this.Publish() )
			else if( this.selected() ) res.push( this.Inspector() )

			return res
		}

		/**
		 * Middle of what the user is looking at, in sheet pixels — where a block
		 * picked from the palette goes. Measured rather than memoized: a viewport
		 * that has been panned since the last render would give a stale answer.
		 */
		override drop_spot(): readonly number[] {
			return ( this.Canvas() as $.$$.$bog_figmol_app_canvas ).center()
		}

		/* -------------------------------------------------------------- keyboard */

		/**
		 * Shortcuts that have to work wherever the focus is.
		 *
		 * A `$mol_hotkey` plugin listens on the DOM node of its host, and on a cold
		 * load the focus is on `<body>` — above the app, so nothing ever reaches
		 * it. The window hears everything.
		 *
		 * The same registration closes the inline caption editor on a press
		 * outside it: the canvas can only see the presses that land on the canvas,
		 * and a click into the inspector has to close the editor just as well.
		 */
		@ $mol_mem
		listen() {

			const win = this.$.$mol_dom_context

			win.addEventListener( 'keydown', ( event: KeyboardEvent )=> this.key_down( event ) )
			win.addEventListener( 'pointerdown', ( event: PointerEvent )=> this.press_down( event ) )

			return null
		}

		/** Whether the keys are going into a field rather than to the editor. */
		typing( target: EventTarget | null ) {
			const node = target as Element | null
			if( !node?.closest ) return false
			return !!node.closest( figmol_app_fields )
		}

		key_down( event: KeyboardEvent ) {

			if( event.defaultPrevented ) return
			if( !this.editable() ) return
			if( this.typing( event.target ) ) return

			const command = event.metaKey || event.ctrlKey

			if( command && event.code === 'KeyZ' ) {
				event.preventDefault()
				$mol_wire_async( this ).step( event.shiftKey )
				return
			}

			// Windows spells redo the other way round, and both spellings cost
			// nothing to support.
			if( command && event.code === 'KeyY' ) {
				event.preventDefault()
				$mol_wire_async( this ).step( true )
				return
			}

			if( command && event.code === 'KeyD' ) {
				event.preventDefault()
				$mol_wire_async( this ).duplicate()
				return
			}

			if( command ) return
			if( !figmol_app_arrows.includes( event.code ) ) return
			if( !this.selected() ) return

			event.preventDefault()

			const far = event.shiftKey ? figmol_app_nudge_far : figmol_app_nudge
			const shift_x = event.code === 'ArrowLeft' ? -far : event.code === 'ArrowRight' ? far : 0
			const shift_y = event.code === 'ArrowUp' ? -far : event.code === 'ArrowDown' ? far : 0

			$mol_wire_async( this ).nudge( shift_x, shift_y )
		}

		/** A press anywhere but inside the caption being typed ends the typing. */
		press_down( event: PointerEvent ) {
			const node = event.target as Element | null
			if( node?.closest?.( '[figmol_edit]' ) ) return
			if( !this.Canvas().editing() ) return
			$mol_wire_async( this.Canvas() ).editing( '' )
		}

		/**
		 * One step through the journal, back or forward.
		 *
		 * Taking an insertion back unlinks the very node the inspector is showing,
		 * and a panel describing an element nobody can see any more is worse than
		 * no panel — so the selection is dropped when it points at nothing.
		 */
		@ $mol_action
		step( forward: boolean ) {

			const store = this.store()

			if( forward ) store.redo()
			else store.undo()

			const id = this.selected()
			if( id && !store.node_ids().includes( id ) ) this.selected( '' )
		}

		/**
		 * Copies the selected element, subtree and all, and selects the copy —
		 * which is what makes the next ⌘D copy the copy rather than the original.
		 */
		@ $mol_action
		duplicate() {
			const id = this.selected()
			if( !id ) return
			const made = this.store().node_copy( id )
			if( made ) this.selected( made )
		}

		/**
		 * Moves the selected element by the arrow keys. An element inside an auto
		 * layout is placed by its frame, so there is nothing here to move.
		 */
		@ $mol_action
		nudge( shift_x: number, shift_y: number ) {

			const id = this.selected()
			if( !id ) return

			const store = this.store()
			if( store.flow( id ) ) return

			const x = store.x( id )
			const y = store.y( id )

			if( shift_x ) store.x( id, x + shift_x )
			if( shift_y ) store.y( id, y + shift_y )
		}

	}

}
