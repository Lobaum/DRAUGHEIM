import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}) => {
  const variants = {
    primary: 'bg-nordic-gold text-black font-bold border-black hover:bg-white',
    secondary: 'bg-black/60 text-white border-white/20 hover:bg-white/10',
    danger: 'bg-red-950/40 text-red-400 border-red-900 hover:bg-red-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] tracking-widest',
    md: 'px-6 py-3 text-xs tracking-widest',
    lg: 'px-8 py-3 text-sm font-bold tracking-widest',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative border uppercase transition-all duration-300 font-sans cursor-pointer flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
