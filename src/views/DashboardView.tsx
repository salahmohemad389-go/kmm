import React, { useState, useMemo } from 'react';
import { TabType, Language } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { useApp } from '../context/AppContext';
import { CHART_DATA, DEFAULT_CALORIE_TARGET, DEFAULT_PROTEIN_TARGET, ExerciseChartType } from '../constants/dashboard';
import { motion } from 'motion/react';

interface DashboardViewProps {
  setActiveTab: (tab: TabType) => void;
  lang: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab, lang }) => {
  const isRtl = lang === 'ar';
  const { showToast } = useToast();
  const { user, points } = useApp();

  const [selectedExerciseChart, setSelectedExerciseChart] = useState<ExerciseChartType>('Squat');

  const chartBars = useMemo(() => CHART_DATA[selectedExerciseChart], [selectedExerciseChart]);
  const [proteinGrams, setProteinGrams] = useState(142);
  const [calories, setCalories] = useState(1840);
  const [waterGlasses, setWaterGlasses] = useState(4);

  const addProtein = (grams: number) => {
    setProteinGrams((prev) => prev + grams);
    showToast({
      title: isRtl ? 'تم تسحيل بروتين جديد!' : 'Protein Logged!',
      message: isRtl ? `تمت إضافة +${grams}g بروتين إلى إجمالي اليوم.` : `Added +${grams}g protein to daily total.`,
    });
  };

  const addWater = () => {
    setWaterGlasses((prev) => prev + 1);
    showToast({
      title: isRtl ? 'تم تسجيل كاس ماء' : 'Water Logged',
      message: isRtl ? 'تم إكمال +250مل من هدف الترطيب اليومي.' : 'Added +250ml water intake.',
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Badge variant="primary" size="sm" hasDot>
            {isRtl ? 'دورة الضخامة العضلية' : 'HYPERTROPHY CYCLE ACTIVE'}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black font-headline text-on-surface mt-1">
            {isRtl ? `أهلاً بعودتك، ${user?.name ?? ''}` : `Welcome back, ${user?.name ?? ''}`}
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium mt-0.5">
            {isRtl
              ? `تم إكمال 65% من دورة الضخامة العضلية الحالية.`
              : `Your hypertrophy cycle is 65% complete.`}
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon="fitness_center"
          onClick={() => setActiveTab('gym')}
        >
          {isRtl ? 'بدء جلسة اليوم' : 'Start Gym Session'}
        </Button>
      </div>

      {/* Bento Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Calories */}
        <Card variant="glass" padding="sm" className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="relative w-24 h-24 mt-1">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
              />
              <circle
                className="text-primary-fixed transition-all duration-700"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251"
                strokeDashoffset={251 - (251 * calories) / DEFAULT_CALORIE_TARGET}
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-on-surface font-headline leading-none">{calories}</span>
              <span className="text-[9px] text-on-surface-variant font-bold mt-0.5">
                / {DEFAULT_CALORIE_TARGET} kcal
              </span>
            </div>
          </div>
          <p className="text-xs font-black text-on-surface uppercase tracking-wider">{isRtl ? 'السعرات اليومية' : 'Daily Calories'}</p>
        </Card>

        {/* Protein Progress */}
        <Card variant="glass" padding="md" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-fixed text-2xl">restaurant</span>
            <button
              onClick={() => addProtein(12)}
              className="text-[10px] font-black text-primary-fixed bg-primary-fixed/10 hover:bg-primary-fixed hover:text-on-primary-fixed px-2 py-1 rounded-lg transition-all"
            >
              +12g
            </button>
          </div>
          <div className="space-y-1.5 mt-3">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-black text-on-surface font-headline">{proteinGrams}g</h3>
              <p className="text-[10px] text-on-surface-variant font-bold">
                {isRtl ? 'الهدف:' : 'Goal:'} {DEFAULT_PROTEIN_TARGET}g
              </p>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-fixed transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (proteinGrams / DEFAULT_PROTEIN_TARGET) * 100)}%` }}
              />
            </div>
            <p className="text-xs font-black text-on-surface uppercase tracking-wider">{isRtl ? 'تناول البروتين' : 'Protein Intake'}</p>
          </div>
        </Card>

        {/* Day Streak */}
        <Card variant="highlight" padding="md" className="flex flex-col items-center justify-center text-center space-y-1">
          <span className="material-symbols-outlined text-3xl text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <h3 className="text-3xl font-black text-primary-fixed font-headline leading-none">
            {user?.streakDays ?? 0}
          </h3>
          <p className="text-xs font-black text-on-surface uppercase tracking-wider">{isRtl ? 'أيام متتالية' : 'Day Streak'}</p>
          <span className="text-[9px] text-primary-fixed/80 uppercase tracking-widest font-black">
            {isRtl ? 'رقم قياسي شخصي!' : 'PERSONAL RECORD!'}
          </span>
        </Card>

        {/* Elite Points */}
        <Card variant="glass" padding="md" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-fixed text-2xl">military_tech</span>
            <Badge variant="primary" size="sm">
              PTS
            </Badge>
          </div>
          <div className="space-y-1 mt-3">
            <h3 className="text-2xl font-black text-on-surface font-headline">
              {points.toLocaleString()}
            </h3>
            <p className="text-xs font-black text-on-surface uppercase tracking-wider">{isRtl ? 'نقاط إيليت' : 'Elite Points'}</p>
            <button
              onClick={() => setActiveTab('shop')}
              className="text-xs text-primary-fixed hover:underline flex items-center gap-1 font-bold pt-1"
            >
              <span>{isRtl ? 'متجر المكافآت' : 'Redeem Store'}</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </Card>
      </section>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout Focus & Volume */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" padding="none" className="overflow-hidden group relative">
            <div className="relative h-64 md:h-72 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu8H2mV8w75Rcky6HrDyEvyRh6NMCLV02j1o_LeuHgZ46oeYZ_3WCUfQtyuIeuJy4kpGhQd7tjlUG9_bFVWmhz0XYt12wP_Hmg7Y1qHuuRlvnFtwEwJW1Qn3xBmcQCx_xdy_DtemtTZ5Y00phW9Wrwxx9uTNvfFSHqCdcxcdKAjrFnjqJ0_VsZj1kBJfe2uFR98YxOQ6p3BXm4Cr2N2Cw9y3smCxb9OJizKCgJ_UupFZBJPiYx_O1H')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex gap-2 mb-2">
                  <Badge variant="primary" size="sm">
                    ADVANCED
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    STRENGTH
                  </Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-on-surface font-headline">
                  {isRtl ? 'تمارين الدفع - ضخامة عضلية' : 'Push Day - Hypertrophy'}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant font-bold mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">exercise</span>
                    <span>8 {isRtl ? 'تمارين' : 'Exercises'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">timer</span>
                    <span>75 {isRtl ? 'دقيقة' : 'Minutes'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-fixed text-sm">bolt</span>
                    <span>980 kcal {isRtl ? 'تقديري' : 'est.'}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="md"
                    icon="play_arrow"
                    iconPosition="right"
                    onClick={() => setActiveTab('gym')}
                  >
                    {isRtl ? 'ابدأ التمرين' : 'START WORKOUT'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Weekly Volume Trend */}
          <Card variant="glass" padding="md" className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-on-surface-variant">
                {isRtl ? 'معدل الحجم التدريبي الأسبوعي' : 'WEEKLY VOLUME TREND'}
              </span>
              <select
                value={selectedExerciseChart}
                onChange={(e) => setSelectedExerciseChart(e.target.value as ExerciseChartType)}
                className="bg-surface-container-high border border-outline-variant/60 rounded-xl text-xs font-bold text-on-surface p-2 focus:outline-none focus:border-primary-fixed"
              >
                <option value="Squat">Squat (kg)</option>
                <option value="Bench">Bench (kg)</option>
                <option value="Deadlift">Deadlift (kg)</option>
              </select>
            </div>

            <div className="h-40 flex items-end justify-between gap-2 pt-6 px-2">
              {chartBars.map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <motion.div
                    whileHover={{ scaleY: 1.05 }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      bar.active
                        ? 'bg-primary-fixed shadow-[0_0_12px_rgba(195,244,0,0.5)]'
                        : 'bg-primary-fixed/25 group-hover:bg-primary-fixed/60'
                    }`}
                    style={{ height: bar.val }}
                  />
                  <span
                    className={`text-[10px] font-extrabold ${
                      bar.active ? 'text-primary-fixed' : 'text-on-surface-variant'
                    }`}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Column: Leaderboard & Quick Log */}
        <div className="space-y-6">
          {/* Hype Zone Rank */}
          <Card variant="glass" padding="md" className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-primary-fixed">
                {isRtl ? 'ترتيب منطقة التنافس' : 'HYPE ZONE RANK'}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-lg">groups</span>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD_USERS.slice(0, 3).map((usr) => (
                <div
                  key={usr.rank}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    usr.isCurrentUser
                      ? 'bg-primary-fixed/15 border-primary-fixed/40 scale-[1.01]'
                      : 'bg-surface-container-high/40 border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs font-black shrink-0 ${
                        usr.isCurrentUser ? 'text-primary-fixed' : 'text-on-surface-variant'
                      }`}
                    >
                      #{usr.rank}
                    </span>
                    <img
                      src={usr.avatar}
                      alt={usr.name}
                      className="w-7 h-7 rounded-full border border-primary-fixed object-cover shrink-0"
                    />
                    <span className="text-xs font-bold text-on-surface truncate">{usr.name}</span>
                  </div>
                  <span className="text-xs font-black text-primary-fixed font-headline shrink-0">
                    {usr.points.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setActiveTab('social')}
            >
              {isRtl ? 'عرض قائمة المتصدرين الكاملة' : 'View Full Leaderboard'}
            </Button>
          </Card>

          {/* Quick Log Tools */}
          <Card variant="glass" padding="md" className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-on-surface-variant">
              {isRtl ? 'تسجيل سريع' : 'QUICK LOG'}
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addWater}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/60 hover:border-primary-fixed/50 transition-all group"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed text-xl mb-1">
                  water_drop
                </span>
                <span className="text-[11px] font-bold">
                  {isRtl ? 'ماء (+250مل)' : 'Water'} ({waterGlasses})
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCalories((c) => c + 150);
                  showToast({
                    title: isRtl ? 'تم تسجيل قبل التمرين' : 'Pre-Workout Logged',
                    message: '+150 kcal added.',
                  });
                }}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/60 hover:border-primary-fixed/50 transition-all group"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed text-xl mb-1">
                  coffee
                </span>
                <span className="text-[11px] font-bold">{isRtl ? 'قبل التمرين' : 'Pre-Work'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  showToast({
                    title: isRtl ? 'الوزن المسجل' : 'Weight Recorded',
                    message: '88.5 kg logged.',
                  })
                }
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/60 hover:border-primary-fixed/50 transition-all group"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed text-xl mb-1">
                  scale
                </span>
                <span className="text-[11px] font-bold">{isRtl ? 'الوزن' : 'Weight'}</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  showToast({
                    title: isRtl ? 'مؤقت الصيام' : 'Fasting Active',
                    message: '16/8 fasting timer started.',
                  })
                }
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-high border border-outline-variant/60 hover:border-primary-fixed/50 transition-all group"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-fixed text-xl mb-1">
                  timer
                </span>
                <span className="text-[11px] font-bold">{isRtl ? 'مؤقت الصيام' : 'Fast'}</span>
              </motion.button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
