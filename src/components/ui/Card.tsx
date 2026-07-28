import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'panel' | 'outline' | 'highlight';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isHoverable?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  padding = 'md',
  isHoverable = false,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    glass: 'glass-card border-outline-variant/30 premium-shadow',
    panel: 'glass-panel border-outline-variant/40 premium-shadow-lg',
    outline: 'bg-surface-container-low border border-outline-variant/30',
    highlight: 'glass-card border-primary-fixed/25 glow-primary premium-shadow-lg',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-5',
    lg: 'p-5 md:p-6',
  };

  const hoverProps = isHoverable
    ? {
        whileHover: {
          y: -4,
          boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 20px rgba(195,244,0,0.06)',
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
        whileTap: { scale: 0.99, transition: { duration: 0.08 } },
      }
    : {};

  return (
    <motion.div
      {...hoverProps}
      className={`rounded-2xl transition-all duration-200 ${variantStyles[variant]} ${paddingStyles[padding]} ${
        isHoverable ? 'cursor-pointer hover:border-primary-fixed/40 hover:premium-shadow-lg' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
