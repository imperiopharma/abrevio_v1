
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'pink' | 'green' | 'none';
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = 'none',
  hover = false,
}) => {
  const glowStyles = {
    blue: 'before:bg-abrev-blue/20',
    purple: 'before:bg-abrev-purple/20',
    pink: 'before:bg-abrev-neon-pink/20',
    green: 'before:bg-abrev-neon-green/20',
    none: '',
  };
  
  const hoverClass = hover ? 'card-hover' : '';
  const glowClass = glowColor !== 'none' ? 'relative before:absolute before:inset-0 before:-z-10 before:blur-xl before:rounded-[inherit]' : '';

  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 z-10',
        glowClass,
        glowStyles[glowColor],
        hoverClass,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
