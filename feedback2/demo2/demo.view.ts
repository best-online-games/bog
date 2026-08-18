namespace $.$$ {
	// Синхронизация через Гипер Базу отключена: список мастеров пустой.
	// Чистки одного masters_default мало — masters() склеивает его с пирами
	// из бандленного сида, где зашит публичный мастер. Глушим сам masters().
	$giper_baza_yard.masters_default.length = 0
	$giper_baza_yard.masters = (): string[] => []

	export class $bog_feedback2_demo2 extends $.$bog_feedback2_demo {}
}
