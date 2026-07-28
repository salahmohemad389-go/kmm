import { AccordionItem } from '../components/ui/Accordion';

export interface FocusOption {
  id: string;
  labelEn: string;
  labelAr: string;
}

export const FOCUS_OPTIONS: FocusOption[] = [
  { id: 'Fat Loss & Shred', labelEn: 'Fat Loss & Shred', labelAr: 'خسارة الدهون والتنشيف' },
  { id: 'Muscle Gain & Mass', labelEn: 'Muscle Gain & Mass', labelAr: 'بناء العضلات والتضخيم' },
  { id: 'Athletic Performance', labelEn: 'Athletic Performance', labelAr: 'الأداء الرياضي والقوة' },
  { id: 'Longevity & Health', labelEn: 'Longevity & Health', labelAr: 'الصحة العامة واللياقة' },
];

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'faq-1',
    icon: 'psychology',
    titleEn: 'How does the AI Protocol Generator calculate my workout plan?',
    titleAr: 'كيف يقوم مولد البرامج بالذكاء الاصطناعي بتصاميم جدول التمارين؟',
    contentEn:
      'Our algorithm analyzes your metabolic rate, training experience, biometric goals, and weekly schedule to construct a 12-week progressive overload plan with precise calorie and macro targets.',
    contentAr:
      'يقوم الخوارزميات بتحليل معدل الأيض لديك، خبرتك الرياضية، وأهدافك الحيوية لإنشاء جدول تدريبي متدرج الأحمال مدته 12 أسبوعاً مع تحديد دقيق للسعرات المغذية.',
  },
  {
    id: 'faq-2',
    icon: 'groups',
    titleEn: 'Will I have direct access to a certified performance coach?',
    titleAr: 'هل سأحصل على تواصل مباشر مع مدرب شخصي معتمد؟',
    contentEn:
      'Yes! Pro Performance and Elite Kinetic tiers include 24/7 direct messaging, form check video reviews, and weekly check-in adjustments with certified coaches.',
    contentAr:
      'نعم! تشمل باقات البرو والإيليت إمكانية التواصل المباشر مع الكوتش، تقييم الفيديوهات الحركية للتمارين، وتعديل الخطة أسبوعياً.',
  },
  {
    id: 'faq-3',
    icon: 'restaurant',
    titleEn: 'Does the app include meal planning and custom macros?',
    titleAr: 'هل تحتوي المنصة على حاسبة الماكروز وجداول التغذية؟',
    contentEn:
      'Absolutely. Our built-in Nutrition Portal calculates total daily energy expenditure (TDEE), micro/macro split, and offers a database of over 10,000+ local and global foods.',
    contentAr:
      'بالتأكيد. تحسب المنصة معدل الطاقة اليومية والتوزيع الدقيق للبروتين والكارب والدهون مع قاعدة بيانات للأطعمة تحتوي على أكثر من 10,000 صنف.',
  },
  {
    id: 'faq-4',
    icon: 'chat',
    titleEn: 'Can I subscribe directly via WhatsApp?',
    titleAr: 'هل يمكنني الاشتراك وتفعيل الحساب مباشرة عبر واتساب؟',
    contentEn:
      'Yes! You can click the floating WhatsApp button anytime to choose a plan and complete your setup directly with an APEX Specialist.',
    contentAr:
      'نعم! يمكنك الضغط على زر الواتساب العائم في أي وقت لاختيار باقتك وإكمال الاشتراك فوراً مع متخصص الدعم.',
  },
];

