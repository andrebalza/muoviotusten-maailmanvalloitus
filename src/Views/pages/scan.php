<section class="panel hero-panel">
  <p class="eyebrow" id="scan-eyebrow">In-app scanner</p>
  <h1 id="scan-title">Scan the next QR</h1>
  <p class="lead" id="scan-lead">Question, mutation, and finish QR codes are scanned inside the web app. Only same-origin gameplay links are accepted.</p>
</section>

<section class="panel scanner-panel">
  <div class="scanner-frame">
    <video id="scanner-video" playsinline muted></video>
    <div class="scanner-mask"></div>
  </div>
  <p class="muted" id="scanner-status">Waiting for camera access…</p>
  <div class="button-row">
    <button class="button button-secondary" id="scanner-retry" type="button">Retry camera</button>
  </div>
</section>
