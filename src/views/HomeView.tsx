import React, { useState, useRef, useMemo, useCallback } from 'react';
import { TabType, Language } from '../types';
import { TransformationCarousel } from '../components/TransformationCarousel';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { Footer } from '../components/Footer';
import { useToast } from '../context/ToastContext';
import { useApp } from '../context/AppContext';
import { FOCUS_OPTIONS, EXPERIENCE_LEVELS, FAQ_ITEMS, KEY_FEATURES, HOW_IT_WORKS_STEPS, TESTIMONIALS } from '../constants/home';
import { fetchAiQuizRecommendation } from '../services/api';
import { motion } from 'motion/react';
import {
  heroTextLine,
  viewportFadeUp,
  viewportBlurUp,
  viewportSlideLeft,
  viewportSlideRight,
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  staggerItemBlur,
  cardHover,
  progressBarFill,
  statCountUp,
  imageReveal,
} from '../lib/animations';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  lang: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, lang }) => {
  const isRtl = lang === 'ar';
  const { showToast } = useToast();
  const { subscriptions } = useApp();

  const quizRef = useRef<HTMLDivElement>(null);

  const [quizStep, setQuizStep] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState('Fat Loss & Shred');
  const [experienceLevel, setExperienceLevel] = useState('Advanced');
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const handleRunQuiz = useCallback(async () => {
    setQuizLoading(true);
    try {
      const data = await fetchAiQuizRecommendation(selectedFocus, experienceLevel);
      setQuizResult(data);
      showToast({
        title: isRtl ? 'تم توليد الخطة بالذكاء الاصطناعي!' : 'AI Protocol Generated!',
        message: isRtl ? 'تم إعداد جدول التدريب للـ 12 أسبوع القادمة.' : '12-week kinetic program calculated.',
      });
    } catch {
      setQuizResult({
        programTitle: `${selectedFocus} Kinetic Protocol`,
        summary:
          'Engineered 12-week progressive overload system targeted for maximum kinetic output and biometric efficiency.',
        weeklySplit: [
          'Push Day (Hypertrophy)',
          'Pull Day (Heavy)',
          'Legs & Core',
          'Upper Body Power',
          'Metabolic Conditioning',
        ],
        estimatedCalorieTarget: 2650,
        dailyProteinTarget: 180,
      });
      showToast({
        title: isRtl ? 'تم توليد البروتوكول المخصص' : 'Custom Protocol Active',
        message: isRtl ? 'خطة 12 أسبوع مصممة لأهدافك.' : '12-week protocol tailored for your goal.',
      });
    } finally {
      setQuizLoading(false);
    }
  }, [isRtl, selectedFocus, experienceLevel, showToast]);

  const statsData = useMemo(() => [
    { value: '15k+', label: isRtl ? 'عضو متدرب' : 'Elite Members', offset: true },
    { value: '98%', label: isRtl ? 'نسبة النجاح' : 'Success Rate', offset: false },
    { value: '24/7', label: isRtl ? 'Coaching مباشر' : 'Coach Access', offset: true },
    { value: '50+', label: isRtl ? 'خطط مخصصة' : 'Custom Protocols', offset: false },
  ], [isRtl]);

  return (
    <div className="space-y-14 pb-12">
      {/* ── Hero Section ───────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[65vh] flex items-center overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full bg-cover bg-center opacity-20 grayscale-[0.2] gpu-accelerated"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-5 md:px-10 relative z-10 grid lg:grid-cols-2 items-center gap-10 py-10">
          <div className="space-y-5 text-start">
            <motion.div variants={heroTextLine} initial="hidden" animate="visible" custom={0}>
              <Badge variant="primary" hasDot size="md">
                {isRtl ? 'الأداء الاحترافي' : 'ELITE PERFORMANCE'}
              </Badge>
            </motion.div>

            <motion.h1
              variants={heroTextLine}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight font-headline"
            >
              {isRtl ? (
                <>
                  حوّل طاقتك إلى <br />
                  <span className="text-primary-fixed">أداء استثنائي</span>
                </>
              ) : (
                <>
                  TRANSFORM YOUR <br />
                  <span className="text-primary-fixed">POTENTIAL</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={heroTextLine}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-sm text-on-surface-variant max-w-md leading-relaxed font-medium"
            >
              {isRtl
                ? 'تجربة تدريب احترافية مصممة للتحول الجسدي الحقيقي.'
                : 'Professional-grade coaching engineered for serious transformation.'}
            </motion.p>

            <motion.div
              variants={heroTextLine}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Button variant="primary" size="lg" icon="play_arrow" iconPosition="right" onClick={() => setActiveTab('gym')}>
                {isRtl ? 'ابدأ الآن' : 'Start Your Journey'}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setActiveTab('subscriptions')}>
                {isRtl ? 'الباقات' : 'View Plans'}
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-3"
          >
            {statsData.map((stat, i) => (
              <motion.div key={i} variants={staggerItemBlur} className={stat.offset ? 'translate-y-3' : ''}>
                <Card variant="glass" padding="md" isHoverable>
                  <motion.div
                    className="text-primary-fixed text-2xl font-black font-headline"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[11px] font-bold text-on-surface-variant mt-1">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Transformation Gallery ─────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        className="space-y-4 text-start"
      >
        <motion.div variants={viewportFadeUp} className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary" size="sm">
            {isRtl ? 'تحولات المتدربين' : 'TRANSFORMATION SHOWCASE'}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black font-headline">
            {isRtl ? (
              <>نتائج حقيقية. <span className="text-primary-fixed">بدون أعذار.</span></>
            ) : (
              <>REAL RESULTS. <span className="text-primary-fixed">NO EXCUSES.</span></>
            )}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            {isRtl
              ? 'شاهد التحول العلمي لمنهجيتنا الرياضية. رحلات حقيقية، نتائج قابلة للقياس.'
              : 'Witness the scientific evidence of our methodology. Real journeys, measurable results.'}
          </p>
        </motion.div>

        <motion.div variants={viewportFadeUp}>
          <TransformationCarousel lang={lang} />
        </motion.div>
      </motion.section>

      {/* ── Pricing Section ───────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="space-y-8 text-start"
      >
        <motion.div variants={viewportFadeUp} className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="primary" size="sm">
            {isRtl ? 'خطط الاشتراك' : 'SUBSCRIPTION TIERS'}
          </Badge>
          <h2 className="text-2xl md:text-4xl font-black font-headline">
            {isRtl ? 'اختر خطة التحول المناسبة لك' : 'Choose Your Performance Plan'}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            {isRtl
              ? 'باقات مرنة تناسب جميع الأهداف مع إمكانية الترقية أو التعديل في أي وقت'
              : 'Flexible plans with full access to workouts, nutrition, and personal coaching.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {subscriptions.map((sub) => (
            <motion.div key={sub.id} variants={staggerItemBlur} {...cardHover}>
              <Card
                variant={sub.isPopular ? 'highlight' : 'glass'}
                padding="lg"
                className={`flex flex-col justify-between space-y-6 h-full relative ${
                  sub.isPopular ? 'border-2 border-primary-fixed shadow-2xl scale-[1.02]' : ''
                }`}
              >
                {sub.isPopular && (
                  <span className="absolute -top-3.5 right-6 bg-primary-fixed text-on-primary-fixed text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {isRtl ? 'الأكثر طلباً' : 'RECOMMENDED'}
                  </span>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-black font-headline text-on-surface">
                    {isRtl ? sub.nameAr : sub.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black font-headline text-primary-fixed">
                      ${sub.priceUSD}
                    </span>
                    <span className="text-xs text-on-surface-variant font-bold">
                      /{sub.durationMonths}m
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-outline-variant/30">
                    {(isRtl ? sub.featuresAr : sub.features).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                        <span
                          className="material-symbols-outlined text-primary-fixed text-base shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={sub.isPopular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                  onClick={() => setActiveTab('subscriptions')}
                >
                  {isRtl ? 'اشترك الآن' : 'Get Started'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Key Features Section ──────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="space-y-7 text-start"
      >
        <motion.div variants={viewportFadeUp} className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary" size="sm">
            {isRtl ? 'مميزات المنصة' : 'CORE CAPABILITIES'}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black font-headline">
            {isRtl ? 'نظام شامل للتحول الجسدي' : 'Engineered for Peak Output'}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            {isRtl ? 'أدوات تدريب وتغذية متطورة بدقة تامة.' : 'Precision tools built for maximum efficiency.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEY_FEATURES.map((feat, idx) => (
            <motion.div key={idx} variants={staggerItemBlur} {...cardHover}>
              <Card variant="glass" padding="md" className="space-y-3 h-full">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-primary-fixed/12 text-primary-fixed flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="material-symbols-outlined text-xl">{feat.icon}</span>
                </motion.div>
                <h3 className="text-sm font-black font-headline text-on-surface">
                  {isRtl ? feat.titleAr : feat.titleEn}
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {isRtl ? feat.descAr : feat.descEn}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── How It Works Section ──────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="py-4 space-y-7 text-start"
      >
        <motion.div variants={viewportFadeUp} className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary" size="sm">
            {isRtl ? 'خطوات العمل' : 'HOW IT WORKS'}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black font-headline">
            {isRtl ? 'رحلتك في 3 خطوات' : '3 Steps to Peak Performance'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOW_IT_WORKS_STEPS.map((st, idx) => (
            <motion.div
              key={idx}
              variants={idx % 2 === 0 ? viewportSlideLeft : viewportSlideRight}
              {...cardHover}
            >
              <Card variant="glass" padding="lg" className="space-y-3 relative overflow-hidden h-full">
                <span className="text-4xl font-black font-headline text-primary-fixed/15 absolute top-3 right-3 select-none">
                  {st.number}
                </span>
                <motion.div
                  className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-black"
                  whileHover={{ scale: 1.1, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="material-symbols-outlined text-xl">{st.icon}</span>
                </motion.div>
                <h3 className="text-base font-black font-headline text-on-surface">
                  {isRtl ? st.titleAr : st.titleEn}
                </h3>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {isRtl ? st.descAr : st.descEn}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── AI Smart Quiz Section ─────────────────────────────────── */}
      <section ref={quizRef} className="py-2 text-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={viewportFadeUp}
        >
          <Card variant="highlight" padding="lg" className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-4">
                <Badge variant="primary" size="sm">
                  AI ENGINE
                </Badge>
                <h2 className="text-2xl font-black font-headline leading-tight">
                  {isRtl ? (
                    <>صمم خطتك <span className="text-primary-fixed">الذكية</span></>
                  ) : (
                    <>TAILOR YOUR <span className="text-primary-fixed">EVOLUTION</span></>
                  )}
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isRtl
                    ? 'يقوم محرك الذكاء الاصطناعي بحساب المسار التدريبي الأمثل لك بناءً على هدفك ومستواك.'
                    : 'Our AI engine calculates your optimal training protocol based on kinetic biometrics.'}
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                    <div className="w-2 h-2 rounded-full bg-primary-fixed" />
                    <span>{isRtl ? 'تحليل وحدات الماكروز' : 'Scientific Macro-Profiling'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                    <div className="w-2 h-2 rounded-full bg-primary-fixed" />
                    <span>{isRtl ? 'حساب الحجم والشدة' : 'Volume Intensity Analysis'}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 flex flex-col justify-between">
                {quizStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-on-surface uppercase tracking-wider">
                      {isRtl ? 'ما هو هدفك الرئيسي؟' : 'What is your primary focus?'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FOCUS_OPTIONS.map((opt) => {
                        const isSelected = selectedFocus === opt.id;
                        return (
                          <motion.button
                            key={opt.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedFocus(opt.id)}
                            className={`p-3.5 rounded-xl border text-xs font-extrabold text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-primary-fixed bg-primary-fixed/15 text-primary-fixed shadow-lg'
                                : 'border-outline-variant/60 hover:border-primary-fixed/50 text-on-surface-variant'
                            }`}
                          >
                            <span>{isRtl ? opt.labelAr : opt.labelEn}</span>
                            <span
                              className={`material-symbols-outlined text-base transition-opacity duration-200 ${
                                isSelected ? 'opacity-100 text-primary-fixed' : 'opacity-0'
                              }`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex justify-between items-center pt-2">
                      <div className="flex gap-1.5">
                        <div className="w-8 h-1.5 rounded-full bg-primary-fixed" />
                        <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
                      </div>
                      <Button variant="primary" size="sm" onClick={() => setQuizStep(2)}>
                        {isRtl ? 'التالي' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-on-surface uppercase tracking-wider">
                      {isRtl ? 'اختر مستوى خبرتك في التمرين:' : 'Select your fitness level:'}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {EXPERIENCE_LEVELS.map((lvl) => (
                        <motion.button
                          key={lvl}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setExperienceLevel(lvl)}
                          className={`p-3 rounded-xl border text-xs font-extrabold text-center transition-all ${
                            experienceLevel === lvl
                              ? 'border-primary-fixed bg-primary-fixed/15 text-primary-fixed shadow-md'
                              : 'border-outline-variant/60 text-on-surface-variant'
                          }`}
                        >
                          {lvl}
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center pt-2">
                      <Button variant="ghost" size="sm" onClick={() => setQuizStep(1)}>
                        {isRtl ? 'السابق' : 'Back'}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setQuizStep(3);
                          handleRunQuiz();
                        }}
                      >
                        {isRtl ? 'توليد الخطة بالذكاء الاصطناعي' : 'Generate AI Plan'}
                      </Button>
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-4">
                    {quizLoading ? (
                      <div className="py-10 text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-primary-fixed font-extrabold animate-pulse">
                          {isRtl
                            ? 'جاري تحليل البيانات الحيوية وإنشاء خطتك...'
                            : 'Analyzing biometrics and calculating kinetic protocol...'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3.5 bg-primary-fixed/10 border border-primary-fixed/40 rounded-xl space-y-1">
                          <Badge variant="primary" size="sm">
                            {isRtl ? 'الخطة المقترحة' : 'RECOMMENDED AI PROTOCOL'}
                          </Badge>
                          <h4 className="text-base font-black text-on-surface font-headline">
                            {quizResult?.programTitle}
                          </h4>
                          <p className="text-xs text-on-surface-variant">{quizResult?.summary}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 bg-surface-container-high rounded-xl">
                            <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                              {isRtl ? 'السعرات الحرارية المستهدفة' : 'Calorie Target'}
                            </span>
                            <p className="font-black text-primary-fixed text-base font-headline">
                              {quizResult?.estimatedCalorieTarget} kcal/day
                            </p>
                          </div>
                          <div className="p-3 bg-surface-container-high rounded-xl">
                            <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                              {isRtl ? 'البروتين اليومي' : 'Daily Protein'}
                            </span>
                            <p className="font-black text-primary-fixed text-base font-headline">
                              {quizResult?.dailyProteinTarget}g / day
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="primary"
                            size="md"
                            className="flex-1"
                            onClick={() => setActiveTab('gym')}
                          >
                            {isRtl ? 'بدء التمرين بهذه الخطة' : 'Start This Program'}
                          </Button>
                          <Button variant="secondary" size="md" onClick={() => setQuizStep(1)}>
                            {isRtl ? 'إعادة' : 'Reset'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* ── Testimonials Section ──────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="space-y-7 text-start"
      >
        <motion.div variants={viewportFadeUp} className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary" size="sm">
            {isRtl ? 'آراء المشتركين' : 'TESTIMONIALS'}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-black font-headline">
            {isRtl ? 'ماذا يقول أبطالنا' : 'Trusted by Athletes'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div key={idx} variants={staggerItemBlur} {...cardHover}>
              <Card variant="glass" padding="md" className="space-y-3 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, rIdx) => (
                      <motion.span
                        key={rIdx}
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + rIdx * 0.05, type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        star
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed italic">
                    &ldquo;{isRtl ? t.commentAr : t.commentEn}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-outline-variant/20">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary-fixed/40"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h4 className="text-[11px] font-black text-on-surface font-headline leading-none">{t.name}</h4>
                    <p className="text-[9px] text-primary-fixed font-bold">
                      {isRtl ? t.roleAr : t.roleEn}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── FAQ Section ───────────────────────────────────────────── */}
      <section className="space-y-8 max-w-3xl mx-auto text-start">
        <div className="text-center space-y-3">
          <Badge variant="primary" size="sm">FAQ</Badge>
          <h2 className="text-2xl md:text-4xl font-black font-headline">
            {isRtl ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <Accordion items={FAQ_ITEMS} lang={lang} />
      </section>

      {/* ── CTA Section ───────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={viewportBlurUp}
        className="relative rounded-2xl p-6 md:p-10 overflow-hidden border border-primary-fixed/20 bg-gradient-to-r from-primary-fixed/10 via-surface-container-low to-surface-container-high text-start"
      >
        <div className="max-w-xl space-y-3 relative z-10">
          <Badge variant="primary" size="sm">
            {isRtl ? 'جاهز للبدء؟' : 'READY TO TRANSFORM?'}
          </Badge>
          <h2 className="text-2xl md:text-4xl font-black font-headline leading-tight">
            {isRtl ? (
              <>ابدأ مع <span className="text-primary-fixed">APEX ELITE</span> اليوم</>
            ) : (
              <>UNLOCK YOUR <span className="text-primary-fixed">PEAK OUTPUT</span></>
            )}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            {isRtl
              ? 'انضم لأكثر من 15,000 متدرب يحققون نتائج حقيقية.'
              : 'Join 15,000+ athletes achieving real transformation.'}
          </p>
          <div className="pt-1 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              icon="bolt"
              onClick={() => { setQuizStep(1); quizRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {isRtl ? 'بدء الاستبيان' : 'Take Intake Quiz'}
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setActiveTab('subscriptions')}>
              {isRtl ? 'استعراض الباقات' : 'Browse Plans'}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Footer setActiveTab={setActiveTab} lang={lang} />
    </div>
  );
};
