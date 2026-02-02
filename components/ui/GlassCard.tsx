import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md'
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div 
      className={`
        glass rounded-xl
        ${hover ? 'glass-hover cursor-pointer' : ''} 
        ${paddingClasses[padding]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export { GlassCard as Card };
