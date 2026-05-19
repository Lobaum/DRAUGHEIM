export enum Raca {
  HUMANOS = 'Humanos',
  ANOES_DO_NORTE = 'Anões do Norte',
  ELFOS_CREPUCULARES = 'Elfos Crepusculares',
  JOTUNN = 'Jotunn',
  DRAUGR = 'Draugr',
  METAMORFO = 'Metamorfo',
}

export enum Classe {
  QUEBRA_ESCUDOS = 'Quebra-Escudos',
  TECELAO_DE_RUNAS = 'Tecelão de Runas',
  CAMINHANTE_DA_NEVOA = 'Caminhante da Névoa',
  CACADOR_DE_FERAS = 'Caçador de Feras',
  PORTADOR_DE_PRESSAGIOS = 'Portador de Presságios',
  FORJADOR = 'Forjador',
  ERRANTE = 'Errante',
  GUARDIAO = 'Guardião',
  GLACIAL = 'Glacial',
  VIGIA = 'Vigia',
  DETONADOR = 'Detonador',
}

export enum GameState {
  HOME = 'HOME',
  CRIACAO_PERSONAGEM = 'CRIACAO_PERSONAGEM',
  EXPLORACAO = 'EXPLORACAO',
  COMBATE = 'COMBATE',
  EVENTO = 'EVENTO',
  INVENTARIO = 'INVENTARIO',
  STATUS = 'STATUS',
  MORTE = 'MORTE',
}

export enum EVENTOType {
  BAU = 'Baú',
  ALTAR = 'Altar Mágico',
  EVENTO = 'Evento Especial',
  LOOT = 'Recompensa',
}

export interface Atributos {
  poder: number;
  defesa: number;
  esquiva: number;
  bonusVida: number;
}

export interface Personagem {
  nome: string;
  raca: Raca | string;
  classe: Classe | string;
  nivel: number;
  experiencia: number;
  vida: number;
  vidaMaxima: number;
  energia: number;
  energiaMaxima: number;
  pocoes: number;
  atributos: Atributos;
}

export interface Inimigo {
  nome: string;
  vida: number;
  vidaMax: number;
  nivel: number;
  regiao: string;
  image?: string;
}

export interface INVENTARIOItem {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'Item' | 'Consumível' | 'Equipamento' | 'Runa';
  raridade: 'Comum' | 'Raro' | 'Epico' | 'Lendario';
  icon?: string;
}

export interface CombatLogEntry {
  id: string;
  message: string;
  type: 'damage' | 'heal' | 'info' | 'critical' | 'miss';
}

export interface ApiCharacter {
  name: string;
  race: string;
  charClass: string;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  potions: number;
  attributes: {
  power: number;
  defense: number;
  evasion: number;
  lifeBonus: number;
  };
}

export interface ApiEnemy {
  name: string;
  hp: number;
  maxHp: number;
  level: number;
  region: string;
}
