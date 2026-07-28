import {
  ExerciseItem,
  ClientData,
  LeaderboardUser,
  StoreItem,
  StoreCategory,
  FoodItem,
  SuccessStory,
  SubscriptionPlan,
  SystemSettings,
  ProgressLog,
  WorkoutProgram,
  UserAccount,
} from '../types';

export const INITIAL_USER: UserAccount = {
  id: 'u-101',
  name: 'Alex Rivera',
  email: 'alex.rivera@apex.com',
  role: 'user',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3',
  points: 12450,
  streakDays: 14,
  subscriptionPlanId: 'sub-pro',
  subscriptionStatus: 'Active',
  subscriptionExpiryDate: '2026-12-31',
  quizSubmitted: true,
};

export const INITIAL_SYSTEM_SETTINGS: SystemSettings = {
  visibleTabs: {
    home: true,
    dashboard: true,
    gym: true,
    social: true,
    shop: true,
    stories: true,
    progress: true,
    subscriptions: true,
  },
  appName: 'APEX ELITE',
  heroBannerUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
  heroTitle: 'DOMINATE YOUR GENETICS',
  heroTitleAr: 'تحدّى حدودك الجينية اليوم',
  heroSubtitle: 'Hypertrophy Biomechanics & Elite Training Engine',
  heroSubtitleAr: 'تتبع حركة عضلاتك بالذكاء الاصطناعي والتدريب المحترف',
  customPages: [],
};

export const INITIAL_STORE_CATEGORIES: StoreCategory[] = [
  {
    id: 'cat-supplements',
    title: 'Supplements',
    titleAr: 'المكملات الغذائية',
    icon: 'prescriptions',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIisEllkLXsgEUypVHndwDV1JecdNqCO9tj5ZSNhUU8KqxtQ5drBLmCv0MeX7SZRRWjLIudq7MNuAjixpsdZAqCn7m50NbcMNROBSzp_TYj9F1Urml3Qb5ipczQeT7-3wdF7NnrisWDK7f-HUsFVND0RBeO0jT2vLaDcX_PHAwR4OFfthm3UwVpjLNc-k6HwtLP1jPM8TawhWn08QAHKHTTojBP-x0MnZgfr2GZwnLNSLmY-qi110p',
    hidden: false,
    order: 1,
  },
  {
    id: 'cat-apparel',
    title: 'Apparel & Clothing',
    titleAr: 'الملابس الرياضية',
    icon: 'apparel',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3',
    hidden: false,
    order: 2,
  },
  {
    id: 'cat-gear',
    title: 'Gym Equipment & Gear',
    titleAr: 'الأدوات الرياضية',
    icon: 'fitness_center',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
    hidden: false,
    order: 3,
  },
  {
    id: 'cat-accessories',
    title: 'Accessories',
    titleAr: 'الإكسسوارات',
    icon: 'watch',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H',
    hidden: false,
    order: 4,
  },
  {
    id: 'cat-offers',
    title: 'Offers & Bundles',
    titleAr: 'العروض والباقات',
    icon: 'local_offer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIisEllkLXsgEUypVHndwDV1JecdNqCO9tj5ZSNhUU8KqxtQ5drBLmCv0MeX7SZRRWjLIudq7MNuAjixpsdZAqCn7m50NbcMNROBSzp_TYj9F1Urml3Qb5ipczQeT7-3wdF7NnrisWDK7f-HUsFVND0RBeO0jT2vLaDcX_PHAwR4OFfthm3UwVpjLNc-k6HwtLP1jPM8TawhWn08QAHKHTTojBP-x0MnZgfr2GZwnLNSLmY-qi110p',
    hidden: false,
    order: 5,
  },
  {
    id: 'cat-digital',
    title: 'Digital Programs',
    titleAr: 'المنتجات الرقمية',
    icon: 'download',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DvKy0q_Sef2PY8dz3NiDpR-XqQFVaXIn8Jxh6AauUXw_xOldVK48qIe-0xSe2vqRnXilsV8MW_wU4SUFFxgjXYvYOXuJzossWLOCa74xq4flJaWBvXyj_UbDWg4hURYSC9_Rm-PIztgXgxgRdVNTk4my-R4Ehnc2n5tjR8uJ9erY7mQ1bucKtQbGhfcb18TjvsrVmQ10dQbxWINDOEAufn4EHkYtsJMilOlnsdyQxZ9q0pUmAyws',
    hidden: false,
    order: 6,
  },
];

