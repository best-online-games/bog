namespace $ {

	/** Deep enough for any hand drawn page, shallow enough to survive a link cycle. */
	const figmol_snap_depth = 24

	/**
	 * Reads a site out of the Baza into plain JSON.
	 *
	 * The generator itself never touches a Pawn: everything it needs arrives as
	 * an ordinary object, which is what lets it run in a test without a Land and
	 * makes an exported project reproducible from a saved snapshot alone.
	 *
	 * Every read here can suspend — a Land that is still syncing throws a promise
	 * — so call it from an atom or an action, never from a bare event handler.
	 */
	export class $bog_figmol_gen_snap {

		static site( site: $bog_figmol_schema_site ): $bog_figmol_gen_site {
			return {
				title: site.Title()?.val() ?? '',
				theme: this.dict( site.Theme() ),
				pages: ( site.Pages()?.remote_list() ?? [] ).map( page => this.page( page ) ),
			}
		}

		static page( page: $bog_figmol_schema_page ): $bog_figmol_gen_page {
			return {
				title: page.Title()?.val() ?? '',
				slug: page.Slug()?.val() ?? '',
				root: this.node( page.Root()?.remote() ?? null, 0 ),
			}
		}

		static node( node: $bog_figmol_schema_node | null, deep: number ): $bog_figmol_gen_node | null {

			if( !node ) return null
			if( deep >= figmol_snap_depth ) return null

			const kids = ( node.Kids()?.remote_list() ?? [] )
				.map( kid => this.node( kid, deep + 1 ) )
				.filter( kid => kid !== null ) as readonly $bog_figmol_gen_node[]

			return {
				kind: node.Kind()?.val() ?? 'rect',
				props: this.dict( node.Props() ),
				x: node.X()?.val() ?? 0,
				y: node.Y()?.val() ?? 0,
				w: node.W()?.val() ?? 0,
				h: node.H()?.val() ?? 0,
				direction: node.Direction()?.val() ?? '',
				gap: node.Gap()?.val() ?? 0,
				padding: node.Padding()?.val() ?? 0,
				align: node.Align()?.val() ?? '',
				kids,
			}
		}

		/** Text dictionary as a plain record. Absent means an empty one. */
		static dict( dict: { keys(): readonly unknown[], key( key: any ): { val(): unknown } | null } | null ) {

			const res: Record< string, string > = {}
			if( !dict ) return res

			for( const key of dict.keys() ) {
				const name = String( key ?? '' )
				if( !name ) continue
				const val = dict.key( key )?.val()
				res[ name ] = val === null || val === undefined ? '' : String( val )
			}

			return res
		}

	}

}
