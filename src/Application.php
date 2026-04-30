<?php

declare(strict_types=1);

namespace Muoviotukset;

use Muoviotukset\Content\ContentRepository;
use Muoviotukset\Http\Request;
use Muoviotukset\Http\Response;
use Muoviotukset\Submission\PiwigoClient;
use Muoviotukset\Views\Renderer;

final class Application{

	public function __construct(
		private readonly array $config,
		private readonly ContentRepository $contentRepository,
		private readonly Renderer $renderer,
		private readonly PiwigoClient $piwigoClient,
	){}

	public function handle(Request $request): Response{

		return match([$request->method(), $request->path()]){
			['GET', '/'] => $this->renderPage('home', [
				'page' => 'home',
				'title' => 'Muoviotusten maailmanvalloitus',
				'app' => $this->contentRepository->clientConfig(),
			]),
			['GET', '/scan'] => $this->renderPage('scan', [
				'page' => 'scan',
				'title' => 'Scan the next QR',
				'app' => $this->contentRepository->clientConfig(),
				'scanner' => [
					'allowedPaths' => ['/question', '/mutation', '/finish'],
				],
			]),
			['GET', '/about'] => $this->renderPage('about', [
				'page' => 'about',
				'title' => 'About',
				'app' => $this->contentRepository->clientConfig(),
			]),
			['GET', '/question'] => $this->handleQuestionPage($request),
			['GET', '/mutation'] => $this->handleMutationPage($request),
			['GET', '/finish'] => $this->renderPage('finish', [
				'page' => 'finish',
				'title' => 'Finish your creature',
				'app' => $this->contentRepository->clientConfig(),
			]),
			['POST', '/api/submissions'] => $this->handleSubmission($request),
			['GET', '/health'] => Response::json([
				'status' => 'ok',
				'app' => 'otus.muoviamo.fi',
				'contentVersion' => $this->contentRepository->meta()['generatedAt'] ?? null,
				'piwigoConfigured' => $this->piwigoClient->isConfigured(),
			]),
			default => Response::html($this->renderer->render('error', [
				'meta' => [
					'title' => 'Not found',
				],
				'boot' => [
					'page' => 'error',
					'app' => $this->contentRepository->clientConfig(),
				],
				'error' => [
					'code' => 404,
					'title' => 'Page not found',
					'message' => 'This route does not belong to the gameplay app.',
				],
			]), 404),
		};
	}

	private function handleQuestionPage(Request $request): Response{

		$setId = (int) $request->query('set', '0');

		if($setId < 1 || $setId > 13){
			return Response::json(['error' => 'Invalid question set.'], 404);
		}

		$questionSet = $this->contentRepository->questionSet($setId);

		if($questionSet === null){
			return Response::json(['error' => 'Question set not found.'], 404);
		}

		return $this->renderPage('question', [
			'page' => 'question',
			'title' => "Question set {$setId}",
			'app' => $this->contentRepository->clientConfig(),
			'questionSet' => $questionSet,
		]);
	}

	private function handleMutationPage(Request $request): Response{

		$name = strtolower(trim((string) $request->query('name', '')));
		$mutation = $this->contentRepository->mutation($name);

		if($mutation === null){
			return Response::json(['error' => 'Invalid mutation.'], 404);
		}

		return $this->renderPage('mutation', [
			'page' => 'mutation',
			'title' => $mutation['name']['en'] ?? $mutation['slug'],
			'app' => $this->contentRepository->clientConfig(),
			'mutation' => $mutation,
		]);
	}

	private function handleSubmission(Request $request): Response{

		$creatureName = trim((string) $request->post('creature_name', ''));
		$specialAbility = trim((string) $request->post('special_ability', ''));
		$rawState = (string) $request->post('game_state', '');
		$photo = $request->file('photo');

		if($creatureName === '' || $specialAbility === '' || $rawState === '' || $photo === null){
			return Response::json([
				'error' => 'Creature name, special ability, game state, and photo are required.',
			], 422);
		}

		if(($photo['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK){
			return Response::json(['error' => 'Photo upload failed.'], 422);
		}

		$gameState = json_decode($rawState, true);

		if(!is_array($gameState)){
			return Response::json(['error' => 'Invalid game state payload.'], 422);
		}

		$mimeType = mime_content_type((string) ($photo['tmp_name'] ?? '')) ?: ($photo['type'] ?? '');

		if(!in_array($mimeType, ['image/jpeg', 'image/png', 'image/webp'], true)){
			return Response::json(['error' => 'Only JPEG, PNG, or WebP photos are supported.'], 422);
		}

		try{
			$result = $this->piwigoClient->uploadSubmission([
				'name' => $creatureName,
				'specialAbility' => $specialAbility,
				'gameState' => $gameState,
			], $photo);
		}
		catch(\Throwable $exception){
			return Response::json([
				'error' => $exception->getMessage(),
			], 502);
		}

		return Response::json([
			'ok' => true,
			'message' => 'Creature submitted successfully.',
			'result' => $result,
		], 201);
	}

	private function renderPage(string $page, array $boot): Response{

		return Response::html($this->renderer->render($page, [
			'meta' => [
				'title' => $boot['title'] ?? 'Muoviotusten maailmanvalloitus',
			],
			'boot' => $boot,
		]));
	}
}
