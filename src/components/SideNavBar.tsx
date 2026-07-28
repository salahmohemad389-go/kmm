import React from 'react';
import { useApp } from '../context/AppContext';
import { SIDE_NAV_ITEMS } from '../constants/navigation';
import { motion, AnimatePresence } from 'motion/react';

export const SideNavBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isRtl,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    settings,
    isSubscribed,
    subscriptionStatus,
  } = useApp();

  const visibleMenuItems = SIDE_NAV_ITEMS.filter((item) => {
    return settings.visibleTabs[item.tab] !== false;
  });

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.9 }}
      className={`hidden lg:flex flex-col p-2.5 space-y-3 bg-surface-container-low/95 backdrop-blur-xl fixed top-14 h-[calc(100vh-56px)] z-40 select-none overflow-x-hidden ${
        isRtl ? 'right-0 border-l border-outline-variant/30' : 'left-0 border-r border-outline-variant/30'
      }`}
    >
      {/* Top Header & Collapse Toggle */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-outline-variant/20 min-h-[40px]">
        <AnimatePresence mode="wait">
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 10 : -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: isRtl ? 10 : -10, width: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary-fixed shrink-0"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary-fixed font-headline truncate">
                {isRtl ? 'نظام APEX' : 'APEX SYSTEM'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: isRtl ? -15 : 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={toggleSidebarCollapse}
          className="p-1.5 rounded-xl hover:bg-surface-container-high/80 text-on-surface-variant hover:text-primary-fixed transition-all duration-200 mx-auto shrink-0"
          title={isSidebarCollapsed ? (isRtl ? 'توسيع القائمة' : 'Expand Sidebar') : (isRtl ? 'طّي القائمة' : 'Collapse Sidebar')}
        >
          <motion.span
            className="material-symbols-outlined text-lg"
            animate={{ rotate: isSidebarCollapsed ? (isRtl ? 180 : 0) : (isRtl ? 0 : 180) }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSidebarCollapsed
              ? isRtl ? 'chevron_left' : 'chevron_right'
              : isRtl ? 'chevron_right' : 'chevron_left'}
          </motion.span>
        </motion.button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto pr-0.5 custom-scrollbar">
        {visibleMenuItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <motion.button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              title={isSidebarCollapsed ? (isRtl ? item.labelAr : item.labelEn) : undefined}
              whileHover={!isActive ? { x: isRtl ? -2 : 2 } : {}}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`w-full relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-extrabold text-xs transition-all duration-200 select-none ${
                isActive
                  ? 'text-on-primary-container font-black'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSideNavIndicator"
                  className="absolute inset-0 bg-primary-fixed rounded-xl shadow-[0_0_16px_rgba(195,244,0,0.25)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <motion.span
                className="material-symbols-outlined text-lg relative z-10 shrink-0"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {item.icon}
              </motion.span>
              <AnimatePresence mode="wait">
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 truncate text-start overflow-hidden whitespace-nowrap"
                  >
                    {isRtl ? item.labelAr : item.labelEn}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Subscription Card */}
      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`p-3 glass-card rounded-2xl border space-y-2 shrink-0 ${
              isSubscribed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-primary-fixed/20 bg-primary-fixed/5'
            }`}
          >
            {isSubscribed ? (
              <>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="material-symbols-outlined text-emerald-400 text-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    verified
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-on-surface truncate">
                      {isRtl ? 'عضوية إيليت مفعلة' : 'Active Subscription'}
                    </p>
                    <p className="text-[9px] text-emerald-400 uppercase font-extrabold truncate">
                      {isRtl ? 'جميع المميزات متاحة' : 'ALL FEATURES UNLOCKED'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('gym')}
                  className="w-full py-1.5 bg-emerald-500 text-black text-[11px] font-black rounded-xl hover:bg-emerald-400 transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>{isRtl ? 'بدء التمرين' : 'Start Workout'}</span>
                </motion.button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="material-symbols-outlined text-amber-400 text-lg"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    workspace_premium
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-on-surface truncate">
                      {subscriptionStatus === 'Expired'
                        ? isRtl ? 'اشتراكك منتهي' : 'Subscription Expired'
                        : isRtl ? 'ترقية للحساب المميز' : 'Upgrade to Premium'}
                    </p>
                    <p className="text-[9px] text-primary-fixed uppercase font-extrabold truncate">
                      {isRtl ? 'تواصل عبر الواتساب' : 'SUBSCRIBE VIA WHATSAPP'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('subscriptions')}
                  className="w-full py-1.5 bg-primary-fixed text-on-primary-fixed text-[11px] font-black rounded-xl primary-glow hover:bg-primary-fixed-dim transition-all duration-200 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>{isRtl ? 'عرض باقات الاشتراكات' : 'View Plans'}</span>
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
