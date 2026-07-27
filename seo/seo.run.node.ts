namespace $ {

	setTimeout( ()=> {
		const server = new $bog_seo()
		const dump_dir = process.env.BOG_SEO_DUMP_DIR
		if( dump_dir ) {
			// One-shot dump: exit once written, otherwise the headless browser keeps
			// the event loop alive forever and the (CI) process would hang.
			Promise.resolve( $mol_wire_async( server ).dump_to( dump_dir ) ).then(
				()=> process.exit( 0 ),
				( error )=> { console.error( error ); process.exit( 1 ) },
			)
			return
		}
		server.http()
		if( server.warmup_enabled() ) {
			$mol_wire_async( server ).crawl_all()
		}
	} )

}
