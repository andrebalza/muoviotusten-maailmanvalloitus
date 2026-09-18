<?php
$androidReleaseEnabled = ($boot['androidRelease']['enabled'] ?? false) === true;
$androidReleaseUrl = (string) ($boot['androidRelease']['url'] ?? '');
?>
<section class="panel hero-panel">
  <p class="eyebrow">Android</p>
  <h1>Muoviotukset Androidille</h1>
  <p class="lead">Asenna peli Android-puhelimeen GitHub-julkaisusta. Sovellus käyttää samaa verkkopeliä ja samoja jo painettuja QR-koodeja.</p>
</section>

<section class="panel stack">
  <h2>Asennus</h2>
  <ol>
    <li>Avaa uusin julkaisu Android-laitteella.</li>
    <li>Lataa tiedosto <code>muoviotukset-1.0.0-universal.apk</code>.</li>
    <li>Salli pyydettäessä sovellusten asentaminen selaimesta tai tiedostonhallinnasta.</li>
    <li>Avaa ladattu APK ja valitse <strong>Asenna</strong>.</li>
  </ol>
  <p>Android 5.0 tai uudempi ja Trusted Web Activity -yhteensopiva selain. Pelaaminen, QR-skannaus ja kuvien lähettäminen vaativat verkkoyhteyden.</p>
  <?php if($androidReleaseEnabled && $androidReleaseUrl !== ''): ?>
    <div class="button-row">
      <a class="button button-primary" href="<?= htmlspecialchars($androidReleaseUrl, ENT_QUOTES, 'UTF-8') ?>">Avaa uusin julkaisu</a>
    </div>
  <?php else: ?>
    <p><strong>Android-julkaisua viimeistellään. Lataus avataan, kun allekirjoitettu versio on testattu.</strong></p>
  <?php endif; ?>
</section>

<section class="panel stack" lang="en">
  <h2>Install in English</h2>
  <ol>
    <li>Open the latest release on the Android device.</li>
    <li>Download <code>muoviotukset-1.0.0-universal.apk</code>.</li>
    <li>If prompted, allow app installation from the browser or file manager.</li>
    <li>Open the downloaded APK and choose <strong>Install</strong>.</li>
  </ol>
  <p>Requires Android 5.0 or newer and a Trusted Web Activity-compatible browser. Gameplay, QR scanning, and photo submission require a network connection.</p>
  <?php if($androidReleaseEnabled && $androidReleaseUrl !== ''): ?>
    <div class="button-row">
      <a class="button button-secondary" href="<?= htmlspecialchars($androidReleaseUrl, ENT_QUOTES, 'UTF-8') ?>">Open latest release</a>
    </div>
  <?php else: ?>
    <p><strong>The Android release is being finalized. The download will open after the signed build passes device testing.</strong></p>
  <?php endif; ?>
</section>

<section class="panel stack">
  <p><a href="/privacy">Tietosuoja / Privacy</a> · <a href="/support">Tuki / Support</a></p>
</section>
