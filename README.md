# Muoviotukset for Android

Muoviotukset is the Android companion app for *Muoviotusten maailmanvalloitus*, a physical floor game in which groups answer questions, collect creature parts, build a plastic creature, and share the result in a public gallery.

[Read about the game and its public voting](https://muoviamo.fi/muoviotuspelin-yleisoaanestys/) for background and real-world context.

The Android app opens the live game at [otus.muoviamo.fi](https://otus.muoviamo.fi/) as a Bubblewrap Trusted Web Activity (TWA). The same application also works directly in a browser.

## About

*Muoviotusten maailmanvalloitus* combines a large physical game board with QR-assisted play. One Android device is used by each group. Players scan the printed start, question, mutation, and finish codes while moving through the physical game.

The app keeps the group's progress on the device, unlocks creature parts, shows the active material box, and guides the final creature submission. Submitted creatures appear in a Piwigo gallery where visitors can vote for their favourites.

Version 1 is online-only. Its printed QR set is already in use and is immutable: existing URLs must remain backward-compatible, and the QR assets under `print/qr/` must not be regenerated or changed during normal development.

## Android App

| Property | Value |
| --- | --- |
| Application ID | `fi.muoviamo.otus` |
| Version | `1.0.0` (`versionCode` 1) |
| Minimum Android version | Android 5.0 / API 21 |
| Target and compile SDK | API 36 |
| Orientation | Portrait |
| Web origin | `https://otus.muoviamo.fi/` |
| Wrapper | Bubblewrap Trusted Web Activity |
| Browser fallback | Custom Tab |

The Android package is deliberately thin: it contains the launcher, splash assets, trusted-origin configuration, and browser integration, while gameplay and content are served by the production PHP application. Most gameplay fixes can therefore be deployed to the website without publishing a new APK.

Digital Asset Links bind the Android package and its permanent release certificate to `otus.muoviamo.fi`. When that verification succeeds, the site opens full-screen without a Custom Tab toolbar.

## Android Project Layout

- `android/`: generated and maintained Bubblewrap/Gradle Android project
- `android/twa-manifest.json`: TWA identity, origin, version, colours, icons, and signing-key location
- `android/app/`: Android manifest, launcher activity, resources, and Gradle application configuration
- `.well-known/assetlinks.json`: production Android-to-web trust declaration
- `manifest.webmanifest`: installable web-app identity and icon declarations
- `public/assets/icons/`: launcher and maskable web icons
- `bin/build-assetlinks.php`: generates Digital Asset Links from release certificate fingerprints
- `bin/build-pwa-icons.php`: rebuilds launcher icons from the source artwork
- `service-worker.js` and `offline.html`: minimal network-error fallback for the live app

## Web Application

The trusted web origin is a standalone PHP 8.3 application with no framework and no SPA build step. Gameplay state is stored in the browser under the versioned `localStorage` key `muoviotukset.v1`.

Important paths:

- `index.php`: web front controller
- `src/`: application code, rendering, content loading, and submission logic
- `assets/`: CSS, browser JavaScript, and the vendored `jsQR` scanner fallback
- `content/source/definition.php`: normalized bilingual gameplay source
- `content/game-content.json`: generated runtime content
- `config/`: application bootstrap and example Nginx configuration
- `piwigo-plugins/`: custom public-gallery voting integration
- `print/qr/`: fixed printable QR bundle

### Local Web Development

```bash
composer install
php bin/build-content.php
php bin/build-pwa-icons.php
php -S 127.0.0.1:8090 index.php
```

Open [http://127.0.0.1:8090](http://127.0.0.1:8090) and check the health endpoint at [http://127.0.0.1:8090/health](http://127.0.0.1:8090/health).

### Submission and Gallery Configuration

The finish form posts a creature photo and game details to `/api/submissions`. The server forwards the submission to Piwigo through `ws.php`. Copy `.env.example` to `.env` and configure:

- `PIWIGO_BASE_URL`
- `PIWIGO_USERNAME`
- `PIWIGO_PASSWORD`
- `PIWIGO_CATEGORY_ID`
- optional `PIWIGO_TAGS`

Without those values, gameplay remains available, but submission returns a descriptive `502` JSON response.

### Content Workflow

The editorial source is maintained separately from the runtime application. When gameplay content changes, update `content/source/definition.php` and regenerate the committed runtime file:

```bash
php bin/build-content.php
```

Do not hand-edit `content/game-content.json` unless there is a specific reason to bypass the generator.

## Verification

Run the core checks after meaningful changes:

```bash
find . -name '*.php' -not -path './vendor/*' -print0 | xargs -0 -n1 php -l
php bin/build-content.php
php -S 127.0.0.1:8090 index.php
curl http://127.0.0.1:8090/health
```

Frontend changes should also receive a real-browser check. Changes to submission or gallery wiring should be verified against the production Piwigo flow and protected gallery paths.

## License

See [LICENSE](LICENSE) for source-code licensing and [NOTICE.md](NOTICE.md) for third-party and artwork notices.
