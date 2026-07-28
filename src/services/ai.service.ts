import { api } from '../lib/apiClient';
import { endpoints } from '../api/endpoints';
import type {
  AiAlternativeExerciseRequest,
  AiAlternativeExerciseResponse,
  AiQuizRecommendationRequest,
  AiQuizRecommendationResponse,
} from '../api/dto';

export const aiService = {
  async getAlternativeExercise(
    exerciseName: string,
    targetMuscle: string,
  ): Promise<AiAlternativeExerciseResponse> {
    return api.post<AiAlternativeExerciseResponse>(
      endpoints.ai.alternativeExercise,
      {
        exerciseName,
        targetMuscle,
      } satisfies AiAlternativeExerciseRequest,
      { timeout: 15_000, retries: 2, retryDelay: 2000 },
    );
  },

  async getQuizRecommendation(
    focus: string,
    experienceLevel: string,
    daysPerWeek?: number,
  ): Promise<AiQuizRecommendationResponse> {
    return api.post<AiQuizRecommendationResponse>(
      endpoints.ai.quizRecommendation,
      {
        focus,
        experienceLevel,
        daysPerWeek,
      } satisfies AiQuizRecommendationRequest,
      { timeout: 15_000, retries: 2, retryDelay: 2000 },
    );
  },
};
