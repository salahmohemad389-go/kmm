import React from 'react';
import { TabType, Language } from '../types';
import { MOBILE_NAV_ITEMS } from '../constants/navigation';
import { motion } from 'motion/react';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab, lang }) => {
  const isRtl = lang === 'ar';

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-[60px] px-2 bg-surface-container-low/95 backdrop-blur-2xl border-t border-outline-variant/25 z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.5)] select-none pb-safe"
      role="navigation"
      aria-label={isRtl ? 'التنقل الرئيسي' : 'Main navigation'}
    >
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <motion.button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            whileTap={{ scale: 0.88 }}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
              isActive ? 'text-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <motion.div
                layoutId="activeMobileBottomTab"
                className="absolute inset-x-2 inset-y-0.5 bg-primary-fixed/10 rounded-xl border border-primary-fixed/20"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <motion.span
              className="material-symbols-outlined text-[22px] relative z-10"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              animate={isActive ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {item.icon}
            </motion.span>
            <span className="text-[9px] tracking-tight font-extrabold relative z-10 mt-px leading-none">
              {isRtl ? item.labelAr : item.labelEn}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
