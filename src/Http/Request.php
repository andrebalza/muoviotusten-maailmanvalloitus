<?php

declare(strict_types=1);

namespace Muoviotukset\Http;

final class Request{

	public function __construct(
		private readonly string $method,
		private readonly string $path,
		private readonly array $query,
		private readonly array $post,
		private readonly array $files,
		private readonly array $server,
	){}

	public static function fromGlobals(): self{

		$uri = $_SERVER['REQUEST_URI'] ?? '/';
		$path = parse_url($uri, PHP_URL_PATH) ?: '/';

		return new self(
			strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET')),
			$path,
			$_GET,
			$_POST,
			$_FILES,
			$_SERVER
		);
	}

	public function method(): string{
		return $this->method;
	}

	public function path(): string{
		return $this->path;
	}

	public function query(string $key, ?string $default = null): ?string{
		$value = $this->query[$key] ?? $default;
		return is_scalar($value) ? (string) $value : $default;
	}

	public function post(string $key, ?string $default = null): ?string{
		$value = $this->post[$key] ?? $default;
		return is_scalar($value) ? (string) $value : $default;
	}

	public function file(string $key): ?array{
		$file = $this->files[$key] ?? null;
		return is_array($file) ? $file : null;
	}
}