export const INITIAL_STORE_ITEMS: StoreItem[] = [
  {
    id: 'store-1',
    title: 'Kinetic Hydro Whey Isolate 2.2kg',
    pointsCost: 8500,
    categoryId: 'cat-supplements',
    category: 'Supplements',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIisEllkLXsgEUypVHndwDV1JecdNqCO9tj5ZSNhUU8KqxtQ5drBLmCv0MeX7SZRRWjLIudq7MNuAjixpsdZAqCn7m50NbcMNROBSzp_TYj9F1Urml3Qb5ipczQeT7-3wdF7NnrisWDK7f-HUsFVND0RBeO0jT2vLaDcX_PHAwR4OFfthm3UwVpjLNc-k6HwtLP1jPM8TawhWn08QAHKHTTojBP-x0MnZgfr2GZwnLNSLmY-qi110p',
    description: '100% Micro-filtered Hydrolyzed Whey Isolate, 27g protein per scoop with zero lactose.',
  },
  {
    id: 'store-2',
    title: 'Pro Apex Oversized Gym Hoodie',
    pointsCost: 6000,
    categoryId: 'cat-apparel',
    category: 'Apparel & Clothing',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3',
    description: 'Heavyweight 450GSM cotton fleece hoodie built for cold winter training sessions.',
  },
  {
    id: 'store-3',
    title: 'Heavy Duty Leather Lifting Belt 10mm',
    pointsCost: 7200,
    categoryId: 'cat-gear',
    category: 'Gym Equipment & Gear',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
    description: 'Competition grade double-prong genuine leather belt for intra-abdominal support.',
  },
  {
    id: 'store-4',
    title: 'Tactical Matte Black Shaker 750ml',
    pointsCost: 3500,
    categoryId: 'cat-accessories',
    category: 'Accessories',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H',
    description: 'Insulated stainless steel shaker bottle with leak-proof lid and silent blending sphere.',
  },
  {
    id: 'store-5',
    title: 'Ultimate Hypertrophy Master Bundle',
    pointsCost: 15000,
    categoryId: 'cat-offers',
    category: 'Offers & Bundles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIisEllkLXsgEUypVHndwDV1JecdNqCO9tj5ZSNhUU8KqxtQ5drBLmCv0MeX7SZRRWjLIudq7MNuAjixpsdZAqCn7m50NbcMNROBSzp_TYj9F1Urml3Qb5ipczQeT7-3wdF7NnrisWDK7f-HUsFVND0RBeO0jT2vLaDcX_PHAwR4OFfthm3UwVpjLNc-k6HwtLP1jPM8TawhWn08QAHKHTTojBP-x0MnZgfr2GZwnLNSLmY-qi110p',
    description: 'Includes Whey Isolate + Creatine Monohydrate + Pre-Workout + Shaker Bottle at 25% discount.',
  },
  {
    id: 'store-6',
    title: '12-Week Complete Biomechanics eBook',
    pointsCost: 4000,
    categoryId: 'cat-digital',
    category: 'Digital Programs',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DvKy0q_Sef2PY8dz3NiDpR-XqQFVaXIn8Jxh6AauUXw_xOldVK48qIe-0xSe2vqRnXilsV8MW_wU4SUFFxgjXYvYOXuJzossWLOCa74xq4flJaWBvXyj_UbDWg4hURYSC9_Rm-PIztgXgxgRdVNTk4my-R4Ehnc2n5tjR8uJ9erY7mQ1bucKtQbGhfcb18TjvsrVmQ10dQbxWINDOEAufn4EHkYtsJMilOlnsdyQxZ9q0pUmAyws',
    description: 'Comprehensive PDF manual detailing muscle leverage, exercise selection, and progressive overload.',
  },
];

