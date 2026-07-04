namespace $.$$ {
	const Entries_dict = $giper_baza_dict_to($bog_feedback2_entry)
	const Registry_dict = $giper_baza_dict_to($giper_baza_atom_text)

	export class $bog_feedback2_form extends $.$bog_feedback2_form {
		registry_land() {
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(this.registry_link()))
		}

		registry_dict() {
			return this.registry_land().Data(Registry_dict)
		}

		my_pass() {
			return this.$.$giper_baza_auth.current().pass()
		}

		my_lord() {
			return this.my_pass().lord().str
		}

		/** Ссылка на feedback land: из URL (приоритет) или из реестра */
		feedback_land_link(): string | null {
			const from_arg = this.$.$mol_state_arg.value('land')
			if (from_arg) return from_arg
			return this.registry_dict().key(this.feedback_id())?.val() ?? null
		}

		land() {
			const link = this.feedback_land_link()
			if (link) return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
			// Реестр с пресетом [null, post]: ленд для нового feedback_id создаёт
			// ПЕРВЫЙ посетитель, заход владельца не нужен. На старом read-only
			// реестре запись доступна только владельцу — поведение как раньше.
			if (!this.can_registry_post()) return null
			return this.land_ensure()
		}

		/** Хватает ли прав записать ссылку нового ленда в реестр. */
		can_registry_post() {
			const rank = this.registry_land().pass_rank(this.my_pass())
			return $giper_baza_rank_tier_of(rank) >= $giper_baza_rank_tier.post
		}

		@$mol_action
		land_ensure() {
			const land = this.$.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]])
			const link = land.link().str
			const entry = this.registry_dict().key(this.feedback_id(), 'auto')
			if( entry ) entry.val(link)
			return land
		}

		entries_dict() {
			return this.land()?.Data(Entries_dict) ?? null
		}

		is_owner() {
			const rank = this.registry_land().pass_rank(this.my_pass())
			return $giper_baza_rank_tier_of(rank) >= $giper_baza_rank_tier.rule
		}

		is_configured() {
			return !!this.registry_link()
		}

		entry_mine() {
			return this.entries_dict()?.key(this.my_lord()) ?? null
		}

		@$mol_action
		entry_mine_or_create() {
			return this.entries_dict()?.key(this.my_lord(), 'auto') ?? null
		}

		prompt() {
			return [
				'**Tell us what you think:**',
				'- What did you **like**?',
				'- What could be done **better**?',
				'- Any **suggestions** for the future?',
			].join('\n')
		}

		@$mol_mem
		draft_text(next?: string) {
			if (next !== undefined) return next
			const entry = this.entry_mine()
			return entry?.Text()?.val() ?? ''
		}

		@$mol_mem
		draft_contact(next?: string) {
			if (next !== undefined) return next
			const entry = this.entry_mine()
			return entry?.Contact()?.val() ?? ''
		}

		has_entry() {
			return !!this.entry_mine()
		}

		submit_title() {
			return this.has_entry() ? 'Update feedback' : 'Send feedback'
		}

		@$mol_action
		submit() {
			const text = this.draft_text()
			const contact = this.draft_contact()
			if (!text) return
			const entry = this.entry_mine_or_create()
			if (!entry) return
			entry.Text('auto')!.val(text)
			if (contact) entry.Contact('auto')!.val(contact)
		}

		body() {
			if (!this.is_configured()) return [this.Not_configured()]
			if (!this.land()) return [this.Waiting()]
			return [
				this.Prompt(),
				this.Entry_my(),
				this.Contact_field(),
				this.Submit(),
				this.Entries(),
			]
		}

		all_lords() {
			const raw = this.entries_dict()?.keys() ?? []
			const lords = Array.from(raw).map(l => String(l))
			const mine = this.my_lord()
			if (!mine) return lords
			const idx = lords.indexOf(mine)
			if (idx <= 0) return lords
			return [mine, ...lords.slice(0, idx), ...lords.slice(idx + 1)]
		}

		entry_rows() {
			return this.all_lords().map((_: any, i: number) => this.Entry_row(i))
		}

		private entry_by_index(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return null
			return this.entries_dict()?.key(lord) ?? null
		}

		private entry_by_index_or_create(index: number) {
			const lord = this.all_lords()[index]
			if (!lord) return null
			return this.entries_dict()?.key(lord, 'auto') ?? null
		}

		entry_row_text(index: number) {
			return this.entry_by_index(index)?.Text()?.val() ?? ''
		}

		entry_row_contact(index: number) {
			return this.entry_by_index(index)?.Contact()?.val() ?? 'Anonymous'
		}

		entry_row_has_reply(index: number) {
			return !!this.entry_by_index(index)?.Reply()?.val()
		}

		entry_row_reply_text(index: number) {
			return this.entry_by_index(index)?.Reply()?.val() ?? ''
		}

		@$mol_mem_key
		entry_row_reply_form_open(index: number, next?: boolean): boolean {
			return next ?? false
		}

		@$mol_mem_key
		entry_row_reply_draft(index: number, next?: string): string {
			if (next !== undefined) return next
			return this.entry_by_index(index)?.Reply()?.val() ?? ''
		}

		entry_row_reply_submit_title(index: number) {
			return this.entry_row_has_reply(index) ? 'Update reply' : 'Send reply'
		}

		entry_row_reply_toggle_title(index: number) {
			if (this.entry_row_has_reply(index)) return 'Edit reply'
			return this.entry_row_reply_form_open(index) ? 'Cancel' : 'Reply'
		}

		@$mol_action
		entry_row_reply_toggle(index: number) {
			const open = this.entry_row_reply_form_open(index)
			this.entry_row_reply_form_open(index, !open)
		}

		@$mol_action
		entry_row_reply_submit(index: number) {
			if (!this.is_owner()) return
			const text = this.entry_row_reply_draft(index).trim()
			if (!text) return
			const entry = this.entry_by_index_or_create(index)
			if (!entry) return
			entry.Reply('auto')!.val(text)
			entry.Reply_author('auto')!.val(this.my_lord())
			entry.Reply_created('auto')!.val(Date.now())
			this.entry_row_reply_form_open(index, false)
		}

		entry_row_reply_sub(index: number): readonly any[] {
			const items: any[] = []
			const has_reply = this.entry_row_has_reply(index)
			if (has_reply) items.push(this.Entry_row_reply_display(index))
			if (!this.is_owner()) return items
			if (this.entry_row_reply_form_open(index)) {
				items.push(this.Entry_row_reply_form(index))
			}
			items.push(this.Entry_row_reply_toggle(index))
			return items
		}
	}
}
