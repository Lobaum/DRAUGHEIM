import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardRunicoProps {
  title: string;
  subtitle?: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  attributes?: Record<string, number | string>;
  className?: string;
}

export const CardRunico: React.FC<CardRunicoProps> = ({
  title,
  subtitle,
  description,
  selected,
  onClick,
  icon,
  attributes,
  className
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -2 }}
      onClick={onClick}
      className={cn(
        "relative p-4 cursor-pointer transition-all duration-300 border bg-[#16161d] rounded-lg group",
        selected 
          ? "border-nordic-gold ring-1 ring-nordic-gold shadow-[0_0_20px_rgba(251,191,36,0.1)]" 
          : "border-white/5 hover:border-white/20",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-2">
          {icon && <div className="text-nordic-cyan group-hover:text-nordic-gold transition-colors">{icon}</div>}
          <div>
            <h3 className={cn("font-display text-sm uppercase tracking-wider", selected ? "text-nordic-gold" : "text-white")}>
              {title}
            </h3>
            {subtitle && <p className="text-[10px] text-nordic-stone font-mono uppercase">{subtitle}</p>}
          </div>
        </div>

        {description && <p className="text-xs text-slate-400 mb-4 flex-grow">{description}</p>}

        {attributes && (
          <div className="mt-auto grid grid-cols-2 gap-2 text-[9px] font-mono border-t border-white/5 pt-3">
            {Object.entries(attributes).map(([key, val]) => (
              <div key={key} className="flex justify-between bg-black/40 p-1.5 rounded border border-white/5">
                <span className="text-white/40 uppercase">{key}:</span>
                <span className="text-nordic-gold font-bold">{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
