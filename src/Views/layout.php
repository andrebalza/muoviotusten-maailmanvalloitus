<?php

declare(strict_types=1);

$title = $meta['title'] ?? 'Muoviotukset';
$assetVersion = static function(string $path): string{
	$fullPath = dirname(__DIR__, 2).$path;

	return is_file($fullPath) ? '?v='.(string) filemtime($fullPath) : '';
};
$page = $boot['page'] ?? '';
$gamePages = ['scan', 'question', 'mutation', 'finish'];
$bodyClasses = [];
if(in_array($page, $gamePages, true)){
	$bodyClasses[] = 'game-active';
}
if($page === 'about'){
	$bodyClasses[] = 'about-active';
}
$bodyClass = implode(' ', $bodyClasses);
?>
<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/app.css<?= $assetVersion('/assets/app.css') ?>">
</head>
<body<?= $bodyClass ? ' class="'.$bodyClass.'"' : '' ?>>
  <div class="page-shell">
    <header class="topbar">
      <a class="brand" href="/" aria-label="Muoviotukset">
        <img src="/public/assets/textlogo_500x97.png" alt="Muoviotukset">
      </a>
      <nav class="topnav">
        <a href="/scan" id="nav-scan">Scan</a>
        <a href="/about" id="nav-about">About</a>
        <a href="/gallery/index.php?/category/1" id="nav-gallery">Gallery</a>
      </nav>
    </header>

    <section class="session-strip" id="session-strip" hidden>
      <div class="session-stat">
        <img class="session-icon" src="/assets/icons/track_icon.svg" alt="">
        <div class="session-stat__body">
          <span class="session-label" id="status-track-label">Track</span>
          <strong id="status-track">-</strong>
        </div>
      </div>
      <div class="session-stat">
        <img class="session-icon" src="/assets/icons/box.svg" alt="">
        <div class="session-stat__body">
          <span class="session-label" id="status-box-label">Box</span>
          <strong id="status-box">-</strong>
        </div>
      </div>
      <div class="session-stat">
        <img class="session-icon" src="/assets/icons/creature_part_icon.svg" alt="">
        <div class="session-stat__body">
          <span class="session-label" id="status-parts-label">Parts</span>
          <strong id="status-parts">-</strong>
        </div>
      </div>
      <div class="session-stat">
        <img class="session-icon" src="/assets/icons/bulb.svg" alt="">
        <div class="session-stat__body">
          <span class="session-label" id="status-tips-label">Tips</span>
          <strong id="status-tips">-</strong>
        </div>
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
