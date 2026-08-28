# Обновление Гипер Базы systemd-таймером вместо watchtower

Стоит на `87.120.36.150`. Обновляет **только контейнер базы** и не трогает ничего другого в докере.

## Зачем не watchtower

На этой машине рядом с базой живёт VPN: `3x-ui`, `xray`, `nginx` с SNI-роутингом. Watchtower обновляет все контейнеры подряд, а в стандартном compose Гипер Базы он ещё и запускается с `--remove-volumes`. Один автоматический перезапуск не того контейнера — и у людей отваливается связь.

Плюс машина слабая: 1 ядро, 960 МБ памяти, из которых свободно меньше сотни. Watchtower висит в памяти постоянно, таймер же запускается по расписанию и сразу завершается.

## Скрипт

`/usr/local/bin/baza-update.sh`

```bash
#!/bin/bash
# Обновляет только контейнер базы. Ни caddy, ни 3x-ui, ни xray не трогает —
# на этой машине они держат VPN, и их перезапуск роняет людям связь.
set -u
cd /root/baza/app/run || exit 1

# Место кончилось — pull забьёт диск и сломает всё, включая VPN.
free_mb=$( df -Pm / | awk 'NR==2{print $4}' )
if [ "$free_mb" -lt 700 ]; then
	echo "$( date -Is ) пропуск: на диске $free_mb МБ"
	exit 0
fi

before=$( docker inspect --format '{{.Image}}' run-baza-1 2>/dev/null )
docker compose pull baza > /dev/null 2>&1 || { echo "$( date -Is ) pull не удался"; exit 0; }

docker compose up -d baza > /dev/null 2>&1
sleep 20

now=$( docker inspect --format '{{.Image}}' run-baza-1 2>/dev/null )
if [ "$before" != "$now" ]; then
	echo "$( date -Is ) обновлено"
	docker image prune -f > /dev/null 2>&1
else
	echo "$( date -Is ) без изменений"
fi

# Проверяем, что база поднялась: молчаливое падение хуже устаревшей версии.
if ! ss -ltn 2>/dev/null | grep -q ':9090'; then
	echo "$( date -Is ) ВНИМАНИЕ: порт 9090 не слушается после обновления"
fi
```

Три вещи, ради которых он не сводится к `docker compose pull && up`:

- **порог по диску** — если места меньше 700 МБ, обновление пропускается: забитый диск положит и VPN тоже;
- **проверка, что база поднялась** — после обновления смотрит, слушается ли порт, и пишет предупреждение в журнал;
- **чистка старых образов** только когда обновление реально произошло, а не при каждом запуске.

## Юнит

`/etc/systemd/system/baza-update.service`

```ini
[Unit]
Description=Обновление контейнера Гипер Базы (только baza)
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/baza-update.sh
```

## Таймер

`/etc/systemd/system/baza-update.timer`

```ini
[Unit]
Description=Проверять обновления Гипер Базы каждые 6 часов

[Timer]
OnBootSec=15min
OnUnitActiveSec=6h
RandomizedDelaySec=30min
Persistent=true

[Install]
WantedBy=timers.target
```

`RandomizedDelaySec` разводит запуск с другими задачами, `Persistent` догоняет пропущенный запуск после простоя машины.

## Установка

```bash
chmod +x /usr/local/bin/baza-update.sh
systemctl daemon-reload
systemctl enable --now baza-update.timer
```

## Эксплуатация

```bash
systemctl list-timers baza-update.timer   # когда следующий запуск
systemctl start baza-update.service       # обновить прямо сейчас
journalctl -u baza-update.service         # история обновлений
```

В compose при этом watchtower отключён:

```yaml
watchtower:
  profiles: [ "disabled" ]
```
