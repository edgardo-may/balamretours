import { ReactNode, useState } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = '', glowColor = 'primary' }: GlowCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    primary: 'rgba(7, 228, 244, 0.4)',
    'primary-dark': 'rgba(213, 95, 14, 0.4)',
    secondary: 'rgba(42, 72, 73, 0.4)',
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300"
          style={{
            left: position.x,
            top: position.y,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${glowColors[glowColor as keyof typeof glowColors]} 0%, transparent 70%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
