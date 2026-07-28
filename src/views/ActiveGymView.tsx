import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ExerciseItem } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { LockedFeature } from '../components/LockedFeature';
import { useToast } from '../context/ToastContext';
import { useTimer } from '../hooks/useTimer';
import { formatTimer } from '../utils/formatting';
import { fetchAiAlternativeExercise } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';

export const ActiveGymView: React.FC = () => {
  const { isRtl, exercises: globalExercises, addPoints } = useApp();
  const { showToast } = useToast();

  const [exercises, setExercises] = useState<ExerciseItem[]>(globalExercises);
  const [activeExIndex, setActiveExIndex] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(185);
  const [isFatigueMode, setIsFatigueMode] = useState(false);

  const timer = useTimer({ initialSeconds: 90 });

  // Video playback simulation
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Gemini AI Alternative Exercises Modal state
  const [showAltModal, setShowAltModal] = useState(false);
  const [loadingAlts, setLoadingAlts] = useState(false);
  const [aiAlternatives, setAiAlternatives] = useState<{ name: string; reason: string; recommendedSetsReps: string }[]>([]);

  // End Workout modal
  const [showEndWorkoutModal, setShowEndWorkoutModal] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const activeEx = exercises[activeExIndex] || exercises[0];

  useEffect(() => {
    if (globalExercises && globalExercises.length > 0) {
      setExercises(globalExercises);
    }
  }, [globalExercises]);

  if (!activeEx) {
    return (
      <LockedFeature
        featureTitleEn="Active Gym Engine"
        featureTitleAr="صالة التمارين البيوميكانيكية"
        descriptionEn="Unlock live set logging, rest countdowns, biomechanical form checks, and real-time exercise substitutes."
        descriptionAr="اشترك الآن لفتح المتابعة الحية للجولات، ومؤقت الراحة الذكي، ومحلل الأداء البيوميكانيكي والتمارين البديلة."
      >
        <Card variant="glass" padding="lg" className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-3">fitness_center</span>
          <h3 className="text-lg font-black font-headline text-on-surface mb-1">
            {isRtl ? 'لا توجد تمارين متاحة' : 'No Exercises Available'}
          </h3>
          <p className="text-xs text-on-surface-variant">
            {isRtl ? 'أضف تمارين من لوحة التحكم للبدء.' : 'Add exercises from the dashboard to start your session.'}
          </p>
        </Card>
      </LockedFeature>
    );
  }

  // Fatigue Mode Toggle handler
  const handleToggleFatigue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsFatigueMode(checked);
    if (checked) {
      setCurrentWeight((w) => Math.round((w * 0.9) / 5) * 5); // Reduce 10%
      showToast({
        title: isRtl ? 'وضع الإرهاق مفعل' : 'Fatigue Mode Enabled',
        message: isRtl ? 'تم تقليل الوزن بنسبة 10% للحفاظ على الأمان الحركي.' : 'Weight reduced by 10% for biomechanical safety.',
        type: 'info',
      });
    } else {
      setCurrentWeight(185);
    }
  };

  // Complete Set Action
  const handleCompleteSet = () => {
    addPoints(100, 'Completed Set', 'إكمال جولة تمرين');
    showToast({
      title: isRtl ? '🔥 تم إكمال المجموعة (+100 نقطة)!' : '🔥 Set Complete (+100 PTS)!',
      message: isRtl ? `وزن ${currentWeight} lbs - تم بدء مؤقت الراحة.` : `${currentWeight} lbs logged. Rest timer started.`,
      type: 'success',
    });

    // Update active set
    setExercises((prev) => {
      const updated = [...prev];
      const ex = { ...updated[activeExIndex], sets: updated[activeExIndex].sets.map((s) => ({ ...s })) };
      ex.completedSets = Math.min(ex.totalSets, ex.completedSets + 1);

      const currentSetObj = ex.sets.find((s) => !s.completed);
      if (currentSetObj) {
        currentSetObj.completed = true;
        currentSetObj.actualReps = 10;
      }

      if (ex.completedSets === ex.totalSets) {
        ex.status = 'completed';
      }
      updated[activeExIndex] = ex;
      return updated;
    });

    // Reset and start Rest Timer
    timer.reset(90);
    timer.start();
  };

  // Call Gemini AI for Alternative Exercises
  const fetchAlternatives = async () => {
    setShowAltModal(true);
    setLoadingAlts(true);
    try {
      const data = await fetchAiAlternativeExercise(activeEx.name, activeEx.targetMuscle);
      setAiAlternatives(data.alternatives || []);
    } catch {
      setAiAlternatives([
        {
          name: 'Dumbbell Flat Press',
          reason: 'Allows natural shoulder wrist alignment and deep pectoral stretch.',
          recommendedSetsReps: '4 Sets × 10 Reps',
        },
        {
          name: 'Weighted Chest Dips',
          reason: 'Excellent lower chest and triceps hypertrophy builder.',
          recommendedSetsReps: '3 Sets × 8-10 Reps',
        },
      ]);
    } finally {
      setLoadingAlts(false);
    }
  };

  return (
    <LockedFeature
      featureTitleEn="Active Gym Engine"
      featureTitleAr="صالة التمارين البيوميكانيكية"
      descriptionEn="Unlock live set logging, rest countdowns, biomechanical form checks, and real-time exercise substitutes."
      descriptionAr="اشترك الآن لفتح المتابعة الحية للجولات، ومؤقت الراحة الذكي، ومحلل الأداء البيوميكانيكي والتمارين البديلة."
    >
      <div className="space-y-6 pb-20 relative">
      {/* Top Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2.5">
          <Badge variant="primary" size="md">
            ELITE MODE
          </Badge>
          <span className="text-xs font-bold text-on-surface-variant">
            {isRtl ? `المستهدف: ${activeEx.targetMuscle}` : `Target: ${activeEx.targetMuscle}`}
          </span>
        </div>

        {/* Fatigue Mode Switch */}
        <div className="flex items-center gap-3 bg-surface-container-high px-3.5 py-2 rounded-xl border border-outline-variant/60">
          <span className="text-xs font-extrabold text-on-surface-variant">
            {isRtl ? 'أشعر بالإرهاق اليوم' : "I'm tired today"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isFatigueMode}
              onChange={handleToggleFatigue}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-fixed" />
          </label>
        </div>
      </div>

      {/* Main Gym Session Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar: Exercise List */}
        <aside className="lg:w-[280px] shrink-0 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-black font-headline text-primary-fixed">
              {isRtl ? 'الجلسة الحالية' : 'Session'}
            </h2>
            <span className="text-xs font-bold text-on-surface-variant">
              {exercises.filter((e) => e.status === 'completed').length} / {exercises.length}{' '}
              {isRtl ? 'تمارين' : 'Exercises'}
            </span>
          </div>

          <div className="space-y-2">
            {exercises.map((ex, idx) => {
              const isActive = idx === activeExIndex;
              return (
                <motion.div
                  key={ex.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveExIndex(idx);
                    setCurrentWeight(ex.sets[0]?.weightLbs || 185);
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center gap-3 border ${
                    isActive
                      ? 'bg-primary-fixed/15 border-primary-fixed font-bold shadow-lg'
                      : ex.status === 'completed'
                      ? 'glass-card opacity-60 border-outline-variant/30'
                      : 'glass-card hover:border-primary-fixed/40 border-outline-variant/50'
                  }`}
                >
                  {ex.status === 'completed' ? (
                    <span
                      className="material-symbols-outlined text-primary-fixed text-xl shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  ) : isActive ? (
                    <span className="material-symbols-outlined text-primary-fixed text-xl animate-pulse shrink-0">
                      play_circle
                    </span>
                  ) : (
                    <div className="w-6 h-6 border border-outline-variant rounded-full flex items-center justify-center text-[10px] font-bold text-on-surface-variant shrink-0">
                      {idx + 1}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        ex.status === 'completed'
                          ? 'line-through text-on-surface-variant'
                          : 'text-on-surface'
                      }`}
                    >
                      {ex.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-medium">
                      {ex.status === 'completed'
                        ? isRtl
                          ? 'تم الإكمال'
                          : `${ex.totalSets} Sets Done`
                        : isActive
                        ? isRtl
                          ? `المجموعة ${ex.completedSets + 1} من ${ex.totalSets}`
                          : `Set ${ex.completedSets + 1} of ${ex.totalSets}`
                        : isRtl
                        ? `${ex.totalSets} مجموعات متبقية`
                        : `${ex.totalSets} Sets Left`}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="md"
            className="w-full text-error hover:bg-error/10"
            onClick={() => setShowEndWorkoutModal(true)}
          >
            {isRtl ? 'إنهاء التمرين' : 'End Workout'}
          </Button>
        </aside>

        {/* Center Main Exercise Card */}
        <section className="flex-1 space-y-6 min-w-0">
          <Card variant="highlight" padding="none" className="overflow-hidden border border-outline-variant/60">
            <div className="grid md:grid-cols-2">
              {/* Exercise Media Area */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-black">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all"
                  style={{ backgroundImage: `url('${activeEx.mediaUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />

                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-fixed/25 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl border border-primary-fixed/40">
                    <span
                      className="material-symbols-outlined text-primary-fixed text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlayingVideo ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                </button>

                <div className="absolute bottom-4 left-4">
                  <Badge variant="neutral" size="sm">
                    {isPlayingVideo
                      ? isRtl
                        ? 'عرض مباشر...'
                        : 'Playing Demo...'
                      : isRtl
                      ? 'مقطع تعليمي'
                      : 'Instructional Clip'}
                  </Badge>
                </div>
              </div>

              {/* Exercise Details & Action Controls */}
              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black font-headline text-primary-fixed mb-1">
                    {activeEx.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge variant="primary" size="sm">
                      {activeEx.targetMuscle}
                    </Badge>
                    <span className="text-xs font-bold text-on-surface-variant">
                      {activeEx.totalSets} Sets × 8-10 Reps
                    </span>
                  </div>

                  {/* Set Progress Indicator */}
                  <div className="space-y-3 bg-surface-container-high p-4 rounded-2xl border border-outline-variant/60">
                    <div className="flex items-center justify-between text-xs font-extrabold text-on-surface">
                      <span>
                        {isRtl
                          ? `وزن المجموعة ${activeEx.completedSets + 1}`
                          : `Set ${activeEx.completedSets + 1} Weight`}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentWeight((w) => Math.max(5, w - 5))}
                          className="w-7 h-7 rounded-lg bg-surface-container-highest text-primary-fixed font-black flex items-center justify-center hover:bg-primary-fixed hover:text-black transition-colors"
                        >
                          -
                        </motion.button>
                        <span className="text-primary-fixed text-base font-black font-headline">
                          {currentWeight} lbs
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentWeight((w) => w + 5)}
                          className="w-7 h-7 rounded-lg bg-surface-container-highest text-primary-fixed font-black flex items-center justify-center hover:bg-primary-fixed hover:text-black transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      {Array.from({ length: activeEx.totalSets }).map((_, sIdx) => {
                        const isDone = sIdx < activeEx.completedSets;
                        const isCurrent = sIdx === activeEx.completedSets;
                        return (
                          <div
                            key={sIdx}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              isDone
                                ? 'bg-primary-fixed'
                                : isCurrent
                                ? 'bg-primary-fixed/40 animate-pulse'
                                : 'bg-surface-container-highest'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    icon="check_circle"
                    onClick={handleCompleteSet}
                  >
                    {isRtl ? 'إكمال المجموعة (+100 نقطة)' : 'Complete Set (+100 PTS)'}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    icon="add"
                    onClick={() => setCurrentWeight((w) => w + 5)}
                  >
                    {isRtl ? 'إضافة وزن (+5)' : 'Add Weight'}
                  </Button>

                  <button
                    onClick={fetchAlternatives}
                    className="sm:col-span-2 text-on-surface-variant text-xs font-bold hover:text-primary-fixed transition-colors flex items-center justify-center gap-1.5 py-1"
                  >
                    <span className="material-symbols-outlined text-sm">swap_horiz</span>
                    <span>{isRtl ? 'تمرين بديل بالذكاء الاصطناعي' : 'Alternative Exercise (AI)'}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Bottom Stats Grid: Rest Timer, Previous Performance, Biometrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rest Timer */}
            <Card variant="glass" padding="md" className="flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black text-on-surface-variant tracking-wider uppercase mb-1">
                {isRtl ? 'فترة الراحة' : 'REST PERIOD'}
              </span>
              <div className="text-4xl font-black text-primary-fixed font-headline my-1">
                {formatTimer(timer.seconds)}
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={timer.isRunning ? 'pause' : 'play_arrow'}
                  onClick={timer.toggle}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon="restart_alt"
                  onClick={() => timer.reset(90)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => timer.addTime(30)}
                >
                  +30s
                </Button>
              </div>
            </Card>

            {/* Previous Performance */}
            <Card variant="glass" padding="md" className="flex flex-col justify-between">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider mb-2">
                {isRtl ? 'الأداء السابق' : 'PREVIOUS PERFORMANCE'}
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant font-medium">{isRtl ? 'أفضل جولة' : 'Best Set'}</span>
                  <span className="font-extrabold text-on-surface">{activeEx.bestSet}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant font-medium">{isRtl ? 'الأسبوع الماضي' : 'Last Week'}</span>
                  <span className="font-extrabold text-on-surface">{activeEx.lastWeekSet}</span>
                </div>
                <div className="h-[1px] bg-outline-variant/40 w-full my-1" />
                <div className="flex items-center gap-1.5 text-primary-fixed font-black">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>
                    {activeEx.powerOutputDelta} {isRtl ? 'طاقة الخرج' : 'Power Output'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Live Biometrics */}
            <Card variant="glass" padding="md" className="flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider">
                  {isRtl ? 'القياسات الحيوية' : 'BIOMETRICS'}
                </span>
                <span
                  className="material-symbols-outlined text-error animate-pulse text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black text-on-surface font-headline">142</span>
                <span className="text-xs font-bold text-on-surface-variant ml-1">BPM</span>
              </div>
              <div className="mt-3 h-8 flex items-end gap-1">
                {[40, 60, 75, 65, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary-fixed rounded-t"
                    style={{ height: `${h}%`, opacity: 0.3 + (i / 6) * 0.7 }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Alternative Exercises AI Modal */}
      <Modal
        isOpen={showAltModal}
        onClose={() => setShowAltModal(false)}
        title={isRtl ? 'تمارين بديلة بالذكاء الاصطناعي' : 'AI Alternative Exercises'}
        subtitle={isRtl ? 'محسوبة بناءً على البيوميكانكس المستهدفة.' : 'Calculated for muscle target.'}
        icon="swap_horiz"
      >
        {loadingAlts ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-primary-fixed border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-primary-fixed font-bold">
              {isRtl
                ? 'جاري تحليل الميكانيكا الحيوية للبدائل...'
                : 'Analyzing biomechanics for optimal substitutes...'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {aiAlternatives.map((alt, aIdx) => (
              <div
                key={aIdx}
                className="p-4 bg-surface-container-high rounded-2xl border border-outline-variant/60 space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-on-surface font-headline">{alt.name}</h4>
                  <Badge variant="primary" size="sm">
                    {alt.recommendedSetsReps}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{alt.reason}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const updated = exercises.map((ex, i) =>
                      i === activeExIndex ? { ...ex, name: alt.name } : ex
                    );
                    setExercises(updated);
                    setShowAltModal(false);
                    showToast({
                      title: isRtl ? 'تم استبدال التمرين' : 'Exercise Updated',
                      message: `${alt.name} selected.`,
                    });
                  }}
                >
                  {isRtl ? 'اختيار هذا التمرين' : 'Select Exercise'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* End Workout Modal */}
      <Modal
        isOpen={showEndWorkoutModal}
        onClose={() => setShowEndWorkoutModal(false)}
        title={isRtl ? 'إنهاء التمرين الحالي؟' : "Finish Today's Session?"}
        subtitle={isRtl ? 'سيتم حفظ جميع البيانات ومزامنتها.' : 'Syncing stats and awarding points.'}
        icon="emoji_events"
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {isRtl
              ? 'سيتم تسجيل إحصائيات هذه الجلسة وإضافة +350 نقطة إيليت لحسابك.'
              : 'Your session stats will be synced and +350 Elite Points added to your profile.'}
          </p>
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                setShowEndWorkoutModal(false);
                addPoints(350, 'Completed Full Workout Session', 'إكمال التمرين بالكامل');
                setWorkoutFinished(true);
              }}
            >
              {isRtl ? 'نعم، إنهاء وحفظ (+350 نقطة)' : 'Yes, Finish Workout (+350 PTS)'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="flex-1"
              onClick={() => setShowEndWorkoutModal(false)}
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Finish Overlay */}
      <AnimatePresence>
        {workoutFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-panel max-w-md p-8 rounded-3xl border border-primary-fixed shadow-2xl space-y-4"
            >
              <span
                className="material-symbols-outlined text-6xl text-primary-fixed animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              <h2 className="text-3xl font-black font-headline text-on-surface">
                {isRtl ? 'تمرين أسطوري!' : 'WORKOUT DESTROYED!'}
              </h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isRtl
                  ? 'أكملت التمرين بحجم إجمالي مذهل. تم إكشابك +350 نقطة إيليت.'
                  : 'Completed session. +350 Elite Points awarded!'}
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setWorkoutFinished(false)}
              >
                {isRtl ? 'العودة إلى لوحة التحكم' : 'Return to Dashboard'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </LockedFeature>
  );
};
