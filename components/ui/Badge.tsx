import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'president' | 'admin' | 'member' | 'staff' | 'owner' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  dot = false,
  className = '' 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-white/10 text-white/70 border-white/10',
    primary: 'bg-primary/20 text-primary border-primary/30',
    president: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    admin: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    member: 'bg-green-500/20 text-green-400 border-green-500/30',
    staff: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    owner: 'bg-red-500/20 text-red-400 border-red-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const dotColors = {
    default: 'bg-white/50',
    primary: 'bg-primary',
    president: 'bg-amber-400',
    admin: 'bg-blue-400',
    member: 'bg-green-400',
    staff: 'bg-purple-400',
    owner: 'bg-red-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
