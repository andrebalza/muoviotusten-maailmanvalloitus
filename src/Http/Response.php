<?php

declare(strict_types=1);

namespace Muoviotukset\Http;

final class Response{

	public function __construct(
		private readonly string $body,
		private readonly int $status = 200,
		private readonly array $headers = [],
	){}

	public static function html(string $body, int $status = 200, array $headers = []): self{
		return new self($body, $status, array_merge([
			'Content-Type' => 'text/html; charset=utf-8',
		], $headers));
	}

	public static function json(array $payload, int $status = 200, array $headers = []): self{
		return new self(
			json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '{}',
			$status,
			array_merge([
				'Content-Type' => 'application/json; charset=utf-8',
			], $headers)
		);
	}

	public function send(): void{

		http_response_code($this->status);

		foreach($this->headers as $name => $value){
			header(sprintf('%s: %s', $name, $value));
		}

		echo $this->body;
	}
}
