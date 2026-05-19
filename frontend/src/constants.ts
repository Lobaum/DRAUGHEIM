import { Raca, Classe, Atributos } from './types';

export const DADOS_RACAS: Record<Raca, Atributos> = {
  [Raca.HUMANOS]: { poder: 10, defesa: 5, esquiva: 1, bonusVida: 1 },
  [Raca.ANOES_DO_NORTE]: { poder: 12, defesa: 10, esquiva: 3, bonusVida: 2 },
  [Raca.ELFOS_CREPUCULARES]: { poder: 12, defesa: 7, esquiva: 2, bonusVida: 2 },
  [Raca.JOTUNN]: { poder: 20, defesa: 7, esquiva: 0, bonusVida: 2 },
  [Raca.DRAUGR]: { poder: 10, defesa: 15, esquiva: 1, bonusVida: 5 },
  [Raca.METAMORFO]: { poder: 15, defesa: 7, esquiva: 2, bonusVida: 1 },
};

export const DADOS_CLASSES: Record<Classe, { vidaBase: number; vidaPorNivel: number; energiaPorNivel: number }> = {
  [Classe.QUEBRA_ESCUDOS]: { vidaBase: 14, vidaPorNivel: 4, energiaPorNivel: 3 },
  [Classe.TECELAO_DE_RUNAS]: { vidaBase: 10, vidaPorNivel: 3, energiaPorNivel: 5 },
  [Classe.CAMINHANTE_DA_NEVOA]: { vidaBase: 12, vidaPorNivel: 3, energiaPorNivel: 4 },
  [Classe.CACADOR_DE_FERAS]: { vidaBase: 13, vidaPorNivel: 4, energiaPorNivel: 3 },
  [Classe.PORTADOR_DE_PRESSAGIOS]: { vidaBase: 9, vidaPorNivel: 3, energiaPorNivel: 6 },
  [Classe.FORJADOR]: { vidaBase: 13, vidaPorNivel: 4, energiaPorNivel: 4 },
  [Classe.ERRANTE]: { vidaBase: 12, vidaPorNivel: 3, energiaPorNivel: 4 },
  [Classe.GUARDIAO]: { vidaBase: 16, vidaPorNivel: 5, energiaPorNivel: 3 },
  [Classe.GLACIAL]: { vidaBase: 13, vidaPorNivel: 4, energiaPorNivel: 4 },
  [Classe.VIGIA]: { vidaBase: 11, vidaPorNivel: 3, energiaPorNivel: 5 },
  [Classe.DETONADOR]: { vidaBase: 15, vidaPorNivel: 2, energiaPorNivel: 3 },
};

export const REGIOES = ['Asgard'];