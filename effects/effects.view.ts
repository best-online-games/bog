namespace $.$$ {

	// 01. Производное состояние — просто вычисление, без mem
	export class $bog_effects_demo01 extends $.$bog_effects_demo01 {
		full_name() {
			return `${ this.first_name() } ${ this.last_name() }`
		}
	}

	// 02. Кэш дорогого вычисления — mem и есть мемоизация
	export class $bog_effects_demo02 extends $.$bog_effects_demo02 {
		todos() {
			return [
				{ title: 'Купить молоко', done: true },
				{ title: 'Позвонить маме', done: false },
				{ title: 'Прочитать статью', done: false },
				{ title: 'Оплатить счета', done: true },
				{ title: 'Сходить в спортзал', done: false },
				{ title: 'Ответить на письма', done: true },
				{ title: 'Забронировать отель', done: false },
				{ title: 'Полить цветы', done: false },
			]
		}
		@ $mol_mem
		visible_todos() {
			let heavy = 0
			for( let i = 0; i < 5_000_000; i++ ) heavy += i
			console.log( 'recompute', heavy )
			const active = this.filter() === 'active'
			return this.todos()
				.filter( t => active ? !t.done : true )
				.map( t => `${ t.done ? '✓' : '○' } ${ t.title }` )
		}
		todo_rows() {
			return this.visible_todos().map( text => this.Row( text ) )
		}
		override row_title( key: string ) {
			return key
		}
	}

	// 03. Состояние на сущность — mem_key хранит черновик по ключу пользователя
	export class $bog_effects_demo03 extends $.$bog_effects_demo03 {
		@ $mol_mem_key
		comment( user: string, next?: string ) {
			return next ?? ''
		}
		@ $mol_mem
		current_comment( next?: string ) {
			return this.comment( this.user(), next )
		}
	}

	// 04. Согласование выбора со списком — selection выводится из списка
	export class $bog_effects_demo04 extends $.$bog_effects_demo04 {
		@ $mol_mem
		items( next?: { id: string, name: string }[] ) {
			return next ?? [
				{ id: '1', name: 'Молоко' },
				{ id: '2', name: 'Хлеб' },
				{ id: '3', name: 'Сыр' },
				{ id: '4', name: 'Яблоки' },
			]
		}
		@ $mol_mem
		selected_id( next?: string ) {
			return next ?? ''
		}
		selection() {
			return this.items().find( i => i.id === this.selected_id() ) ?? null
		}
		selection_label() {
			const s = this.selection()
			return s ? `Выбрано: ${ s.name }` : 'Ничего не выбрано'
		}
		item_rows() {
			return this.items().map( i => this.Row( i.id ) )
		}
		override item_name( id: string ) {
			return this.items().find( i => i.id === id )?.name ?? ''
		}
		@ $mol_action
		select( id: string, next?: any ) {
			this.selected_id( id )
			return next ?? null
		}
		@ $mol_action
		remove( id: string, next?: any ) {
			this.items( this.items().filter( i => i.id !== id ) )
			return next ?? null
		}
	}

	// 05. Общая логика обработчиков — обычный метод класса
	export class $bog_effects_demo05 extends $.$bog_effects_demo05 {
		product_title() {
			return 'Кофеварка — 4 990 ₽'
		}
		@ $mol_mem
		cart_count( next?: number ) {
			return next ?? 0
		}
		@ $mol_mem
		status( next?: string ) {
			return next ?? ''
		}
		buy() {
			this.cart_count( this.cart_count() + 1 )
			this.status( `В корзине товаров: ${ this.cart_count() }` )
		}
		@ $mol_action
		to_cart() {
			this.buy()
		}
		@ $mol_action
		buy_now() {
			this.buy()
			this.status( 'Переходим к оплате…' )
		}
	}

	// 06. Отправка формы — состояние отправки выводится из фибера
	export class $bog_effects_demo06 extends $.$bog_effects_demo06 {
		@ $mol_mem
		sending( next?: boolean ) {
			return next ?? false
		}
		@ $mol_mem
		count( next?: number ) {
			return next ?? 0
		}
		@ $mol_mem
		result( next?: string ) {
			return next ?? ''
		}
		can_submit() {
			return !this.sending()
		}
		override submit_title() {
			return this.sending() ? 'Отправка…' : 'Отправить'
		}
		@ $mol_action
		submit() {
			this.sending( true )
			this.$.$mol_wait_timeout( 800 )
			this.count( this.count() + 1 )
			this.result( `Создан пользователь #${ this.count() }` )
			this.sending( false )
		}
	}

	// 07. Один переход состояния вместо цепочки эффектов
	export class $bog_effects_demo07 extends $.$bog_effects_demo07 {
		@ $mol_mem
		game( next?: { round: number, gold: number, over: boolean } ) {
			return next ?? { round: 0, gold: 0, over: false }
		}
		next_state( g: { round: number, gold: number, over: boolean }, gold: boolean ) {
			const round = g.round + 1
			return { round, gold: g.gold + ( gold ? 1 : 0 ), over: round >= 5 }
		}
		playable() {
			return !this.game().over
		}
		score() {
			const g = this.game()
			return g.over
				? `Game over. Золотых карт: ${ g.gold } за ${ g.round } раундов`
				: `Раунд ${ g.round }/5, золотых: ${ g.gold }`
		}
		@ $mol_action
		place_card( gold: boolean ) {
			this.game( this.next_state( this.game(), gold ) )
		}
		@ $mol_action
		place_normal() {
			this.place_card( false )
		}
		@ $mol_action
		place_gold() {
			this.place_card( true )
		}
		@ $mol_action
		reset() {
			this.game( { round: 0, gold: 0, over: false } )
		}
	}

	// 08. Родитель узнаёт без уведомлений — двусторонний биндинг
	export class $bog_effects_demo08 extends $.$bog_effects_demo08 {
		light_status() {
			return this.light_on() ? 'Свет: включён' : 'Свет: выключен'
		}
	}

	// 09. Ленивая инициализация — панель не считается до раскрытия
	export class $bog_effects_demo09 extends $.$bog_effects_demo09 {
		@ $mol_mem
		revealed( next?: boolean ) {
			return next ?? false
		}
		@ $mol_mem
		visits() {
			console.log( 'init' )
			return Number( this.$.$mol_state_local.value( 'bog_effects_visits' ) ?? 0 )
		}
		visits_label() {
			return `Счётчик визитов: ${ this.visits() }`
		}
		@ $mol_mem
		panel_content() {
			return this.revealed() ? [ this.Visits() ] : []
		}
		@ $mol_action
		reveal() {
			const prev = Number( this.$.$mol_state_local.value( 'bog_effects_visits' ) ?? 0 )
			this.$.$mol_state_local.value( 'bog_effects_visits', prev + 1 )
			this.revealed( true )
		}
	}

	// 10. Внешний изменяемый источник как реактивное свойство
	export class $bog_effects_demo10 extends $.$bog_effects_demo10 {
		clock() {
			const now = this.$.$mol_state_time.now( 1000 )
			return new Date( now ).toLocaleTimeString( 'ru' )
		}
		@ $mol_mem
		online( next?: boolean ) {
			if( next !== undefined ) return next
			const win = this.$.$mol_dom_context
			win.ononline = ()=> this.online( true )
			win.onoffline = ()=> this.online( false )
			return win.navigator?.onLine ?? true
		}
		online_label() {
			return this.online() ? 'Сеть: онлайн' : 'Сеть: оффлайн'
		}
	}

	// 11. Зависимости считаются сами — тема не пересоздаёт соединение
	export class $bog_effects_demo11 extends $.$bog_effects_demo11 {
		reconnect_seq = 0
		@ $mol_mem
		connection() {
			const room = this.room()
			const n = this.reconnect_seq += 1
			console.log( `connect ${ room } #${ n }` )
			const conn = new $mol_object2
			conn.destructor = () => console.log( `disconnect ${ room } #${ n }` )
			return Object.assign( conn, { room, n } )
		}
		notice() {
			const c = this.connection()
			return `Комната «${ c.room }», тема: ${ this.theme() }`
		}
		reconnects_label() {
			return `Переподключений: ${ this.connection().n }`
		}
	}

	// 12. Загрузка данных — устаревший фибер отменяется
	export class $bog_effects_demo12 extends $.$bog_effects_demo12 {
		done_seq = 0
		products() {
			return [
				'Наушники', 'Клавиатура', 'Мышь', 'Монитор', 'Веб-камера',
				'Микрофон', 'Колонки', 'Роутер', 'Флешка', 'Кабель',
				'Зарядка', 'Powerbank', 'Планшет', 'Стилус', 'Чехол',
			]
		}
		@ $mol_mem
		search() {
			const q = this.query().trim().toLowerCase()
			if( !q ) return { list: [] as string[], done: this.done_seq }
			this.$.$mol_wait_timeout( 600 )
			this.done_seq += 1
			const list = this.products().filter( p => p.toLowerCase().includes( q ) )
			return { list, done: this.done_seq }
		}
		result_rows() {
			return this.search().list.map( name => this.Row( name ) )
		}
		override row_title( key: string ) {
			return key
		}
		done_label() {
			return `Завершено запросов: ${ this.search().done }`
		}
	}

}
