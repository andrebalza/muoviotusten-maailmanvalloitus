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
		$partNames = is_array($state['unlockedPartNames'] ?? null) ? $state['unlockedPartNames'] : [];
		$parts = implode(', ', $partNames);
		$partCount = count($partNames);
		$score = SubmissionScore::evaluate($submission);

		$lines = [
			$this->localizedCreatureNameLine((string) $submission['name']),
			$this->localizedLine('Special ability', 'Erikoiskyky', (string) $submission['specialAbility']),
			$this->localizedLine('Team name / class', 'Ryhmän nimi / luokka', (string) ($submission['teamName'] ?? '')),
			$this->localizedContextLine($state),
			$this->localizedLine(
				'Difficulty',
				'Vaikeustaso',
				(string) ($state['difficulty'] ?? ''),
				$this->localizedDifficulty((string) ($state['difficulty'] ?? ''))
			),
			'',
			$this->localizedLine('Unlocked parts', 'Avatut osat', $partCount.' - '.$parts),
			$this->localizedLine('Parts on creature', 'Osia otuksessa', (string) ($submission['partsCount'] ?? '')),
			$this->localizedLine('Rubber bands', 'Kuminauhat', (string) ($submission['rubberBands'] ?? '')),
			$this->localizedMaterialsLine($submission),
			$this->localizedLine(
				'Efficiency judgement',
				'Tehokkuusarvio',
				$score['efficiencyJudgement'],
				$this->localizedEfficiencyJudgement($score['efficiencyJudgement'])
			),
			'',
			$this->localizedStrongLine('Final score', 'Loppupisteet', $score['finalScore'].' / 100'),
		];

		return implode("\n", $lines);
	}

	private function localizedCreatureNameLine(string $name): string{

		$escapedName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');

		return '<span class="mm-comment-en" lang="en">Creature name: '.$escapedName.'</span>'
			.'<span class="mm-comment-fi" lang="fi">Otuksen nimi: '.$escapedName.'</span>';
	}

	private function localizedLine(string $englishLabel, string $finnishLabel, string $englishValue, ?string $finnishValue = null): string{

		return $this->localizedText(
			$englishLabel.': '.$englishValue,
			$finnishLabel.': '.($finnishValue ?? $englishValue)
		);
	}

	private function localizedStrongLine(string $englishLabel, string $finnishLabel, string $value): string{

		return '<strong>'.$this->localizedLine($englishLabel, $finnishLabel, $value).'</strong>';
	}

	private function localizedContextLine(array $state): string{

		$faction = (string) ($state['faction'] ?? '');
		$box = (string) ($state['activeBoxLabel'] ?? '');
		$track = (string) ($state['trackId'] ?? '');

		return $this->localizedText(
			'Faction: '.$faction.' Box: '.$box.' Track: '.$track,
			'Heimo: '.$faction.' Laatikko: '.$box.' Rata: '.$track
		);
	}

	private function localizedMaterialsLine(array $submission): string{

		$cableTies = (string) ($submission['cableTies'] ?? '');
		$tapeCm = (string) ($submission['tapeCm'] ?? '');

		return $this->localizedText(
			'Cable ties: '.$cableTies.' Tape (cm): '.$tapeCm,
			'Nippusiteet: '.$cableTies.' Teippi (cm): '.$tapeCm
		);
	}

	private function localizedText(string $english, string $finnish): string{

		return '<span class="mm-comment-en" lang="en">'.$this->escape($english).'</span>'
			.'<span class="mm-comment-fi" lang="fi">'.$this->escape($finnish).'</span>';
	}

	private function localizedDifficulty(string $difficulty): string{

		return match($difficulty){
			'hard' => 'Vaikea',
			'easy' => 'Helppo',
			default => $difficulty,
		};
	}

	private function localizedEfficiencyJudgement(string $judgement): string{

		return match($judgement){
			'Efficient' => 'Tehokas',
			'Balanced' => 'Tasapainoinen',
			'Resource-heavy' => 'Materiaalia kuluttava',
			'No parts used' => 'Ei käytettyjä osia',
			default => $judgement,
		};
	}

	private function escape(string $value): string{

		return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
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
