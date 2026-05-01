<section class="panel hero-panel">
  <p class="eyebrow" id="scan-eyebrow">In-app scanner</p>
  <h1 id="scan-title">Scan the next QR</h1>
  <p class="lead" id="scan-lead">Question, mutation, and finish QR codes are scanned inside the web app. Only same-origin gameplay links are accepted.</p>
</section>

<section class="panel scanner-panel" data-scanner-state="idle">
  <div class="scanner-intro" id="scanner-intro">
    <p class="scanner-intro__line" id="scan-intro-line1">Roll the die and move to the next tile.</p>
    <p class="scanner-intro__line" id="scan-intro-line2">If the tile has a QR code, scan it.</p>
    <img class="scanner-intro__dice" src="/public/assets/dice_blue_500x536.png" alt="">
  </div>
  <div class="scanner-frame" id="scanner-frame" hidden>
    <video id="scanner-video" playsinline muted></video>
    <div class="scanner-mask"></div>
  </div>
  <p class="muted" id="scanner-status">Tap "Scan" to open the camera.</p>
  <div class="button-row">
    <button class="button button-primary scanner-cta" id="scanner-start" type="button">
      <span id="scanner-start-label">Scan</span>
      <span class="scanner-cta__chevron" aria-hidden="true">&rsaquo;</span>
    </button>
    <button class="button button-secondary" id="scanner-retry" type="button" hidden>Retry camera</button>
  </div>
</section>
