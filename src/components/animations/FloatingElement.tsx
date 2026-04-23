import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
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
