namespace $.$$ {
	// Синхронизация через Гипер Базу отключена: список мастеров пустой.
	// Чистки одного masters_default мало — masters() склеивает его с пирами
	// из бандленного сида, где зашит публичный мастер. Глушим сам masters().
	$giper_baza_yard.masters_default.length = 0
	$giper_baza_yard.masters = (): string[] => []


	/**
	 * Одноразовый bootstrap реестра feedback2 — на случай «мастер умер /
	 * реестр потерян». Открой под своим основным аккаунтом (он станет
	 * владельцем: только owner отвечает на отзывы), нажми кнопку, дождись
	 * синка, перенеси link и registry.baza в репу.
	 *
	 * Пресет реестра — [null, post('just')]: записать ссылку нового ленда
	 * может первый посетитель любой формы, заход владельца не нужен.
	 */
	export class $bog_feedback2_init extends $.$bog_feedback2_init {

		lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		guide() {
			return [
				'1. Нажми «Создать новый реестр» (PoW пару секунд).',
				'2. Впиши напечатанный link в `registry_link` в `form/form.view.tree`.',
				'3. Скачай `registry.baza` и замени им файл в `bog/feedback2/`.',
				'4. Держи вкладку открытой, пока статус синка не станет зелёным —',
				'реестр должен доехать до мастера.',
			].join('\n')
		}

		@$mol_mem
		registry_link(next?: string): string {
			return next ?? ''
		}

		@$mol_action
		make() {
			const land = this.$.$giper_baza_glob.land_grab([[ null, $giper_baza_rank_post('just') ]])
			// Сразу персистим юниты в mine: свежий ленд никем не наблюдается,
			// wire может собрать инстанс вместе с юнитами до первого sync.
			land.sync()
			this.registry_link(land.link().str)
		}

		/**
		 * Держим ленд наблюдаемым, пока вкладка открыта: иначе wire собирает
		 * его и push на мастер обрывается. Заодно реактивный счётчик юнитов.
		 */
		registry_units() {
			const link = this.registry_link()
			if (!link) return 0
			const land = this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
			land.sync()
			return land.diff_units().length
		}

		result() {
			const link = this.registry_link()
			if (!link) return ''
			return [
				`**registry_link:** \`${link}\` (юнитов: ${this.registry_units()})`,
				'',
				'Теперь скачай pack и положи его в `bog/feedback2/registry.baza`.',
				'Вкладку не закрывай, пока реестр не уедет на мастер.',
			].join('\n')
		}

		Result(): any {
			if (!this.registry_link()) return null
			return super.Result()
		}

		Download(): any {
			if (!this.registry_link()) return null
			return super.Download()
		}

		@$mol_action
		download() {
			const str = this.registry_link()
			if (!str) return
			const land = this.$.$giper_baza_glob.Land(new $giper_baza_link(str))
			const pack = $giper_baza_pack.make([
				[ str, $giper_baza_pack_part.from(land.diff_units(), land.faces) ],
			])
			const url = URL.createObjectURL(pack.toBlob())
			const a = document.createElement('a')
			a.href = url
			a.download = 'registry.baza'
			document.body.appendChild(a)
			a.click()
			a.remove()
			setTimeout(() => URL.revokeObjectURL(url), 1000)
		}

	}

}
