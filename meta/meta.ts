namespace $ {

	export interface $bog_meta_alternate {
		/** BCP-47-ish language code, or 'x-default'. */
		lang: string
		/** Absolute URL of the localized page. */
		href: string
	}

	export interface $bog_meta_data {
		title?: string
		description?: string
		canonical?: string
		og_title?: string
		og_description?: string
		og_image?: string
		og_type?: string
		/** hreflang alternates, emitted as <link rel="alternate" hreflang=…>. */
		alternates?: $bog_meta_alternate[]
	}

	export const $bog_meta_attr_name = 'data-bog-meta'

	export function $bog_meta_compact( data: $bog_meta_data | undefined ): $bog_meta_data | null {
		if( !data ) return null
		const out: $bog_meta_data = {}
		let any = false
		for( const k of Object.keys( data ) as ( keyof $bog_meta_data )[] ) {
			const v = data[ k ]
			if( v == null ) continue
			if( typeof v === 'string' && v.length === 0 ) continue
			if( Array.isArray( v ) && v.length === 0 ) continue
			out[ k ] = v as any
			any = true
		}
		return any ? out : null
	}

	export function $bog_meta_attr( view: { meta?(): $bog_meta_data } ): Record< string, any > {
		if( typeof view.meta !== 'function' ) return {}
		const compact = $bog_meta_compact( view.meta() )
		if( !compact ) return {}
		return { [ $bog_meta_attr_name ]: JSON.stringify( compact ) }
	}

	export function $bog_meta_merge( base: $bog_meta_data, override: $bog_meta_data ): $bog_meta_data {
		return { ... base, ... override }
	}

}
