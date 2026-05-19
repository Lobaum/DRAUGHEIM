import React from 'react';
import { motion } from 'framer-motion';
import { INVENTARIOItem } from '../../types';
import { Backpack, X, Shield, Sword, FlaskConical, Zap } from 'lucide-react';
import { GameButton } from '../ui/Botao';

interface InventarioProps {
  items: INVENTARIOItem[];
  onClose: () => void;
}

export const Inventario: React.FC<InventarioProps> = ({ items, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-4xl w-full h-[80vh] glass-panel runic-border flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
           <div className="flex items-center gap-3">
              <Backpack className="text-nordic-gold" />
              <h2 className="text-xl font-display text-white uppercase tracking-[0.2em]">Alforge de Viagem</h2>
           </div>
           <button onClick={onClose} className="text-nordic-stone hover:text-white transition-colors">
              <X size={24} />
           </button>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
           <div className="md:col-span-8 p-6 overflow-y-auto grid grid-cols-4 sm:grid-cols-5 gap-3 h-full content-start">
              {[...Array(25)].map((_, i) => {
                 const item = items[i];
                 return (
                    <div 
                      key={i} 
                      className="aspect-square bg-black/40 border border-white/5 hover:border-nordic-gold/50 transition-all cursor-pointer flex items-center justify-center relative group"
                    >
                       {item ? (
                          <div className="text-nordic-cyan">
                             {item.tipo === 'Consumível' ? <FlaskConical size={24} /> : <Shield size={24} />}
                             <div className="absolute inset-0 bg-nordic-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                       ) : (
                          <div className="w-1 h-1 bg-white/10 rounded-full" />
                       )}
                    </div>
                 );
              })}
           </div>
           <div className="md:col-span-4 bg-black/40 border-l border-white/10 p-6 flex flex-col gap-6">
              <div className="text-center p-8 border border-white/5 bg-white/2">
                 <div className="w-16 h-16 mx-auto mb-4 border border-white/10 flex items-center justify-center text-nordic-stone">
                    <Backpack size={32} />
                 </div>
                 <p className="text-xs font-mono text-nordic-stone uppercase tracking-widest">Selecione um item para ver detalhes</p>
              </div>

              <div className="mt-auto space-y-4">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono text-nordic-cyan uppercase">Carga Ocupada</span>
                    <span className="text-xs font-display text-white">{items.length} / 25</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-nordic-cyan w-[20%]" />
                 </div>
                 <GameButton variant="secondary" className="w-full" onClick={onClose}>Fechar Inventário</GameButton>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
