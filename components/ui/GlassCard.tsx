import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  strong?: boolean;
}

export default function GlassCard({ children, className = '', hover = false, strong = false }: GlassCardProps) {
  const baseClasses = strong ? 'glass-strong' : 'glass';
  const hoverClasses = hover ? 'glass-hover cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} rounded-glass p-6 ${className}`}>
      {children}
    </div>
  );
}
