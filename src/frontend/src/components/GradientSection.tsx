import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientSectionProps {
  children: ReactNode;
  variant?: 'red' | 'orange' | 'black' | 'white';
  className?: string;
}

export default function GradientSection({ children, variant = 'white', className }: GradientSectionProps) {
  const variantClasses = {
    red: 'gradient-red',
    orange: 'gradient-orange',
    black: 'gradient-black',
    white: 'bg-card/60 backdrop-blur-sm',
  };

  return (
    <section className={cn('py-16', variantClasses[variant], className)}>
      {children}
    </section>
  );
}
