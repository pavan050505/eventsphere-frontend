import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 bg-white border rounded-lg text-sm transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-400'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
