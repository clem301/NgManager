import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'president' | 'admin' | 'member' | 'staff' | 'owner';
  glow?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'default', glow = false, className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-white/10 text-white/80',
    president: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    admin: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    member: 'bg-green-500/20 text-green-300 border-green-500/30',
    staff: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    owner: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const glowClasses = glow ? 'shadow-glow animate-glow' : '';

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full
        text-xs font-semibold
        border border-white/10
        ${variantClasses[variant]}
        ${glowClasses}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
