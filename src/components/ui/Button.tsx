import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-extrabold tracking-wide rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:pointer-events-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-1.5 gap-1.5 min-h-[30px]',
    md: 'text-xs px-4 py-2 gap-2 min-h-[36px]',
    lg: 'text-sm px-5 py-2.5 gap-2 min-h-[42px]',
  };

  const variantStyles = {
    primary:
      'bg-primary-fixed text-on-primary-fixed primary-glow hover:bg-primary-fixed-dim hover:shadow-[0_0_24px_rgba(195,244,0,0.35)]',
    secondary:
      'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/30 hover:border-outline-variant/50',
    outline:
      'border border-primary-fixed/50 text-primary-fixed hover:bg-primary-fixed/10 hover:border-primary-fixed',
    ghost:
      'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50',
    danger:
      'bg-error/15 text-error border border-error/30 hover:bg-error/25 hover:border-error/50',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.02, transition: { duration: 0.15 } }}
      whileTap={disabled || isLoading ? {} : { scale: 0.97, transition: { duration: 0.08 } }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <motion.span
              className="material-symbols-outlined text-[15px] leading-none shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
              whileHover={{ rotate: -8, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {icon}
            </motion.span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && (
            <motion.span
              className="material-symbols-outlined text-[15px] leading-none shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  );
};
