import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CINEMATIC_EASE } from '../lib/animations';

interface Transformation {
  id: string;
  name: string;
  nameAr: string;
  durationWeeks: number;
  weightLost: number;
  beforeImage: string;
  afterImage: string;
  quote: string;
  quoteAr: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 't1',
    name: 'Marcus V.',
    nameAr: 'ماركوس',
    durationWeeks: 12,
    weightLost: 13,
    beforeImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIXO2Q-tJUcl_WojEwLs_74IMKGhotbdSSVfGhl8fq-UShknBS6AAmAXsfl2XQ65_iOkO4WNYjsYbdJU6jIUIDkmlLwng7asW7BDj8xEvem2UUrV9ZI87fWRnHXOU3ZOyk9TjWrraazcxuKjzCa2pn5V96lOQhGB5ySIeklMu9JO_9gD107i11yGODY9FXezowL5zQ9kblA2Tlf6oRb6-XpTG99mu3Xi7q6Pjq1vceJJ3Z-czT047j',
    afterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQLkOncV_HN484UEIq7k1F-7BB2stUnhA1pyQRhKQe86rVwhTzS61nfDP_j6l2k9kDtjYvskSVWdrXkPvJSuvHVlhSmMcLm5IPDilMxbSXZ1M1ik5ibahyiYW6nwCBkjVAqHpW-oFx09L5hmHLNZQwFvsZAsTdgwmO4VmqZ98A0-qdQS_hJXjYnwKaoFuys7kAnzK5qvaAHsoXvkqUtq15iMx6vnETv4WwDdXmGX-8-0GS0lU2hZp',
    quote: 'Focused on high-intensity metabolic conditioning.',
    quoteAr: 'تركيز على التدريب الأيضي عالي الشدة.',
  },
  {
    id: 't2',
    name: 'Sarah K.',
    nameAr: 'سارة',
    durationWeeks: 10,
    weightLost: 9,
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=480&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=480&auto=format&fit=crop&q=80',
    quote: 'Lean mass up 6kg while dropping 9kg fat.',
    quoteAr: 'زيادة 6 كجم كتلة عضلية مع فقدان 9 كجم دهون.',
  },
  {
    id: 't3',
    name: 'Ahmed R.',
    nameAr: 'أحمد',
    durationWeeks: 14,
    weightLost: 18,
    beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=480&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=480&auto=format&fit=crop&q=80',
    quote: 'Complete body recomposition in 14 weeks.',
    quoteAr: 'إعادة تكوين كاملة للجسم في 14 أسبوعاً.',
  },
  {
    id: 't4',
    name: 'Dina M.',
    nameAr: 'دينا',
    durationWeeks: 8,
    weightLost: 7,
    beforeImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=480&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=480&auto=format&fit=crop&q=80',
    quote: 'Her leanest and strongest version ever.',
    quoteAr: 'أنحف وأقوى نسخة لها على الإطلاق.',
  },
  {
    id: 't5',
    name: 'Youssef A.',
    nameAr: 'يوسف',
    durationWeeks: 16,
    weightLost: 22,
    beforeImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=480&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=480&auto=format&fit=crop&q=80',
    quote: 'Went from 105kg to 83kg with precision coaching.',
    quoteAr: 'من 105 كجم إلى 83 كجم مع تدريب دقيق.',
  },
];

const VISIBLE_COUNT = 5;
const CARD_W = 180;
const CARD_GAP = 10;
const CENTER_OFFSET = (VISIBLE_COUNT - 1) / 2;

// ─── Card Flip (3D perspective, AFTER first) ────────────────────────────────
interface FlipCardProps {
  transformation: Transformation;
  isCenter: boolean;
  isRtl: boolean;
  onClick?: () => void;
}

