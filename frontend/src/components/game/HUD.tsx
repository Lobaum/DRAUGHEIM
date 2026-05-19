import React from 'react';
import { cn } from '../../lib/utils';
import {
  Heart,
  Zap,
  Shield,
  Sword,
  MapPin,
  Backpack,
  User as UserIcon,
  Search,
  BedDouble,
  ChevronUp
} from 'lucide-react';
import { Personagem } from '../../types';

interface HUDProps {
  personagem: Personagem;
  regiao: string;
  onAction: (action: 'explorar' | 'descansar' | 'inventario' | 'status') => void;
}

export const HUD: React.FC<HUDProps> = ({ personagem, regiao, onAction }) => {
  const vidaPercent = (personagem.vida / personagem.vidaMaxima) * 100;
  const energiaPercent = (personagem.energia / personagem.energiaMaxima) * 100;
  const xpPercent = (personagem.experiencia / (personagem.nivel * 100)) * 100;

  return (
    <header className="h-16 bg-bento-panel border-b-2 border-nordic-gold/30 flex items-center justify-between px-6 z-40 fixed top-0 left-0 w-full">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-nordic-gold">Região Atual</span>
          <span className="text-sm font-serif italic text-cyan-100">{regiao}</span>
        </div>
        <div className="h-8 w-[2px] bg-white/10 hidden md:block"></div>
        <div className="hidden md:flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-nordic-cyan">Progresso de Nível</span>
          <div className="w-48 h-2 bg-black mt-1 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{ width: `${xpPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="text-center hidden lg:block">
        <h1 className="text-xl font-black tracking-tighter text-white uppercase">DRAUGHEIM</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end mr-2">
          <span className="text-[10px] uppercase tracking-widest text-red-400">Vida</span>
          <div className="w-24 h-1.5 health-bar-bg mt-0.5">
            <div className="health-bar-fill" style={{ width: `${vidaPercent}%` }} />
          </div>
        </div>

        <div className="flex gap-1">
          <ActionButton icon={<Search size={16} />} label="Explorar" onClick={() => onAction('explorar')} primary />
          <ActionButton icon={<Backpack size={16} />} label="Mochila" onClick={() => onAction('inventario')} />
          <ActionButton icon={<UserIcon size={16} />} label="Status" onClick={() => onAction('status')} />
        </div>
      </div>
    </header>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; primary?: boolean }> = ({
  icon, label, onClick, primary
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border",
      primary
        ? "border-nordic-gold bg-nordic-gold/10 text-nordic-gold hover:bg-nordic-gold"
        : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
    )}
    title={label}
  >
    {icon}
  </button>
);
