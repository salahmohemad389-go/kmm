import { TabType } from '../types';

export interface NavItem {
  tab: TabType;
  icon: string;
  labelEn: string;
  labelAr: string;
}

export const SIDE_NAV_ITEMS: NavItem[] = [
  { tab: 'home', icon: 'home', labelEn: 'Home Overview', labelAr: 'الرئيسية' },
  { tab: 'dashboard', icon: 'dashboard', labelEn: 'Dashboard', labelAr: 'لوحة التحكم' },
  { tab: 'gym', icon: 'fitness_center', labelEn: 'Gym Session', labelAr: 'صالة التمرين' },
  { tab: 'progress', icon: 'monitoring', labelEn: 'Progress Logs', labelAr: 'سجل التقدم' },
  { tab: 'social', icon: 'emoji_events', labelEn: 'Community & Leaderboard', labelAr: 'المجتمع والترتيب' },
  { tab: 'shop', icon: 'shopping_bag', labelEn: 'Elite Store', labelAr: 'المتجر' },
  { tab: 'stories', icon: 'auto_awesome', labelEn: 'Success Stories', labelAr: 'قصص النجاح' },
  { tab: 'subscriptions', icon: 'workspace_premium', labelEn: 'Subscriptions', labelAr: 'الاشتراكات' },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { tab: 'home', icon: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
  { tab: 'gym', icon: 'fitness_center', labelEn: 'Gym', labelAr: 'التمرين' },
  { tab: 'dashboard', icon: 'dashboard', labelEn: 'Dash', labelAr: 'اللوحة' },
  { tab: 'subscriptions', icon: 'workspace_premium', labelEn: 'Plans', labelAr: 'الاشتراكات' },
  { tab: 'shop', icon: 'storefront', labelEn: 'Shop', labelAr: 'المتجر' },
];