const FlipCard: React.FC<FlipCardProps> = React.memo(({ transformation, isCenter, isRtl, onClick }) => {
  const [showAfter, setShowAfter] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setShowAfter((prev) => !prev);
    setTimeout(() => setIsFlipping(false), 650);
  }, [isFlipping]);

  const handleClick = useCallback(() => {
    handleFlip();
    onClick?.();
  }, [handleFlip, onClick]);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ aspectRatio: '3/4', perspective: '1000px' }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      aria-label={isRtl
        ? `تحويل ${transformation.name} — اضغط للتبديل`
        : `${transformation.name} transformation — click to flip`}
    >
      {/* Card container with 3D flip */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: showAfter ? 0 : 180 }}
        transition={{ duration: 0.65, ease: CINEMATIC_EASE }}
      >
        {/* FRONT — AFTER image (default) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <img
            src={transformation.afterImage}
            alt={`${transformation.name} after`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* AFTER badge */}
          <div className="absolute top-2 left-2 z-10 bg-primary-fixed/90 backdrop-blur-sm text-[8px] font-black text-on-primary-fixed px-2 py-0.5 rounded-full">
            AFTER
          </div>

          {/* Active glow ring */}
          {isCenter && (
            <div className="absolute inset-0 rounded-2xl border-2 border-primary-fixed/30 pointer-events-none animate-[pulse-glow_3s_ease-in-out_infinite]" />
          )}

          {/* Flip hint */}
          {isCenter && (
            <div className="absolute bottom-12 inset-x-0 flex justify-center z-10 pointer-events-none">
              <span className="text-[7px] font-bold text-on-surface-variant/50 bg-surface/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {isRtl ? 'اضغط للتبديل' : 'tap to flip'}
              </span>
            </div>
          )}
        </div>

        {/* BACK — BEFORE image */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img
            src={transformation.beforeImage}
            alt={`${transformation.name} before`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* BEFORE badge */}
          <div className="absolute top-2 left-2 z-10 bg-surface/70 backdrop-blur-sm text-[8px] font-black text-on-surface-variant px-2 py-0.5 rounded-full border border-outline-variant/30">
            BEFORE
          </div>

          {isCenter && (
            <div className="absolute inset-0 rounded-2xl border-2 border-outline-variant/30 pointer-events-none" />
          )}
        </div>
      </motion.div>

      {/* Info overlay (always on top, no flip) */}
      <div className="absolute bottom-0 inset-x-0 p-2.5 z-10 pointer-events-none">
        <div className="flex items-end justify-between gap-1.5">
          <div className="min-w-0">
            <h3 className="text-[11px] font-black text-on-surface font-headline leading-tight truncate">
              {isRtl ? transformation.nameAr : transformation.name}
            </h3>
            <p className="text-[8px] text-on-surface-variant/60 italic mt-0.5 line-clamp-1">
              {isRtl ? transformation.quoteAr : transformation.quote}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-black text-primary-fixed font-headline leading-none">
              -{transformation.weightLost}
            </div>
            <div className="text-[7px] font-bold text-on-surface-variant/50 uppercase">
              {isRtl ? 'كجم' : 'KG'}
            </div>
          </div>
        </div>
        <div className="mt-1.5">
          <span className="text-[7px] font-bold bg-primary-fixed/20 text-primary-fixed px-1.5 py-0.5 rounded-full">
            {isRtl ? `${transformation.durationWeeks} أسبوع` : `${transformation.durationWeeks}W`}
          </span>
        </div>
      </div>
    </div>
  );
});
FlipCard.displayName = 'FlipCard';

// ─── Main Carousel ──────────────────────────────────────────────────────────

interface TransformationCarouselProps {
  lang: Language;
}

