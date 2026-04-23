import { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface StaggeredListProps {
  children: ReactNode[];
  staggerDelay?: number;
  animation?: 'fade-in-up' | 'slide-left' | 'slide-right' | 'scale-in';
  className?: string;
}

export function StaggeredList({
  children,
  staggerDelay = 100,
  animation = 'fade-in-up',
  className = '',
}: StaggeredListProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const animationClasses = {
    'fade-in-up': 'animate-fade-in-up',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale-in': 'animate-scale-in',
  };

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`${isInView ? animationClasses[animation] : 'opacity-0'}`}
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'both',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
