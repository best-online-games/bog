namespace $ {

	/**
	 * Public read, author writes. Everybody holding the link of the site Land can
	 * pull it, which is what a share link will be — no migration, no re-grant.
	 */
	const preset_site: $giper_baza_rank_preset = [[ null, $giper_baza_rank_read ]]

	const size_min = 8

	/** Distance a duplicate is placed from the element it was copied off. */
	const step_copy = 24

	/** Deep enough for any hand drawn page, shallow enough to survive a link cycle. */
	const depth_max = 24

	/** How many steps back the editor can go. */
	const journal_depth = 100

	/** Two writes into the same field closer than this fold into one step. */
	const journal_merge = 900

	/**
	 * One reversible change of the document.
	 *
	 * Both directions are closures over the values involved rather than a diff:
	 * every write already goes through this class, so the cheapest description of
	 * a step back is the value that was there and the call that puts it back.
	 */
	type figmol_store_change = {
		/** The same tag twice in a row means the second write folds into the first. */
		readonly tag: string
		time: number
		undo(): void
		redo(): void
	}

	/**
	 * The document the editor edits, and the only thing that talks to the Baza.
	 *
	 * Both the canvas and the inspector work through one instance of this, passed
	 * down as a typed property from the app. Two readers of the same node means
	 * one place deciding what a node is, and the drag code below is easier to
	 * follow when it asks questions like "is this node laid out by its parent"
	 * instead of digging through pawns itself.
	 *
	 * Nothing that returns a Baza object is memoized: `@$mol_mem` makes the atom
	 * the owner of what it returns, and destructing a Land runs into a circular
	 * subscription. Reads that come back as strings, numbers and arrays are
	 * memoized, and that is where the reactivity lives.
	 */
	export class $bog_figmol_store extends $mol_object2 {

		// === Storage =============================================================

		/** Bootstrap record in the user's own home Land: a single link to the site. */
		home() {
			return this.$.$giper_baza_glob.home().land().Data( $bog_figmol_schema_home ) as $bog_figmol_schema_home
		}

		/**
		 * Land of a site opened by somebody else's link, empty while editing one's
		 * own. Kept in the address rather than in the document — which site this
		 * window shows is a property of the window.
		 */
		share_id( next?: string ) {
			return this.$.$mol_state_arg.value( 'site', next ) ?? ''
		}

		/**
		 * That same Land as a link, `null` when the address names none — or names
		 * something that is not a link at all. A mistyped address is not a reason
		 * to break the editor, so it falls back to the site of this account.
		 */
		share_link() {

			const str = this.share_id()
			if( !str ) return null

			try {
				return new this.$.$giper_baza_link( str ).land()
			} catch( error ) {

				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )

				// Somebody mistyped an address, which is not a fault of the program:
				// a line in the log, not a plate over the editor.
				this.$.$mol_log3_warn({
					place: `${ this }.share_link()`,
					message: 'Wrong site link in the address',
					hint: 'Remove the site argument to get back to your own editor.',
					link: str,
				})

				return null
			}
		}

		/**
		 * The site, `null` until the user creates one. Lives in a Land of its own.
		 *
		 * An address naming a Land takes over: a shared site is read out of that
		 * Land directly and the home record is not even looked at. The site is the
		 * root pawn of its Land, so the link in the address is all it takes.
		 */
		site() {

			const shared = this.share_link()

			if( shared ) {
				return this.$.$giper_baza_glob.Land( shared ).Data( $bog_figmol_schema_site ) as $bog_figmol_schema_site
			}

			return this.home().Site()?.remote() ?? null
		}

		/**
		 * Whether this browser may write into the Land the site lives in.
		 *
		 * The `Title()` read is load-bearing: rights arrive as Gift units together
		 * with the rest of the Land, and only a read of actual data makes the Land
		 * sync. Asking for the rank alone answers "no" on a cold load and never
		 * corrects itself.
		 */
		@ $mol_mem
		writable() {

			const site = this.site()
			if( !site ) return false

			if( !this.share_link() ) return true

			site.Title()?.val()

			const pass = this.$.$giper_baza_auth.current().pass()
			return $giper_baza_rank_tier_of( site.land().pass_rank( pass ) ) >= $giper_baza_rank_tier.post
		}

		/**
		 * Whether the page has a frame to put anything into yet.
		 *
		 * Reaching the site Land suspends while it loads, and a palette is not the
		 * place to show that: the answer here is a plain "not yet", and the atom
		 * recomputes on its own once the reads it made resolve.
		 */
		@ $mol_mem
		ready() {
			try {
				return !!this.root_id()
			} catch( error ) {
				if( !$mol_promise_like( error ) ) $mol_fail_log( error )
				return false
			}
		}

		/** Pages of the site in navigation order. The first one is the entry point. */
		pages() {
			return this.site()?.Pages()?.remote_list() ?? []
		}

		/** The page the canvas shows, the first one until something else is picked. */
		page() {
			const id = this.page_current()
			return this.pages().find( page => page.link().str === id ) ?? null
		}

		/** Frame every element of the current page lives in. */
		root() {
			return this.page()?.Root()?.remote() ?? null
		}

		node( id: string ) {
			return this.$.$giper_baza_glob.Pawn( new this.$.$giper_baza_link( id ), $bog_figmol_schema_node )
		}

		// === Pages ===============================================================

		@ $mol_mem
		page_ids(): readonly string[] {
			return this.pages().map( page => page.link().str )
		}

		/**
		 * Which page is being edited, kept in the address rather than in the
		 * document: it is a property of this window, not of the site, and putting
		 * it there means a reload comes back to the same page.
		 */
		page_id( next?: string ) {
			return this.$.$mol_state_arg.value( 'page', next ) ?? ''
		}

		/** The picked page, or the first one when nothing is picked or it is gone. */
		@ $mol_mem
		page_current() {
			const ids = this.page_ids()
			const id = this.page_id()
			return ids.includes( id ) ? id : ( ids[ 0 ] ?? '' )
		}

		page_by( id: string ) {
			if( !id ) return null
			return this.pages().find( page => page.link().str === id ) ?? null
		}

		@ $mol_mem_key
		page_title( id: string, next?: string ) {
			const page = this.page_by( id )
			if( !page ) return ''
			if( next !== undefined ) this.page_edit( id, 'title', next )
			return page.Title()?.val() ?? ''
		}

		/** URL segment of a page. Empty string is the index page. */
		@ $mol_mem_key
		page_slug( id: string, next?: string ) {
			const page = this.page_by( id )
			if( !page ) return ''
			if( next !== undefined ) this.page_edit( id, 'slug', next )
			return page.Slug()?.val() ?? ''
		}

		// === Tree ================================================================

		@ $mol_mem
		root_id() {
			return this.root()?.link().str ?? ''
		}

		@ $mol_mem_key
		kids( id: string ): readonly string[] {
			if( !id ) return []
			return ( this.node( id ).Kids()?.items() ?? [] ).map( link => link.str )
		}

		/**
		 * Parent of every node, by link. A node knows its kids and not the other
		 * way round, while dragging asks the opposite question on every move, so
		 * the whole tree is walked once and cached.
		 *
		 * A node reached twice keeps its first parent: the schema cannot stop a
		 * link from appearing in two lists, and a cycle here would hang the walk.
		 */
		@ $mol_mem
		parents(): Readonly< Record< string, string > > {

			const res = {} as Record< string, string >

			const walk = ( id: string )=> {
				for( const kid of this.kids( id ) ) {
					if( kid in res ) continue
					res[ kid ] = id
					walk( kid )
				}
			}

			const root = this.root_id()
			if( root ) walk( root )

			return res
		}

		parent( id: string ) {
			return this.parents()[ id ] ?? ''
		}

		/** Every node of the page, parents before their kids. */
		@ $mol_mem
		node_ids(): readonly string[] {

			const parents = this.parents()
			const res = [] as string[]

			const walk = ( id: string )=> {
				for( const kid of this.kids( id ) ) {
					if( parents[ kid ] !== id ) continue
					res.push( kid )
					walk( kid )
				}
			}

			const root = this.root_id()
			if( root ) walk( root )

			return res
		}

		/** Whether `id` is `host` itself or lies somewhere below it. */
		inside( id: string, host: string ) {
			if( !id || !host ) return false
			for( let cursor = id; cursor; cursor = this.parent( cursor ) ) {
				if( cursor === host ) return true
			}
			return false
		}

		/** How deep a node sits, counted from the root frame. */
		depth( id: string ) {
			let res = 0
			for( let cursor = this.parent( id ); cursor; cursor = this.parent( cursor ) ) ++res
			return res
		}

		// === Journal =============================================================
		//
		// Undo is a list of closures, not a stack of document snapshots: every
		// write in the editor already goes through one of the `*_edit` methods
		// below, so remembering the value that was there is enough to go back.
		//
		// Nothing here is reactive on purpose. A field setter is the body of a
		// `@$mol_mem_key`, and bumping an atom from inside one is exactly the write
		// that starts an invalidation cycle. The journal is a property of this
		// session rather than of the document, and the only things reading it are
		// the two keyboard shortcuts.
		//
		// Deleting a node or a page merely unlinks it — the Baza is append-only —
		// so undoing a deletion links the subtree back where it was.

		private done = [] as figmol_store_change[]
		private undone = [] as figmol_store_change[]
		private replaying = false

		/**
		 * Remembers a change that has just been applied.
		 *
		 * A tag folds consecutive writes into one step: typing a word into the
		 * inspector produces a write per keystroke, and undo that walks back letter
		 * by letter is not undo. An empty tag never folds — two drags in a row are
		 * two gestures, however quick.
		 */
		record( tag: string, undo: ()=> void, redo: ()=> void ) {

			if( this.replaying ) return

			const now = Date.now()
			const last = this.done[ this.done.length - 1 ]

			if( tag && last && last.tag === tag && now - last.time < journal_merge ) {
				last.time = now
				last.redo = redo
			} else {
				this.done.push({ tag, time: now, undo, redo })
				if( this.done.length > journal_depth ) this.done.shift()
			}

			this.undone.length = 0
		}

		can_undo() {
			return this.done.length > 0
		}

		can_redo() {
			return this.undone.length > 0
		}

		/**
		 * Steps back. The entry is dropped only once its writes went through, so a
		 * retry of a suspended step replays the same one instead of skipping it.
		 */
		@ $mol_action
		undo() {

			const change = this.done[ this.done.length - 1 ]
			if( !change ) return false

			this.replay( ()=> change.undo() )

			this.done.pop()
			this.undone.push( change )

			return true
		}

		@ $mol_action
		redo() {

			const change = this.undone[ this.undone.length - 1 ]
			if( !change ) return false

			this.replay( ()=> change.redo() )

			this.undone.pop()
			this.done.push( change )

			return true
		}

		/** Runs a step of the journal without writing a new one. */
		replay( task: ()=> void ) {
			this.replaying = true
			try {
				task()
			} finally {
				this.replaying = false
			}
		}

		// === Fields ==============================================================
		//
		// Every accessor reads and writes, so a view can bind both ways to it and
		// the value in the Baza is the only copy there is. Writes are cheap and
		// rare — a keystroke in the inspector, the end of a drag — so none of them
		// is buffered.
		//
		// A write never touches a pawn directly: it goes through the `*_edit` pair
		// below, which reads what is there, writes the new value and hands the
		// journal a way back.

		/** One of the string properties of a node. */
		prop_read( id: string, key: string ) {
			return this.node( id ).Props()?.key( key )?.val() ?? ''
		}

		prop_write( id: string, key: string, val: string ) {
			this.node( id ).Props( null )!.key( key, null ).val( val )
		}

		prop_edit( id: string, key: string, val: string ) {

			const prev = this.prop_read( id, key )
			if( prev === val ) return

			this.prop_write( id, key, val )

			this.record(
				'prop:' + id + ':' + key,
				()=> this.prop_write( id, key, prev ),
				()=> this.prop_write( id, key, val ),
			)
		}

		/** Geometry and layout of a node, the fields stored as numbers of their own. */
		num_read( id: string, field: string ) {

			const node = this.node( id )

			switch( field ) {
				case 'x': return node.X()?.val() ?? 0
				case 'y': return node.Y()?.val() ?? 0
				case 'w': return node.W()?.val() ?? 120
				case 'h': return node.H()?.val() ?? 48
				case 'gap': return node.Gap()?.val() ?? 0
				case 'padding': return node.Padding()?.val() ?? 0
			}

			return 0
		}

		num_write( id: string, field: string, val: number ) {

			const node = this.node( id )

			switch( field ) {
				case 'x': node.X( null )!.val( val ); return
				case 'y': node.Y( null )!.val( val ); return
				case 'w': node.W( null )!.val( val ); return
				case 'h': node.H( null )!.val( val ); return
				case 'gap': node.Gap( null )!.val( val ); return
				case 'padding': node.Padding( null )!.val( val ); return
			}
		}

		num_edit( id: string, field: string, val: number ) {

			const prev = this.num_read( id, field )
			if( prev === val ) return

			this.num_write( id, field, val )

			this.record(
				'num:' + id + ':' + field,
				()=> this.num_write( id, field, prev ),
				()=> this.num_write( id, field, val ),
			)
		}

		/** Layout of a node, the fields stored as strings of their own. */
		str_read( id: string, field: string ) {

			const node = this.node( id )

			switch( field ) {
				case 'direction': return node.Direction()?.val() ?? ''
				case 'align': return node.Align()?.val() ?? ''
			}

			return ''
		}

		str_write( id: string, field: string, val: string ) {

			const node = this.node( id )

			switch( field ) {
				case 'direction': node.Direction( null )!.val( val ); return
				case 'align': node.Align( null )!.val( val ); return
			}
		}

		str_edit( id: string, field: string, val: string ) {

			const prev = this.str_read( id, field )
			if( prev === val ) return

			this.str_write( id, field, val )

			this.record(
				'str:' + id + ':' + field,
				()=> this.str_write( id, field, prev ),
				()=> this.str_write( id, field, val ),
			)
		}

		@ $mol_mem_key
		kind( id: string ) {
			if( !id ) return ''
			return this.node( id ).Kind()?.val() ?? 'rect'
		}

		@ $mol_mem_key
		text( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'text', next )
			return this.node( id ).Props()?.key( 'text' )?.val() ?? ''
		}

		@ $mol_mem_key
		uri( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'uri', next )
			return this.node( id ).Props()?.key( 'uri' )?.val() ?? ''
		}

		/** Body of an alert block — its caption lives in `text` like everywhere else. */
		@ $mol_mem_key
		note( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'note', next )
			return this.node( id ).Props()?.key( 'note' )?.val() ?? ''
		}

		/** Look of a block that has several: `default`, `secondary`, `outline`… */
		@ $mol_mem_key
		variant( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'variant', next )
			return this.node( id ).Props()?.key( 'variant' )?.val() || 'default'
		}

		/** Captions of the tabs block, separated by `|`. */
		@ $mol_mem_key
		options( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'options', next )
			return this.node( id ).Props()?.key( 'options' )?.val() ?? ''
		}

		@ $mol_mem_key
		color( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'color', next )
			return this.node( id ).Props()?.key( 'color' )?.val() ?? ''
		}

		@ $mol_mem_key
		back( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.prop_edit( id, 'back', next )
			return this.node( id ).Props()?.key( 'back' )?.val() ?? ''
		}

		/** `normal` or `bold`. Stored empty for normal, so the css stays quiet. */
		@ $mol_mem_key
		weight( id: string, next?: string ) {
			if( !id ) return 'normal'
			if( next !== undefined ) this.prop_edit( id, 'weight', next === 'normal' ? '' : next )
			return this.node( id ).Props()?.key( 'weight' )?.val() || 'normal'
		}

		/** `left` | `center` | `right`, of the text inside the element. */
		@ $mol_mem_key
		text_align( id: string, next?: string ) {
			if( !id ) return 'left'
			if( next !== undefined ) this.prop_edit( id, 'align', next === 'left' ? '' : next )
			return this.node( id ).Props()?.key( 'align' )?.val() || 'left'
		}

		@ $mol_mem_key
		progress( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.prop_edit( id, 'value', String( Math.round( next ) ) )
			}
			return Number( this.node( id ).Props()?.key( 'value' )?.val() ?? '' ) || 0
		}

		@ $mol_mem_key
		progress_max( id: string, next?: number ) {
			if( !id ) return 100
			if( next !== undefined && Number.isFinite( next ) ) {
				this.prop_edit( id, 'max', String( Math.max( 1, Math.round( next ) ) ) )
			}
			return Number( this.node( id ).Props()?.key( 'max' )?.val() ?? '' ) || 100
		}

		/** Font size in pixels. Zero means "whatever the frame around it says". */
		@ $mol_mem_key
		font_size( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.prop_edit( id, 'size', next > 0 ? String( Math.round( next ) ) : '' )
			}
			return Number( this.node( id ).Props()?.key( 'size' )?.val() ?? '' ) || 0
		}

		/** x, y, w, h in sheet pixels, x and y relative to the parent frame. */
		@ $mol_mem_key
		rect( id: string ): readonly number[] {
			if( !id ) return [ 0, 0, 0, 0 ]
			const node = this.node( id )
			return [
				node.X()?.val() ?? 0,
				node.Y()?.val() ?? 0,
				node.W()?.val() ?? 120,
				node.H()?.val() ?? 48,
			]
		}

		@ $mol_mem_key
		x( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) this.num_edit( id, 'x', Math.round( next ) )
			return this.node( id ).X()?.val() ?? 0
		}

		@ $mol_mem_key
		y( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) this.num_edit( id, 'y', Math.round( next ) )
			return this.node( id ).Y()?.val() ?? 0
		}

		@ $mol_mem_key
		w( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.num_edit( id, 'w', Math.max( size_min, Math.round( next ) ) )
			}
			return this.node( id ).W()?.val() ?? 120
		}

		@ $mol_mem_key
		h( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.num_edit( id, 'h', Math.max( size_min, Math.round( next ) ) )
			}
			return this.node( id ).H()?.val() ?? 48
		}

		// === Layout ==============================================================

		/** `row`, `column`, or empty for free placement of the kids. */
		@ $mol_mem_key
		direction( id: string, next?: string ) {
			if( !id ) return ''
			if( next !== undefined ) this.str_edit( id, 'direction', next )
			const res = this.node( id ).Direction()?.val() ?? ''
			return res === 'row' || res === 'column' ? res : ''
		}

		@ $mol_mem_key
		gap( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.num_edit( id, 'gap', Math.max( 0, Math.round( next ) ) )
			}
			return this.node( id ).Gap()?.val() ?? 0
		}

		@ $mol_mem_key
		padding( id: string, next?: number ) {
			if( !id ) return 0
			if( next !== undefined && Number.isFinite( next ) ) {
				this.num_edit( id, 'padding', Math.max( 0, Math.round( next ) ) )
			}
			return this.node( id ).Padding()?.val() ?? 0
		}

		/** `start` | `center` | `end` | `stretch`, on the cross axis of the frame. */
		@ $mol_mem_key
		align( id: string, next?: string ) {
			if( !id ) return 'stretch'
			if( next !== undefined ) this.str_edit( id, 'align', next )
			return this.node( id ).Align()?.val() || 'stretch'
		}

		/** Whether this node draws other nodes inside itself — a frame or a card. */
		container( id: string ) {
			return $bog_figmol_blocks.container( this.kind( id ) )
		}

		/** A container with a direction lays its kids out itself, by flexbox. */
		auto_layout( id: string ) {
			return this.container( id ) && !!this.direction( id )
		}

		/**
		 * Node is placed by the auto layout of its parent, so its own X and Y say
		 * nothing about where it is. The canvas checks this before it lets a drag
		 * write coordinates that the layout would overrule anyway.
		 */
		flow( id: string ) {
			const parent = this.parent( id )
			return parent ? this.auto_layout( parent ) : false
		}

		// === Writes ==============================================================

		/**
		 * Creates the site: a Land grabbed for it, one page, one root frame.
		 *
		 * Must run inside a fiber — a button press, not a render. Grabbing a Land
		 * runs Proof-of-Work, whose task is cached by the fiber that started it; a
		 * `@$mol_mem` that suspends and recomputes would begin a fresh proof on
		 * every retry and never finish.
		 *
		 * Every write is guarded by a read, so a retry of this same fiber cannot
		 * produce a second site or a second page.
		 */
		@ $mol_action
		site_make( site_title: string, page_title: string ) {

			const site = this.home().Site( null )!.ensure( preset_site )
			if( !site ) return null

			if( !site.Title()?.val() ) site.Title( null )!.val( site_title )

			const pages = site.Pages( null )!
			let page = pages.remote_list()[ 0 ]

			if( !page ) {
				page = pages.make( null )
				page.Title( null )!.val( page_title )
				page.Slug( null )!.val( '' )
			}

			const root = page.Root( null )!.ensure( null )
			if( root && !root.Kind()?.val() ) root.Kind( null )!.val( 'frame' )

			return site
		}

		/** Title or slug of a page. Nothing else here writes those two. */
		page_read( id: string, field: string ) {
			const page = this.page_by( id )
			if( !page ) return ''
			return ( field === 'title' ? page.Title()?.val() : page.Slug()?.val() ) ?? ''
		}

		page_write( id: string, field: string, val: string ) {
			const page = this.page_by( id )
			if( !page ) return
			if( field === 'title' ) page.Title( null )!.val( val )
			else page.Slug( null )!.val( val )
		}

		page_edit( id: string, field: string, val: string ) {

			const prev = this.page_read( id, field )
			if( prev === val ) return

			this.page_write( id, field, val )

			this.record(
				'page:' + id + ':' + field,
				()=> this.page_write( id, field, prev ),
				()=> this.page_write( id, field, val ),
			)
		}

		/** Unlinks a page from the site without touching the pages it leaves alone. */
		page_cut( id: string ) {
			this.site()?.Pages( null )!.cut( new this.$.$giper_baza_link( id ) )
		}

		/** Links a page back into the site, at the place it used to have. */
		page_put( id: string, at: number ) {

			const pages = this.site()?.Pages( null )
			if( !pages ) return

			const items = pages.items().filter( item => item.str !== id )
			const seat = Math.max( 0, Math.min( at < 0 ? items.length : at, items.length ) )

			pages.items([ ... items.slice( 0, seat ), new this.$.$giper_baza_link( id ), ... items.slice( seat ) ])
		}

		/**
		 * Adds a page of its own, with the frame its elements will live in.
		 *
		 * Everything lands in the Land the site already holds, so unlike creating
		 * the site itself this costs no Proof-of-Work.
		 */
		@ $mol_action
		page_add( title: string, slug: string ) {

			const site = this.site()
			if( !site ) return ''

			const page = site.Pages( null )!.make( null )

			page.Title( null )!.val( title )
			page.Slug( null )!.val( slug )

			const root = page.Root( null )!.ensure( null )
			if( root && !root.Kind()?.val() ) root.Kind( null )!.val( 'frame' )

			const id = page.link().str
			const at = this.page_ids().indexOf( id )

			this.record( '', ()=> this.page_cut( id ), ()=> this.page_put( id, at ) )

			return id
		}

		/**
		 * Unlinks a page. The last one stays put: an editor without a page has
		 * nothing to draw on, and the button that calls this is disabled anyway.
		 */
		@ $mol_action
		page_drop( id: string ) {

			const site = this.site()
			if( !site ) return

			const ids = this.page_ids()
			if( ids.length < 2 || !ids.includes( id ) ) return

			const at = ids.indexOf( id )

			this.page_cut( id )

			this.record( '', ()=> this.page_put( id, at ), ()=> this.page_cut( id ) )

			if( this.page_id() === id ) this.page_id( ids.find( other => other !== id ) ?? '' )
		}

		/** Unlinks a node from a frame. The pawn and its subtree stay where they are. */
		kid_cut( host: string, id: string ) {
			this.node( host ).Kids( null )!.cut( new this.$.$giper_baza_link( id ) )
		}

		/** Links a node back into a frame, at the place it used to have. */
		kid_put( host: string, id: string, at: number ) {

			const kids = this.node( host ).Kids( null )!
			const items = kids.items().filter( item => item.str !== id )
			const seat = Math.max( 0, Math.min( at < 0 ? items.length : at, items.length ) )

			kids.items([ ... items.slice( 0, seat ), new this.$.$giper_baza_link( id ), ... items.slice( seat ) ])
		}

		/** Remembers a node that has just been put into a frame. */
		record_kid( id: string, host: string ) {
			if( !id ) return
			const at = this.kids( host ).indexOf( id )
			this.record( '', ()=> this.kid_cut( host, id ), ()=> this.kid_put( host, id, at ) )
		}

		/** Places a new element inside `parent` and hands back its link. */
		@ $mol_action
		node_add( kind: string, parent: string, x: number, y: number, text: string ) {

			const host = parent || this.root_id()
			if( !host ) return ''

			const id = this.node_make( $bog_figmol_blocks.spec( kind, text ), host, x, y )
			this.record_kid( id, host )

			return id
		}

		/** Drops a whole section template onto the page and hands back its frame. */
		@ $mol_action
		section_add( id: string, parent: string, x: number, y: number ) {

			const host = parent || this.root_id()
			if( !host ) return ''

			const spec = $bog_figmol_blocks.section( id )
			if( !spec ) return ''

			const made = this.node_make( spec, host, x, y )
			this.record_kid( made, host )

			return made
		}

		/**
		 * Writes one node of a template and everything below it.
		 *
		 * Not an action of its own — it is meant to run inside the fiber of the
		 * one that called it, so a whole section is written as a single gesture.
		 * Children take their coordinates from the template, which only matters
		 * when their parent places them by hand.
		 */
		node_make( spec: $bog_figmol_blocks_spec, host: string, x: number, y: number ): string {

			const node = this.node( host ).Kids( null )!.make( null )
			const size = [ spec.w ?? 160, spec.h ?? 48 ]

			node.Kind( null )!.val( spec.kind )
			node.X( null )!.val( Math.round( x ) )
			node.Y( null )!.val( Math.round( y ) )
			node.W( null )!.val( Math.max( size_min, Math.round( size[ 0 ] ) ) )
			node.H( null )!.val( Math.max( size_min, Math.round( size[ 1 ] ) ) )

			if( spec.direction ) node.Direction( null )!.val( spec.direction )
			if( spec.gap !== undefined ) node.Gap( null )!.val( spec.gap )
			if( spec.padding !== undefined ) node.Padding( null )!.val( spec.padding )
			if( spec.align ) node.Align( null )!.val( spec.align )

			for( const [ key, val ] of Object.entries( spec.props ?? {} ) ) {
				if( val ) node.Props( null )!.key( key, null ).val( val )
			}

			const id = node.link().str

			for( const kid of spec.kids ?? [] ) this.node_make( kid, id, kid.x ?? 0, kid.y ?? 0 )

			return id
		}

		/**
		 * A node and everything below it as a plain template — the same shape the
		 * palette hands over, so copying is the very same write as dropping a
		 * section.
		 */
		node_spec( id: string, deep: number ): $bog_figmol_blocks_spec {

			const props = {} as Record< string, string >
			const dict = this.node( id ).Props()

			for( const key of dict?.keys() ?? [] ) {
				const name = String( key ?? '' )
				if( !name ) continue
				props[ name ] = String( dict!.key( key )?.val() ?? '' )
			}

			const rect = this.rect( id )

			return {
				kind: this.kind( id ),
				x: rect[ 0 ],
				y: rect[ 1 ],
				w: rect[ 2 ],
				h: rect[ 3 ],
				direction: this.direction( id ),
				gap: this.gap( id ),
				padding: this.padding( id ),
				align: this.align( id ),
				props,
				kids: deep >= depth_max ? [] : this.kids( id ).map( kid => this.node_spec( kid, deep + 1 ) ),
			}
		}

		/**
		 * Copies a node next to the original, subtree included, and hands back the
		 * copy. Inside an auto layout the offset is dropped — the frame places the
		 * copy itself, and shifted coordinates there would be a lie.
		 */
		@ $mol_action
		node_copy( id: string ) {

			const host = this.parent( id )
			if( !host ) return ''

			const spec = this.node_spec( id, 0 )
			const shift = this.flow( id ) ? 0 : step_copy

			const made = this.node_make( spec, host, this.x( id ) + shift, this.y( id ) + shift )
			this.record_kid( made, host )

			return made
		}

		/** Writes a rectangle, without a word to the journal. */
		rect_write( id: string, rect: readonly number[] ) {
			const node = this.node( id )
			node.X( null )!.val( rect[ 0 ] )
			node.Y( null )!.val( rect[ 1 ] )
			node.W( null )!.val( rect[ 2 ] )
			node.H( null )!.val( rect[ 3 ] )
		}

		@ $mol_action
		rect_set( id: string, rect: readonly number[] ) {

			const prev = this.rect( id )

			const next = [
				Math.round( rect[ 0 ] ),
				Math.round( rect[ 1 ] ),
				Math.max( size_min, Math.round( rect[ 2 ] ) ),
				Math.max( size_min, Math.round( rect[ 3 ] ) ),
			]

			if( next.every( ( val, at )=> val === prev[ at ] ) ) return

			this.rect_write( id, next )

			this.record( '', ()=> this.rect_write( id, prev ), ()=> this.rect_write( id, next ) )
		}

		/**
		 * Puts a node under `parent` at `index`, coordinates included, without a
		 * word to the journal.
		 *
		 * Reordering inside one frame goes through here too: the link is filtered
		 * out of the list and put back where it belongs, which is one code path
		 * instead of two and gives the same answer for both. The list is rewritten
		 * as a whole rather than moved unit by unit, so a reorder costs a couple of
		 * units per node — fine for a page, worth revisiting when pages get long.
		 */
		node_move( id: string, parent: string, index: number, x: number, y: number ) {

			const link = new this.$.$giper_baza_link( id )
			const from = this.parent( id )

			if( from && from !== parent ) this.node( from ).Kids( null )!.cut( link )

			const kids = this.node( parent ).Kids( null )!
			const items = kids.items().filter( item => item.str !== id )
			const at = Math.max( 0, Math.min( Math.round( index ), items.length ) )

			kids.items([ ... items.slice( 0, at ), link, ... items.slice( at ) ])

			const node = this.node( id )
			node.X( null )!.val( Math.round( x ) )
			node.Y( null )!.val( Math.round( y ) )
		}

		@ $mol_action
		node_reparent( id: string, parent: string, index: number, x: number, y: number ) {

			if( !id || !parent ) return
			if( this.inside( parent, id ) ) return

			const from = this.parent( id )
			const at = from ? this.kids( from ).indexOf( id ) : -1
			const back = [ this.x( id ), this.y( id ) ]

			this.node_move( id, parent, index, x, y )

			if( !from ) return

			this.record(
				'',
				()=> this.node_move( id, from, at, back[ 0 ], back[ 1 ] ),
				()=> this.node_move( id, parent, index, x, y ),
			)
		}

		/**
		 * Unlinks a node from its frame. The pawn itself stays where it is — the
		 * Baza is append-only — and so does everything below it, which is what
		 * makes undo cheap: the subtree is intact, only unreachable.
		 */
		@ $mol_action
		node_drop( id: string ) {

			const host = this.parent( id )
			if( !host ) return

			const at = this.kids( host ).indexOf( id )

			this.kid_cut( host, id )

			this.record( '', ()=> this.kid_put( host, id, at ), ()=> this.kid_cut( host, id ) )
		}

	}

}