export const TransformationCarousel: React.FC<TransformationCarouselProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const total = TRANSFORMATIONS.length;
  const [centerIdx, setCenterIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelCooldownRef = useRef(false);

  const next = useCallback(() => {
    setDirection(1);
    setCenterIdx((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCenterIdx((p) => (p - 1 + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, next]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); isRtl ? next() : prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); isRtl ? prev() : next(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRtl, next, prev]);

  // Wheel
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (wheelCooldownRef.current) return;
    if (Math.abs(e.deltaX) < 10 && Math.abs(e.deltaY) < 10) return;
    wheelCooldownRef.current = true;
    setTimeout(() => { wheelCooldownRef.current = false; }, 350);
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.deltaX > 0 ? (isRtl ? prev() : next()) : (isRtl ? next() : prev());
    } else {
      e.deltaY > 0 ? next() : prev();
    }
  }, [isRtl, next, prev]);

  // Touch swipe
  const touchStartX = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? (isRtl ? prev() : next()) : (isRtl ? next() : prev());
    }
  }, [isRtl, next, prev]);

  // Build visible items with deck-of-cards positioning
  const visibleItems = useMemo(() => {
    const items: { idx: number; offset: number; t: Transformation }[] = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const rawIdx = centerIdx + (i - CENTER_OFFSET);
      const wrappedIdx = ((Math.round(rawIdx) % total) + total) % total;
      items.push({ idx: i, offset: i - CENTER_OFFSET, t: TRANSFORMATIONS[wrappedIdx] });
    }
    return items;
  }, [centerIdx, total]);

  const containerWidth = VISIBLE_COUNT * CARD_W + (VISIBLE_COUNT - 1) * CARD_GAP + 60;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label={isRtl ? 'عرض التحولات' : 'Transformation gallery'}
      aria-roledescription="carousel"
    >
      {/* Carousel viewport */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ maxWidth: containerWidth, height: 360 }}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map(({ idx, offset, t }) => {
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              // Deck-of-cards: center is full size, sides are smaller with slight rotation
              const scale = isCenter ? 1 : absOffset === 1 ? 0.78 : 0.62;
              const opacity = isCenter ? 1 : absOffset === 1 ? 0.65 : 0.35;
              const x = offset * (CARD_W + CARD_GAP);
              const zIndex = VISIBLE_COUNT - absOffset;
              const rotateY = offset * (isRtl ? -4 : 4);
              const translateZ = isCenter ? 20 : absOffset === 1 ? 0 : -20;

              return (
                <motion.div
                  key={`${t.id}-${idx}`}
                  className="absolute rounded-2xl"
                  style={{ width: CARD_W, zIndex }}
                  initial={{
                    x: x + (direction > 0 ? 60 : -60),
                    scale: scale * 0.9,
                    opacity: opacity * 0.5,
                    rotateY: rotateY + direction * 8,
                  }}
                  animate={{
                    x,
                    scale,
                    opacity,
                    rotateY,
                    translateZ,
                  }}
                  exit={{
                    x: x + (direction > 0 ? -60 : 60),
                    scale: scale * 0.9,
                    opacity: 0,
                    rotateY: rotateY - direction * 8,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 22,
                    mass: 1.1,
                  }}
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-2xl border transition-shadow duration-500 ${
                      isCenter
                        ? 'border-primary-fixed/40 shadow-[0_0_30px_rgba(195,244,0,0.15)]'
                        : 'border-outline-variant/20 shadow-lg'
                    }`}
                  >
                    <FlipCard
                      transformation={t}
                      isCenter={isCenter}
                      isRtl={isRtl}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isRtl ? next() : prev()}
          className="w-8 h-8 rounded-full bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-200"
          aria-label={isRtl ? 'السابق' : 'Previous'}
        >
          <span className="material-symbols-outlined text-sm">{isRtl ? 'chevron_right' : 'chevron_left'}</span>
        </motion.button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {TRANSFORMATIONS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > centerIdx ? 1 : -1);
                setCenterIdx(i);
              }}
              animate={i === centerIdx ? { scale: 1.3 } : { scale: 1 }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === centerIdx ? 'w-5 bg-primary-fixed' : 'w-1.5 bg-outline-variant/40 hover:bg-outline'
              }`}
              aria-label={`${isRtl ? 'انتقال إلى' : 'Go to'} ${i + 1}`}
              aria-current={i === centerIdx ? 'true' : undefined}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => isRtl ? prev() : next()}
          className="w-8 h-8 rounded-full bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-all duration-200"
          aria-label={isRtl ? 'التالي' : 'Next'}
        >
          <span className="material-symbols-outlined text-sm">{isRtl ? 'chevron_left' : 'chevron_right'}</span>
        </motion.button>
      </div>

      {/* Counter */}
      <div className="text-center mt-2">
        <motion.span
          key={centerIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-bold text-on-surface-variant/40 tabular-nums"
        >
          {centerIdx + 1} / {total}
        </motion.span>
      </div>
    </div>
  );
};
