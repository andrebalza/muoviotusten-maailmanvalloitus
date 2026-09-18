<?php

define('PHPWG_ROOT_PATH', dirname(__FILE__).'/../../');
include_once(PHPWG_ROOT_PATH.'include/common.inc.php');
include_once(dirname(__FILE__).'/main.inc.php');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

try {
	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

	if ($method === 'GET') {
		muoviotukset_voting_api_counts();
	}
	elseif ($method === 'POST') {
		muoviotukset_voting_api_vote();
	}
	else {
		muoviotukset_voting_api_error('Method not allowed.', 405);
	}
}
catch (Throwable $exception) {
	muoviotukset_voting_api_error('Voting is temporarily unavailable.', 500);
}

function muoviotukset_voting_api_counts(): void
{
	$ids = [];
	if (isset($_GET['ids'])) {
		$ids = preg_split('/,/', (string)$_GET['ids']);
	}
	elseif (isset($_GET['image_id'])) {
		$ids = [$_GET['image_id']];
	}

	$ids = array_values(array_unique(array_filter(array_map('intval', $ids))));
	$counts = muoviotukset_voting_counts_for_images($ids);

	$response = [
		'ok' => true,
		'counts' => [],
		'details' => muoviotukset_voting_api_details_for_images($ids),
	];
	$response['names'] = [];
	foreach ($response['details'] as $id => $detail) {
		$response['names'][$id] = $detail['name'] ?? '';
	}

	foreach ($ids as $id) {
		$response['counts'][(string)$id] = $counts[$id] ?? 0;
	}

	if (isset($_GET['token'])) {
		$voterHash = muoviotukset_voting_api_hash_token((string)$_GET['token']);
		$response['remaining'] = muoviotukset_voting_api_remaining_votes($voterHash);
		$response['voted'] = [];

		foreach ($ids as $id) {
			$response['voted'][(string)$id] = muoviotukset_voting_api_has_voted($id, $voterHash);
		}
	}

	echo json_encode($response);
	exit;
}

function muoviotukset_voting_api_vote(): void
{
	$payload = json_decode(file_get_contents('php://input'), true);
	if (!is_array($payload)) {
		$payload = $_POST;
	}

	$imageId = (int)($payload['image_id'] ?? 0);
	$token = (string)($payload['token'] ?? '');
	$voterHash = muoviotukset_voting_api_hash_token($token);

	if (!muoviotukset_voting_image_is_in_creature_category($imageId)) {
		muoviotukset_voting_api_error('Unknown creature image.', 404);
	}

	if (muoviotukset_voting_api_has_voted($imageId, $voterHash)) {
		muoviotukset_voting_api_error('You have already voted for this creature.', 409, [
			'counts' => [(string)$imageId => muoviotukset_voting_counts_for_images([$imageId])[$imageId] ?? 0],
			'remaining' => muoviotukset_voting_api_remaining_votes($voterHash),
			'voted' => [(string)$imageId => true],
		]);
	}

	if (muoviotukset_voting_api_remaining_votes($voterHash) <= 0) {
		muoviotukset_voting_api_error('You have used all 3 votes.', 409, [
			'counts' => [(string)$imageId => muoviotukset_voting_counts_for_images([$imageId])[$imageId] ?? 0],
			'remaining' => 0,
			'voted' => [(string)$imageId => false],
		]);
	}

	$query = '
INSERT INTO '.muoviotukset_voting_table().'
	(image_id, voter_hash, created_at)
	VALUES ('.$imageId.', \''.pwg_db_real_escape_string($voterHash).'\', NOW())
;';
	pwg_query($query);

	echo json_encode([
		'ok' => true,
		'counts' => [(string)$imageId => muoviotukset_voting_counts_for_images([$imageId])[$imageId] ?? 0],
		'remaining' => muoviotukset_voting_api_remaining_votes($voterHash),
		'voted' => [(string)$imageId => true],
	]);
	exit;
}

function muoviotukset_voting_api_hash_token(string $token): string
{
	if (!preg_match('/^[A-Za-z0-9_-]{24,128}$/', $token)) {
		muoviotukset_voting_api_error('Invalid voting browser token.', 400);
	}

	return hash('sha256', $token);
}

function muoviotukset_voting_api_details_for_images(array $imageIds): array
{
	$imageIds = array_values(array_unique(array_filter(array_map('intval', $imageIds))));
	if (!$imageIds) {
		return [];
	}

	$query = '
SELECT id, name, file, comment
	FROM '.IMAGES_TABLE.'
	WHERE id IN ('.implode(',', $imageIds).')
;';

	$details = [];
	$result = pwg_query($query);
	while ($row = pwg_db_fetch_assoc($result)) {
		$name = trim((string)($row['name'] ?? ''));
		if ($name === '') {
			$name = preg_replace('/\.[^.]+$/', '', (string)$row['file']);
		}

		$commentDetails = muoviotukset_voting_comment_details((string)($row['comment'] ?? ''));
		if (($commentDetails['name'] ?? '') !== '') {
			$name = $commentDetails['name'];
		}

		$details[(string)$row['id']] = [
			'name' => $name,
			'ability' => $commentDetails['ability'] ?? ['en' => '', 'fi' => ''],
			'faction' => $commentDetails['faction'] ?? ['en' => '', 'fi' => ''],
			'survival' => $commentDetails['survival'] ?? ['en' => '', 'fi' => ''],
		];
	}

	return $details;
}

function muoviotukset_voting_api_remaining_votes(string $voterHash): int
{
	$query = '
SELECT COUNT(*) AS vote_count
	FROM '.muoviotukset_voting_table().'
	WHERE voter_hash = \''.pwg_db_real_escape_string($voterHash).'\'
;';
	list($count) = pwg_db_fetch_row(pwg_query($query));

	return max(0, 3 - (int)$count);
}

function muoviotukset_voting_api_has_voted(int $imageId, string $voterHash): bool
{
	$query = '
SELECT COUNT(*) AS vote_count
	FROM '.muoviotukset_voting_table().'
	WHERE image_id = '.$imageId.'
		AND voter_hash = \''.pwg_db_real_escape_string($voterHash).'\'
;';
	list($count) = pwg_db_fetch_row(pwg_query($query));

	return (int)$count > 0;
}

function muoviotukset_voting_api_error(string $message, int $status, array $extra = []): void
{
	http_response_code($status);
	echo json_encode(array_merge([
		'ok' => false,
		'error' => $message,
	], $extra));
	exit;
}
