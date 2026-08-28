# Transferum vs $mol_wire

Сравнение статьи [«Разработка TypeScript-библиотеки для построения реактивных графов распространения и обработки данных»](https://habr.com/ru/articles/1061630/) (Smoren, библиотека [transferum-ts](https://github.com/Smoren/transferum-ts)) с тем, как те же задачи решены в `$mol_wire` — по статье [«Проектируем идеальную систему реактивности»](https://habr.com/ru/articles/673138/) (черновик: [HabHub#48](https://github.com/nin-jin/HabHub/issues/48)) и по исходникам `mol/wire` в этом репо. Разбор Transferum — по коду v1.3.0, не по пересказу.

## В двух словах

Обе библиотеки решают один список проблем: push против pull, смешение sync/async, динамическая топология, управление подписками и ресурсами. Но относятся к разным категориям инструментов. Transferum описывает, **как данные движутся** между компонентами: программист руками создаёт узлы (трансферы) и рисует рёбра (мосты). `$mol_wire` описывает, **что от чего зависит**: граф строится сам по факту чтения состояний внутри вычислений, а рантайм решает, когда и что пересчитывать.

Из этой развилки следует почти всё остальное: где в Transferum отдельный класс узла и фабрика, в `$mol_wire` — обычный код с декоратором.

## Концепты Transferum → как в $mol_wire

**Узлы-трансферы** (31 класс, 52 фабрики `create*`)
- Transferum: каждый вид узла — отдельный класс: `PushChannelTransfer`, `DebounceTransfer`, `AsyncPollingSourceTransfer`…
- $mol_wire: узел возникает неявно, любой метод под `@$mol_mem` — атом с кешем, подписками и деструктором. Один декоратор вместо выбора из 31 класса.

**Мосты / `linkTransfers`**
- Transferum: `if`-каскад по capability-флагам (`utils.ts:52`), 10 стратегий проводки; реактивность = `lhs.subscribe(d => rhs.push(d))`, каждое ребро рисуется руками.
- $mol_wire: рёбра создаются автоматически — publisher при чтении зовёт `promote()`, текущий подписчик линкуется (`mol/wire/pub/pub.ts:81`). Дифф по курсору переиспользует старые рёбра и отписывает лишние (`sub.ts:44-160`).

**Capability-флаги** (`isPushable`, `isPullable`, `isSubscribable`… ~14 шт)
- Transferum: runtime — boolean-поля на `BaseTransfer`; compile-time — 64 интерфейса с сужением флага до литерала `true`.
- $mol_wire: флагов нет. «Способности» канала выражаются телом функции: read-only, write-only или полный геттер-сеттер. Подписываемость даёт пара `Pub`/`Sub` (`promote()`/`emit()`).

**Push**
- Transferum: синхронный каскад в глубину: `push` → `sendState` → `forEach` по listener'ам → `push` следующего. Значение течёт по графу немедленно.
- $mol_wire: push распространяет только статус, не значение: прямые зависимости помечаются `stale`, транзитивные `doubt` (`sub.ts:188`). Пересчёт откладывается до чтения.

**Pull**
- Transferum: `pull()` = вызвать фетчер прямо сейчас (`transfers.ts:1112`), без кеша и инвалидации.
- $mol_wire: pull = ленивое вычисление с кешем: `fresh` — вернуть кеш; `doubt` — опросить зависимости и пересчитать только если что-то реально изменилось (`fiber.ts:147-241`).

**Polling** (тикеры RAF/interval)
- Transferum: активный опрос по расписанию, тикает даже без подписчиков.
- $mol_wire: инварианты пересчитываются по факту чтения; периодика при нужде — атом от `$mol_state_time`. Без потребителей ничего не вычисляется.

**Динамический роутинг** (`BridgeSelector`, `createPassBridge`, `select`/`check`/`uncheck`)
- Transferum: отдельная подсистема: заранее создать все мосты, активировать нужный по ключу.
- $mol_wire: обычный `switch`/`if` внутри вычисления. Поменялось условие — трекинг сам перецепил рёбра на следующем пересчёте, отдельного механизма нет.

**Операторы** (map/filter/reduce, 9 шт)
- Transferum: stateless-обёртки, подключаются через `ConvertTransfer`.
- $mol_wire: обычные выражения в теле метода.

**Билдеры** (1060 строк)
- Transferum: fluent-конструкторы пайплайнов, отслеживают owned-ресурсы.
- $mol_wire: не нужны, композиция = вызовы методов.

**Ошибки** (`onError`, `onAcceptError`… по узлу)
- Transferum: локальные хендлеры; без хендлера — проброс; поллер без `onError` останавливает тикер.
- $mol_wire: ошибка — значение: кешируется как результат (`fiber.ts:200`), при чтении ре-throw (`$mol_fail_hidden`), ловится обычным try-catch у потребителя. Не пересчитывается до инвалидации.

**Backpressure** (`maxConcurrency`, `bufferSize`, `onBufferOverflow`)
- Transferum: очереди и лимит параллелизма на 4 async-классах.
- $mol_wire: прямого аналога нет. Стратегия другая: новое вычисление отменяет устаревшее (`$mol_wire_async` убивает прошлый fiber, `async.ts:19`), очередь не копится.

**Владение / `destroy()`**
- Transferum: явная модель: `unsubscribe`/`destroy` руками, `owned`-ресурсы в билдерах. Узел без подписчиков живёт (объект, буфер, тикер), пока не убьёшь.
- $mol_wire: автоматическая: ноль подписчиков → `reap()` → деструктор (`pub.ts:69`, `atom.ts:106`). Владеемые объекты уничтожаются детерминированно через `$mol_owning`, без опоры на GC.

## Аспекты реактивности из issue #48 → что в Transferum

**Origin: pull для инвариантов, push для событий**
- $mol_wire: гибрид в одной абстракции канала: push помечает статусы, pull лениво пересчитывает.
- Transferum: гибрид тоже заявлен, но push = немедленный каскад значений, pull = немедленный фетч. Ленивых инвариантов нет.

**Multiplexing / Keys** (`@$mol_mem_key`, `$mol_key`)
- $mol_wire: словарь атомов по сериализованному ключу, общая логика на неограниченный набор каналов.
- Transferum: аналога нет, однотипные узлы создаются по одному.

**Factory / жизненный цикл**
- $mol_wire: фабрика-канал создаёт и мемоизирует объект, деструктор зовётся сам, когда объект не нужен по графу.
- Transferum: создание руками, уничтожение руками (`destroy()`).

**Dupes: дедупликация значений**
- $mol_wire: `$mol_compare_deep` в `atom.put()`: структурно равное значение не будит подписчиков (`atom.ts:155`).
- Transferum: нет: `sendState` не сравнивает old/new, шлёт всегда (глушится только `undefined`). Нет и аналога `distinctUntilChanged` в операторах.

**Мемоизация вычислений**
- $mol_wire: кеш в каждом fiber, пересчёт только по инвалидации.
- Transferum: нет, `ConvertTransfer` гоняет оператор на каждый push.

**Tonus: ленивость**
- $mol_wire: без подписчиков ничего не вычисляется; невидимый рендер замирает.
- Transferum: рассылка без подписчиков не идёт, но поллеры тикают и фетчат независимо от потребителей.

**Order: glitch-free**
- $mol_wire: 4 статуса (`stale`/`doubt`/`fresh`/`final`), пересчёт при чтении после актуализации всех входов, промежуточное состояние ненаблюдаемо.
- Transferum: не решён, синхронный DFS-обход. На алмазе A→{B,C}→D узел D срабатывает дважды, первый раз с промежуточным состоянием. Топосортировки и батчинга нет.

**Error: ошибки как значения**
- $mol_wire: Result/Error/Promise в одном кеше, нормализация throw/return.
- Transferum: иначе, но продуманно: локальные хендлеры по узлам, защита от зомби-тикеров. Известный косяк: async-push без `onError` → unhandled rejection (задокументирован в коде).

**Extern: sync↔async без цветных функций**
- $mol_wire: SuspenseAPI (throw Promise + идемпотентный перезапуск), `$mol_wire_sync`/`$mol_wire_async`.
- Transferum: sync и async — параллельные наборы классов (Async-дубли), смешение через приоритеты в `linkTransfers`.

**Concurrency / Abort**
- $mol_wire: новый запуск отменяет предыдущий, abort внешних запросов через `destructor` владеемого объекта.
- Transferum: отмены нет: `AbortController` в коде не используется, протухший запрос доедет и опубликуется.

**Cycle: циклические зависимости**
- $mol_wire: мгновенный `Error: Circular subscription` вместо зависания.
- Transferum: отдельно не проверялось; защиты в просмотренном коде не встретилось.

**Economy**
- $mol_wire: fiber 64 байта, 3 аллокации, связи в одном плоском массиве, O(1) отписка. Ядро ≈1000 строк, `mol_wire_lib` 7 КБ min+gz.
- Transferum: объект + буфер + тикер на узел; 8393 строки src, 64 интерфейса. Зато 0 зависимостей и tree-shaking.

**Debug**
- $mol_wire: семантичные имена объектов (`app.account(1).task(456)`), custom formatters в DevTools.
- Transferum: специальных средств не встретилось.

## Что в Transferum сделано хорошо

Для честного сравнения — сильные стороны, которых у ручной модели не отнять:

- Капабилити-типизация работает по-настоящему: вызвать `push()` на узле без `isPushable` — ошибка компиляции, не рантайма. Мосты диспетчеризуются по флагам, не по `instanceof`, новый узел не трогает чужой код.
- Backpressure из коробки (`maxConcurrency`/`bufferSize`) — этого нет ни в `$mol_wire`, ни в большинстве реактивных либ. В wire вместо очередей отмена устаревшего, это другой трейд-офф, а не строгое превосходство.
- Обработка ошибок гранулярная и с защитой от зомби-тикеров.
- Ноль зависимостей, MIT, полное покрытие тестами.

Цена — площадь API: 31 класс, 52 фабрики, 64 интерфейса, 8393 строки. То, что в wire выражается одним `@$mol_mem`-методом, здесь требует выбрать правильный класс, обернуть фабрикой и связать мостом.

## Контраст на примере роутинга из статьи

Transferum (пример из статьи, все мосты создаются заранее):

```typescript
const commandRouter = createBridgeSelector({
  bridges: {
    light: createPassBridge({ source: commandChannel, target: lightController }),
    thermostat: createPassBridge({ source: commandChannel, target: thermostatController }),
    lock: createPassBridge({ source: commandChannel, target: lockController }),
  },
  initialKey: 'thermostat',
})
commandRouter.select('lock')
```

`$mol_wire` — роутинг это просто код, рёбра перецепляет трекинг:

```typescript
class Home extends $mol_object2 {

  @ $mol_mem
  mode( next = 'thermostat' ) { return next }

  controller() {
    switch( this.mode() ) {
      case 'light': return this.light()
      case 'thermostat': return this.thermostat()
      default: return this.lock()
    }
  }

}
```

## Бонус: находка для автора 

`AsyncConvertTransfer._process` (`transfers.ts:3146`) при `maxConcurrency > 1` пишет результаты параллельных операций в общий `this._state.value` и сразу рассылает. Порядок эмиссии не гарантирован: результат более старого запроса может опубликоваться после более нового. Sequence-guard'а нет, в README не описано. Можно оформить доброжелательный issue — полезнее любого спора в комментах.


## Источники

- Статья Transferum: https://habr.com/ru/articles/1061630/
- Код Transferum v1.3.0: https://github.com/Smoren/transferum-ts (разбирался клон, 8393 строки src)
- Дизайн $mol_wire: https://habr.com/ru/articles/673138/ (черновик: https://github.com/nin-jin/HabHub/issues/48)
- Код $mol_wire: `mol/wire/` в этом репо (pub 131 строка, sub 232, fiber 346, atom 194)
- npm: https://www.npmjs.com/package/mol_wire_lib
