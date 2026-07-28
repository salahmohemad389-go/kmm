import React from 'react';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  hasDot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const BadgeBase: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'sm',
  hasDot = false,
  children,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary-container/20 text-primary-fixed border-primary-fixed/30',
    secondary: 'bg-secondary-container/30 text-on-secondary-container border-outline-variant',
    outline: 'bg-transparent text-on-surface border-outline-variant',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    error: 'bg-error/15 text-error border-error/30',
    neutral: 'bg-surface-container-highest text-on-surface-variant border-transparent',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1 font-bold',
    md: 'text-xs px-3 py-1 gap-1.5 font-extrabold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {hasDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'primary'
              ? 'bg-primary-fixed'
              : variant === 'success'
              ? 'bg-emerald-400'
              : variant === 'error'
              ? 'bg-error'
              : 'bg-current'
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export const Badge = React.memo(BadgeBase);
