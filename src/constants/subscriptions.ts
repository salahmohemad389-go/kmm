import { SubscriptionStatus } from '../types';

export interface SubscriptionStatusConfig {
  id: SubscriptionStatus;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  color: string;
  icon: string;
}

export const SUBSCRIPTION_STATUSES: SubscriptionStatusConfig[] = [
  {
    id: 'Active',
    labelEn: 'Active Member',
    labelAr: 'Active Member',
    descEn: 'All premium features unlocked.',
    descAr: 'جميع المميزات والخدمات متاحة بالكامل.',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    icon: 'verified',
  },
  {
    id: 'Pending Verification',
    labelEn: 'Pending Verification',
    labelAr: 'قيد التحقق',
    descEn: 'Payment under specialist review.',
    descAr: 'طلب الاشتراك قيد المراجعة والتفعيل.',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    icon: 'hourglass_top',
  },
  {
    id: 'Guest',
    labelEn: 'Guest User',
    labelAr: 'زائر',
    descEn: 'Basic overview access.',
    descAr: 'وصول محدود للعروض والباقات.',
    color: 'bg-surface-container-high text-on-surface-variant border-outline-variant/60',
    icon: 'lock',
  },
  {
    id: 'Expired',
    labelEn: 'Expired Plan',
    labelAr: 'اشتراك منتهي',
    descEn: 'Data preserved. Renewal required.',
    descAr: 'بياناتك محفوظة. يتطلب التجديد.',
    color: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    icon: 'history_toggle_off',
  },
  {
    id: 'Suspended',
    labelEn: 'Suspended',
    labelAr: 'موقوف',
    descEn: 'Contact APEX support.',
    descAr: 'يرجى التواصل مع الدعم.',
    color: 'bg-red-900/30 text-red-400 border-red-500/40',
    icon: 'block',
  },
];
