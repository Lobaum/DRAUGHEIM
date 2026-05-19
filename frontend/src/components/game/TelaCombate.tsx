import React from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../ui/Botao';
import { CombatLog, CombatLogEntry } from './LogsCombate';
import { Inimigo, Personagem } from '../../types';
import { Heart, Shield, Swords, Zap, FlaskConical, Wind } from 'lucide-react';

interface TelaCombateProps {
   personagem: Personagem;
   inimigo: Inimigo;
   logs: CombatLogEntry[];
   onAttack: () => void;
   onPotion: () => void;
   onFlee: () => void;
}

export const TelaCombate: React.FC<TelaCombateProps> = ({
   personagem,
   inimigo,
   logs,
   onAttack,
   onPotion,
   onFlee
}) => {
   const vidaPercent = (personagem.vida / personagem.vidaMaxima) * 100;
   const inimigovidaPercent = (inimigo.vida / inimigo.vidaMax) * 100;

   return (
      <div className="min-h-screen bg-bento-bg flex flex-col">
         <header className="h-16 bg-bento-panel border-b-2 border-red-500/30 flex items-center justify-between px-6 z-40 fixed top-0 left-0 w-full">
            <div className="flex flex-col">
               <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Estado: Em Combate</span>
               <span className="text-sm font-serif italic text-white">{inimigo.nome} Desafiou Você</span>
            </div>
            <div className="text-center hidden md:block">
               <h2 className="text-xl font-black text-white uppercase italic">Saga de Sangue</h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Turno</span>
                  <span className="text-nordic-gold font-mono font-bold">Herói</span>
               </div>
            </div>
         </header>

         <main className="flex-1 grid grid-cols-12 gap-3 p-3 pt-20">
            <div className="col-span-3 bento-panel p-4 flex flex-col gap-6">
               <div className="aspect-square bg-gradient-to-b from-bento-accent to-black rounded-lg border border-nordic-cyan/20 flex items-center justify-center relative overflow-hidden">
                  <Swords size={64} className="text-nordic-cyan opacity-20" />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60 backdrop-blur-sm text-center">
                     <span className="text-[10px] font-bold text-white uppercase tracking-widest">{personagem.nome}</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-1">
                     <div className="flex justify-between text-[10px] uppercase text-red-400 font-bold"><span>Sua Vida</span><span>{personagem.vida}/{personagem.vidaMaxima}</span></div>
                     <div className="health-bar-bg h-3"><div className="health-bar-fill" style={{ width: `${vidaPercent}%` }} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                     <div className="bg-black/40 p-2 rounded border border-white/5">
                        <span className="block opacity-40">DEFINIÇÃO</span>
                        <span className="text-white font-bold">{personagem.atributos.defesa} DEF</span>
                     </div>
                     <div className="bg-black/40 p-2 rounded border border-white/5">
                        <span className="block opacity-40">ESQUIVA</span>
                        <span className="text-nordic-cyan font-bold">{personagem.atributos.esquiva} ESQ</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-span-6 flex flex-col gap-3">
               <div className="flex-1 bento-panel bg-bento-accent relative overflow-hidden flex flex-col border-2 border-red-500/20">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #1c1c22 10px, #1c1c22 20px)' }}></div>

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="p-4 flex justify-between items-start">
                        <div className="px-3 py-1 bg-black/60 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest">Duelo Ativo</div>
                        <div className="text-right">
                           <h2 className="text-xl font-serif text-white tracking-wide">{inimigo.nome}</h2>
                           <div className="w-48 h-2 bg-black rounded-full mt-2 ml-auto overflow-hidden border border-white/10">
                              <div className="h-full bg-red-600" style={{ width: `${inimigovidaPercent}%` }}></div>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 flex items-center justify-around px-8">
                        <motion.div animate={{ x: [0, 5, 0] }} className="text-8xl drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">🛡️</motion.div>
                        <div className="flex flex-col items-center">
                           <div className="w-20 h-20 bg-white/5 border-2 border-nordic-gold rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                              <span className="-rotate-45 text-3xl font-serif font-bold text-nordic-gold">V</span>
                           </div>
                           <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/40">Versus</span>
                        </div>
                        <motion.div animate={{ x: [0, -5, 0] }} className="text-8xl drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">⚔️</motion.div>
                     </div>

                     <div className="p-6 flex justify-center gap-4">
                        <GameButton size="lg" className="w-48" onClick={onAttack}>Atacar (D20)</GameButton>
                        <GameButton variant="secondary" className="w-48" onClick={onPotion}>Usar Poção</GameButton>
                        <GameButton variant="danger" className="w-32" onClick={onFlee}>Fugir</GameButton>
                     </div>
                  </div>
               </div>

               <div className="h-20 bento-panel flex items-center justify-around px-8">
                  <div className="flex flex-col items-center gap-1">
                     <FlaskConical className="text-red-400" size={20} />
                     <span className="text-[10px] uppercase font-bold text-white/40">Poções ({personagem.pocoes})</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex flex-col items-center gap-1">
                     <Shield className="text-nordic-cyan" size={20} />
                     <span className="text-[10px] uppercase font-bold text-white/40">Defesa Ativa</span>
                  </div>
               </div>
            </div>
            <div className="col-span-3 bento-panel p-3 flex flex-col gap-3">
               <h3 className="text-[10px] uppercase tracking-widest text-nordic-gold mb-1 border-b border-white/10 pb-1">Relatório de Batalha</h3>
               <div className="flex-1 overflow-hidden">
                  <CombatLog logs={logs} />
               </div>

               <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-3 mt-auto">
                  <h4 className="text-[10px] uppercase text-white/40 font-bold border-b border-white/5 pb-1">Previsão D20</h4>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-nordic-cyan">Bônus de Ataque</span>
                     <span className="text-lg font-bold">+{personagem.nivel + 2}</span>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};