export const INITIAL_FOOD_DATABASE: FoodItem[] = [
  {
    id: 'food-chicken',
    name: 'Grilled Chicken Breast',
    nameAr: 'صدور دجاج مشوية',
    category: 'Protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    servingGram: 100,
    substitutes: [
      { foodName: 'White Fish (Tilapia / Cod)', foodNameAr: 'سمك أبيض (بلطي / كود)', equivalentServingGram: 150 },
      { foodName: 'Whole Eggs', foodNameAr: 'بيض كامل', equivalentServingGram: 220 },
      { foodName: '0% Greek Yogurt', foodNameAr: 'زبادي يوناني خالي الدسم', equivalentServingGram: 280 },
      { foodName: 'Tofu (Extra Firm)', foodNameAr: 'تو فو صلب', equivalentServingGram: 200 },
    ],
  },
  {
    id: 'food-rice',
    name: 'Jasmine Rice (Cooked)',
    nameAr: 'أرز ياسمين مطبوخ',
    category: 'Carbs',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    servingGram: 100,
    substitutes: [
      { foodName: 'Sweet Potato (Boiled)', foodNameAr: 'بطاطا حلوة مسلوقة', equivalentServingGram: 140 },
      { foodName: 'Oats (Dry)', foodNameAr: 'شوفان خام', equivalentServingGram: 40 },
      { foodName: 'Quinoa (Cooked)', foodNameAr: 'كينوا مطبوخة', equivalentServingGram: 120 },
    ],
  },
  {
    id: 'food-beef',
    name: 'Lean Ground Beef (90/10)',
    nameAr: 'لحم بقر مفروم صافي',
    category: 'Protein & Fat',
    calories: 215,
    protein: 26,
    carbs: 0,
    fat: 11,
    fiber: 0,
    servingGram: 100,
    substitutes: [
      { foodName: 'Salmon Filet', foodNameAr: 'شريحة سلمون', equivalentServingGram: 110 },
      { foodName: 'Turkey Breast', foodNameAr: 'صدر رومي', equivalentServingGram: 120 },
    ],
  },
  {
    id: 'food-avocado',
    name: 'Fresh Avocado',
    nameAr: 'أفوكادو طازج',
    category: 'Healthy Fats',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    servingGram: 100,
    substitutes: [
      { foodName: 'Almonds / Walnuts', foodNameAr: 'لوز / عين جمل', equivalentServingGram: 25 },
      { foodName: 'Extra Virgin Olive Oil', foodNameAr: 'زيت زيتون بكر ممتاز', equivalentServingGram: 15 },
      { foodName: 'Peanut Butter', foodNameAr: 'زبدة الفول السوداني', equivalentServingGram: 28 },
    ],
  },
];

export const INITIAL_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    clientName: 'Omar Al-Mansoor',
    beforeImage:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
    durationWeeks: 16,
    improvementPercent: 88,
    prevWeightKg: 102.5,
    currWeightKg: 84.0,
    bodyFatPercent: 12.5,
    muscleGainedKg: 4.5,
    reviewText:
      'APEX biomechanical tracking completely shifted my physique. Lost 18.5kg fat while gaining pure muscle width!',
    reviewTextAr:
      'تتبع البيوميكانكس في تطبيق APEX غيّر جسمي تماماً! خسرت 18.5 كجم من الدهون مع زيادة الكتلة العضلية بشكل ملحوظ.',
    rating: 5,
  },
  {
    id: 'story-2',
    clientName: 'Jessica Vance',
    beforeImage:
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&auto=format&fit=crop&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&auto=format&fit=crop&q=80',
    durationWeeks: 12,
    improvementPercent: 94,
    prevWeightKg: 74.0,
    currWeightKg: 62.5,
    bodyFatPercent: 16.0,
    muscleGainedKg: 3.0,
    reviewText:
      'The nutrition assistant made macro adherence painless. Best shape of my life in 3 months!',
    reviewTextAr:
      'مساعد التغذية جعل الالتزام بالماكروز سهلاً جداً. أفضل لياقة وصلت لها في حياتي خلال 3 أشهر فقط!',
    rating: 5,
  },
];

