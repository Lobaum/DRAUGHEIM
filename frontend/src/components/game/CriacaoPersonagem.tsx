import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Raca, Classe } from '../../types';
import { DADOS_RACAS, DADOS_CLASSES } from '../../constants';
import { GameButton } from '../ui/Botao';
import { CardRunico } from '../ui/CardRunico';
import { User, Shield, Zap, Heart, Sword } from 'lucide-react';

interface CriacaoPersonagemProps {
  onComplete: (name: string, race: Raca, charClass: Classe) => void;
  onBack: () => void;
}

export const CriacaoPersonagem: React.FC<CriacaoPersonagemProps> = ({ onComplete, onBack }) => {
  const [name, setName] = useState('');
  const [selectedRace, setSelectedRace] = useState<Raca>(Raca.HUMANOS);
  const [selectedClass, setSelectedClass] = useState<Classe>(Classe.QUEBRA_ESCUDOS);

  const dadosRaca = DADOS_RACAS[selectedRace];
  const dadosClasse = DADOS_CLASSES[selectedClass];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 max-w-7xl mx-auto overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <h2 className="text-4xl font-display text-white uppercase tracking-wider mb-2">Forjar Herói</h2>
        <p className="text-nordic-cyan/60 font-mono text-xs uppercase tracking-widest">A linhagem define o destino, a classe define a glória.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <section className="glass-panel p-6 runic-border">
            <label className="flex items-center gap-2 text-xs font-mono uppercase text-nordic-gold mb-3 tracking-widest">
              <User size={14} /> Nome do Viajante
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full bg-black/50 border border-white/10 p-4 text-xl font-display text-white focus:border-nordic-gold outline-none transition-all"
            />
          </section>

          <section>
            <h3 className="text-sm font-display text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-nordic-gold/50" /> Escolha sua Raça
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.values(Raca).map((race) => (
                <CardRunico
                  key={race}
                  title={race}
                  selected={selectedRace === race}
                  onClick={() => setSelectedRace(race)}
                  attributes={{
                    Poder: DADOS_RACAS[race].poder,
                    Defesa: DADOS_RACAS[race].defesa,
                    Esquiva: DADOS_RACAS[race].esquiva,
                    Vida: `+${DADOS_RACAS[race].bonusVida}`,
                  }}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-display text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-nordic-gold/50" /> Escolha sua Vocação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.values(Classe).map((c) => (
                <CardRunico
                  key={c}
                  title={c}
                  subtitle={`PV Base: ${DADOS_CLASSES[c].vidaBase}`}
                  selected={selectedClass === c}
                  onClick={() => setSelectedClass(c)}
                  attributes={{
                    'PV/LV': DADOS_CLASSES[c].vidaPorNivel,
                    'PE/LV': DADOS_CLASSES[c].energiaPorNivel,
                  }}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 glass-panel p-8 runic-border flex flex-col gap-6">
            <div className="text-center pb-6 border-b border-white/10">
              <p className="text-[10px] font-mono text-nordic-stone uppercase mb-1">Prévia do Personagem</p>
              <h3 className="text-2xl font-display text-nordic-gold uppercase tracking-tighter">{name || 'Anônimo'}</h3>
              <p className="text-xs text-nordic-cyan opacity-70 uppercase tracking-widest">{selectedRace} • {selectedClass}</p>
            </div>

            <div className="flex flex-col gap-4">
              <AttrRow icon={<Heart size={14} />} label="Vida Máxima" value={(dadosClasse.vidaBase + dadosRaca.bonusVida).toString()} />
              <AttrRow icon={<Sword size={14} />} label="Poder" value={dadosRaca.poder.toString()} />
              <AttrRow icon={<Shield size={14} />} label="Defesa" value={dadosRaca.defesa.toString()} />
              <AttrRow icon={<Zap size={14} />} label="Esquiva" value={dadosRaca.esquiva.toString()} />
            </div>

            <div className="pt-6 mt-auto flex flex-col gap-3">
              <GameButton size="lg" className="w-full" onClick={() => onComplete(name || 'Guerreiro', selectedRace, selectedClass)}>
                Iniciar Jornada
              </GameButton>
              <GameButton variant="secondary" className="w-full" onClick={onBack}>Voltar</GameButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const AttrRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
      <div className="text-nordic-cyan">{icon}</div>
      <span className="text-[10px] uppercase font-mono tracking-widest">{label}</span>
    </div>
    <span className="font-display text-xl text-white">{value}</span>
  </div>
);
