import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

export const ShopView: React.FC = () => {
  const { isRtl, categories, storeItems, points, addPoints } = useApp();
  const { showToast } = useToast();

  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [redeemedItems, setRedeemedItems] = useState<string[]>([]);

  const visibleCategories = categories.filter((c) => !c.hidden);

  const filteredItems = storeItems.filter((item) => {
    if (selectedCatId === 'all') return true;
    return item.categoryId === selectedCatId;
  });

  const handleRedeem = (id: string, cost: number, title: string) => {
    if (points < cost) {
      showToast({
        title: isRtl ? 'نقاط غير كافية' : 'Insufficient Points',
        message: isRtl ? 'تحتاج إلى تجميع المزيد من النقاط لاستبدال هذا العنصر.' : 'Earn more points by completing workouts!',
        type: 'error',
      });
      return;
    }

    addPoints(-cost, 'Redeemed Store Reward', 'استبدال منتج من المتجر');
    setRedeemedItems((prev) => [...prev, id]);
    showToast({
      title: isRtl ? '🎉 تم الاستبدال بنجاح!' : '🎉 Reward Redeemed!',
      message: isRtl ? `تم خصم ${cost} نقطة واستبدال ${title}.` : `${title} unlocked! ${cost} PTS deducted.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="primary" size="sm" hasDot>
            UNLIMITED STORE & REWARDS
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black font-headline text-on-surface mt-1">
            {isRtl ? 'متجر المكافآت والأدوات الرياضية' : 'Elite Rewards Store'}
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium mt-0.5">
            {isRtl
              ? 'تصفح كافة الأقسام واستبدل نقاط تمارينك بمكملات وأدوات رياضية ملابس وبرامج'
              : 'Redeem hard-earned workout points for official gear, supplements, apparel, and digital plans.'}
          </p>
        </div>

        <Card variant="highlight" padding="sm" className="flex items-center gap-3 border border-primary-fixed/40">
          <span className="material-symbols-outlined text-primary-fixed text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
          <div>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase block">
              {isRtl ? 'رصيدك الحالي' : 'Available Balance'}
            </span>
            <span className="text-lg font-black text-primary-fixed font-headline">
              {points.toLocaleString()} PTS
            </span>
          </div>
        </Card>
      </div>

      {/* Category Filter Pills (Requirement #6) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-outline-variant/60">
        <button
          onClick={() => setSelectedCatId('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
            selectedCatId === 'all'
              ? 'bg-primary-fixed text-on-primary-fixed primary-glow'
              : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {isRtl ? 'جميع الأقسام' : 'All Categories'} ({storeItems.length})
        </button>

        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              selectedCatId === cat.id
                ? 'bg-primary-fixed text-on-primary-fixed primary-glow'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>{isRtl ? cat.titleAr : cat.title}</span>
          </button>
        ))}
      </div>

      {/* Store Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isRedeemed = redeemedItems.includes(item.id);
          const canAfford = points >= item.pointsCost;

          return (
            <Card variant="glass" padding="none" key={item.id} className="flex flex-col justify-between group overflow-hidden border border-outline-variant/60 hover:border-primary-fixed/40 transition-all">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="neutral" size="sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-on-surface font-headline">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{item.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-outline-variant/40 mt-2">
                <span className="text-sm font-black text-primary-fixed font-headline">
                  {item.pointsCost.toLocaleString()} PTS
                </span>

                <Button
                  variant={isRedeemed ? 'secondary' : canAfford ? 'primary' : 'outline'}
                  size="sm"
                  disabled={isRedeemed || !canAfford}
                  onClick={() => handleRedeem(item.id, item.pointsCost, item.title)}
                >
                  {isRedeemed ? (isRtl ? 'تم الاستبدال' : 'Redeemed') : (isRtl ? 'استبدال الآن' : 'Redeem Now')}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