export const INITIAL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub-basic',
    name: 'BASIC TIER',
    nameAr: 'الباقة الأساسية',
    priceUSD: 19,
    durationMonths: 1,
    features: [
      'Access to Gym Workout Logging',
      'Basic Macro & Calorie Tracker',
      'Community Leaderboard Access',
      'Earn Elite Reward Points',
    ],
    featuresAr: [
      'وصول لسجل التمارين الرياضية',
      'حاسبة الماكروز والسعرات الحرارية',
      'دخول قائمة متصدري المجتمع',
      'تجميع نقاط المكافآت',
    ],
    color: 'from-zinc-700 to-zinc-900',
    badge: 'START',
  },
  {
    id: 'sub-pro',
    name: 'PRO PERFORMANCE',
    nameAr: 'الباقة الاحترافية PRO',
    priceUSD: 49,
    durationMonths: 3,
    features: [
      'All Basic Tier Features',
      'AI Biomechanical Form Review',
      'Smart Food Substitutes Calculator',
      'Monthly Progress & Photos Timeline',
      'Direct Coach Messaging',
    ],
    featuresAr: [
      'جميع مميزات الباقة الأساسية',
      'تحليل التمارين بالذكاء الاصطناعي',
      'حاسبة بدائل الأطعمة الذكية',
      'جدول زمني للصور والقياسات',
      'تواصل مباشر مع الكوتش',
    ],
    color: 'from-amber-500 to-orange-600',
    badge: 'POPULAR',
    isPopular: true,
  },
  {
    id: 'sub-elite',
    name: 'ELITE COACH MASTER',
    nameAr: 'باقة الكوتش الذهبية ELITE',
    priceUSD: 99,
    durationMonths: 6,
    features: [
      'All Pro Features Included',
      '1-on-1 Dedicated Master Coach',
      'Weekly Video Calls & Custom Plan Revisions',
      'VIP Store Discounts (25% off)',
      'Unlimited Video Form Checks',
    ],
    featuresAr: [
      'جميع مميزات باقة PRO',
      'كوتش خاص متابع لك يومياً',
      'مكالمات فيديو أسبوعية وتعديل البرامج',
      'خصم 25% على كافة منتجات المتجر',
      'تقييم فيديو غير محدود لجميع التمارين',
    ],
    color: 'from-yellow-400 to-amber-600',
    badge: 'VIP',
  },
];

export const INITIAL_PROGRESS_LOGS: ProgressLog[] = [
  {
    id: 'log-1',
    date: '2026-05-01',
    weightKg: 89.5,
    bodyFatPercent: 18.5,
    chestCm: 108,
    waistCm: 86,
    armsCm: 39,
    benchPressLbs: 165,
    squatLbs: 225,
    notes: 'Starting hypertrophy protocol',
  },
  {
    id: 'log-2',
    date: '2026-06-01',
    weightKg: 88.0,
    bodyFatPercent: 16.2,
    chestCm: 110,
    waistCm: 83,
    armsCm: 40.5,
    benchPressLbs: 185,
    squatLbs: 250,
    notes: 'Significant strength increase in bench and squat',
  },
  {
    id: 'log-3',
    date: '2026-07-01',
    weightKg: 88.5,
    bodyFatPercent: 14.8,
    chestCm: 112,
    waistCm: 81,
    armsCm: 41.5,
    benchPressLbs: 205,
    squatLbs: 275,
    notes: 'Pectoral fullness improved, waist shrinking',
  },
];

