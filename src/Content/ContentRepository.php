<?php

declare(strict_types=1);

namespace Muoviotukset\Content;

final class ContentRepository{

	private array $content;

	public function __construct(string $contentFile, private readonly array $runtimeConfig = []){

		if(!is_file($contentFile)){
			throw new \RuntimeException('Content file is missing. Run `php bin/build-content.php` first.');
		}

		$decoded = json_decode((string) file_get_contents($contentFile), true);

		if(!is_array($decoded)){
			throw new \RuntimeException('Content file is not valid JSON.');
		}

		$this->content = $decoded;
	}

	public function clientConfig(): array{

		return [
			'meta' => $this->content['meta'] ?? [],
			'settings' => array_merge($this->content['settings'] ?? [], $this->runtimeConfig),
			'tracks' => $this->content['tracks'] ?? [],
			'parts' => $this->content['parts'] ?? [],
			'mutations' => $this->content['mutations'] ?? [],
			'tiles' => $this->content['tiles'] ?? [],
			'achievementByPartCount' => $this->content['achievementByPartCount'] ?? [],
		];
	}

	public function questionSet(int $setId): ?array{
		return $this->content['questions'][(string) $setId] ?? null;
	}

	public function mutation(string $slug): ?array{
		return $this->content['mutations'][$slug] ?? null;
	}

	public function meta(): array{
		return $this->content['meta'] ?? [];
	}
}
