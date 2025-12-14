import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}: GlassButtonProps) {

  const variantClasses = {
    primary: 'glass-strong text-white hover:shadow-glow-strong',
    secondary: 'glass text-white/80 hover:text-white hover:shadow-glow',
    danger: 'glass-strong text-red-400 hover:text-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        px-6 py-3 rounded-glass
        font-medium
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}
