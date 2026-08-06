# Figmol OAuth proxy

One endpoint, no state, no dependencies. The browser cannot finish the GitHub
OAuth dance on its own — the last step needs the client secret — so that single
request happens here and nothing else does.

```
POST /exchange  { "code": "...", "redirect_uri": "..." }  ->  { "access_token", "scope", "token_type" }
GET  /health                                              ->  { "ok": true, ... }
```

The token is handed back to the caller and forgotten in the same tick. Neither
the code nor the token is written to the log.

The editor talks to it through `$bog_figmol_deploy_github.oauth_token( proxy, code )`.
Until an OAuth App is registered the editor takes a personal access token
instead, and the proxy is not involved at all.

## Environment

| Variable | Meaning |
| --- | --- |
| `FIGMOL_OAUTH_CLIENT_ID` | Client id of the GitHub OAuth App |
| `FIGMOL_OAUTH_CLIENT_SECRET` | Its client secret |
| `FIGMOL_OAUTH_ORIGINS` | Comma separated origins allowed to call `/exchange` |
| `FIGMOL_OAUTH_PORT` | Port to listen on, `9093` by default |

`FIGMOL_OAUTH_ORIGINS` is both the CORS allowlist and the allowlist for
`redirect_uri`: a redirect to anywhere else would hand the token to a stranger.
With no origins configured every `/exchange` is refused, which is the safe way
around for a proxy that has not been set up yet.

Example:

```
FIGMOL_OAUTH_ORIGINS=https://b-on-g.github.io,http://localhost:9080
```

## The GitHub OAuth App

Register at https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**.

- **Application name** — `Figmol`
- **Homepage URL** — where the editor lives, e.g. `https://b-on-g.github.io/figmol/`
- **Authorization callback URL** — the editor page that reads `?code=`, e.g.
  `https://b-on-g.github.io/figmol/` (one entry only; add a second app for local
  development against `http://localhost:9080/bog/figmol/app/-/index.html`)

Then generate a client secret and put both values into the environment above.

Scopes are asked for at authorization time, not at registration: the editor
requests `repo workflow`. `workflow` is not optional — the pushed files include
`.github/workflows/deploy.yml`, and GitHub refuses a workflow file from a token
that only carries `repo`.

## Running it

Locally:

```bash
FIGMOL_OAUTH_CLIENT_ID=Iv1_xxx \
FIGMOL_OAUTH_CLIENT_SECRET=yyy \
FIGMOL_OAUTH_ORIGINS=http://localhost:9080 \
node bog/figmol/server/oauth.mjs
```

In Docker:

```bash
cd bog/figmol/server
printf 'FIGMOL_OAUTH_CLIENT_ID=Iv1_xxx\nFIGMOL_OAUTH_CLIENT_SECRET=yyy\nFIGMOL_OAUTH_ORIGINS=https://b-on-g.github.io\n' > .env
docker compose up -d --build
curl -s localhost:9093/health
```

## On 87.120.36.150

The host runs Meridian, so `:443` is an nginx stream SNI router and the only
safe way in is the extension points it leaves alone. Same recipe as `baza` and
`tube` — see the `giper_baza_deploy_behind_meridian` notes for the full picture.

```bash
scp -r bog/figmol/server root@87.120.36.150:/root/figmol-oauth
ssh root@87.120.36.150
cd /root/figmol-oauth && docker compose up -d --build
```

Domain `figmol-oauth.87.120.36.150.ip.giper.dev`:

1. SNI route — `/etc/nginx/stream.d/relay-maps/figmol.conf`:

   ```
   figmol-oauth.87.120.36.150.ip.giper.dev  nginx_https;
   ```

2. Virtual host — `/etc/nginx/conf.d/z-figmol.conf`. **The `z-` prefix is not
   cosmetic**: a file sorting before `meridian-http.conf` becomes the default
   server on `127.0.0.1:8443` and breaks every VLESS client on the box.

   ```nginx
   server {
       listen 80;
       server_name figmol-oauth.87.120.36.150.ip.giper.dev;
       location /.well-known/acme-challenge/ { root /var/www/acme; }
       location / { return 301 https://$host$request_uri; }
   }

   server {
       listen 127.0.0.1:8443 ssl;
       http2 on;
       server_name figmol-oauth.87.120.36.150.ip.giper.dev;
       ssl_certificate     /etc/ssl/figmol/fullchain.pem;
       ssl_certificate_key /etc/ssl/figmol/key.pem;
       ssl_protocols TLSv1.2 TLSv1.3;
       client_max_body_size 16k;

       location / {
           proxy_pass http://127.0.0.1:9093;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto https;
       }
   }
   ```

3. Certificate via the acme.sh webroot Meridian already uses:

   ```bash
   mkdir -p /etc/ssl/figmol
   /root/.acme.sh/acme.sh --issue --server letsencrypt \
       -d figmol-oauth.87.120.36.150.ip.giper.dev -w /var/www/acme

   ARGS=(--install-cert -d figmol-oauth.87.120.36.150.ip.giper.dev)
   ARGS+=(--fullchain-file /etc/ssl/figmol/fullchain.pem)
   ARGS+=(--key-file /etc/ssl/figmol/key.pem)
   ARGS+=(--reloadcmd 'nginx -t && systemctl reload nginx')
   /root/.acme.sh/acme.sh "${ARGS[@]}"
   ```

A Meridian deploy wipes `conf.d/` and `relay-maps/`. `baza` has a systemd timer
that restores its two files once a minute; add this host to the same reference
directory (`/etc/nginx-baza-extra/`) or expect to restore both files by hand
after every Meridian update.