export const INITIAL_WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'prog-hypertrophy',
    title: '5-Day Hypertrophy Split',
    category: 'Muscle Building',
    daysPerWeek: 5,
    description: 'Optimal mechanical tension and volume distribution for chest, back, shoulders, and legs.',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
    exercises: [],
  },
  {
    id: 'prog-strength',
    title: 'Powerbuilding 4-Day Protocol',
    category: 'Strength & Size',
    daysPerWeek: 4,
    description: 'Heavy compound lifts paired with targeted hypertrophy accessory work.',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H',
    exercises: [],
  },
];

export const USER_PROFILE = {
  name: 'Alex Rivera',
  title: 'Elite Athlete',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3',
  coachAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DvKy0q_Sef2PY8dz3NiDpR-XqQFVaXIn8Jxh6AauUXw_xOldVK48qIe-0xSe2vqRnXilsV8MW_wU4SUFFxgjXYvYOXuJzossWLOCa74xq4flJaWBvXyj_UbDWg4hURYSC9_Rm-PIztgXgxgRdVNTk4my-R4Ehnc2n5tjR8uJ9erY7mQ1bucKtQbGhfcb18TjvsrVmQ10dQbxWINDOEAufn4EHkYtsJMilOlnsdyQxZ9q0pUmAyws',
  tier: 'PRO PERFORMANCE',
  points: 12450,
  streakDays: 14,
  dailyCaloriesCurrent: 1840,
  dailyCaloriesTarget: 2400,
  proteinCurrentGrams: 142,
  proteinTargetGrams: 180,
  hypertrophyCyclePercent: 65,
};

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex-1',
    name: 'Incline DB Press',
    targetMuscle: 'Chest & Front Delts',
    totalSets: 3,
    completedSets: 3,
    status: 'completed',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
    instructions:
      'Maintain 30-degree incline, control the 3-second negative eccentric phase, drive up without clacking dumbbells.',
    sets: [
      { setNumber: 1, targetReps: '10', weightLbs: 75, completed: true, actualReps: 10 },
      { setNumber: 2, targetReps: '10', weightLbs: 80, completed: true, actualReps: 10 },
      { setNumber: 3, targetReps: '8-10', weightLbs: 85, completed: true, actualReps: 9 },
    ],
    bestSet: '85 lbs × 9',
    lastWeekSet: '80 lbs × 10',
    powerOutputDelta: '+4.2%',
  },
  {
    id: 'ex-2',
    name: 'Barbell Bench Press',
    targetMuscle: 'Chest & Triceps',
    totalSets: 4,
    completedSets: 1,
    status: 'active',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiuiqI7kttYGsjYkRlTsxVHasHFn2pxptl3H8XaR6Qoktct9FfwuzwxOC0Cvz9hIQ3Jm_w0EyUUG182MHH9z_i6GFNg0neGZlPSvdGRlAidorS05jn9t1zknqmouSgA_6pRV6c18XzY31UckY1GzapCt1eZ7De_LN2dGXJ6lWznhmaSYnNKyBCm4x2c0giDpll4TfhgonOcTW79WX3YSvx2DH-1YVswTzjMl6d4zpSfxJM9m_f1VeT',
    instructions:
      'Plant feet firmly, retract shoulder blades, lower bar with controlled speed to lower sternum, drive up with leg drive.',
    sets: [
      { setNumber: 1, targetReps: '10', weightLbs: 175, completed: true, actualReps: 10 },
      { setNumber: 2, targetReps: '8-10', weightLbs: 185, completed: false },
      { setNumber: 3, targetReps: '8-10', weightLbs: 185, completed: false },
      { setNumber: 4, targetReps: '8', weightLbs: 195, completed: false },
    ],
    bestSet: '205 lbs × 6',
    lastWeekSet: '175 lbs × 10',
    powerOutputDelta: '+5.4%',
  },
  {
    id: 'ex-3',
    name: 'Dips (Weighted)',
    targetMuscle: 'Lower Chest & Triceps',
    totalSets: 3,
    completedSets: 0,
    status: 'upcoming',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H',
    instructions:
      'Lean forward slightly to engage pectoral fibers. Lower to 90 degrees elbow flex then press dynamically.',
    sets: [
      { setNumber: 1, targetReps: '10-12', weightLbs: 45, completed: false },
      { setNumber: 2, targetReps: '10-12', weightLbs: 45, completed: false },
      { setNumber: 3, targetReps: '8-10', weightLbs: 55, completed: false },
    ],
    bestSet: '55 lbs × 10',
    lastWeekSet: '45 lbs × 12',
    powerOutputDelta: '+3.1%',
  },
  {
    id: 'ex-4',
    name: 'Cable Flyes',
    targetMuscle: 'Pectoralis Major Squeeze',
    totalSets: 4,
    completedSets: 0,
    status: 'upcoming',
    mediaUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H',
    instructions:
      'Slight bend in elbows, focus on bringing inner wrists together and holding peak contraction for 1 full second.',
    sets: [
      { setNumber: 1, targetReps: '12-15', weightLbs: 35, completed: false },
      { setNumber: 2, targetReps: '12-15', weightLbs: 35, completed: false },
      { setNumber: 3, targetReps: '12', weightLbs: 40, completed: false },
      { setNumber: 4, targetReps: '10-12', weightLbs: 40, completed: false },
    ],
    bestSet: '40 lbs × 15',
    lastWeekSet: '35 lbs × 15',
    powerOutputDelta: '+2.8%',
  },
];

