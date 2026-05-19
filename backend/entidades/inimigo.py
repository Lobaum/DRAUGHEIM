from entidades.entidades import Entidade
import random

class Inimigo(Entidade):
    def __init__(self, nome, poder, defesa, vida_atual,vida_maxima, esquiva, energia, exp_recompensa, dificuldade):
        super().__init__(poder, defesa, vida_atual, vida_maxima, esquiva, energia)
        self.nome = nome
        self.exp_recompensa = exp_recompensa
        self.dificuldade = dificuldade

status_base = {
    "Fácil":   {"Poder": (5, 10), "Defesa": (5, 10), "Vida": (15, 30), "Esquiva": (0, 2), "Energia": (10, 20), "EXP": 50},
    "Médio":   {"Poder": (15, 25), "Defesa": (12, 18), "Vida": (45, 70), "Esquiva": (2, 5), "Energia": (20, 40), "EXP": 100},
    "Difícil": {"Poder": (30, 45), "Defesa": (20, 30), "Vida": (100, 180), "Esquiva": (4, 8), "Energia": (40, 60), "EXP": 200},
    "Boss":    {"Poder": (60, 100), "Defesa": (40, 60), "Vida": (400, 800), "Esquiva": (8, 15), "Energia": (100, 200), "EXP": 500}
}

inimigos = {
    "Asgard": {
        "Fácil": ["Einherjar", "Espírito Guerreiro", "Servo dos Aesir", "Guardião do Salão", "Corvo de Odin"],
        "Médio": ["Valquíria", "Campeão Aesir", "Sacerdote de Odin", "Guerreiro de Tyr", "Guardião da Bifrost"],
        "Difícil": ["Valquíria Comandante", "General Einherjar", "Avatar de Thor", "Arauto de Odin", "Executor Divino"],
        "Boss": ["Odin", "Thor", "Tyr", "Heimdall", "Baldr"]
    },
    "Midgard": {
        "Fácil": ["Draugr", "Berserker", "Bruxa Nórdica", "Espírito Vingativo", "Lobo Amaldiçoado"],
        "Médio": ["Draugr Guerreiro", "Troll Errante", "Hamrammr", "Líder Berserker", "Feiticeiro Seiðr"],
        "Difícil": ["Draugr Rei", "Troll Ancestral", "Gigante Errante", "Necromante Nórdico", "Campeão Amaldiçoado"],
        "Boss": ["Fenrir", "Jormungandr", "Loki", "Rei Draugr Supremo", "Espírito Primordial Humano"]
    },
    "Jotunheim": {
        "Fácil": ["Gigante Menor", "Servo Jotun", "Espírito da Montanha", "Lobo Gigante", "Caçador de Gelo"],
        "Médio": ["Gigante de Gelo", "Xamã Jotun", "Ogro Rúnico", "Espírito do Inverno", "Caçador Colossal"],
        "Difícil": ["Gigante Ancião", "Guerreiro Rúnico", "Titã do Gelo", "Colosso da Montanha", "Guardião de Utgard"],
        "Boss": ["Thrym", "Skadi", "Hrungnir", "Utgard-Loki", "Ymir"]
    },
    "Muspelheim": {
        "Fácil": ["Espírito de Fogo", "Guerreiro Ígneo", "Salamandra Mítica", "Demônio Flamejante", "Lâmina Viva"],
        "Médio": ["Elemental de Fogo", "Gigante Ígneo", "Senhor das Cinzas", "General Flamejante", "Guerreiro de Magma"],
        "Difícil": ["Colosso de Lava", "Titã Flamejante", "Arauto da Destruição", "Guardião da Chama", "Incendiário Primordial"],
        "Boss": ["Surtr", "Logi", "Sinmara", "Titã Vulcânico", "Espírito do Ragnarök"]
    },
    "Niflheim": {
        "Fácil": ["Espírito da Névoa", "Morto Congelado", "Parasita do Frio", "Golem de Gelo", "Alma Perdida"],
        "Médio": ["Guerreiro Glacial", "Demônio da Bruma", "Serpente de Gelo", "Guardião Congelado", "Predador Espectral"],
        "Difícil": ["Titã da Névoa", "Espírito Ancestral do Frio", "Colosso Congelado", "Arauto do Vazio", "Lobo Espectral"],
        "Boss": ["Nidhogg", "Hel", "Dragão Glacial Primordial", "Espírito da Morte Eterna", "Guardião da Raiz de Yggdrasil"]
    },
    "Helheim": {
        "Fácil": ["Morto Errante", "Alma Chorosa", "Esqueleto Nórdico", "Guardião da Tumba", "Espírito Frágil"],
        "Médio": ["Draugr Sombrio", "Espectro Vingativo", "Ceifador Menor", "Guerreiro Amaldiçoado", "Alma Deformada"],
        "Difícil": ["Senhor dos Mortos", "Titã Necromante", "Arauto de Hel", "Espírito Colossal", "Lich Nórdico"],
        "Boss": ["Garmr", "Hel", "Draugr Ancestral Supremo", "Ceifador Primordial", "Guardião do Portal Final"]
    },
    "Vanaheim": {
        "Fácil": ["Espírito da Floresta", "Guerreiro Vanir", "Animal Místico", "Druida Menor", "Espírito da Fertilidade"],
        "Médio": ["Xamã Vanir", "Guardião da Natureza", "Espírito das Águas", "Fera Sagrada", "Campeão Tribal"],
        "Difícil": ["Avatar da Fertilidade", "Senhor das Marés", "Espírito Primordial Natural", "Colosso da Floresta", "Guerreiro Sagrado"],
        "Boss": ["Freyr", "Freyja", "Njord", "Espírito Supremo Natural", "Avatar da Prosperidade"]
    },
    "Alfheim": {
        "Fácil": ["Elfo da Luz", "Arqueiro Élfico", "Espírito Brilhante", "Guardião Menor", "Fada Nórdica"],
        "Médio": ["Capitão Élfico", "Mago da Luz", "Guerreiro Solar", "Invocador Luminoso", "Espírito Purificador"],
        "Difícil": ["Senhor da Luz", "Avatar Solar", "Colosso Radiante", "Espírito Supremo", "Guardião Celestial"],
        "Boss": ["Frey", "Rei dos Elfos da Luz", "Espírito Solar Primordial", "Guardião Supremo", "Avatar da Aurora"]
    },
    "Svartalfheim": {
        "Fácil": ["Anão Guerreiro", "Artesão Rúnico", "Guardião da Forja", "Servo Subterrâneo", "Criatura Mecânica"],
        "Médio": ["Mestre Ferreiro", "Golem Rúnico", "Engenheiro Bélico", "Capitão Subterrâneo", "Invocador Mineral"],
        "Difícil": ["Senhor das Runas", "Colosso de Metal", "Forjador Lendário", "Titã Mecânico", "Guardião de Artefato Divino"],
        "Boss": ["Brokkr", "Sindri", "Mestre Supremo das Forjas", "Titã das Runas", "Criador de Armas Divinas"]
    }
}

