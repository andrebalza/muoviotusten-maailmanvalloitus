<?php

declare(strict_types=1);

if(!extension_loaded('gd')){
	fwrite(STDERR, "The GD extension is required to build PWA icons.\n");
	exit(1);
}

$root = dirname(__DIR__);
$sourcePath = $root.'/public/assets/start_logo_image.png';
$outputDirectory = $root.'/public/assets/icons';

if(!is_file($sourcePath)){
	fwrite(STDERR, "Source artwork is missing: {$sourcePath}\n");
	exit(1);
}

if(!is_dir($outputDirectory) && !mkdir($outputDirectory, 0775, true) && !is_dir($outputDirectory)){
	fwrite(STDERR, "Unable to create icon directory: {$outputDirectory}\n");
	exit(1);
}

$source = imagecreatefrompng($sourcePath);
if($source === false){
	fwrite(STDERR, "Unable to read source artwork: {$sourcePath}\n");
	exit(1);
}

$icons = [
	['name' => 'app-icon-192.png', 'size' => 192, 'contentRatio' => 0.90],
	['name' => 'app-icon-512.png', 'size' => 512, 'contentRatio' => 0.90],
	['name' => 'app-icon-maskable-512.png', 'size' => 512, 'contentRatio' => 0.62],
];

$sourceWidth = imagesx($source);
$sourceHeight = imagesy($source);

foreach($icons as $icon){
	$size = $icon['size'];
	$target = imagecreatetruecolor($size, $size);
	$background = imagecolorallocate($target, 15, 58, 71);
	imagefill($target, 0, 0, $background);

	$maximumContentSize = (int) floor($size * $icon['contentRatio']);
	$scale = min($maximumContentSize / $sourceWidth, $maximumContentSize / $sourceHeight);
	$width = (int) round($sourceWidth * $scale);
	$height = (int) round($sourceHeight * $scale);
	$x = (int) floor(($size - $width) / 2);
	$y = (int) floor(($size - $height) / 2);

	imagealphablending($target, true);
	imagecopyresampled($target, $source, $x, $y, 0, 0, $width, $height, $sourceWidth, $sourceHeight);

	$outputPath = $outputDirectory.'/'.$icon['name'];
	if(!imagepng($target, $outputPath, 9)){
		fwrite(STDERR, "Unable to write icon: {$outputPath}\n");
		exit(1);
	}

	imagedestroy($target);
	fwrite(STDOUT, "Built {$outputPath}\n");
}

imagedestroy($source);
