import React from 'react';
import { cn } from '../lib/utils';

export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-medium',
  };

  return (
    <button
      className={cn(
        'rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
