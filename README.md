# otus.muoviamo.fi

Standalone PHP 8.3 implementation for the `Muoviotusten maailmanvalloitus` floor game.

The gameplay source of truth remains:

- [muoviotusten-maailmanvalloitus-game-rules.md](/Users/andrea/Sites/muoviotusten-maailmanvalloitus/muoviotusten-maailmanvalloitus-game-rules.md)

## What Is In The Repo

- `index.php`: front controller for the standalone app
- `src/`: PHP application code, rendering, content loading, and the Piwigo submission bridge
- `content/source/definition.php`: normalized bilingual gameplay content source
- `content/game-content.json`: generated runtime content consumed by the app
- `assets/`: CSS, browser JS, and the vendored `jsQR` scanner fallback
- `bin/build-content.php`: validates and generates `content/game-content.json`
- `bin/generate-qr.php`: generates printable QR bundles for production and Tailscale under `print/qr/`
- `config/nginx-site.example.conf`: example root-web-root Nginx configuration with deny rules
- `print/qr/`: generated printable QR bundle

## Local Development

1. Install PHP dependencies:

```bash
composer install
```

2. Build runtime content:

```bash
php bin/build-content.php
```

3. Generate printable QR assets:

```bash
php bin/generate-qr.php
```

4. Start the local server:

```bash
php -S 127.0.0.1:8090 index.php
```

Then open [http://127.0.0.1:8090](http://127.0.0.1:8090).

### External Testing With Tailscale

If you have Tailscale installed locally, you can start the PHP server and publish it through Tailscale Funnel with:

```bash
bin/tailscale-test-server.sh start
```

Useful companion commands:

```bash
bin/tailscale-test-server.sh status
bin/tailscale-test-server.sh qr
bin/tailscale-test-server.sh stop
```

Notes:

- `start` runs the app locally on `http://127.0.0.1:8090` and exposes it through Tailscale Funnel.
- `php bin/generate-qr.php` always generates a production bundle in `print/qr/prod/`.
- If a Tailscale Funnel URL is available, `php bin/generate-qr.php` also generates a Tailscale bundle in `print/qr/tailscale/`.
- `bin/tailscale-test-server.sh qr` regenerates both bundles and forces the Tailscale bundle to use the current Funnel URL.
- The in-app scanner only accepts same-origin gameplay URLs, so use the Tailscale bundle when testing the full QR flow through Funnel.
- `stop` resets Funnel on the current node, so if you already use Funnel for something else, reapply that config afterward.

## Piwigo Configuration

The finish form posts to `/api/submissions`, and the server forwards the payload and uploaded photo to Piwigo through `ws.php`.

The multipart submission payload includes:

- `creature_name`
- `special_ability`
- `team_name`
- `photo`
- `game_state`
- `parts_count`: required integer, `0` to `99`
- `rubber_bands`: required integer, `0` to `999`
- `cable_ties`: required integer, `0` to `999`
- `tape_cm`: required integer, `0` to `9999`

In production, Piwigo is installed inside the same WordOps site at `/gallery`. Keep that layout if you redeploy or rebuild the gallery. See [docs/piwigo-wordops-rollout.md](/Users/andrea/Sites/muoviotusten-maailmanvalloitus/docs/piwigo-wordops-rollout.md).

Copy `.env.example` to `.env` and set:

- `PIWIGO_BASE_URL`
- `PIWIGO_USERNAME`
- `PIWIGO_PASSWORD`
- `PIWIGO_CATEGORY_ID`
- optional `PIWIGO_TAGS`

Without those values, the app keeps working for gameplay, but submission returns a clear `502` JSON error explaining that Piwigo is not configured yet.

Notes:

- The live site uses a dedicated uploader account plus a dedicated Piwigo album for game submissions.
- [src/Submission/PiwigoClient.php](/Users/andrea/Sites/muoviotusten-maailmanvalloitus/src/Submission/PiwigoClient.php) forces `format=json` in the `ws.php` query string because the live Piwigo install does not reliably return JSON when that flag is sent only in the POST body.
- The additional part and material counts are stored in the uploaded image comment sent to Piwigo, so no Piwigo schema, plugin, or admin-side field changes are required for this payload change.
- If you rotate Piwigo credentials or recreate the target album, update the app `.env` on the server as part of the same change.

## Content Workflow

- The Google Sheet remains the editorial source.
- The app does not read the sheet at runtime.
- Runtime content comes from the committed `content/game-content.json`.
- Update `content/source/definition.php` and rebuild with `php bin/build-content.php` when gameplay content changes.

## Verification Commands

```bash
find . -name '*.php' -not -path './vendor/*' -print0 | xargs -0 -n1 php -l
php bin/build-content.php
php bin/generate-qr.php
php -S 127.0.0.1:8090 index.php
curl http://127.0.0.1:8090/health
```

If you change the Piwigo bridge or production submission wiring, also verify:

```bash
curl -I https://otus.muoviamo.fi/gallery/
curl -I https://otus.muoviamo.fi/gallery/install.php
curl -I https://otus.muoviamo.fi/gallery/local/config/database.inc.php
curl -I https://otus.muoviamo.fi/gallery/_data/
```
