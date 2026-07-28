import React from 'react';
import { TabType, Language } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem, viewportFadeUp, viewportBlurUp } from '../lib/animations';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, lang }) => {
  const isRtl = lang === 'ar';
  const { settings } = useApp();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={staggerContainer}
      className="w-full bg-surface-container-low/60 border-t border-outline-variant/40 mt-16 rounded-3xl overflow-hidden"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-start">
        {/* Column 1: Brand & Bio */}
        <motion.div variants={viewportBlurUp} className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <motion.div
              className="w-9 h-9 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-black font-headline text-xl primary-glow"
              whileHover={{ rotate: -5, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              A
            </motion.div>
            <span className="text-xl font-black text-on-surface tracking-tight font-headline">
              {settings.appName || 'APEX ELITE'}
            </span>
          </div>

          <p className="text-xs md:text-sm text-on-surface-variant max-w-sm leading-relaxed">
            {isRtl
              ? 'منصة الأداء التدريبي المتكاملة. نجمع بين التحليل الحيوية والتدريب الشخصي والتغذية المحسوبة للوصول لأقصى إمكانياتك البدنية.'
              : 'Engineered performance & biometric fitness platform. Combining kinetic programming, personal coaching, and macro precision for serious transformation.'}
          </p>

          <div className="flex items-center gap-3 pt-2">
            {['fitness_center', 'language', 'shield', 'bolt'].map((icon, idx) => (
              <motion.div
                key={idx}
                className="w-9 h-9 rounded-xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-200 cursor-pointer shadow-sm"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div variants={staggerItem} className="space-y-3">
          <h4 className="text-xs font-black text-on-surface uppercase tracking-wider font-headline">
            {isRtl ? 'روابط سريعة' : 'Quick Navigation'}
          </h4>
          <ul className="space-y-2 text-xs font-bold text-on-surface-variant">
            {[
              { tab: 'stories', labelEn: 'Success Stories', labelAr: 'قصص النجاح' },
              { tab: 'gym', labelEn: 'Active Gym Engine', labelAr: 'صالة التمرين الحية' },
              { tab: 'progress', labelEn: 'Progress & Analytics', labelAr: 'سجل التقدم والقياسات' },
              { tab: 'shop', labelEn: 'Elite Store', labelAr: 'المتجر' },
              { tab: 'subscriptions', labelEn: 'Membership Plans', labelAr: 'باقات الاشتراك' },
            ].map((link, idx) => (
              <li key={idx}>
                <motion.button
                  whileHover={{ x: isRtl ? -3 : 3 }}
                  onClick={() => setActiveTab(link.tab as TabType)}
                  className="hover:text-primary-fixed transition-colors duration-200"
                >
                  {isRtl ? link.labelAr : link.labelEn}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Platform & Programs */}
        <motion.div variants={staggerItem} className="space-y-3">
          <h4 className="text-xs font-black text-on-surface uppercase tracking-wider font-headline">
            {isRtl ? 'البرامج الرياضية' : 'Performance Systems'}
          </h4>
          <ul className="space-y-2 text-xs font-bold text-on-surface-variant">
            {[
              { tab: 'shop', labelEn: 'Elite Gear & Store', labelAr: 'متجر المكملات والأدوات' },
              { tab: 'social', labelEn: 'Community Leaderboard', labelAr: 'لوحة الشرف والمجتمع' },
              { tab: 'dashboard', labelEn: 'Personal Dashboard', labelAr: 'لوحة تحكم الأداء' },
              { tab: 'stories', labelEn: 'Success Stories', labelAr: 'قصص النجاح' },
            ].map((link, idx) => (
              <li key={idx}>
                <motion.button
                  whileHover={{ x: isRtl ? -3 : 3 }}
                  onClick={() => setActiveTab(link.tab as TabType)}
                  className="hover:text-primary-fixed transition-colors duration-200"
                >
                  {isRtl ? link.labelAr : link.labelEn}
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Contact & Legal */}
        <motion.div variants={staggerItem} className="space-y-3">
          <h4 className="text-xs font-black text-on-surface uppercase tracking-wider font-headline">
            {isRtl ? 'التواصل والدعم' : 'Contact & Support'}
          </h4>
          <ul className="space-y-2 text-xs text-on-surface-variant font-medium">
            {[
              { icon: 'mail', text: 'support@apex-elite.com' },
              { icon: 'call', text: '+20 (100) 000-0000' },
              { icon: 'location_on', textEn: 'Cairo, Egypt', textAr: 'القاهرة، مصر' },
            ].map((contact, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <motion.span
                  className="material-symbols-outlined text-primary-fixed text-sm"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                >
                  {contact.icon}
                </motion.span>
                <span>{isRtl && contact.textAr ? contact.textAr : contact.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={viewportFadeUp}
        className="border-t border-outline-variant/30 bg-surface-container-high/30 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
          <p>© 2026 APEX ELITE Performance Labs. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { labelEn: 'Privacy Policy', labelAr: 'سياسة الخصوصية' },
              { labelEn: 'Terms of Service', labelAr: 'الشروط والأحكام' },
              { labelEn: 'Security', labelAr: 'الأمان' },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ y: -1 }}
                className="hover:text-primary-fixed transition-colors duration-200"
              >
                {isRtl ? link.labelAr : link.labelEn}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};
