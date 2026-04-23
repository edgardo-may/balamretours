import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggeredListProps {
  children: ReactNode[];
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

const StaggeredList: FC<StaggeredListProps> = ({ 
  children, 
  delay = 0, 
  staggerDelay = 0.1,
  className = "" 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList;
