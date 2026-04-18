<section class="panel hero-panel">
  <p class="eyebrow">Error</p>
  <h1><?= htmlspecialchars((string) ($error['title'] ?? 'Something went wrong'), ENT_QUOTES, 'UTF-8') ?></h1>
  <p class="lead"><?= htmlspecialchars((string) ($error['message'] ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
  <div class="button-row">
    <a class="button button-primary" href="/">Back to start</a>
  </div>
</section>
