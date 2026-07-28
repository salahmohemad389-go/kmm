import React, { useState, useRef, useCallback } from 'react';
import { Language } from '../types';

interface TransformationSliderProps {
  lang: Language;
}

export const TransformationSlider: React.FC<TransformationSliderProps> = ({ lang }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'ar';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(isRtl ? 100 - percentage : percentage);
  }, [isRtl]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-outline-variant shadow-2xl group"
    >
      {/* Before Image (Background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIXO2Q-tJUcl_WojEwLs_74IMKGhotbdSSVfGhl8fq-UShknBS6AAmAXsfl2XQ65_iOkO4WNYjsYbdJU6jIUIDkmlLwng7asW7BDj8xEvem2UUrV9ZI87fWRnHXOU3ZOyk9TjWrraazcxuKjzCa2pn5V96lOQhGB5ySIeklMu9JO_9gD107i11yGODY9FXezowL5zQ9kblA2Tlf6oRb6-XpTG99mu3Xi7q6Pjq1vceJJ3Z-czT047j')`
        }}
      />

      {/* Before Tag */}
      <div className={`absolute top-4 z-10 bg-black/70 backdrop-blur-md text-on-surface-variant text-xs font-bold px-3 py-1 rounded-full border border-white/10 ${isRtl ? 'right-4' : 'left-4'}`}>
        {isRtl ? 'قبل التغيير (الأسبوع 1)' : 'BEFORE (WEEK 1)'}
      </div>

      {/* After Image (Clipped Foreground) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-75"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOQLkOncV_HN484UEIq7k1F-7BB2stUnhA1pyQRhKQe86rVwhTzS61nfDP_j6l2k9kDtjYvskSVWdrXkPvJSuvHVlhSmMcLm5IPDilMxbSXZ1M1ik5ibahyiYW6nwCBkjVAqHpW-oFx09L5hmHLNZQwFvsZAsTdgwmO4VmqZ98A0-qdQS_hJXjYnwKaoFuys7kAnzK5qvaAHsoXvkqUtq15iMx6vnETv4WwDdXmGX-8-0GS0lU2hZp')`,
          width: `${sliderPosition}%`
        }}
      />

      {/* After Tag */}
      <div className={`absolute top-4 z-10 bg-primary-fixed text-on-primary-fixed text-xs font-bold px-3 py-1 rounded-full shadow-lg ${isRtl ? 'left-4' : 'right-4'}`}>
        {isRtl ? 'بعد التغيير (الأسبوع 12)' : 'AFTER (WEEK 12)'}
      </div>

      {/* Divider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-fixed z-30 shadow-[0_0_12px_#c3f400]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-2xl border-2 border-black active:scale-110 transition-transform">
          <span className="material-symbols-outlined font-bold text-xl">unfold_more</span>
        </div>
      </div>

      {/* Bottom overlay pill */}
      <div className="absolute bottom-6 left-6 z-30 pointer-events-none">
        <span className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-outline-variant text-primary-fixed">
          {isRtl ? 'رحلة 12 أسبوعاً - نتائج حقيقية' : '12 WEEK KINETIC JOURNEY'}
        </span>
      </div>
    </div>
  );
};
