import React from 'react';
import { motion } from 'motion/react';
import { GameButton } from '../ui/Botao';
import { Swords } from 'lucide-react';

interface TelaInicialProps {
  onNewGame: () => void;
  onContinue: () => void;
}

export const TelaInicial: React.FC<TelaInicialProps> = ({ onNewGame, onContinue }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay scale-110 blur-[2px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center max-w-2xl w-full"
      >
        <div className="mb-12 relative">
          <motion.div
            animate={{ 
              filter: ['drop-shadow(0 0 10px #d4af37)', 'drop-shadow(0 0 20px #d4af37)', 'drop-shadow(0 0 10px #d4af37)'] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center gap-4 mb-2"
          >
            <Swords size={48} className="text-nordic-gold" />
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-[0.2em] text-white">
              DRAUGHEIM <span className="text-nordic-gold text-4xl align-middle"></span>
            </h1>
          </motion.div>
          <div className="h-px bg-gradient-to-r from-transparent via-nordic-gold to-transparent w-full mt-2" />
          <p className="text-center font-display text-nordic-blue uppercase tracking-[0.5em] text-sm mt-4 opacity-70">
            Legado das Runas Perdidas
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-80">
          <GameButton size="lg" className="w-full" onClick={onNewGame}>Iniciar Saga</GameButton>
          <GameButton size="md" variant="secondary" className="w-full" onClick={onContinue}>Continuar Caminhada</GameButton>
        </div>
      </motion.div>
    </div>
  );
};
