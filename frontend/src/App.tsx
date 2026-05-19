import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameState } from './types';

import { TelaInicial } from './components/game/TelaInicial';
import { CriacaoPersonagem } from './components/game/CriacaoPersonagem';
import { TelaExploracao } from './components/game/TelaExploracao';
import { TelaCombate } from './components/game/TelaCombate';
import { Eventos } from './components/game/Eventos';
import { Inventario } from './components/game/Inventario';
import { GameButton } from './components/ui/Botao';

import { motion } from 'framer-motion';
import { X, Sword, Shield, Wind, Heart, FlaskConical, Coins } from 'lucide-react';

const ItemStatus = ({ rotulo, valor, icone }: { rotulo: string; valor: string | number; icone: React.ReactNode }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-colors">
      <div className="text-nordic-cyan">{icone}</div>
      <span className="text-[10px] uppercase font-mono tracking-widest">{rotulo}</span>
    </div>
    <span className="font-display text-xl text-white">{valor}</span>
  </div>
);



export default function App() {
  const {
    estadoJogo,
    setEstadoJogo,
    personagem,
    regiaoAtual,
    inimigo,
    logs,
    inventario,
    eventoAtual,
    carregando,
    criarPersonagem,
    explorar,
    descansar,
    atacar,
    usarPocao,
    fugir,
    fecharEvento,
    interagirEvento,
    adicionarLog,
  } = useGameState();

  const executarAcaoHUD = (acao: 'explorar' | 'descansar' | 'inventario' | 'status') => {
    switch (acao) {
      case 'explorar':
        explorar();
        break;
      case 'descansar':
        descansar();
        break;
      case 'inventario':
        setEstadoJogo(GameState.INVENTARIO);
        break;
      case 'status':
        setEstadoJogo(GameState.STATUS);
        break;
    }
  };

  return (
    <main className="relative h-screen w-full bg-bento-bg text-[#e0e0e0] font-sans overflow-hidden flex flex-col border-[12px] border-bento-accent selection:bg-nordic-gold selection:text-black">
      <div className="bento-grid-dots" />

      {carregando && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-black/80 border border-nordic-gold/40 px-4 py-2 rounded text-[10px] uppercase tracking-widest text-nordic-gold">
          Consultando os destinos...
        </div>
      )}

      <div className="flex-1 relative overflow-auto">
        {estadoJogo === GameState.HOME && (
          <TelaInicial
            onNewGame={() => setEstadoJogo(GameState.CRIACAO_PERSONAGEM)}
            onContinue={() => {
              adicionarLog('Não há jornadas salvas. Iniciando nova saga.');
              setEstadoJogo(GameState.CRIACAO_PERSONAGEM);
            }}
          />
        )}

        {estadoJogo === GameState.CRIACAO_PERSONAGEM && (
          <CriacaoPersonagem onComplete={criarPersonagem} onBack={() => setEstadoJogo(GameState.HOME)} />
        )}

        {(estadoJogo === GameState.EXPLORACAO || estadoJogo === GameState.STATUS) && personagem && (
          <TelaExploracao personagem={personagem} regiao={regiaoAtual} logs={logs} onAction={executarAcaoHUD} />
        )}

        {estadoJogo === GameState.COMBATE && personagem && inimigo && (
          <TelaCombate personagem={personagem} inimigo={inimigo} logs={logs} onAttack={atacar} onPotion={usarPocao} onFlee={fugir} />
        )}

        {estadoJogo === GameState.EVENTO && eventoAtual && (
          <Eventos
            event={{ type: eventoAtual.tipo, description: eventoAtual.descricao }}
            onInteract={interagirEvento}
            onClose={fecharEvento}
          />
        )}

        {estadoJogo === GameState.INVENTARIO && (
          <Inventario items={inventario} onClose={() => setEstadoJogo(GameState.EXPLORACAO)} />
        )}

        {estadoJogo === GameState.MORTE && personagem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 text-center">
            <div className="max-w-xl bento-panel p-10">
              <h1 className="text-4xl font-display text-red-500 uppercase tracking-widest mb-4">
                Você morreu
              </h1>

              <p className="text-slate-300 mb-8">
                {personagem.nome} caiu em batalha. Sua saga chegou ao fim em Draugheim.
              </p>
              <div className="flex flex-col gap-4 w-full md:w-80">
                <GameButton
                  size="lg"
                  className=""
                  onClick={() => window.location.reload()}
                >
                  Iniciar Nova Saga
                </GameButton>
              </div>
            </div>
          </div>
        )}

        {estadoJogo === GameState.STATUS && personagem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bento-panel p-8 max-w-xl w-full relative">
              <button onClick={() => setEstadoJogo(GameState.EXPLORACAO)} className="absolute top-4 right-4 text-nordic-stone hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-display text-nordic-gold uppercase tracking-[0.2em]">{personagem.nome}</h2>
                <p className="text-nordic-cyan/60 font-mono text-[10px] uppercase tracking-widest mt-1">
                  {personagem.raca} • {personagem.classe} • Nível {personagem.nivel}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-display text-white border-b border-white/10 pb-2 uppercase tracking-widest">Atributos Primais</h3>
                  <div className="space-y-4">
                    <ItemStatus rotulo="Poder" valor={personagem.atributos.poder} icone={<Sword size={14} />} />
                    <ItemStatus rotulo="Defesa" valor={personagem.atributos.defesa} icone={<Shield size={14} />} />
                    <ItemStatus rotulo="Esquiva" valor={personagem.atributos.esquiva} icone={<Wind size={14} />} />
                    <ItemStatus rotulo="Vitalidade" valor={personagem.vidaMaxima} icone={<Heart size={14} />} />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-display text-white border-b border-white/10 pb-2 uppercase tracking-widest">Progressão</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase font-mono">
                        <span>Experiência</span>
                        <span>{personagem.experiencia}</span>
                      </div>
                      <div className="xp-bar-bg h-1.5"><div className="xp-bar-fill" style={{ width: `${Math.min(100, personagem.experiencia)}%` }} /></div>
                    </div>
                    <ItemStatus rotulo="Poções" valor={personagem.pocoes} icone={<FlaskConical size={14} />} />
                    <ItemStatus rotulo="Ouro Rúnico" valor="0" icone={<Coins size={14} />} />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <GameButton variant="secondary" size="md" onClick={() => setEstadoJogo(GameState.EXPLORACAO)}>Continuar Jornada</GameButton>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
