#!/usr/bin/env php
<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$sourceFile = $root.'/content/source/definition.php';
$targetFile = $root.'/content/game-content.json';

if(!is_file($sourceFile)){
	fwrite(STDERR, "Missing source content definition: {$sourceFile}\n");
	exit(1);
}

$content = require $sourceFile;

if(!is_array($content)){
	fwrite(STDERR, "Source content must return an array.\n");
	exit(1);
}

$content['meta']['generatedAt'] = gmdate('c');
$content['meta']['generatedBy'] = 'bin/build-content.php';

$errors = [];

if(count($content['tracks'] ?? []) !== 5){
	$errors[] = 'Expected exactly 5 tracks.';
}

if(count($content['parts'] ?? []) !== 13){
	$errors[] = 'Expected exactly 13 creature parts.';
}

if(count($content['questions'] ?? []) !== 13){
	$errors[] = 'Expected exactly 13 question sets.';
}

$questionIds = [];

foreach(($content['questions'] ?? []) as $setId => $setDefinition){
	$difficultyMap = $setDefinition['questions'] ?? [];
	foreach(['easy', 'hard'] as $difficulty){
		if(empty($difficultyMap[$difficulty]) || !is_array($difficultyMap[$difficulty])){
			$errors[] = "Question set {$setId} is missing {$difficulty} content.";
			continue;
		}

		foreach($difficultyMap[$difficulty] as $question){
			$id = $question['id'] ?? null;

			if(!$id || in_array($id, $questionIds, true)){
				$errors[] = "Question ID is missing or duplicated in set {$setId} ({$difficulty}).";
				continue;
			}

			$questionIds[] = $id;
		}
	}
}

if($errors !== []){
	fwrite(STDERR, "Content validation failed:\n- ".implode("\n- ", $errors)."\n");
	exit(1);
}

$json = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if($json === false){
	fwrite(STDERR, "Unable to encode content JSON.\n");
	exit(1);
}

file_put_contents($targetFile, $json."\n");
fwrite(STDOUT, "Wrote {$targetFile}\n");
