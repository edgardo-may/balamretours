import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 border border-slate-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
