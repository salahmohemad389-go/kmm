/**
 * All typed DTOs (Data Transfer Objects) for API request/response shapes.
 * These mirror types.ts but are specifically for API communication.
 */

import type {
  UserAccount,
  StoreCategory,
  StoreItem,
  FoodItem,
  ClientData,
  SuccessStory,
  SubscriptionPlan,
  ProgressLog,
  WorkoutProgram,
  ExerciseItem,
  IntakeQuestionnaire,
  TabType,
  SystemSettings,
} from '../types';

// ─── Auth DTOs ────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
  role?: 'admin' | 'moderator' | 'coach' | 'user';
}

export interface LoginResponse {
  user: UserAccount;
  token: string;
  expiresAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

// ─── AI DTOs ──────────────────────────────────────────────────────────────────

export interface AiAlternativeExerciseRequest {
  exerciseName: string;
  targetMuscle: string;
}

export interface AiAlternativeExerciseResponse {
  exerciseName: string;
  alternatives: {
    name: string;
    reason: string;
    recommendedSetsReps: string;
  }[];
}

export interface AiQuizRecommendationRequest {
  focus: string;
  experienceLevel: string;
  daysPerWeek?: number;
}

export interface AiQuizRecommendationResponse {
  programTitle: string;
  summary: string;
  weeklySplit: string[];
  estimatedCalorieTarget: number;
  dailyProteinTarget: number;
}

// ─── Store DTOs ───────────────────────────────────────────────────────────────

export interface CreateCategoryRequest {
  title: string;
  titleAr: string;
  icon: string;
  image: string;
  hidden: boolean;
  order: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

export interface CreateStoreItemRequest {
  title: string;
  pointsCost: number;
  categoryId: string;
  category: string;
  image: string;
  description: string;
  stock?: number;
  hidden?: boolean;
}

export interface UpdateStoreItemRequest extends Partial<CreateStoreItemRequest> {}

// ─── Food DTOs ────────────────────────────────────────────────────────────────

export interface CreateFoodRequest {
  name: string;
  nameAr: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingGram: number;
  substitutes: FoodItem['substitutes'];
}

export interface UpdateFoodRequest extends Partial<CreateFoodRequest> {}

// ─── Progress DTOs ────────────────────────────────────────────────────────────

export interface CreateProgressLogRequest {
  date: string;
  weightKg: number;
  bodyFatPercent: number;
  chestCm: number;
  waistCm: number;
  armsCm: number;
  benchPressLbs: number;
  squatLbs: number;
  photoUrl?: string;
  notes?: string;
}

// ─── Workout DTOs ─────────────────────────────────────────────────────────────

export interface CreateWorkoutProgramRequest {
  title: string;
  category: string;
  daysPerWeek: number;
  description: string;
  mediaUrl: string;
  exercises: ExerciseItem[];
}

// ─── Subscription DTOs ────────────────────────────────────────────────────────

export interface CreateSubscriptionPlanRequest {
  name: string;
  nameAr: string;
  priceUSD: number;
  durationMonths: number;
  features: string[];
  featuresAr: string[];
  color: string;
  badge: string;
  isPopular?: boolean;
}

export interface UpdateSubscriptionPlanRequest extends Partial<CreateSubscriptionPlanRequest> {}

// ─── Story DTOs ───────────────────────────────────────────────────────────────

export interface CreateSuccessStoryRequest {
  clientName: string;
  beforeImage: string;
  afterImage: string;
  durationWeeks: number;
  improvementPercent: number;
  prevWeightKg: number;
  currWeightKg: number;
  bodyFatPercent: number;
  muscleGainedKg: number;
  reviewText: string;
  reviewTextAr: string;
  rating: number;
}

export interface UpdateSuccessStoryRequest extends Partial<CreateSuccessStoryRequest> {}

// ─── Client DTOs ──────────────────────────────────────────────────────────────

export interface UpdateClientRequest {
  name?: string;
  avatar?: string;
  goal?: 'BULK' | 'CUT' | 'MAINTAIN';
  currentWeightKg?: number;
  weeklyAdherencePercent?: number;
  assignedProgramId?: string;
  coachNotes?: string;
}

// ─── Intake DTOs ──────────────────────────────────────────────────────────────

export interface SubmitIntakeRequest extends IntakeQuestionnaire {}

// ─── Settings DTOs ────────────────────────────────────────────────────────────

export interface UpdateSettingsRequest {
  visibleTabs?: Partial<Record<TabType, boolean>>;
  appName?: string;
  heroBannerUrl?: string;
  heroTitle?: string;
  heroTitleAr?: string;
  heroSubtitle?: string;
  heroSubtitleAr?: string;
}

// ─── Points DTOs ──────────────────────────────────────────────────────────────

export interface AddPointsRequest {
  amount: number;
  reasonEn?: string;
  reasonAr?: string;
}

// ─── Health Check DTO ─────────────────────────────────────────────────────────

export interface HealthCheckResponse {
  status: string;
  app: string;
}
