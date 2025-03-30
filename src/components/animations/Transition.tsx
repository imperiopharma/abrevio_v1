
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type TransitionProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  duration?: number;
  delay?: number;
};

export const Transition: React.FC<TransitionProps> = ({
  children,
  className = '',
  type = 'fade',
  duration = 0.5,
  delay = 0,
}) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) return null;

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    'slide-up': {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    'slide-down': {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    'slide-left': {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    'slide-right': {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
  };

  // Make sure type is a valid key before accessing it
  const validType = Object.keys(variants).includes(type) ? type : 'fade';
  
  return (
    <motion.div
      className={className}
      initial={variants[validType].initial}
      animate={variants[validType].animate}
      exit={variants[validType].exit}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation wrapper
export const TransitionGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <Transition key={index} delay={index * staggerDelay}>
          {child}
        </Transition>
      ))}
    </div>
  );
};
