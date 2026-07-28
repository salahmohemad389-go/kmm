export type TabType =
  | 'home'
  | 'dashboard'
  | 'gym'
  | 'social'
  | 'shop'
  | 'stories'
  | 'progress'
  | 'subscriptions';

export type Language = 'en' | 'ar';

export type UserRole = 'admin' | 'moderator' | 'coach' | 'user';

export type SubscriptionStatus =
  | 'Guest'
  | 'Pending Verification'
  | 'Active'
  | 'Expired'
  | 'Suspended';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  points: number;
  streakDays: number;
  subscriptionPlanId?: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiryDate?: string;
  quizSubmitted?: boolean;
}

export interface ExerciseSet {
  setNumber: number;
  targetReps: string;
  weightLbs: number;
  completed: boolean;
  actualReps?: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  totalSets: number;
  completedSets: number;
  status: 'completed' | 'active' | 'upcoming';
  mediaUrl: string;
  instructions: string;
  sets: ExerciseSet[];
  bestSet: string;
  lastWeekSet: string;
  powerOutputDelta: string;
  restTimeSeconds?: number;
}

export interface WorkoutProgram {
  id: string;
  title: string;
  category: string;
  daysPerWeek: number;
  description: string;
  mediaUrl: string;
  exercises: ExerciseItem[];
}

export interface ClientData {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
  goal: 'BULK' | 'CUT' | 'MAINTAIN';
  currentWeightKg: number;
  weightDeltaKg: number;
  weeklyAdherencePercent: number;
  statusType: 'video_review' | 'up_to_date' | 'messages';
  statusLabel: string;
  messagesCount?: number;
  intakeAnswers?: IntakeQuestionnaire;
  assignedProgramId?: string;
  coachNotes?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface StoreCategory {
  id: string;
  title: string;
  titleAr: string;
  icon: string;
  image: string;
  hidden: boolean;
  order: number;
}

export interface StoreItem {
  id: string;
  title: string;
  pointsCost: number;
  categoryId: string;
  category: string;
  image: string;
  description: string;
  stock?: number;
  hidden?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servingGram: number;
  substitutes: {
    foodName: string;
    foodNameAr: string;
    equivalentServingGram: number;
  }[];
}

export interface SuccessStory {
  id: string;
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

export interface IntakeQuestionnaire {
  age: number;
  heightCm: number;
  weightKg: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  goal: 'fat_loss' | 'muscle_gain' | 'recomp' | 'maintenance';
  medicalConditions: string;
  injuries: string;
  allergies: string;
  mealsPerDay: number;
  workoutDaysPerWeek: number;
  availableEquipment: 'full_gym' | 'home_dumbbells' | 'bodyweight';
  sleepHours: number;
  waterLiters: number;
  experienceYears: string;
  bodyPhotoUrl?: string;
  submittedAt: string;
}

export interface ProgressLog {
  id: string;
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

export interface SubscriptionPlan {
  id: string;
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

export interface SystemSettings {
  visibleTabs: Record<TabType, boolean>;
  appName: string;
  heroBannerUrl: string;
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  customPages: {
    id: string;
    title: string;
    titleAr: string;
    content: string;
    contentAr: string;
    icon: string;
    hidden: boolean;
  }[];
}
