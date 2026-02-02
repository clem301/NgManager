import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      gradient-primary text-white
      hover:shadow-glow hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      glass text-white/90
      hover:bg-white/10 hover:border-white/20
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-white/70
      hover:text-white hover:bg-white/5
    `,
    danger: `
      bg-red-500/20 text-red-400 border border-red-500/30
      hover:bg-red-500/30 hover:border-red-500/50
      active:scale-[0.98]
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}

export { GlassButton as Button };