export const INITIAL_CLIENTS: ClientData[] = [
  {
    id: 'c-1',
    name: 'Alex Rivera',
    avatar:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
    lastActive: '2h ago',
    goal: 'BULK',
    currentWeightKg: 88.5,
    weightDeltaKg: 1.2,
    weeklyAdherencePercent: 94,
    statusType: 'video_review',
    statusLabel: 'Review Video',
    intakeAnswers: {
      age: 26,
      heightCm: 182,
      weightKg: 88.5,
      gender: 'male',
      activityLevel: 'very_active',
      goal: 'muscle_gain',
      medicalConditions: 'None',
      injuries: 'Mild left shoulder impingement in 2024',
      allergies: 'Lactose intolerant',
      mealsPerDay: 4,
      workoutDaysPerWeek: 5,
      availableEquipment: 'full_gym',
      sleepHours: 8,
      waterLiters: 3.5,
      experienceYears: '4 Years Hypertrophy',
      submittedAt: '2026-07-20',
    },
  },
  {
    id: 'c-2',
    name: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    lastActive: '5m ago',
    goal: 'CUT',
    currentWeightKg: 64.2,
    weightDeltaKg: -0.8,
    weeklyAdherencePercent: 82,
    statusType: 'up_to_date',
    statusLabel: 'Up to date',
  },
  {
    id: 'c-3',
    name: 'Marcus Thorne',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBvbpvZtBJ1Ok15_faNdZeA_-PMiKexaHDfdapp0JPKLtF7kO8lVMtUgB6MZaxrm4DiacDeUvlK3vm86eNPBOh1zHsRcbUwQTs9NnEW0D9e15_wThPCakzC181N8F5AHWVEJzKt1vkdLm8YpCxy-Ihleokle_WQotf6kNOkadV8qGr6lhjeZSLlPPQe633WRKTscQVK318Yg6V--oK7-ZMWbBxAeuslKL5hJdw0W8PtszNjJa9TFES',
    lastActive: '1d ago',
    goal: 'BULK',
    currentWeightKg: 95.0,
    weightDeltaKg: 0.0,
    weeklyAdherencePercent: 45,
    statusType: 'messages',
    statusLabel: '3 Messages',
    messagesCount: 3,
  },
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Marc_Pro',
    avatar:
      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=150&auto=format&fit=crop&q=80',
    points: 15420,
  },
  {
    rank: 2,
    name: 'You (Alex)',
    avatar:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
    points: 12450,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: 'Iron_Will',
    avatar:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=150&auto=format&fit=crop&q=80',
    points: 11900,
  },
  {
    rank: 4,
    name: 'Sarah_Fit',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    points: 10820,
  },
  {
    rank: 5,
    name: 'Kratos_Gym',
    avatar:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop&q=80',
    points: 9940,
  },
];