export interface KeyFeature {
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const KEY_FEATURES: KeyFeature[] = [
  {
    icon: 'fitness_center',
    titleEn: 'Kinetic Workout Engine',
    titleAr: 'محرك التمارين الحية',
    descEn: 'Real-time rest timers, set trackers, and dynamic rep calculators built for heavy lifters.',
    descAr: 'مؤقتات راحة حية، تتبع للمجموعات الحاسبة لشدة الأوزان المصممة للرياضيين.',
  },
  {
    icon: 'analytics',
    titleEn: 'Biometric Analytics',
    titleAr: 'التحليلات الحيوية',
    descEn: 'Track weight trends, body fat %, muscle density, and strength progression visually.',
    descAr: 'متابعة تغيرات الوزن، نسبة الدهون، الكثافة العضلية، ومؤشرات تطور القوة بالرسوم البيانية.',
  },
  {
    icon: 'restaurant_menu',
    titleEn: 'Smart Macro Tracking',
    titleAr: 'تتبع المغذيات الذكي',
    descEn: 'Instant barcode searching, automated recipe calculations, and protein targets.',
    descAr: 'حساب فورية للبروتين، الكاربوهيدرات، والسعرات مع قاعدة بيانات شاملة.',
  },
  {
    icon: 'groups',
    titleEn: 'Coach Direct Connect',
    titleAr: 'التواصل المباشر مع الكوتش',
    descEn: 'Upload form check videos, request plan adjustments, and receive voice note feedback.',
    descAr: 'إرسال مقاطع فيديو الأداء الحركي، طلب تعديلات الخطة، واستلام ملاحظات صوتية.',
  },
  {
    icon: 'workspace_premium',
    titleEn: 'Gamified Elite Store',
    titleAr: 'متجر المكافآت والنقاط',
    descEn: 'Earn points for logged workouts and redeem them for supplements and athletic apparel.',
    descAr: 'اكسب نقاطاً عند إكمال التمارين واستبدلها بمكملات غذائية وأدوات رياضية من المتجر.',
  },
  {
    icon: 'chat',
    titleEn: 'WhatsApp Fast Track',
    titleAr: 'الاشتراك المباشر عبر واتساب',
    descEn: 'Instant subscription flow without complicated checkout forms.',
    descAr: 'مسار اشتراك سريع ومباشر للتحدث مع ممثل الخدمة وتفعيل الحساب.',
  },
];

export interface HowItWorksStep {
  number: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    icon: 'assignment',
    titleEn: 'Complete Biometric Intake',
    titleAr: 'إجراء التقييم الحيوي',
    descEn: 'Answer 5 quick questions about your training goals, frequency, and experience level.',
    descAr: 'إجابة 5 أسئلة سريعة حول أهدافك، أيام التمرين المناسبة، ومستواك الرياضي.',
  },
  {
    number: '02',
    icon: 'psychology',
    titleEn: 'Generate AI Protocol',
    titleAr: 'توليد البرنامج الذكي',
    descEn: 'Receive a personalized 12-week kinetic overload program tailored to your biometrics.',
    descAr: 'استلام جدول تدريبي مخصص لمدة 12 أسبوعاً مع توزيع الماكروز بدقة.',
  },
  {
    number: '03',
    icon: 'bolt',
    titleEn: 'Execute & Transform',
    titleAr: 'التنفيذ والتحول الجسدي',
    descEn: 'Log your workouts, track progress, consult your coach, and celebrate real physical results.',
    descAr: 'تسجيل مجموعاتك، تتبع تطورك أسبوعياً، والتواصل مع الكوتش لتحقيق أفضل نتيجة.',
  },
];

export interface Testimonial {
  name: string;
  roleEn: string;
  roleAr: string;
  avatar: string;
  rating: number;
  commentEn: string;
  commentAr: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Khaled Mansour',
    roleEn: 'Crossfit Athlete',
    roleAr: 'رياضي كروس فيت',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    commentEn:
      'APEX completely transformed my approach to strength training. The workout engine and macro calculations enabled me to lose 11kg while preserving all muscle mass!',
    commentAr:
      'غيرت منصة APEX أسلوبي في التدريب تماماً. حاسبة الماكروز ومحرك التمارين مكّناني من خسارة 11 كجم مع الحفاظ الكامل على الكتلة العضلية!',
  },
  {
    name: 'Sara El-Sayed',
    roleEn: 'Marathon Runner',
    roleAr: 'عداءة ماراثون',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    commentEn:
      'Having direct coach feedback on my strength sets kept me injury-free throughout my 16-week prep. Highly recommended!',
    commentAr:
      'وجود توجيه المباشر من الكوتش وتقييم تمارين القوة حمى جسمي من الإصابات طوال فترة الإعداد. أنصح بها بشدة!',
  },
  {
    name: 'Omar Hassan',
    roleEn: 'Bodybuilding Competitor',
    roleAr: 'متدرب كمال أجسام',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    commentEn:
      'The WhatsApp subscription flow was super fast, and the AI protocol generator hit my exact nutrition macro needs on day one.',
    commentAr:
      'اشتراك الواتساب كان سريعاً جداً، ومولد البرامج بالذكاء الاصطناعي حدد لي الماكروز المطلوبة بالضبط من اليوم الأول.',
  },
];
