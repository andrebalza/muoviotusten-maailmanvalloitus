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
defined('MUOVIOTUKSET_VOTING_VERSION') || define('MUOVIOTUKSET_VOTING_VERSION', '20260621a');
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
	$template->concat('PLUGIN_INDEX_CONTENT_BEGIN', muoviotukset_voting_faction_top_ui());
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

function muoviotukset_voting_faction_top_ui(): string
{
	$rankings = muoviotukset_voting_faction_rankings(3);
	$rows = '';

	foreach ($rankings as $index => $ranking) {
		$rank = $index + 1;
		$faction = htmlspecialchars(muoviotukset_voting_title_case_faction($ranking['faction']), ENT_QUOTES, 'UTF-8');
		$votes = (int)$ranking['votes'];
		$voteLabelEn = $votes === 1 ? '1 vote' : $votes.' votes';
		$voteLabelFi = $votes === 1 ? '1 ääni' : $votes.' ääntä';

		$rows .= '
		<li class="muov-faction-top__row">
			<span class="muov-faction-top__rank">'.$rank.'</span>
			<span class="muov-faction-top__name">'.$faction.'</span>
			<span class="muov-faction-top__votes" data-lang-fi="'.htmlspecialchars($voteLabelFi, ENT_QUOTES, 'UTF-8').'" data-lang-en="'.htmlspecialchars($voteLabelEn, ENT_QUOTES, 'UTF-8').'">'.$voteLabelEn.'</span>
		</li>';
	}

	if ($rows === '') {
		$rows = '
		<li class="muov-faction-top__empty" data-lang-fi="Heimojen sijoitukset näkyvät täällä, kun ensimmäiset yleisöäänet on annettu." data-lang-en="Faction rankings will appear here after the first public votes.">Faction rankings will appear here after the first public votes.</li>';
	}

	return '
<section class="muov-faction-top" aria-labelledby="muov-faction-top-title">
	<div class="muov-faction-top__heading">
		<p data-lang-fi="Yleisöäänien perusteella" data-lang-en="Based on public votes">Based on public votes</p>
		<h2 id="muov-faction-top-title" data-lang-fi="Heimojen TOP 3" data-lang-en="Faction TOP 3">Faction TOP 3</h2>
	</div>
	<ol class="muov-faction-top__list">'.$rows.'
	</ol>
</section>
';
}

function muoviotukset_voting_faction_rankings(int $limit): array
{
	$query = '
SELECT i.id, i.comment, COALESCE(v.vote_count, 0) AS vote_count
	FROM '.IMAGE_CATEGORY_TABLE.' ic
	INNER JOIN '.IMAGES_TABLE.' i
		ON i.id = ic.image_id
	LEFT JOIN (
		SELECT image_id, COUNT(*) AS vote_count
			FROM '.muoviotukset_voting_table().'
			GROUP BY image_id
	) v
		ON v.image_id = i.id
	WHERE ic.category_id = '.MUOVIOTUKSET_VOTING_CATEGORY_ID.'
;';

	$factions = [];
	$result = pwg_query($query);
	while ($row = pwg_db_fetch_assoc($result)) {
		$details = muoviotukset_voting_comment_details((string)($row['comment'] ?? ''));
		$faction = muoviotukset_voting_localized_comment_value($details['faction'] ?? null);
		$key = muoviotukset_voting_normalize_faction($faction);

		if ($key === '') {
			continue;
		}

		if (!isset($factions[$key])) {
			$factions[$key] = [
				'faction' => $faction,
				'votes' => 0,
			];
		}

		$factions[$key]['votes'] += (int)($row['vote_count'] ?? 0);
	}

	$rankings = array_values(array_filter($factions, function (array $ranking): bool {
		return $ranking['votes'] > 0;
	}));

	usort($rankings, function (array $left, array $right): int {
		if ($left['votes'] === $right['votes']) {
			return strcasecmp($left['faction'], $right['faction']);
		}

		return $right['votes'] <=> $left['votes'];
	});

	return array_slice($rankings, 0, max(1, $limit));
}

function muoviotukset_voting_comment_details(string $comment): array
{
	$details = [
		'name' => '',
		'ability' => ['en' => '', 'fi' => ''],
		'faction' => ['en' => '', 'fi' => ''],
		'survival' => ['en' => '', 'fi' => ''],
	];

	if (preg_match_all('/<span\b[^>]*\blang="(en|fi)"[^>]*>(.*?)<\/span>/is', $comment, $matches, PREG_SET_ORDER)) {
		foreach ($matches as $match) {
			$lang = $match[1];
			$text = muoviotukset_voting_clean_comment_text($match[2]);
			muoviotukset_voting_apply_comment_line($details, $lang, $text);
		}
		return $details;
	}

	foreach (preg_split('/\R+/', $comment) ?: [] as $line) {
		muoviotukset_voting_apply_comment_line($details, 'en', muoviotukset_voting_clean_comment_text($line));
	}

	return $details;
}

function muoviotukset_voting_apply_comment_line(array &$details, string $lang, string $line): void
{
	$pairs = [
		'Creature name:' => ['name', null],
		'Otuksen nimi:' => ['name', null],
		'Special ability:' => ['ability', 'en'],
		'Erikoiskyky:' => ['ability', 'fi'],
		'Faction:' => ['faction', 'en'],
		'Heimo:' => ['faction', 'fi'],
		'Survival style:' => ['survival', 'en'],
		'Selviytymistapa:' => ['survival', 'fi'],
		'Efficiency judgement:' => ['survival', 'en'],
		'Tehokkuusarvio:' => ['survival', 'fi'],
	];

	foreach ($pairs as $prefix => $target) {
		if (stripos($line, $prefix) !== 0) {
			continue;
		}

		$value = trim(substr($line, strlen($prefix)));
		if ($value === '') {
			return;
		}

		if ($target[0] === 'name') {
			$details['name'] = $value;
			return;
		}

		$targetLang = $target[1] ?? $lang;
		if ($target[0] === 'faction') {
			$value = muoviotukset_voting_comment_context_value($value, $targetLang);
		}

		$details[$target[0]][$targetLang] = $value;
		return;
	}
}

function muoviotukset_voting_comment_context_value(string $value, string $lang): string
{
	$marker = $lang === 'fi' ? '/\s+Laatikko:.*$/iu' : '/\s+Box:.*$/iu';

	return trim((string)preg_replace($marker, '', $value));
}

function muoviotukset_voting_clean_comment_text(string $text): string
{
	return trim(html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}

function muoviotukset_voting_localized_comment_value($value): string
{
	if (!is_array($value)) {
		return trim((string)$value);
	}

	return trim((string)($value['en'] ?? $value['fi'] ?? ''));
}

function muoviotukset_voting_normalize_faction(string $faction): string
{
	return strtolower(trim($faction));
}

function muoviotukset_voting_title_case_faction(string $faction): string
{
	$faction = trim($faction);
	if ($faction === '') {
		return '';
	}

	return strtoupper(substr($faction, 0, 1)).substr($faction, 1);
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