bichos = {}

id_atual = 1

for reino, dificuldades in inimigos.items():
    for dificuldade, lista_nomes in dificuldades.items():
        for nome in lista_nomes:
            dados_inimigo = status_base[dificuldade].copy()
            dados_inimigo["Reino"] = reino
            dados_inimigo["Dificuldade"] = dificuldade
            dados_inimigo["Nome"] = nome
            bichos[id_atual] = dados_inimigo
            id_atual += 1

def spawn_inimigo(id_inimigo):
    molde = bichos.get(id_inimigo)
    
    if not molde:
        return None

    vida_rolada = random.randint(*molde['Vida'])

    inimigo_gerado = Inimigo(
        nome=molde['Nome'],
        poder=random.randint(*molde['Poder']),
        defesa=random.randint(*molde['Defesa']),
        vida_atual=vida_rolada,
        vida_maxima=vida_rolada,
        esquiva=random.randint(*molde['Esquiva']),
        energia=random.randint(*molde['Energia']),
        exp_recompensa=molde['EXP'],
        dificuldade=molde['Dificuldade']
    )
    return inimigo_gerado

def spawn_inimigo_por_nivel(nivel_jogador):
    if nivel_jogador < 5:
        dificuldade = "Fácil"
    elif nivel_jogador < 10:
        dificuldade = "Médio"
    elif nivel_jogador < 20:
        dificuldade = "Difícil"
    else:
        dificuldade ="Boss"

    ids_validos = [id_key for id_key, info in bichos.items() if info["Dificuldade"] == dificuldade]
    return spawn_inimigo(random.choice(ids_validos))