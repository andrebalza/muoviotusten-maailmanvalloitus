<section class="panel hero-panel">
  <p class="eyebrow" id="scan-eyebrow">In-app scanner</p>
  <h1 id="scan-title">Scan the next QR</h1>
  <p class="lead" id="scan-lead">Question, mutation, and finish QR codes are scanned inside the web app. Only same-origin gameplay links are accepted.</p>
</section>

<section class="panel scanner-panel" data-scanner-state="idle">
  <div class="scanner-frame" id="scanner-frame" hidden>
    <video id="scanner-video" playsinline muted></video>
    <div class="scanner-mask"></div>
  </div>
  <p class="muted" id="scanner-status">Tap "Scan code" to open the camera.</p>
  <div class="button-row">
    <button class="button button-primary" id="scanner-start" type="button">Scan code</button>
    <button class="button button-secondary" id="scanner-retry" type="button" hidden>Retry camera</button>
  </div>
</section>
