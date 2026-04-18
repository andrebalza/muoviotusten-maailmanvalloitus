<?php

declare(strict_types=1);

namespace Muoviotukset\Views;

final class Renderer{

	public function __construct(private readonly string $viewsPath){}

	public function render(string $page, array $data = []): string{

		$viewsPath = $this->viewsPath;
		$meta = $data['meta'] ?? [];
		$boot = $data['boot'] ?? [];
		$error = $data['error'] ?? null;

		ob_start();
		require $viewsPath."/pages/{$page}.php";
		$content = (string) ob_get_clean();

		ob_start();
		require $viewsPath.'/layout.php';

		return (string) ob_get_clean();
	}
}
