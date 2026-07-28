import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

const variantClasses: Record<string, string> = {
  text: 'rounded-md',
  circular: 'rounded-full',
  rectangular: 'rounded-xl',
  card: 'rounded-2xl',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`shimmer bg-surface-container-high/70 ${variantClasses[variant]} ${className}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-5 space-y-3 ${className}`}>
    <Skeleton variant="rectangular" className="h-40 w-full" />
    <Skeleton variant="text" className="h-4 w-3/4" />
    <Skeleton variant="text" className="h-3 w-1/2" />
  </div>
);

export const SkeletonStats: React.FC = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-4 space-y-2">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton variant="text" className="h-6 w-16" />
        <Skeleton variant="text" className="h-3 w-20" />
      </div>
    ))}
  </div>
);

export const SkeletonWorkout: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-outline-variant/20 bg-surface-container-low/50">
        <Skeleton variant="circular" className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-3 w-2/3" />
          <Skeleton variant="text" className="h-2.5 w-1/3" />
        </div>
        <Skeleton variant="rectangular" className="h-6 w-16 rounded-lg" />
      </div>
    ))}
  </div>
);

export const SkeletonHero: React.FC = () => (
  <div className="relative min-h-[70vh] rounded-2xl border border-outline-variant/20 bg-surface-container-low overflow-hidden">
    <div className="absolute inset-0 bg-surface-container-high/30" />
    <div className="container mx-auto px-5 md:px-10 relative z-10 grid lg:grid-cols-2 items-center gap-10 py-10">
      <div className="space-y-5">
        <Skeleton variant="rectangular" className="h-6 w-32 rounded-full" />
        <Skeleton variant="text" className="h-10 w-3/4" />
        <Skeleton variant="text" className="h-10 w-1/2" />
        <Skeleton variant="text" className="h-4 w-2/3" />
        <div className="flex gap-3 pt-1">
          <Skeleton variant="rectangular" className="h-10 w-36 rounded-xl" />
          <Skeleton variant="rectangular" className="h-10 w-28 rounded-xl" />
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-outline-variant/20 bg-surface-container-high/30 p-5 space-y-2">
            <Skeleton variant="text" className="h-7 w-16" />
            <Skeleton variant="text" className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonTransformation: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Skeleton variant="rectangular" className="h-5 w-40 rounded-full mx-auto" />
      <Skeleton variant="text" className="h-7 w-64 mx-auto" />
      <Skeleton variant="text" className="h-4 w-80 mx-auto" />
    </div>
    <div className="flex items-center justify-center gap-3">
      <Skeleton variant="card" className="w-[120px] h-[160px] shrink-0 opacity-40" />
      <Skeleton variant="card" className="w-[160px] h-[213px] shrink-0 opacity-70" />
      <Skeleton variant="card" className="w-[200px] h-[267px] shrink-0" />
      <Skeleton variant="card" className="w-[160px] h-[213px] shrink-0 opacity-70" />
      <Skeleton variant="card" className="w-[120px] h-[160px] shrink-0 opacity-40" />
    </div>
  </div>
);

export const SkeletonPricing: React.FC = () => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <Skeleton variant="rectangular" className="h-5 w-36 rounded-full mx-auto" />
      <Skeleton variant="text" className="h-7 w-64 mx-auto" />
      <Skeleton variant="text" className="h-4 w-80 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-6 space-y-4">
          <Skeleton variant="text" className="h-5 w-24" />
          <Skeleton variant="text" className="h-8 w-20" />
          <div className="space-y-2 pt-2 border-t border-outline-variant/20">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} variant="text" className="h-3 w-full" />
            ))}
          </div>
          <Skeleton variant="rectangular" className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-6">
    <SkeletonStats />
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-5 space-y-4">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="rectangular" className="h-48 w-full" />
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-4 space-y-3">
          <Skeleton variant="text" className="h-5 w-28" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="text" className="h-3 w-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonShop: React.FC = () => (
  <div className="space-y-6">
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" className="h-8 w-24 rounded-full shrink-0" />
      ))}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-3 space-y-2">
          <Skeleton variant="rectangular" className="h-32 w-full rounded-xl" />
          <Skeleton variant="text" className="h-3 w-3/4" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);
