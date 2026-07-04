namespace $ {

	/**
	 * Рабочий baza-master экосистемы bog. Bundled seed (giper/baza peer.baza)
	 * может указывать на недоступный хост — добавляем актуальный явно,
	 * чтобы виджет фидбека работал в любом приложении без своего boot-кода.
	 */
	export const $bog_feedback2_master = 'https://baza.87.120.36.150.ip.giper.dev/'
	if( !$giper_baza_yard.masters_default.includes( $bog_feedback2_master ) ) {
		$giper_baza_yard.masters_default.push( $bog_feedback2_master )
	}

	/** Отдельный отзыв пользователя. Ключ в dict — lord string. */
	export class $bog_feedback2_entry extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Contact: $giper_baza_atom_text,
		Reply: $giper_baza_atom_text,
		Reply_author: $giper_baza_atom_text,
		Reply_created: $giper_baza_atom_real,
	}) {}

}
