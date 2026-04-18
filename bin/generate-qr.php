#!/usr/bin/env php
<?php

declare(strict_types=1);

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

$root = dirname(__DIR__);
$autoload = $root.'/vendor/autoload.php';

if(!is_file($autoload)){
	fwrite(STDERR, "Missing Composer autoload file. Run `php .tools/composer install` first.\n");
	exit(1);
}

require $autoload;

$outputRoot = $root.'/print/qr';

ensureDirectory($outputRoot);
cleanupLegacyRootQrFiles($outputRoot);

$bundles = [
	'prod' => [
		'title' => 'Production QR bundle',
		'description' => 'Printable QR codes for the production app.',
		'baseUrl' => rtrim(getenv('PROD_APP_BASE_URL') ?: getenv('APP_BASE_URL') ?: 'https://otus.muoviamo.fi', '/'),
	],
];

$tailscaleUrl = resolveTailscaleBaseUrl();

if($tailscaleUrl !== null){
	$bundles['tailscale'] = [
		'title' => 'Tailscale QR bundle',
		'description' => 'Printable QR codes for the current Tailscale Funnel URL.',
		'baseUrl' => $tailscaleUrl,
	];
}

$bundleSummaries = [];

foreach($bundles as $slug => $bundle){
	$outputDir = $outputRoot.'/'.$slug;
	ensureDirectory($outputDir);

	$targets = buildTargets($bundle['baseUrl']);
	renderBundle($targets, $outputDir, $bundle['title'], $bundle['description']);

	$bundleSummaries[] = [
		'slug' => $slug,
		'title' => $bundle['title'],
		'description' => $bundle['description'],
		'baseUrl' => $bundle['baseUrl'],
		'count' => count($targets),
	];
	$summaryLabel = $slug === 'prod' ? 'production' : $slug;
	fwrite(STDOUT, "Generated {$summaryLabel} QR bundle at {$outputDir}\n");
}

renderBundleIndex($outputRoot, $bundleSummaries, $tailscaleUrl === null);

fwrite(STDOUT, "Updated bundle index at {$outputRoot}/index.html\n");

function buildTargets(string $baseUrl): array{

	$targets = [
		['file' => 'start.svg', 'label' => 'Start game', 'url' => $baseUrl.'/'],
		['file' => 'finish.svg', 'label' => 'Finish', 'url' => $baseUrl.'/finish'],
		['file' => 'gallery.svg', 'label' => 'Gallery', 'url' => $baseUrl.'/gallery'],
	];

	foreach(range(1, 13) as $setId){
		$targets[] = [
			'file' => sprintf('question-%02d.svg', $setId),
			'label' => "Question set {$setId}",
			'url' => $baseUrl.'/question?set='.$setId,
		];
	}

	$targets[] = ['file' => 'mutation-hypervintti.svg', 'label' => 'Mutation: Hypervintti', 'url' => $baseUrl.'/mutation?name=hypervintti'];
	$targets[] = ['file' => 'mutation-mysteerio.svg', 'label' => 'Mutation: Mysteeriö', 'url' => $baseUrl.'/mutation?name=mysteerio'];

	return $targets;
}

