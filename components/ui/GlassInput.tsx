import React from 'react';

interface GlassInputProps {
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
}: GlassInputProps) {
  const inputClasses = `
    glass w-full px-4 py-3 rounded-glass
    text-white placeholder-white/40
    focus:outline-none focus:ring-2 focus:ring-white/20
    transition-all duration-300
    ${className}
  `;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white/80">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
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
          className={inputClasses}
        />
      )}
    </div>
  );
}
