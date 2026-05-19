import React from 'react';
import { motion } from 'framer-motion';
import { HUD } from './HUD';
import { CombatLog, CombatLogEntry } from './LogsCombate';
import { Personagem, GameState } from '../../types';
import { Compass, Sparkles, Map as MapIcon, Info } from 'lucide-react';
import { GameButton } from '../ui/Botao';
import { cn } from '../../lib/utils';

interface TelaExploracaoProps {
  personagem: Personagem;
  regiao: string;
  logs: CombatLogEntry[];
  onAction: (action: 'explorar' | 'descansar' | 'inventario' | 'status') => void;
}

export const TelaExploracao: React.FC<TelaExploracaoProps> = ({
  personagem,
  regiao,
  logs,
  onAction
}) => {
  const hpPercent = (personagem.vida / personagem.vidaMaxima) * 100;
  const energyPercent = (personagem.energia / personagem.energiaMaxima) * 100;

  return (
    <div className="min-h-screen bg-bento-bg flex flex-col">
      <HUD personagem={personagem} regiao={regiao} onAction={onAction} />
      
      <main className="flex-1 grid grid-cols-12 gap-3 p-3 pt-20">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex-1 bento-panel p-4 flex flex-col">
             <div className="aspect-square w-full bg-gradient-to-b from-bento-accent to-black rounded border border-cyan-900/30 mb-4 overflow-hidden relative group">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000')] bg-cover opacity-20" />
               <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60 backdrop-blur-sm text-center">
                 <span className="text-xs font-bold text-cyan-200 tracking-widest uppercase">{personagem.nome}, o {personagem.raca}</span>
               </div>
               <div className="w-full h-full flex items-center justify-center text-6xl opacity-30 font-display">ᛟ</div>
             </div>
             
             <div className="space-y-4">
               <div className="space-y-1">
                 <div className="flex justify-between text-[10px] uppercase text-red-400 font-bold">
                   <span>Pontos de Vida</span>
                   <span>{personagem.vida}/{personagem.vidaMaxima}</span>
                 </div>
                 <div className="health-bar-bg h-3">
                   <div className="health-bar-fill" style={{ width: `${hpPercent}%` }}></div>
                 </div>
               </div>
               
               <div className="space-y-1">
                 <div className="flex justify-between text-[10px] uppercase text-nordic-cyan font-bold">
                   <span>Energia</span>
                   <span>{personagem.energia}/{personagem.energiaMaxima}</span>
                 </div>
                 <div className="energy-bar-bg h-3">
                   <div className="energy-bar-fill" style={{ width: `${energyPercent}%` }}></div>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-2 pt-2">
                 <StatBox label="Poder" value={personagem.atributos.poder} />
                 <StatBox label="Defesa" value={personagem.atributos.defesa} />
                 <StatBox label="Esquiva" value={personagem.atributos.esquiva} />
                 <StatBox label="Nível" value={personagem.nivel.toString().padStart(2, '0')} color="text-nordic-cyan" />
               </div>
             </div>
          </div>
          
          <div className="h-24 bento-panel p-3 flex items-center gap-3">
            <div className="w-12 h-12 bg-red-900/20 border border-red-500/50 rounded flex items-center justify-center text-xl">🧪</div>
            <div>
              <span className="block text-xs font-bold">Poção</span>
              <span className="text-[10px] text-white/50">Recupera 30 PV • {personagem.pocoes} restando</span>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-3">
          <div className="flex-1 bg-bento-accent rounded-lg border-2 border-nordic-gold/20 relative overflow-hidden flex flex-col group">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #1c1c22 10px, #1c1c22 20px)' }}></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')] bg-cover opacity-10 group-hover:scale-105 transition-transform duration-[20s]" />
            
            <div className="relative z-10 flex flex-col h-full items-center justify-center p-10 text-center">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="mb-8 text-nordic-gold opacity-40"
               >
                  <Compass size={120} />
               </motion.div>
               <h3 className="text-5xl font-display text-white uppercase tracking-[0.2em] mb-4">{regiao}</h3>
               <p className="max-w-md text-slate-400 font-sans text-sm leading-relaxed mb-8 italic">
                 "A névoa se dissipa onde o herói caminha..."
               </p>

               <GameButton size="lg" onClick={() => onAction('explorar')} className="w-64">
                  Explorar Área
               </GameButton>
            </div>
          </div>
          <div className="h-20 bento-panel flex items-center justify-around px-4">
             <GameActionBtn 
               icon="🧭" 
               label="Explorar" 
               active 
               onClick={() => onAction('explorar')} 
             />
             <GameActionBtn 
               icon="⛺" 
               label="Descansar" 
               onClick={() => onAction('descansar')} 
             />
             <GameActionBtn 
               icon="🎒" 
               label="Mochila" 
               onClick={() => onAction('inventario')} 
             />
             <GameActionBtn 
               icon="📜" 
               label="Status" 
               onClick={() => onAction('status')} 
             />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex-1 bento-panel p-3 flex flex-col">
            <h3 className="text-[10px] uppercase tracking-widest text-nordic-gold mb-3 border-b border-white/10 pb-1 flex items-center justify-between">
              Diário de Viagem <Info size={12} />
            </h3>
            <div className="flex-1 overflow-hidden">
               <CombatLog logs={logs} />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .bento-panel { @apply bg-[#16161d] border border-white/5 rounded-xl shadow-2xl; }
      `}</style>
    </div>
  );
};

const StatBox = ({ label, value, color = "text-white" }: { label: string; value: string | number; color?: string }) => (
  <div className="bg-black/40 p-2 rounded border border-white/5">
    <span className="block text-[9px] uppercase text-white/40">{label}</span>
    <span className={cn("text-lg font-bold", color)}>{value}</span>
  </div>
);

const GameActionBtn = ({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all duration-300 group cursor-pointer",
      active ? "opacity-100 scale-110" : "opacity-40 hover:opacity-100"
    )}
  >
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className={cn("text-[9px] uppercase font-bold tracking-tighter", active ? "text-nordic-cyan" : "text-white")}>
      {label}
    </span>
  </button>
);

const QuickItem = ({ icon, rarity, empty }: { icon?: string; rarity?: string; empty?: boolean }) => (
  <div className={cn(
    "aspect-square bg-black border rounded flex items-center justify-center transition-all cursor-pointer",
    empty ? "border-white/10 opacity-20" : "border-white/10 hover:border-nordic-gold",
    rarity === 'Rare' && "border-nordic-cyan/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
  )}>
    {icon}
  </div>
);
