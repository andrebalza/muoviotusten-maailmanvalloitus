<?php

declare(strict_types=1);

namespace Muoviotukset\Submission;

final class PiwigoClient{

	public function __construct(private readonly array $config){}

	public function isConfigured(): bool{
		foreach(['base_url', 'username', 'password', 'category_id'] as $key){
			$value = $this->config[$key] ?? null;

			if(!is_string($value) || trim($value) === ''){
				return false;
			}
		}

		return true;
	}

	public function uploadSubmission(array $submission, array $photo): array{

		if(!$this->isConfigured()){
			throw new \RuntimeException('Piwigo is not configured yet. Set PIWIGO_* values in `.env`.');
		}

		$cookieFile = tempnam(sys_get_temp_dir(), 'piwigo-cookie-');

		if($cookieFile === false){
			throw new \RuntimeException('Unable to prepare a temporary cookie jar for the Piwigo session.');
		}

		try{
			$this->postForm('pwg.session.login', [
				'username' => (string) $this->config['username'],
				'password' => (string) $this->config['password'],
			], $cookieFile);

			$result = $this->postMultipart('pwg.images.addSimple', [
				'category' => (string) $this->config['category_id'],
				'name' => $submission['name'],
				'author' => $submission['gameState']['faction'] ?? '',
				'comment' => $this->buildComment($submission),
				'tags' => implode(',', $this->buildTags($submission)),
				'image' => new \CURLFile(
					(string) $photo['tmp_name'],
					(string) (mime_content_type((string) $photo['tmp_name']) ?: $photo['type'] ?? 'application/octet-stream'),
					(string) ($photo['name'] ?? 'creature-upload.jpg')
				),
			], $cookieFile);

			$this->postForm('pwg.images.emptyLounge', [], $cookieFile);

			$this->postForm('pwg.session.logout', [], $cookieFile, false);

			return $result;
		}
		finally{
			if(is_file($cookieFile)){
				@unlink($cookieFile);
			}
		}
	}

	private function buildComment(array $submission): string{

		$state = $submission['gameState'];
		$parts = implode(', ', $state['unlockedPartNames'] ?? []);

		$lines = array_filter([
			$this->localizedCreatureNameLine((string) $submission['name']),
			'Special ability: '.$submission['specialAbility'],
			'Faction: '.($state['faction'] ?? ''),
			'Track: '.($state['trackId'] ?? ''),
			'Difficulty: '.($state['difficulty'] ?? ''),
			'Active box: '.($state['activeBoxLabel'] ?? ''),
			'Unlocked parts: '.$parts,
		]);

		return implode("\n", $lines);
	}

	private function localizedCreatureNameLine(string $name): string{

		$escapedName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');

		return '<span class="mm-comment-en" lang="en">Creature name: '.$escapedName.'</span>'
			.'<span class="mm-comment-fi" lang="fi">Otuksen nimi: '.$escapedName.'</span>';
	}

	private function buildTags(array $submission): array{

		$baseTags = $this->config['tags'] ?? [];
		$state = $submission['gameState'];

		$dynamic = array_filter([
			'track-'.($state['trackId'] ?? ''),
			'difficulty-'.($state['difficulty'] ?? ''),
			'faction-'.($state['faction'] ?? ''),
		]);

		return array_values(array_unique(array_merge($baseTags, $dynamic)));
	}

	private function postForm(string $method, array $payload, string $cookieFile, bool $expectJson = true): array{
		return $this->request(array_merge([
			'method' => $method,
			'format' => 'json',
		], $payload), $cookieFile, $expectJson);
	}

	private function postMultipart(string $method, array $payload, string $cookieFile): array{
		return $this->request(array_merge([
			'method' => $method,
			'format' => 'json',
		], $payload), $cookieFile, true);
	}

	private function request(array $payload, string $cookieFile, bool $expectJson): array{

		// Piwigo returns JSON consistently when the format is set in the query string.
		$ch = curl_init(rtrim((string) $this->config['base_url'], '/').'/ws.php?format=json');

		if($ch === false){
			throw new \RuntimeException('Could not initialize the Piwigo request.');
		}

		curl_setopt_array($ch, [
			CURLOPT_POST => true,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_POSTFIELDS => $payload,
			CURLOPT_COOKIEJAR => $cookieFile,
			CURLOPT_COOKIEFILE => $cookieFile,
			CURLOPT_TIMEOUT => 30,
		]);

		$response = curl_exec($ch);
		$error = curl_error($ch);
		$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
		curl_close($ch);

		if($response === false){
			throw new \RuntimeException('Piwigo request failed: '.$error);
		}

		if($status >= 400){
			throw new \RuntimeException('Piwigo responded with HTTP '.$status.'.');
		}

		if(!$expectJson){
			return ['ok' => true];
		}

		$decoded = json_decode($response, true);

		if(!is_array($decoded)){
			throw new \RuntimeException('Piwigo returned an unreadable response.');
		}

		if(($decoded['stat'] ?? '') !== 'ok'){
			$message = $decoded['err'] ?? $decoded['message'] ?? 'Unknown Piwigo error.';
			throw new \RuntimeException('Piwigo error: '.$message);
		}

		$result = $decoded['result'] ?? $decoded;

		return is_array($result) ? $result : ['result' => $result];
	}
}