function renderBundle(array $targets, string $outputDir, string $title, string $description): void{

	$options = new QROptions([
		'outputType' => QRCode::OUTPUT_MARKUP_SVG,
		'eccLevel' => QRCode::ECC_M,
		'scale' => 8,
		'imageBase64' => false,
		'addQuietzone' => true,
		'svgAddXmlHeader' => true,
	]);

	foreach($targets as $target){
		// The encoder keeps appended data segments between render() calls, so each file needs a fresh instance.
		(new QRCode($options))->render($target['url'], $outputDir.'/'.$target['file']);
	}

	$cards = array_map(static function(array $target): string{
		$file = htmlspecialchars($target['file'], ENT_QUOTES, 'UTF-8');
		$label = htmlspecialchars($target['label'], ENT_QUOTES, 'UTF-8');
		$url = htmlspecialchars($target['url'], ENT_QUOTES, 'UTF-8');

		return <<<HTML
<article class="card">
  <h2>{$label}</h2>
  <img src="./{$file}" alt="{$label} QR code">
  <p><a href="{$url}">{$url}</a></p>
</article>
HTML;
	}, $targets);

	$titleEscaped = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
	$descriptionEscaped = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');

	$index = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{$titleEscaped}</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;padding:2rem;background:#f7f7f2;color:#1f2421}
    h1{margin-top:0}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem}
    .card{background:#fff;border:1px solid #d9ddd7;border-radius:16px;padding:1rem;box-shadow:0 8px 24px rgba(0,0,0,.06)}
    img{width:100%;height:auto;background:#fff}
    a{color:#0c6b58;word-break:break-word}
  </style>
</head>
<body>
  <h1>{$titleEscaped}</h1>
  <p>{$descriptionEscaped}</p>
  <p><a href="../index.html">Back to QR bundle index</a></p>
  <section class="grid">
    {{CARDS}}
  </section>
</body>
</html>
HTML;

	file_put_contents($outputDir.'/index.html', str_replace('{{CARDS}}', implode("\n", $cards), $index));
}

function renderBundleIndex(string $outputRoot, array $bundleSummaries, bool $tailscaleMissing): void{

	$cards = array_map(static function(array $bundle): string{
		$title = htmlspecialchars($bundle['title'], ENT_QUOTES, 'UTF-8');
		$description = htmlspecialchars($bundle['description'], ENT_QUOTES, 'UTF-8');
		$baseUrl = htmlspecialchars($bundle['baseUrl'], ENT_QUOTES, 'UTF-8');
		$link = htmlspecialchars('./'.$bundle['slug'].'/index.html', ENT_QUOTES, 'UTF-8');
		$count = (int) $bundle['count'];

		return <<<HTML
<article class="card">
  <h2>{$title}</h2>
  <p>{$description}</p>
  <p><strong>Base URL:</strong> <a href="{$baseUrl}">{$baseUrl}</a></p>
  <p><strong>Files:</strong> {$count} QR codes</p>
  <p><a href="{$link}">Open bundle</a></p>
</article>
HTML;
	}, $bundleSummaries);

	$tailscaleNote = $tailscaleMissing
		? '<p class="notice">Tailscale QR bundle was not generated because no current Funnel URL was detected. Start Funnel and rerun `php bin/generate-qr.php` or `bin/tailscale-test-server.sh qr`.</p>'
		: '';

	$index = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Muoviotukset printable QR bundles</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;padding:2rem;background:#f7f7f2;color:#1f2421}
    h1{margin-top:0}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
    .card{background:#fff;border:1px solid #d9ddd7;border-radius:16px;padding:1rem;box-shadow:0 8px 24px rgba(0,0,0,.06)}
    .notice{background:#fff8dd;border:1px solid #ead48a;border-radius:12px;padding:1rem}
    a{color:#0c6b58;word-break:break-word}
  </style>
</head>
<body>
  <h1>Muoviotukset printable QR bundles</h1>
  <p>Generated from the standalone app URL contract.</p>
  {$tailscaleNote}
  <section class="grid">
    {{CARDS}}
  </section>
</body>
</html>
HTML;

	file_put_contents($outputRoot.'/index.html', str_replace('{{CARDS}}', implode("\n", $cards), $index));
}

function ensureDirectory(string $path): void{

	if(is_dir($path)){
		return;
	}

	if(!mkdir($path, 0777, true) && !is_dir($path)){
		fwrite(STDERR, "Unable to create output directory: {$path}\n");
		exit(1);
	}
}

function cleanupLegacyRootQrFiles(string $outputRoot): void{

	$legacyFiles = [
		'start.svg',
		'finish.svg',
		'gallery.svg',
		'mutation-hypervintti.svg',
		'mutation-mysteerio.svg',
	];

	foreach(range(1, 13) as $setId){
		$legacyFiles[] = sprintf('question-%02d.svg', $setId);
	}

	foreach($legacyFiles as $file){
		$path = $outputRoot.'/'.$file;

		if(is_file($path)){
			unlink($path);
		}
	}
}

function resolveTailscaleBaseUrl(): ?string{

	$override = trim((string) getenv('TAILSCALE_BASE_URL'));

	if($override !== ''){
		return rtrim($override, '/');
	}

	$tailscaleBin = findTailscaleBinary();

	if($tailscaleBin === null){
		return null;
	}

	$statusJson = shell_exec(escapeshellarg($tailscaleBin).' funnel status --json 2>/dev/null');

	if(!is_string($statusJson) || trim($statusJson) === ''){
		return null;
	}

	$decoded = json_decode($statusJson, true);

	if(!is_array($decoded)){
		return null;
	}

	$web = $decoded['Web'] ?? [];
	$allowFunnel = $decoded['AllowFunnel'] ?? [];

	if(!is_array($web) || !is_array($allowFunnel)){
		return null;
	}

	foreach(array_keys($web) as $hostPort){
		if(($allowFunnel[$hostPort] ?? false) !== true){
			continue;
		}

		[$host] = explode(':', (string) $hostPort, 2);

		if($host === ''){
			continue;
		}

		return 'https://'.$host;
	}

	return null;
}

function findTailscaleBinary(): ?string{

	$path = trim((string) shell_exec('command -v tailscale 2>/dev/null'));

	if($path !== ''){
		return $path;
	}

	$appBinary = '/Applications/Tailscale.app/Contents/MacOS/Tailscale';

	return is_file($appBinary) ? $appBinary : null;
}
