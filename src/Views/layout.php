<?php

declare(strict_types=1);

$title = $meta['title'] ?? 'Muoviotukset';
$assetVersion = static function(string $path): string{
	$fullPath = dirname(__DIR__, 2).$path;

	return is_file($fullPath) ? '?v='.(string) filemtime($fullPath) : '';
};
?>
<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="stylesheet" href="/assets/app.css<?= $assetVersion('/assets/app.css') ?>">
</head>
<body>
  <div class="page-shell">
    <header class="topbar">
      <a class="brand" href="/">Muoviotukset</a>
      <nav class="topnav">
        <a href="/scan" id="nav-scan">Scan</a>
        <a href="/about" id="nav-about">About</a>
        <a href="/gallery" id="nav-gallery">Gallery</a>
      </nav>
    </header>

    <section class="session-strip" id="session-strip" hidden>
      <div class="session-stat">
        <span class="session-label" id="status-track-label">Track</span>
        <strong id="status-track">-</strong>
      </div>
      <div class="session-stat session-stat--active">
        <span class="session-label" id="status-box-label">Active box</span>
        <strong id="status-box">-</strong>
      </div>
      <div class="session-stat">
        <span class="session-label" id="status-parts-label">Parts</span>
        <strong id="status-parts">-</strong>
      </div>
      <div class="session-stat">
        <span class="session-label" id="status-tips-label">Tips</span>
        <strong id="status-tips">-</strong>
      </div>
    </section>

    <main class="page-content">
      <?= $content ?>
    </main>
  </div>

  <script>
    window.__APP_BOOT__ = <?= json_encode($boot, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
  </script>
  <script src="/assets/vendor/jsqr.js"></script>
  <script src="/assets/app.js<?= $assetVersion('/assets/app.js') ?>"></script>
</body>
</html>
