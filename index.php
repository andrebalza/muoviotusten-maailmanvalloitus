<?php

declare(strict_types=1);

use Muoviotukset\Application;
use Muoviotukset\Http\Request;

error_reporting(E_ALL);
ini_set('display_errors', '1');

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if(PHP_SAPI === 'cli-server' && $requestPath !== '/'){
	$staticFile = __DIR__.$requestPath;

	if(is_file($staticFile)){
		return false;
	}
}

$autoload = __DIR__.'/vendor/autoload.php';

if(!is_file($autoload)){
	http_response_code(503);
	header('Content-Type: text/plain; charset=utf-8');
	echo "Dependencies are missing. Run `php .tools/composer install` first.\n";
	exit;
}

require $autoload;

/** @var Application $app */
$app = require __DIR__.'/config/bootstrap.php';
$app->handle(Request::fromGlobals())->send();
