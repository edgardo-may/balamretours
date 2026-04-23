import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: boolean;
  className?: string;
}

export function FloatingElement({ children, delay = false, className = '' }: FloatingElementProps) {
  return (
    <div className={`${delay ? 'animate-float-delayed' : 'animate-float'} ${className}`}>
      {children}
    </div>
  );
}
