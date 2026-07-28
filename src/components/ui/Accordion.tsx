import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AccordionItem {
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  icon?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  lang?: 'en' | 'ar';
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  lang = 'ar',
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(items.length > 0 ? [items[0].id] : []);
  const isRtl = lang === 'ar';

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-2 ${className}`} role="list">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const title = isRtl ? item.titleAr : item.titleEn;
        const content = isRtl ? item.contentAr : item.contentEn;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div
            key={item.id}
            role="listitem"
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-primary-fixed/40 bg-surface-container-low/80 shadow-md'
                : 'border-outline-variant/40 bg-surface-container-low/30 hover:border-outline-variant/60'
            }`}
          >
            <h3>
              <button
                id={buttonId}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-start transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed/60 rounded-xl"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <div className="flex items-center gap-3 pr-2">
                  {item.icon && (
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    </div>
                  )}
                  <span className="text-sm md:text-base font-extrabold text-on-surface">
                    {title}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="material-symbols-outlined text-on-surface-variant shrink-0 text-xl"
                >
                  keyboard_arrow_down
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-4 pb-5 md:px-5 md:pb-5 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/25 pt-3">
                    {content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
