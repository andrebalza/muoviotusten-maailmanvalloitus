<?php

declare(strict_types=1);

namespace Muoviotukset\Submission;

final class SubmissionScore{

	private const TOTAL_QUESTIONS = 13;
	private const MAX_TIPS = 5;
	private const TAPE_CM_PER_UNIT = 1.0;

	public static function evaluate(array $submission): array{

		$state = is_array($submission['gameState'] ?? null) ? $submission['gameState'] : [];
		$collectedParts = self::unlockedPartCount($state);
		$usedParts = max(0, (int) ($submission['partsCount'] ?? 0));
		$rubberBands = max(0, (int) ($submission['rubberBands'] ?? 0));
		$cableTies = max(0, (int) ($submission['cableTies'] ?? 0));
		$tapeCm = max(0, (int) ($submission['tapeCm'] ?? 0));
		$usedTips = max(0, (int) ($state['usedTips'] ?? 0));
		$correctAnswers = self::correctAnswerCount($state, $collectedParts);

		$materialUnits = $rubberBands + $cableTies + ($tapeCm / self::TAPE_CM_PER_UNIT);
		$effectivePartDenominator = $collectedParts > 0 ? min($usedParts, $collectedParts) : $usedParts;
		$unitsPerPart = $effectivePartDenominator > 0 ? $materialUnits / $effectivePartDenominator : null;
		$efficiencyJudgement = self::efficiencyJudgement($usedParts, $materialUnits, $unitsPerPart);
		$efficiencyFactor = self::efficiencyFactor($usedParts, $unitsPerPart);
		$knowledgeFactor = min(1.0, $correctAnswers / self::TOTAL_QUESTIONS);
		$partsUsageFactor = self::partsUsageFactor($usedParts, $collectedParts);
		$tipFactor = max(0.0, 1.0 - (min($usedTips, self::MAX_TIPS) / self::MAX_TIPS));

		$score = (45 * $knowledgeFactor)
			+ (35 * $efficiencyFactor)
			+ (8 * $partsUsageFactor)
			+ (7 * $knowledgeFactor)
			+ (5 * $tipFactor);

		return [
			'efficiencyJudgement' => $efficiencyJudgement,
			'finalScore' => (int) round(min(100.0, max(0.0, $score))),
		];
	}

	private static function unlockedPartCount(array $state): int{

		if(isset($state['unlockedPartIds']) && is_array($state['unlockedPartIds'])){
			return count($state['unlockedPartIds']);
		}

		if(isset($state['unlockedPartNames']) && is_array($state['unlockedPartNames'])){
			return count($state['unlockedPartNames']);
		}

		return 0;
	}

	private static function correctAnswerCount(array $state, int $fallbackPartCount): int{

		if(isset($state['answeredSets']) && is_array($state['answeredSets'])){
			$count = 0;

			foreach($state['answeredSets'] as $answer){
				if(is_array($answer) && ($answer['correct'] ?? false) === true){
					$count++;
				}
			}

			return $count;
		}

		return $fallbackPartCount;
	}

	private static function efficiencyJudgement(int $usedParts, float $materialUnits, ?float $unitsPerPart): string{

		if($usedParts <= 0){
			return $materialUnits > 0 ? 'Resource-heavy' : 'No parts used';
		}

		if($unitsPerPart !== null && $unitsPerPart < 1.5){
			return 'Efficient';
		}

		if($unitsPerPart !== null && $unitsPerPart <= 2.5){
			return 'Balanced';
		}

		return 'Resource-heavy';
	}

	private static function efficiencyFactor(int $usedParts, ?float $unitsPerPart): float{

		if($usedParts <= 0 || $unitsPerPart === null){
			return 0.0;
		}

		if($unitsPerPart < 1.5){
			return 1.0;
		}

		if($unitsPerPart <= 2.5){
			return 0.7;
		}

		return 0.35;
	}

	private static function partsUsageFactor(int $usedParts, int $collectedParts): float{

		if($collectedParts <= 0){
			return 1.0;
		}

		if($usedParts <= 0){
			return 0.0;
		}

		if($usedParts <= $collectedParts){
			return $usedParts / $collectedParts;
		}

		$overage = $usedParts - $collectedParts;

		return max(0.0, 1.0 - ($overage / $collectedParts));
	}
}
