import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText } from 'lucide-react';

export interface CombatLogEntry {
  id: string;
  message: string;
  type: 'damage' | 'heal' | 'info' | 'critical' | 'miss';
}

interface CombatLogProps {
  logs: CombatLogEntry[];
}

export const CombatLog: React.FC<CombatLogProps> = ({ logs }) => {
  const logEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = logEndRef.current?.parentElement;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/60 border border-white/10 backdrop-blur-md h-40 flex flex-col">
      <div className="border-b border-white/10 p-2 flex items-center gap-2 bg-white/5">
        <ScrollText size={14} className="text-nordic-gold" />
        <span className="text-[10px] uppercase font-display tracking-widest">Relatório de Batalha</span>
      </div>
      <div className="flex-grow overflow-y-auto p-3 font-mono text-[11px] leading-relaxed">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={logColors[log.type]}
            >
              <span className="text-white/20 mr-2">»</span>
              {log.message}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

const logColors = {
  damage: 'text-red-400',
  heal: 'text-green-400',
  info: 'text-blue-300',
  critical: 'text-nordic-gold font-bold',
  miss: 'text-nordic-stone italic',
};
