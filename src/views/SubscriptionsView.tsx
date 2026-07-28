import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { SubscriptionPlan } from '../types';
import { SUBSCRIPTION_STATUSES } from '../constants/subscriptions';
import { WHATSAPP_PHONE, openWhatsApp } from '../utils/whatsapp';
import { motion, AnimatePresence } from 'motion/react';

export const SubscriptionsView: React.FC = () => {
  const {
    isRtl,
    subscriptions,
    subscriptionStatus,
    setSubscriptionStatus,
    isSubscribed,
    user,
    addSubscription,
    deleteSubscription,
  } = useApp();
  const { showToast } = useToast();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');
  const [userPhone, setUserPhone] = useState('');
  const [userGoal, setUserGoal] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [price, setPrice] = useState(49);
  const [duration, setDuration] = useState(3);

  const statusesList = SUBSCRIPTION_STATUSES;

  const handleOpenSubscribeModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowCheckoutModal(true);
  };

  const handleWhatsAppRedirect = (plan: SubscriptionPlan) => {
    const planName = isRtl ? (plan.nameAr || plan.name) : plan.name;
    const planPrice = `$${plan.priceUSD}/${plan.durationMonths}m`;
    const name = userName.trim() || user?.name || 'Athlete';
    const phone = userPhone.trim() || 'Not specified';
    const goal = userGoal.trim() || 'Hypertrophy & Fitness';

    const messageEn = `Hello APEX Team! 👋\n\nI want to subscribe/renew the *${planName}* (${planPrice}).\n\n👤 Member Name: ${name}\n📞 WhatsApp: ${phone}\n🎯 Goal: ${goal}\n\nPlease guide me with the immediate activation steps!`;

    const messageAr = `مرحباً فريق APEX! 👋\n\nأود الاشتراك/التجديد في باقة *${planName}* (${planPrice}).\n\n👤 اسم المتدرب: ${name}\n📞 واتساب: ${phone}\n🎯 الهدف الرياضي: ${goal}\n\nيرجى تزويدي بخطوات التفعيل المباشر!`;

    openWhatsApp(WHATSAPP_PHONE, isRtl ? messageAr : messageEn);
    setShowCheckoutModal(false);

    showToast({
      title: isRtl ? 'جاري تحويلك لواتساب' : 'Opening WhatsApp',
      message: isRtl
        ? 'تم إعداد الرسالة المسبقة لإكمال التفعيل'
        : 'Pre-filled activation message ready in WhatsApp.',
      type: 'info',
    });
  };

  const handleAddPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) return;

    addSubscription({
      name: nameEn,
      nameAr: nameAr || nameEn,
      priceUSD: price,
      durationMonths: duration,
      features: ['Full Gym Access', 'Biomechanical Form Check', 'Direct WhatsApp Specialist'],
      featuresAr: ['وصول لكافة التمارين', 'تحليل الأداء البيوميكانيكي', 'دعم واتساب مباشر'],
      color: 'from-amber-500 to-orange-600',
      badge: 'PRO',
    });

    setShowAddModal(false);
    showToast({
      title: isRtl ? 'تمت إضافة الباقة' : 'Plan Added',
      message: isRtl ? 'تم إضافة باقة جديدة بالنظام' : 'Subscription plan created.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-12 text-start select-none">
      {/* Top Subscription Status Testing Switcher Header */}
      <Card variant="glass" padding="md" className="border border-outline-variant/60 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-xl">tune</span>
            <span className="text-xs font-black text-on-surface uppercase tracking-wider font-headline">
              {isRtl ? 'إدارة حالة الاشتراك (محاكاة الاختبار)' : 'Subscription State Simulator'}
            </span>
          </div>
          <span className="text-[11px] font-medium text-on-surface-variant">
            {isRtl ? 'انقر لتجربة واجهة كل حالة:' : 'Click to test real-time UI state:'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {statusesList.map((st) => {
            const isSelected = subscriptionStatus === st.id;
            return (
              <button
                key={st.id}
                onClick={() => {
                  setSubscriptionStatus(st.id);
                  showToast({
                    title: isRtl ? `تم تغيير الحالة إلى: ${st.labelAr}` : `State updated to: ${st.labelEn}`,
                    message: isRtl ? st.descAr : st.descEn,
                    type: 'info',
                  });
                }}
                className={`p-2.5 rounded-2xl border text-start transition-all ${
                  isSelected
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed shadow-md scale-[1.02]'
                    : 'bg-surface-container-high/60 border-outline-variant/50 text-on-surface hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">
                    {isRtl ? st.labelAr : st.labelEn}
                  </span>
                  {isSelected && <span className="material-symbols-outlined text-sm">check_circle</span>}
                </div>
                <span
                  className={`text-[10px] block truncate mt-0.5 ${
                    isSelected ? 'text-on-primary-fixed/80' : 'text-on-surface-variant'
                  }`}
                >
                  {isRtl ? st.descAr : st.descEn}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* State Specific Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={subscriptionStatus}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {isSubscribed && (
            <Card variant="highlight" padding="lg" className="border-2 border-emerald-500/50 bg-emerald-500/10 space-y-3">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black font-headline text-on-surface">
                        {isRtl ? 'اشتراكك نشط ومفعل بالكامل 🎉' : 'Active Subscription Unlocked 🎉'}
                      </h2>
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        PREMIUM MEMBER
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {isRtl
                        ? `مرحباً بك ${user?.name}! تم إلغاء كافة القيود والإعلانات. استمتع بالدخول الكامل لصالة التمارين وسجلات القياسات.`
                        : `Welcome ${user?.name}! All premium features are unlocked and subscription banners are hidden.`}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { if (subscriptions[0]) handleWhatsAppRedirect(subscriptions[0]); }}
                  icon="support_agent"
                  className="!border-emerald-500/40 !text-emerald-400 hover:!bg-emerald-500/10"
                >
                  {isRtl ? 'الدعم الفني عبر واتساب' : 'WhatsApp Support'}
                </Button>
              </div>
            </Card>
          )}

          {subscriptionStatus === 'Expired' && (
            <Card variant="glass" padding="lg" className="border-2 border-rose-500/60 bg-rose-500/10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">history_toggle_off</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-on-surface font-headline">
                    {isRtl ? 'انتهت فترة اشتراكك الحالية' : 'Your Subscription Has Expired'}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {isRtl
                      ? 'تم حفظ كافة بياناتك وقياساتك السابقة بأمان. يرجى تجديد الاشتراك فوراً لاستعادة إمكانية تسجيل التمارين والمتابعة.'
                      : 'Your workout logs and history remain safely saved. Renew your membership now via WhatsApp to unlock full access.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => { const plan = subscriptions[1] || subscriptions[0]; if (plan) handleWhatsAppRedirect(plan); }}
                  className="!bg-[#25D366] !text-white hover:!bg-[#20ba59] border-none"
                  icon="chat"
                >
                  {isRtl ? 'تجديد الاشتراك فوراً عبر واتساب' : 'Renew Subscription via WhatsApp'}
                </Button>
              </div>
            </Card>
          )}

          {subscriptionStatus === 'Pending Verification' && (
            <Card variant="glass" padding="lg" className="border-2 border-amber-500/60 bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl animate-spin">hourglass_top</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface font-headline">
                    {isRtl ? 'طلب الاشتراك قيد المراجعة والتفعيل' : 'Subscription Request Pending Review'}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {isRtl
                      ? 'يقوم فريق APEX بالتحقق من عملية الدفع. سيتم تفعيل حسابك تلقائياً خلال دقائق.'
                      : 'Our team is verifying your activation details. You will be notified shortly once verified.'}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {subscriptionStatus === 'Suspended' && (
            <Card variant="glass" padding="lg" className="border-2 border-red-500/60 bg-red-900/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">block</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-on-surface font-headline">
                    {isRtl ? 'الاشتراك موقوف مؤقتاً' : 'Subscription Suspended'}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {isRtl
                      ? 'يرجى التواصل مع خدمة العملاء عبر واتساب لمعرفة سبب الإيقاف واستعادة حسابك.'
                      : 'Please contact APEX customer support via WhatsApp to reactivate your membership.'}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Main Title Banner */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="material-symbols-outlined text-primary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          workspace_premium
        </span>
        <h1 className="text-2xl md:text-3xl font-black font-headline text-on-surface tracking-tight">
          {isRtl ? 'باقات الاشتراك والتميز الرياضي' : 'APEX Membership Plans'}
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant font-medium">
          {isRtl
            ? 'اشترك مباشرة عبر الواتساب واحصل على برامج تدريبية وتتبع بيوميكانيكي احترافي'
            : 'Subscribe directly via WhatsApp and unlock high-tension workout splits and custom training protocols.'}
        </p>
      </div>

      {/* Subscription Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((plan) => {
          const isPopular = plan.isPopular;
          return (
            <Card
              key={plan.id}
              padding="lg"
              className={`space-y-6 relative flex flex-col justify-between border transition-all ${
                isPopular
                  ? 'border-2 border-primary-fixed shadow-2xl bg-surface-container-high/90 scale-[1.02]'
                  : 'border-outline-variant/60 hover:border-outline-variant'
              }`}
            >
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-fixed text-on-primary-fixed font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-widest primary-glow">
                  {isRtl ? 'الأكثر إقبالاً' : 'MOST POPULAR'}
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-primary-fixed uppercase tracking-widest">{plan.badge}</span>
                  <h3 className="text-lg font-black text-on-surface font-headline">{isRtl ? plan.nameAr : plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-on-surface font-headline">${plan.priceUSD}</span>
                  <span className="text-xs text-on-surface-variant font-bold">
                    / {plan.durationMonths} {isRtl ? 'أشهر' : 'Months'}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 pt-3 border-t border-outline-variant/50">
                  {(isRtl ? plan.featuresAr : plan.features).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-on-surface">
                      <span className="material-symbols-outlined text-primary-fixed text-sm shrink-0">check_circle</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="space-y-2 pt-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full !bg-[#25D366] !text-white hover:!bg-[#20ba59] border-none shadow-lg"
                  onClick={() => handleOpenSubscribeModal(plan)}
                  icon="chat"
                >
                  {isRtl ? 'الاشتراك عبر واتساب' : 'Subscribe via WhatsApp'}
                </Button>

                <button
                  onClick={() => handleWhatsAppRedirect(plan)}
                  className="w-full text-center text-[11px] text-on-surface-variant hover:text-primary-fixed transition-colors font-bold"
                >
                  {isRtl ? 'تواصل سريع مع الكوتش ↗' : 'Quick Inquiry ↗'}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Benefits Overview Box */}
      <Card variant="glass" padding="lg" className="border border-outline-variant/60 space-y-4">
        <h3 className="text-sm font-black text-on-surface uppercase tracking-wider font-headline border-b border-outline-variant/40 pb-2">
          {isRtl ? 'ماذا يمنحك اشتراك APEX إيليت؟' : 'Why Subscribe to APEX Elite?'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-surface-container-high rounded-2xl border border-outline-variant/40 space-y-1">
            <span className="material-symbols-outlined text-primary-fixed text-xl">fitness_center</span>
            <p className="font-bold text-on-surface">{isRtl ? 'صالة تمرين بيوميكانيكية' : 'Biomechanical Gym Engine'}</p>
            <p className="text-on-surface-variant text-[11px]">
              {isRtl ? 'سجل كافة المجموعات والأوزان وتطور القوة أسبوعياً.' : 'Track live sets, weights, and delta power output.'}
            </p>
          </div>
          <div className="p-3 bg-surface-container-high rounded-2xl border border-outline-variant/40 space-y-1">
            <span className="material-symbols-outlined text-primary-fixed text-xl">trending_up</span>
            <p className="font-bold text-on-surface">{isRtl ? 'تتبع التقدم بالصور والقياسات' : 'Progress & Photo Logs'}</p>
            <p className="text-on-surface-variant text-[11px]">
              {isRtl ? 'جدول زمني لصور التحول وقياسات الأذرع والصدر والوزن.' : 'Visual transformation charts and measurements.'}
            </p>
          </div>
          <div className="p-3 bg-surface-container-high rounded-2xl border border-outline-variant/40 space-y-1">
            <span className="material-symbols-outlined text-primary-fixed text-xl">forum</span>
            <p className="font-bold text-on-surface">{isRtl ? 'دعم واتساب مباشر' : 'Direct WhatsApp Coach'}</p>
            <p className="text-on-surface-variant text-[11px]">
              {isRtl ? 'تواصل مع الكباتن لتعديل البرامج والإجابة على استفساراتك.' : 'Chat directly with coaches for plan revisions.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Subscription Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title={isRtl ? 'تأكيد الاشتراك عبر الواتساب' : 'WhatsApp Express Checkout'}
      >
        {selectedPlan && (
          <div className="space-y-4 pt-1">
            <div className="p-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-[#25D366] uppercase">{selectedPlan.badge}</span>
                <h4 className="text-sm font-black text-on-surface font-headline">
                  {isRtl ? selectedPlan.nameAr : selectedPlan.name}
                </h4>
              </div>
              <span className="text-lg font-black text-[#25D366] font-headline">
                ${selectedPlan.priceUSD}/{selectedPlan.durationMonths}m
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  {isRtl ? 'الاسم بالكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  {isRtl ? 'رقم الواتساب' : 'WhatsApp Number'}
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+201012345678"
                  className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  {isRtl ? 'الهدف التدريبي' : 'Fitness Goal'}
                </label>
                <input
                  type="text"
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  placeholder={isRtl ? 'زيادة كتلة عضلية، تنشيف...' : 'Muscle gain, fat loss...'}
                  className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-[#25D366]"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full !bg-[#25D366] !text-white hover:!bg-[#20ba59] border-none shadow-lg mt-2"
              onClick={() => handleWhatsAppRedirect(selectedPlan)}
              icon="chat"
            >
              {isRtl ? 'إرسال طلب الاشتراك للواتساب ↗' : 'Send Activation Request to WhatsApp ↗'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
