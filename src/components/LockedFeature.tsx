import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { WHATSAPP_PHONE, openWhatsApp } from '../utils/whatsapp';

interface LockedFeatureProps {
  children: React.ReactNode;
  featureTitleEn: string;
  featureTitleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
}

export const LockedFeature: React.FC<LockedFeatureProps> = ({
  children,
  featureTitleEn,
  featureTitleAr,
  descriptionEn,
  descriptionAr,
}) => {
  const { isSubscribed, isRtl, setActiveTab, subscriptionStatus } = useApp();

  if (isSubscribed) {
    return <>{children}</>;
  }

  const handleWhatsAppClick = () => {
    const textEn = `Hello APEX Team! 👋\n\nI want to unlock *${featureTitleEn}*.\n\nPlease guide me with the subscription steps!`;
    const textAr = `مرحباً فريق APEX! 👋\n\nأود فتح ميزة *${featureTitleAr}* المغلقة.\n\nيرجى تزويدي بخطوات التفعيل!`;
    openWhatsApp(WHATSAPP_PHONE, isRtl ? textAr : textEn);
  };

  return (
    <Card
      variant="highlight"
      padding="lg"
      className="border-2 border-primary-fixed/40 bg-surface-container-low/90 text-center space-y-5 my-4 relative overflow-hidden select-none"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Locked Icon Badge */}
      <div className="w-16 h-16 rounded-3xl bg-surface-container-high border-2 border-primary-fixed/50 text-primary-fixed flex items-center justify-center mx-auto shadow-xl primary-glow">
        <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
          lock
        </span>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
          {subscriptionStatus === 'Expired'
            ? isRtl ? 'اشتراكك منتهي' : 'Subscription Expired'
            : isRtl ? 'ميزة للمشتركين فقط' : 'PREMIUM FEATURE LOCKED'}
        </span>

        <h3 className="text-xl font-black text-on-surface font-headline">
          {isRtl ? featureTitleAr : featureTitleEn}
        </h3>

        <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
          {isRtl
            ? descriptionAr || 'هذه الميزة متاحة حصرياً للأعضاء المشتركين في باقات APEX إيليت. اشترك الآن للاستفادة الكاملة.'
            : descriptionEn || 'This feature is exclusively available to active APEX Elite members. Subscribe now to gain instant access.'}
        </p>
      </div>

      {/* Features preview bullets */}
      <div className="bg-surface-container-high/60 border border-outline-variant/40 rounded-2xl p-4 max-w-sm mx-auto space-y-2 text-start text-xs font-semibold text-on-surface">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed text-base">check_circle</span>
          <span>{isRtl ? 'تسجيل وسجل المحاولات بلا حدود' : 'Unlimited set tracking & logs'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed text-base">check_circle</span>
          <span>{isRtl ? 'تحليل بيوميكانيكي مباشر للأداء' : 'Biomechanical real-time form checks'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed text-base">check_circle</span>
          <span>{isRtl ? 'متابعة مباشرة عبر الواتساب' : 'Direct WhatsApp specialist assistance'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          variant="primary"
          size="md"
          className="w-full sm:w-auto !bg-[#25D366] !text-white hover:!bg-[#20ba59] border-none shadow-lg"
          onClick={handleWhatsAppClick}
          icon="chat"
        >
          {isRtl ? 'تفعيل الاشتراك عبر واتساب' : 'Subscribe via WhatsApp'}
        </Button>

        <Button
          variant="outline"
          size="md"
          className="w-full sm:w-auto"
          onClick={() => setActiveTab('subscriptions')}
          icon="workspace_premium"
        >
          {isRtl ? 'استعراض الباقات' : 'View Plans'}
        </Button>
      </div>
    </Card>
  );
};
