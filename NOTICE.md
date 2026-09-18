# Notices and asset rights

The MIT licence in `LICENSE` applies to original source code and documentation in this repository. It does not automatically grant rights to third-party names, logos, artwork, photographs, or fonts.

## Project artwork

The following files are project artwork used by the Muoviotukset website and official Android package:

- `public/assets/start_logo_image.png`
- `public/assets/textlogo_500x97.png`
- `public/assets/dice_blue_500x536.png`
- `public/assets/01_petpet_no_bkg.png` through `07_hypervintit_no_bkg.png`
- derived launcher icons under `public/assets/icons/` and `android/app/src/main/res/`

Copyright remains with the respective project artist or rights holder. Their inclusion in this repository is not a grant to reuse them independently of the Muoviotukset project. On 2026-09-18, the project owner confirmed that the project has permission to redistribute these assets as part of the public source repository and official Android package.

## Names and logos

The following files contain creator, partner, sponsor, or organisation names or logos and are not bundled into the Android wrapper itself. The wrapper loads them from the live website:

- `public/assets/Maaria-Klemetti-logo-800x266.png`
- `public/assets/muoviamo-logo-blue-red.png`
- `public/assets/tiedetta-kaikille_full_kulta.png`
- `public/assets/kulttuuriaitta-valkoinen-webuseonly.png`
- `public/assets/SKR_Keski-Suomi_Vertical_White.png`

Those marks remain the property of their respective owners. Their use must follow the owners' permissions and brand rules.

## Third-party software

- `assets/vendor/jsqr.js` is jsQR by Cosmo Wolfe and contributors, distributed under the Apache License 2.0: <https://github.com/cozmo/jsQR>.
- PHP packages installed from `composer.lock` retain their upstream licences. The installed packages currently include `chillerlan/php-qrcode` (MIT or Apache-2.0) and `chillerlan/php-settings-container` (MIT). Their licence texts are present in their package directories after `composer install`.
- The generated Android wrapper uses Android Browser Helper and other Gradle dependencies under their respective upstream licences. Gradle resolves their exact versions from the wrapper source.

## Fonts

The live application loads Baloo 2 and Montserrat from Google Fonts. Both font families are distributed under the SIL Open Font License 1.1. The Android wrapper does not embed the font files; the live web application loads them over the network.

## Release-owner confirmation

On 2026-09-18, the project owner confirmed all of the following:

- the project artwork listed above may be distributed in the public source repository and official APK;
- each partner and sponsor logo may remain publicly served by the website;
- the app name, descriptions, screenshots, and store/repository metadata may use the project branding.
