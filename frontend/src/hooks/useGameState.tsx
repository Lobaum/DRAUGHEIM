import { useState, useCallback } from 'react';

import {
  GameState,
  Raca,
  Classe,
  INVENTARIOItem,
  EVENTOType,
  Personagem,
  Inimigo,
  ApiCharacter,
  ApiEnemy,
  CombatLogEntry,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type ApiState = 'EXPLORATION' | 'COMBAT' | 'EVENT' | 'DEAD';

type ApiResponse = {
  state?: ApiState;
  character?: ApiCharacter;
  enemy?: ApiEnemy | null;
  region?: string;
  logs?: string[];
  event?: {
    type: string;
    description: string;
  };
  error?: string;
};

const gerarId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const tipoLog = (mensagem: string): CombatLogEntry['type'] => {
  const msg = mensagem.toLowerCase();
  if (msg.includes('derrotou') || msg.includes('crítico')) return 'critical';
  if (msg.includes('poção') || msg.includes('recuper')) return 'heal';
  if (msg.includes('falh') || msg.includes('esquiv')) return 'miss';
  if (msg.includes('atac') || msg.includes('dano') || msg.includes('combate')) return 'damage';
  return 'info';
};

const logsApiParaTela = (logs?: string[]): CombatLogEntry[] =>
  (logs || []).slice(-50).map((message, index) => ({
    id: `${index}-${message}`,
    message,
    type: tipoLog(message),
  }));

const personagemApiParaTela = (character: ApiCharacter): Personagem => ({
  nome: character.name,
  raca: character.race,
  classe: character.charClass,
  nivel: character.level,
  experiencia: character.xp,
  vida: character.hp,
  vidaMaxima: character.maxHp,
  energia: character.energy,
  energiaMaxima: character.maxEnergy,
  pocoes: character.potions,
  atributos: {
    poder: character.attributes.power,
    defesa: character.attributes.defense,
    esquiva: character.attributes.evasion,
    bonusVida: character.attributes.lifeBonus,
  },
});

const inimigoApiParaTela = (enemy?: ApiEnemy | null): Inimigo | null => {
  if (!enemy) return null;
  return {
    nome: enemy.name,
    vida: enemy.hp,
    vidaMax: enemy.maxHp,
    nivel: enemy.level,
    regiao: enemy.region,
  };
};

const estadoApiParaTela = (state?: ApiState): GameState => {
  if (state === 'COMBAT') return GameState.COMBATE;
  if (state === 'EVENT') return GameState.EVENTO;
  if (state === 'DEAD') return GameState.MORTE;
  return GameState.EXPLORACAO;
};

export const useGameState = () => {
  const [estadoJogo, setEstadoJogo] = useState<GameState>(GameState.HOME);
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const [regiaoAtual, setRegiaoAtual] = useState('Asgard');
  const [inimigo, setInimigo] = useState<Inimigo | null>(null);
  const [logs, setLogs] = useState<CombatLogEntry[]>([]);
  const [inventario] = useState<INVENTARIOItem[]>([]);
  const [eventoAtual, setEventoAtual] = useState<{ tipo: EVENTOType; descricao: string } | null>(null);
  const [carregando, setCarregando] = useState(false);

  const adicionarLog = useCallback((mensagem: string, tipo: CombatLogEntry['type'] = 'info') => {
    setLogs((anterior) => [...anterior, { id: gerarId(), message: mensagem, type: tipo }].slice(-50));
  }, []);

  const aplicarRespostaApi = useCallback((data: ApiResponse) => {
    if (data.error) {
      adicionarLog(data.error, 'miss');
      return;
    }

    if (data.character) setPersonagem(personagemApiParaTela(data.character));
    if (data.enemy !== undefined) setInimigo(inimigoApiParaTela(data.enemy));
    if (data.region) setRegiaoAtual(data.region);
    if (data.logs) setLogs(logsApiParaTela(data.logs));

    if (data.event) {
      setEventoAtual({
        tipo: EVENTOType.EVENTO,
        descricao: data.event.description,
      });
    } else if (data.state !== 'EVENT') {
      setEventoAtual(null);
    }

    if (data.state) setEstadoJogo(estadoApiParaTela(data.state));
  }, [adicionarLog]);

  const chamarApi = useCallback(async (endpoint: string, options?: RequestInit) => {
    setCarregando(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
        ...options,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.detail || data?.error || 'Erro na comunicação com o servidor.');
      aplicarRespostaApi(data);
      return data as ApiResponse;
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido ao chamar a API.';
      adicionarLog(mensagem, 'miss');
      throw error;
    } finally {
      setCarregando(false);
    }
  }, [adicionarLog, aplicarRespostaApi]);

  const criarPersonagem = useCallback(async (nome: string, raca: Raca, classe: Classe) => {
    const data = await chamarApi('/character', {
      body: JSON.stringify({ nome, raca, vocacao: classe }),
    });
    if (!data.state) setEstadoJogo(GameState.EXPLORACAO);
  }, [chamarApi]);

  const explorar = useCallback(async () => {
    await chamarApi('/explore');
  }, [chamarApi]);

  const descansar = useCallback(async () => {
    await chamarApi('/rest');
  }, [chamarApi]);

  const fecharEvento = useCallback(() => {
    setEstadoJogo(GameState.EXPLORACAO);
    setEventoAtual(null);
  }, []);

  const interagirEvento = useCallback(async () => {
    await chamarApi('/event/interact');
  }, [chamarApi]);

  const atacar = useCallback(async () => {
    await chamarApi('/combat/attack');
  }, [chamarApi]);

  const usarPocao = useCallback(async () => {
    await chamarApi('/combat/potion');
  }, [chamarApi]);

  const fugir = useCallback(async () => {
    await chamarApi('/combat/flee');
  }, [chamarApi]);

  return {
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
  };
};
