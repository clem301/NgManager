import React from 'react';

interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  error?: string;
  hint?: string;
}

export default function GlassInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  multiline = false,
  rows = 4,
  maxLength,
  error,
  hint,
}: InputProps) {
  const inputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-white/5 border border-white/10
    text-white placeholder:text-white/40
    focus:outline-none focus:border-primary/50 focus:bg-white/[0.07]
    transition-all duration-300
    ${error ? 'border-red-500/50 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/80">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className={inputClasses}
        />
      )}
      {hint && !error && (
        <p className="text-xs text-white/40">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

export { GlassInput as Input };
