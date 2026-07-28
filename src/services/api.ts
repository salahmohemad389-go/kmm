/**
 * AI Service facade (legacy API).
 * Kept for backward compatibility with existing view imports.
 * For new code, prefer importing `aiService` from './index'.
 */

import { aiService } from './ai.service';
import type {
  AiAlternativeExerciseResponse,
  AiQuizRecommendationResponse,
} from '../api/dto';

export type { AiAlternativeExerciseResponse, AiQuizRecommendationResponse };

export async function fetchAiAlternativeExercise(
  exerciseName: string,
  targetMuscle: string,
): Promise<AiAlternativeExerciseResponse> {
  return aiService.getAlternativeExercise(exerciseName, targetMuscle);
}

export async function fetchAiQuizRecommendation(
  focus: string,
  experienceLevel: string,
  daysPerWeek?: number,
): Promise<AiQuizRecommendationResponse> {
  return aiService.getQuizRecommendation(focus, experienceLevel, daysPerWeek);
}
