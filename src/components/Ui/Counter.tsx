import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
  start?: number;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  suffix = '', 
  duration = 18000, 
  label,
  start = 0 
}) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min(progress / duration, 1);
      
      // Usar easeOutQuart para una animación más natural
      const easedPercentage = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easedPercentage * (end - start) + start);
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, end, start, duration]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm uppercase tracking-wider text-gray-400">
        {label}
      </div>
    </div>
  );
};

export default Counter;