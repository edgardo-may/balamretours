import { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'blur-in';
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 1000,
  className = '',
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'slide-up': 'animate-slide-up',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale-in': 'animate-scale-in',
    'blur-in': 'animate-blur-in',
  };

  return (
    <div
      ref={ref}
      className={`${isInView ? animationClasses[animation] : 'opacity-0'} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  );
}
