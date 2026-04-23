import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const FloatingElement: FC<FloatingElementProps> = ({ 
  children, 
  duration = 3, 
  yOffset = 15,
  className = "" 
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
