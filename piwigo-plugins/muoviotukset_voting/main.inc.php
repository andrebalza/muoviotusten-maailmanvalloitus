<?php
/*
Plugin Name: Muoviotukset Voting
Version: 1.0.0
Description: Adds the Muoviotukset gallery voting flow with three votes per browser device.
Author: Muoviotukset
*/

if (!defined('PHPWG_ROOT_PATH')) {
	die('Hacking attempt!');
}

defined('MUOVIOTUKSET_VOTING_ID') || define('MUOVIOTUKSET_VOTING_ID', basename(dirname(__FILE__)));
defined('MUOVIOTUKSET_VOTING_PATH') || define('MUOVIOTUKSET_VOTING_PATH', PHPWG_PLUGINS_PATH.MUOVIOTUKSET_VOTING_ID.'/');
defined('MUOVIOTUKSET_VOTING_VERSION') || define('MUOVIOTUKSET_VOTING_VERSION', '20260504a');
defined('MUOVIOTUKSET_VOTING_CATEGORY_ID') || define('MUOVIOTUKSET_VOTING_CATEGORY_ID', 1);

add_event_handler('loc_begin_index', 'muoviotukset_voting_sort_index');
add_event_handler('loc_end_index', 'muoviotukset_voting_index_ui');
add_event_handler('loc_end_picture', 'muoviotukset_voting_picture_ui');

function muoviotukset_voting_table(): string
{
	global $prefixeTable;

	return $prefixeTable.'muoviotukset_votes';
}

function muoviotukset_voting_is_creature_category(): bool
{
	global $page;

	return isset($page['category']['id']) && (int)$page['category']['id'] === MUOVIOTUKSET_VOTING_CATEGORY_ID;
}

function muoviotukset_voting_sort_index(): void
{
	global $page;

	if (!muoviotukset_voting_is_creature_category() || ($_GET['muoviotukset_sort'] ?? '') !== 'votes') {
		return;
	}

	if (empty($page['items']) || !is_array($page['items'])) {
		return;
	}

	$ids = array_map('intval', $page['items']);
	$counts = muoviotukset_voting_counts_for_images($ids);

	usort($page['items'], function ($left, $right) use ($counts): int {
		$left = (int)$left;
		$right = (int)$right;
		$leftVotes = $counts[$left] ?? 0;
		$rightVotes = $counts[$right] ?? 0;

		if ($leftVotes === $rightVotes) {
			return $right <=> $left;
		}

		return $rightVotes <=> $leftVotes;
	});
}

function muoviotukset_voting_index_ui(): void
{
	global $template;

	if (!muoviotukset_voting_is_creature_category()) {
		return;
	}

	$sort = $_GET['muoviotukset_sort'] ?? 'newest';
	$baseUrl = get_absolute_root_url().'index.php?/category/'.MUOVIOTUKSET_VOTING_CATEGORY_ID;
	$newestUrl = htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8');
	$votesUrl = htmlspecialchars($baseUrl.'&muoviotukset_sort=votes', ENT_QUOTES, 'UTF-8');
	$newestActive = $sort !== 'votes' ? ' is-active' : '';
	$votesActive = $sort === 'votes' ? ' is-active' : '';

	$template->concat('PLUGIN_INDEX_CONTENT_BEGIN', muoviotukset_voting_assets());
	$template->concat('PLUGIN_INDEX_CONTENT_BEGIN', '
<nav class="muov-vote-sort" aria-label="Gallery sorting">
	<a class="muov-vote-sort__link'.$newestActive.'" href="'.$newestUrl.'"><span data-lang-fi="Uusimmat" data-lang-en="Newest">Newest</span></a>
	<a class="muov-vote-sort__link'.$votesActive.'" href="'.$votesUrl.'"><span data-lang-fi="Eniten ääniä" data-lang-en="Most voted">Most voted</span></a>
</nav>
');
}

function muoviotukset_voting_picture_ui(): void
{
	global $template, $page;

	if (empty($page['image_id'])) {
		return;
	}

	$imageId = (int)$page['image_id'];
	if (!muoviotukset_voting_image_is_in_creature_category($imageId)) {
		return;
	}

	$template->concat('PLUGIN_PICTURE_AFTER', muoviotukset_voting_assets());
	$template->concat('PLUGIN_PICTURE_AFTER', '
<section class="muov-vote-card" data-muoviotukset-voting data-image-id="'.$imageId.'" aria-live="polite">
	<div class="muov-vote-card__copy">
		<h3 data-lang-fi="Äänestä tätä otusta" data-lang-en="Vote for this creature">Vote for this creature</h3>
		<p data-muov-vote-status data-lang-fi="Sinulla on 3 ääntä käytettävissä." data-lang-en="You have 3 votes available.">You have 3 votes available.</p>
	</div>
	<div class="muov-vote-card__actions">
		<strong data-muov-vote-count>0</strong>
		<button type="button" data-muov-vote-button data-lang-fi="Anna ääni" data-lang-en="Vote">Vote</button>
	</div>
</section>
<a class="mm-back-to-gallery mm-back-to-gallery--bottom" href="index.php?/category/1"><span class="mm-back-en" lang="en">Back to gallery</span><span class="mm-back-fi" lang="fi">Takaisin galleriaan</span></a>
');
}

function muoviotukset_voting_assets(): string
{
	$base = get_absolute_root_url().'plugins/'.rawurlencode(MUOVIOTUKSET_VOTING_ID).'/assets/';
	$version = rawurlencode(MUOVIOTUKSET_VOTING_VERSION);

	return '
<link rel="stylesheet" href="'.$base.'voting.css?v='.$version.'">
<script defer src="'.$base.'voting.js?v='.$version.'"></script>
';
}

function muoviotukset_voting_counts_for_images(array $imageIds): array
{
	$imageIds = array_values(array_unique(array_filter(array_map('intval', $imageIds))));
	if (!$imageIds) {
		return [];
	}

	$query = '
SELECT image_id, COUNT(*) AS vote_count
	FROM '.muoviotukset_voting_table().'
	WHERE image_id IN ('.implode(',', $imageIds).')
	GROUP BY image_id
;';

	$counts = [];
	$result = pwg_query($query);
	while ($row = pwg_db_fetch_assoc($result)) {
		$counts[(int)$row['image_id']] = (int)$row['vote_count'];
	}

	return $counts;
}

function muoviotukset_voting_image_is_in_creature_category(int $imageId): bool
{
	if ($imageId < 1) {
		return false;
	}

	$query = '
SELECT COUNT(*) AS image_count
	FROM '.IMAGE_CATEGORY_TABLE.'
	WHERE image_id = '.$imageId.'
		AND category_id = '.MUOVIOTUKSET_VOTING_CATEGORY_ID.'
;';

	list($count) = pwg_db_fetch_row(pwg_query($query));

	return (int)$count > 0;
}
