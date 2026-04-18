<?php

declare(strict_types=1);

use Muoviotukset\Application;
use Muoviotukset\Content\ContentRepository;
use Muoviotukset\Submission\PiwigoClient;
use Muoviotukset\Support\Env;
use Muoviotukset\Views\Renderer;

require_once __DIR__.'/../vendor/autoload.php';

Env::load(__DIR__.'/../.env');

$root = dirname(__DIR__);

$config = [
	'app' => [
		'base_url' => Env::get('APP_BASE_URL', 'https://otus.muoviamo.fi'),
		'storage_key' => Env::get('APP_STORAGE_KEY', 'muoviotukset.v1'),
	],
	'content' => [
		'file' => $root.'/content/game-content.json',
	],
	'piwigo' => [
		'base_url' => Env::get('PIWIGO_BASE_URL'),
		'username' => Env::get('PIWIGO_USERNAME'),
		'password' => Env::get('PIWIGO_PASSWORD'),
		'category_id' => Env::get('PIWIGO_CATEGORY_ID'),
		'tags' => array_values(array_filter(array_map('trim', explode(',', (string) Env::get('PIWIGO_TAGS', 'muoviotukset,plastic-creatures'))))),
	],
];

$contentRepository = new ContentRepository($config['content']['file'], [
	'baseUrl' => $config['app']['base_url'],
	'storageKey' => $config['app']['storage_key'],
]);

return new Application(
	$config,
	$contentRepository,
	new Renderer($root.'/src/Views'),
	new PiwigoClient($config['piwigo'])
);
