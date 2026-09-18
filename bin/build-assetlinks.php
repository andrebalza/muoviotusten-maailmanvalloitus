<?php

declare(strict_types=1);

$fingerprints = array_values(array_filter(array_map(
	static fn(string $value): string => strtoupper(trim($value)),
	array_slice($argv, 1),
)));

if($fingerprints === []){
	fwrite(STDERR, "Usage: php bin/build-assetlinks.php AA:BB:...[:FF] [SECOND_FINGERPRINT ...]\n");
	exit(1);
}

foreach($fingerprints as $fingerprint){
	if(!preg_match('/^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/', $fingerprint)){
		fwrite(STDERR, "Invalid SHA-256 certificate fingerprint: {$fingerprint}\n");
		exit(1);
	}
}

$payload = [[
	'relation' => ['delegate_permission/common.handle_all_urls'],
	'target' => [
		'namespace' => 'android_app',
		'package_name' => 'fi.muoviamo.otus',
		'sha256_cert_fingerprints' => $fingerprints,
	],
]];

$outputPath = dirname(__DIR__).'/.well-known/assetlinks.json';
$json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

if($json === false || file_put_contents($outputPath, $json."\n") === false){
	fwrite(STDERR, "Unable to write {$outputPath}\n");
	exit(1);
}

fwrite(STDOUT, "Built {$outputPath}\n");
