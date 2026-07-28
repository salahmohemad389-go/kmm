import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { SUBSCRIPTION_STATUSES } from '../constants/subscriptions';
import { AnimatePresence, motion } from 'motion/react';
import { dropdown, buttonPress } from '../lib/animations';

export const Header: React.FC = () => {
  const {
    setActiveTab,
    lang,
    setLang,
    points,
    isRtl,
    user,
    subscriptionStatus,
    setSubscriptionStatus,
    isSubscribed,
    logout,
    settings,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showStatusSelector, setShowStatusSelector] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!showNotifications && !showPointsModal && !showStatusSelector) return;
    const close = () => {
      setShowNotifications(false);
      setShowPointsModal(false);
      setShowStatusSelector(false);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showNotifications, showPointsModal, showStatusSelector]);

  const currentStatusObj = SUBSCRIPTION_STATUSES.find((s) => s.id === subscriptionStatus) || SUBSCRIPTION_STATUSES[0];

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center w-full px-4 lg:px-5 h-14 select-none transition-all duration-300 ${
        scrolled
          ? 'bg-surface-container-low/95 backdrop-blur-2xl border-b border-outline-variant/50 shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
          : 'bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/30'
      }`}
    >
      {/* Brand */}
      <motion.div
        className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        onClick={() => setActiveTab('home')}
        whileHover={{ x: 1 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-black font-headline text-base primary-glow"
          whileHover={{ rotate: -5, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          A
        </motion.div>
        <div className="hidden sm:flex flex-col">
          <span className="text-sm font-black text-on-surface tracking-tight font-headline leading-none transition-colors duration-200 group-hover:text-primary-fixed">
            {settings.appName || 'APEX ELITE'}
          </span>
          <span className="text-[8px] font-bold text-on-surface-variant/60 tracking-[0.2em] uppercase mt-0.5 leading-none">
            {isRtl ? 'منصة الأداء' : 'PERFORMANCE'}
          </span>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search */}
        <motion.div
          className="hidden lg:flex items-center bg-surface-container-high/60 border border-outline-variant/30 px-3 py-1.5 rounded-lg focus-within:border-primary-fixed/60 focus-within:bg-surface-container-high transition-all duration-200"
          whileHover={{ borderColor: 'rgba(195, 244, 0, 0.3)' }}
        >
          <motion.span
            className="material-symbols-outlined text-on-surface-variant/50 text-sm"
            whileHover={{ scale: 1.1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            search
          </motion.span>
          <input
            type="text"
            aria-label={isRtl ? 'بحث' : 'Search'}
            placeholder={isRtl ? 'بحث...' : 'Search...'}
            className="bg-transparent border-none outline-none text-[11px] text-on-surface placeholder:text-on-surface-variant/40 ml-2 w-24 xl:w-32 focus:w-40 transition-all duration-200"
          />
        </motion.div>

        {/* Subscription Badge */}
        <div className="relative">
          <motion.button
            {...buttonPress}
            onClick={(e) => { e.stopPropagation(); setShowStatusSelector(!showStatusSelector); setShowNotifications(false); setShowPointsModal(false); }}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-extrabold transition-all duration-200 ${currentStatusObj.color}`}
          >
            <motion.span
              className="material-symbols-outlined text-xs"
              animate={isSubscribed ? { rotate: [0, -10, 0] } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {isSubscribed ? 'verified' : subscriptionStatus === 'Pending Verification' ? 'hourglass_top' : 'lock'}
            </motion.span>
            <span className="hidden sm:inline">{isRtl ? currentStatusObj.labelAr : currentStatusObj.labelEn}</span>
            <motion.span
              className="material-symbols-outlined text-[10px]"
              animate={showStatusSelector ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              expand_more
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showStatusSelector && (
              <motion.div
                variants={dropdown}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-56 glass-panel rounded-xl p-1.5 shadow-2xl z-50 border border-outline-variant/50`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1.5 text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider flex justify-between items-center">
                  <span>{isRtl ? 'حالة الاشتراك' : 'Status'}</span>
                  <button
                    onClick={() => { setActiveTab('subscriptions'); setShowStatusSelector(false); }}
                    className="text-primary-fixed hover:underline text-[9px]"
                  >
                    {isRtl ? 'إدارة' : 'Manage'}
                  </button>
                </div>
                {SUBSCRIPTION_STATUSES.map((st) => (
                  <motion.button
                    key={st.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubscriptionStatus(st.id); setShowStatusSelector(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-150 ${
                      subscriptionStatus === st.id
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{isRtl ? st.labelAr : st.labelEn}</span>
                    {subscriptionStatus === st.id && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="material-symbols-outlined text-xs"
                      >
                        check
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Language */}
        <motion.button
          {...buttonPress}
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1 px-2 py-1.5 bg-surface-container-high/40 border border-outline-variant/30 hover:border-primary-fixed/40 hover:bg-surface-container-high rounded-lg text-[11px] font-bold text-primary-fixed transition-all duration-200"
          title="Toggle Language"
        >
          <motion.span
            className="material-symbols-outlined text-xs"
            animate={{ rotate: lang === 'ar' ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            language
          </motion.span>
          <span className="hidden sm:inline">{lang === 'en' ? 'عربي' : 'EN'}</span>
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            {...buttonPress}
            onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowPointsModal(false); setShowStatusSelector(false); }}
            className="relative p-1.5 rounded-lg hover:bg-surface-container-high/60 text-on-surface-variant hover:text-primary-fixed transition-all duration-200"
          >
            <motion.span
              className="material-symbols-outlined text-lg"
              animate={showNotifications ? { rotate: [0, -12, 12, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              notifications
            </motion.span>
            <motion.span
              className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-fixed rounded-full ring-2 ring-surface-container-low"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                variants={dropdown}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-72 glass-panel rounded-xl p-3 shadow-2xl z-50 border border-outline-variant/50 space-y-2`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                  <h4 className="text-[11px] font-extrabold text-on-surface uppercase tracking-wider font-headline">
                    {isRtl ? 'الإشعارات' : 'Notifications'}
                  </h4>
                  <motion.span
                    className="text-[9px] font-extrabold text-primary-fixed bg-primary-fixed/10 px-1.5 py-0.5 rounded-full"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    2 NEW
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="p-2.5 bg-surface-container-high/60 rounded-lg text-[11px] space-y-1 border border-outline-variant/30"
                >
                  <p className="font-bold text-primary-fixed flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">bolt</span>
                    <span>{isRtl ? 'إنجاز جديد!' : 'Streak Record!'}</span>
                  </p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    {isRtl ? 'أكملت 14 يوماً متتالياً. +200 نقطة.' : 'Hit a 14-day training streak. +200 Points!'}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Points */}
        <div className="relative">
          <motion.button
            {...buttonPress}
            onClick={(e) => { e.stopPropagation(); setShowPointsModal(!showPointsModal); setShowNotifications(false); setShowStatusSelector(false); }}
            className="flex items-center gap-1 px-2 py-1 bg-primary-fixed/8 hover:bg-primary-fixed/15 border border-primary-fixed/20 hover:border-primary-fixed/40 rounded-lg text-primary-fixed transition-all duration-200 text-[11px] font-black"
          >
            <motion.span
              className="material-symbols-outlined text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              military_tech
            </motion.span>
            <motion.span
              key={points}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="tabular-nums"
            >
              {points.toLocaleString()}
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showPointsModal && (
              <motion.div
                variants={dropdown}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute ${isRtl ? 'left-0' : 'right-0'} mt-2 w-64 glass-panel rounded-xl p-3 shadow-2xl z-50 border border-outline-variant/50 space-y-2`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                  <h4 className="text-[11px] font-extrabold text-on-surface uppercase font-headline">{isRtl ? 'النقاط' : 'Points'}</h4>
                  <motion.span
                    className="text-xs font-black text-primary-fixed font-headline"
                    key={points}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {points.toLocaleString()}
                  </motion.span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {isRtl ? 'استبدل نقاطك بمكملات وأدوات تدريبية.' : 'Redeem points for gear and supplements.'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveTab('shop'); setShowPointsModal(false); }}
                  className="w-full py-1.5 bg-primary-fixed text-on-primary-fixed text-[11px] font-black rounded-lg primary-glow hover:bg-primary-fixed-dim transition-all duration-200"
                >
                  {isRtl ? 'فتح المتجر' : 'Open Store'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar & Logout */}
        <div className="flex items-center gap-1">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveTab('dashboard')}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed/50 cursor-pointer hover:border-primary-fixed hover:shadow-[0_0_12px_rgba(195,244,0,0.3)] transition-all duration-200 shrink-0"
          >
            <img
              src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3'
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -8 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={logout}
            className="hidden sm:flex items-center p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
            title="Logout"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
