import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const newToast: ToastItem = { ...toast, id };

    setToasts((prev) => [...prev.slice(-3), newToast]);

    const timeoutId = setTimeout(() => {
      removeToast(id);
    }, 3200);
    timeoutRefs.current.set(id, timeoutId);
  }, [removeToast]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutRefs.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-[72px] right-4 sm:right-5 z-[120] flex flex-col gap-2 pointer-events-none max-w-sm w-full" role="status" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast, index) => {
            const isError = toast.type === 'error';
            const isWarning = toast.type === 'warning';
            const isInfo = toast.type === 'info';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.92, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(2px)' }}
                transition={{
                  duration: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: index * 0.03,
                }}
                className={`pointer-events-auto p-3 rounded-xl shadow-2xl backdrop-blur-xl border flex items-start gap-2.5 ${
                  isError
                    ? 'bg-error/15 border-error/40 text-error'
                    : isWarning
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                    : isInfo
                    ? 'bg-sky-500/15 border-sky-500/30 text-sky-300'
                    : 'bg-primary-fixed text-on-primary-fixed border-primary-fixed/40'
                }`}
              >
                <motion.span
                  className="material-symbols-outlined text-lg shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  {isError ? 'error' : isWarning ? 'warning' : isInfo ? 'info' : 'check_circle'}
                </motion.span>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-black tracking-wide font-headline">
                    {toast.title}
                  </h5>
                  {toast.message && (
                    <p className="text-[11px] opacity-85 mt-0.5 font-medium leading-tight">
                      {toast.message}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => removeToast(toast.id)}
                  className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
                  aria-label="Dismiss"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
