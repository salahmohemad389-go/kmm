import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { modalBackdrop, modalContent } from '../../lib/animations';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative z-10 w-full ${widthClasses[maxWidth]} glass-panel rounded-2xl p-5 sm:p-6 premium-shadow-lg border border-outline-variant/40 my-auto`}
          >
            {(title || icon) && (
              <div className="flex items-start justify-between pb-3 border-b border-outline-variant/25 mb-4">
                <div className="flex items-center gap-2.5">
                  {icon && (
                    <motion.div
                      className="w-9 h-9 rounded-xl bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed flex items-center justify-center shrink-0"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {icon}
                      </span>
                    </motion.div>
                  )}
                  <div>
                    {title && (
                      <h3 className="text-base font-extrabold text-on-surface font-headline leading-snug">
                        {title}
                      </h3>
                    )}
                    {subtitle && (
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{subtitle}</p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={onClose}
                  aria-label="Close"
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high/60 transition-all duration-150"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </motion.button>
              </div>
            )}

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
