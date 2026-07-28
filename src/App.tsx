import React, { Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header';
import { SideNavBar } from './components/SideNavBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AnimatePresence, motion } from 'motion/react';
import { pageTransition } from './lib/animations';

const HomeView = React.lazy(() => import('./views/HomeView').then((m) => ({ default: m.HomeView })));
const DashboardView = React.lazy(() => import('./views/DashboardView').then((m) => ({ default: m.DashboardView })));
const ActiveGymView = React.lazy(() => import('./views/ActiveGymView').then((m) => ({ default: m.ActiveGymView })));
const SocialView = React.lazy(() => import('./views/SocialView').then((m) => ({ default: m.SocialView })));
const ShopView = React.lazy(() => import('./views/ShopView').then((m) => ({ default: m.ShopView })));
const SuccessStoriesView = React.lazy(() => import('./views/SuccessStoriesView').then((m) => ({ default: m.SuccessStoriesView })));
const SubscriptionsView = React.lazy(() => import('./views/SubscriptionsView').then((m) => ({ default: m.SubscriptionsView })));
const ProgressView = React.lazy(() => import('./views/ProgressView').then((m) => ({ default: m.ProgressView })));

const ViewLoader = () => (
  <div className="flex flex-col items-center justify-center py-28 gap-4">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-2 border-primary-fixed/15 rounded-full" />
      <div className="absolute inset-0 border-2 border-transparent border-t-primary-fixed rounded-full animate-spin" />
      <div className="absolute inset-1.5 border-2 border-transparent border-b-primary-fixed/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full bg-primary-fixed/60 animate-pulse" />
      <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em]">
        Loading
      </span>
      <div className="w-1 h-1 rounded-full bg-primary-fixed/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, lang, isSidebarCollapsed } = useApp();

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen bg-background text-on-surface font-body selection:bg-primary-fixed/30 selection:text-on-surface ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />

      <div className="flex min-h-[calc(100vh-56px)]">
        <SideNavBar />

        <main
          className={`flex-1 transition-[margin] duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-6 w-full pb-24 lg:pb-12 ${
            isRtl
              ? isSidebarCollapsed
                ? 'lg:mr-[72px]'
                : 'lg:mr-[240px]'
              : isSidebarCollapsed
              ? 'lg:ml-[72px]'
              : 'lg:ml-[240px]'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="gpu-accelerated"
              >
                <Suspense fallback={<ViewLoader />}>
                  {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} lang={lang} />}
                  {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} lang={lang} />}
                  {activeTab === 'gym' && <ActiveGymView />}
                  {activeTab === 'social' && <SocialView lang={lang} />}
                  {activeTab === 'shop' && <ShopView />}
                  {activeTab === 'stories' && <SuccessStoriesView />}
                  {activeTab === 'subscriptions' && <SubscriptionsView />}
                  {activeTab === 'progress' && <ProgressView />}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <WhatsAppFloat whatsappNumber="+201000000000" />
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ToastProvider>
  );
}
