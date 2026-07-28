import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { WHATSAPP_PHONE, openWhatsApp } from '../utils/whatsapp';
import { dropdown } from '../lib/animations';

interface WhatsAppFloatProps {
  whatsappNumber?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  whatsappNumber = WHATSAPP_PHONE,
}) => {
  const { lang, subscriptions } = useApp();
  const isRtl = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    subscriptions[0]?.id || 'sub-2'
  );
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [goal, setGoal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedPlan =
    subscriptions.find((s) => s.id === selectedPlanId) || subscriptions[0];

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!userName.trim()) {
      setErrorMsg(isRtl ? 'يرجى إدخال الاسم بالكامل' : 'Please enter your full name');
      return;
    }

    if (!userPhone.trim() || userPhone.length < 8) {
      setErrorMsg(
        isRtl
          ? 'يرجى إدخال رقم هاتف صحيح مع الرمز الدولي'
          : 'Please enter a valid phone number'
      );
      return;
    }

    const planTitle = isRtl ? (selectedPlan?.nameAr || selectedPlan?.name) : selectedPlan?.name;
    const planPrice = `$${selectedPlan?.priceUSD || 49}/${selectedPlan?.durationMonths || 1}m`;

    const textEn = `Hello APEX Team! 👋\n\nI want to subscribe to the *${planTitle}* (${planPrice}).\n\n👤 Name: ${userName.trim()}\n📞 Phone: ${userPhone.trim()}\n🎯 Fitness Goal: ${goal.trim() || 'General Fitness'}\n\nPlease guide me with the activation steps!`;

    const textAr = `مرحباً فريق APEX! 👋\n\nأود الاشتراك في باقة *${planTitle}* (${planPrice}).\n\n👤 الاسم: ${userName.trim()}\n📞 الهاتف: ${userPhone.trim()}\n🎯 الهدف الرياضي: ${goal.trim() || 'لياقة وتنشيف'}\n\nيرجى تزويدي بخطوات التفعيل!`;

    const message = isRtl ? textAr : textEn;
    openWhatsApp(whatsappNumber, message);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button with continuous float animation */}
      <div
        className={`fixed bottom-6 z-50 flex items-center gap-2 ${
          isRtl ? 'left-6' : 'right-6'
        }`}
      >
        <motion.button
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Contact via WhatsApp"
          title={isRtl ? 'تواصل معنا عبر واتساب' : 'Subscribe via WhatsApp'}
        >
          {/* Animated Glow Pulse */}
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 -z-10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-8 h-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
          </svg>

          {/* Hover Tooltip */}
          <motion.span
            className="hidden md:block absolute bottom-full mb-2 bg-surface-container-highest text-on-surface text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl border border-outline-variant/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isRtl ? 'اشتراك مباشر عبر واتساب' : 'Subscribe via WhatsApp'}
          </motion.span>
        </motion.button>
      </div>

      {/* Modal Popup for Subscription Details */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg bg-surface-container-low border border-outline-variant/70 rounded-3xl p-6 shadow-2xl space-y-5 relative text-start overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-outline-variant/40 pb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      chat
                    </span>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-black text-on-surface font-headline">
                      {isRtl ? 'الاشتراك المباشر عبر واتساب' : 'WhatsApp Express Subscription'}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      {isRtl
                        ? 'اختر باقتك وسيقوم فريق الكباتن بإكمال التسجيل معك فوراً'
                        : 'Select your tier and chat directly with an APEX Specialist'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-surface-container-high text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleOpenWhatsApp} className="space-y-4">
                {/* Plan Selection */}
                <div>
                  <label className="block text-xs font-black text-on-surface uppercase tracking-wider mb-2">
                    {isRtl ? 'اختر باقة الاشتراك:' : 'Select Subscription Plan:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {subscriptions.map((sub) => {
                      const isSelected = selectedPlanId === sub.id;
                      return (
                        <motion.div
                          key={sub.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedPlanId(sub.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#25D366] bg-[#25D366]/10 shadow-md'
                              : 'border-outline-variant/60 hover:border-outline-variant bg-surface-container-high/40'
                          }`}
                        >
                          <div className="text-xs font-black text-on-surface truncate">
                            {isRtl ? sub.nameAr : sub.name}
                          </div>
                          <div className="text-sm font-black text-[#25D366] font-headline mt-1">
                            ${sub.priceUSD}
                            <span className="text-[10px] text-on-surface-variant font-normal">
                              /{sub.durationMonths}m
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* User Info Inputs */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {isRtl ? 'الاسم بالكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={isRtl ? 'مثال: أحمد محمود' : 'e.g. Alex Morgan'}
                      className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {isRtl ? 'رقم الهاتف (واتساب) *' : 'WhatsApp Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder={isRtl ? '+201012345678' : '+1 555 019 2831'}
                      className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      {isRtl ? 'هدف التحول (اختياري)' : 'Primary Goal (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder={isRtl ? 'تخسيس، بناء عضلات...' : 'Fat loss, muscle gain...'}
                      className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      className="p-3 bg-error/15 border border-error/40 text-error rounded-xl text-xs font-bold flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit CTA */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full !bg-[#25D366] !text-white hover:!bg-[#20ba59] border-none shadow-lg"
                    icon="chat"
                  >
                    {isRtl
                      ? 'متابعة الاشتراك على واتساب'
                      : 'Continue & Open WhatsApp'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
