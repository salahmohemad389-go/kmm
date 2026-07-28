import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="material-symbols-outlined absolute start-3 text-on-surface-variant/40 text-sm pointer-events-none transition-colors duration-200 peer-focus:text-primary-fixed">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-surface-container-high/60 border border-outline-variant/40 rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/35 py-2.5 outline-none transition-all duration-200 focus:border-primary-fixed focus:ring-2 focus:ring-primary-fixed/10 focus:bg-surface-container-high ${
              icon ? 'ps-9 pe-3' : 'px-3'
            } ${error ? 'border-error focus:ring-error/10 focus:border-error' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-[10px] font-semibold text-error">{error}</p>}
        {helperText && !error && (
          <p className="text-[10px] text-on-surface-variant/50">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
