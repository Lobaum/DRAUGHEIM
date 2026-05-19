import React from 'react';
import { motion } from 'framer-motion';
import { EVENTOType } from '../../types';
import { GameButton } from '../ui/Botao';
import { Gift, Sparkles, AlertCircle } from 'lucide-react';

interface EventosProps {
  event: { type: EVENTOType; description: string };
  onInteract: () => void;
  onClose: () => void;
}

export const Eventos: React.FC<EventosProps> = ({
  event,
  onInteract,
  onClose
}) => {
  const icon = {
    [EVENTOType.BAU]: <Gift size={48} className="text-nordic-gold" />,
    [EVENTOType.ALTAR]: <Sparkles size={48} className="text-nordic-cyan" />,
    [EVENTOType.EVENTO]: <AlertCircle size={48} className="text-amber-500" />,
    [EVENTOType.LOOT]: <TreasureChest size={48} className="text-nordic-gold" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg w-full glass-panel runic-border p-10 flex flex-col items-center text-center gap-6"
      >
        <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-2">
          {icon[event.type] || <Sparkles size={48} />}
        </div>

        <div>
          <h2 className="text-2xl font-display text-nordic-gold uppercase tracking-wider mb-2">{event.type}</h2>
          <p className="text-slate-300 font-sans leading-relaxed italic">&quot;{event.description}&quot;</p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

        <div className="flex flex-col gap-3 w-full">
          <GameButton size="md" className="w-full" onClick={onInteract}>Continuar Jornada</GameButton>
          <GameButton size="sm" variant="secondary" className="w-full" onClick={onClose}>Ignorar e Seguir</GameButton>
        </div>
      </motion.div>
    </div>
  );
};

const TreasureChest = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 13h20" />
    <path d="M20 13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2" />
    <path d="M12 10V6" />
    <path d="M12 13v8" />
    <path d="M4 13v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
  </svg>
);
