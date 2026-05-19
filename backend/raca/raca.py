class Raca:
    def __init__(self, nome, poder, defesa, bonus_vida, esquiva):
        self.nome = nome
        self.poder = poder
        self.defesa = defesa
        self.bonus_vida = bonus_vida
        self.esquiva = esquiva

racas_dados = {
    "Humanos": {
        "Poder": 10,
        "Defesa": 5,
        "Esquiva": 1,
        "Bonus_Vida": 1
    },
    "Anões do Norte": {
        "Poder": 12,
        "Defesa": 10,
        "Esquiva": 3,
        "Bonus_Vida": 2
    },
    "Elfos Crepusculares": {
        "Poder": 12,
        "Defesa": 7,
        "Esquiva": 2,
        "Bonus_Vida": 2
    },
    "Jotunn": {
        "Poder": 20,
        "Defesa": 7,
        "Esquiva": 0,
        "Bonus_Vida": 2
    },
    "Draugr": {
        "Poder": 10,
        "Defesa": 15,
        "Esquiva": 1,
        "Bonus_Vida": 5
    },
    "Metamorfo": {
        "Poder": 15,
        "Defesa": 7,
        "Esquiva": 2,
        "Bonus_Vida": 1
    }
}

lista_racas = {}

for nome, dados in racas_dados.items():

    nova_raca = Raca(
        nome=nome, 
        poder=dados["Poder"], 
        defesa=dados["Defesa"], 
        bonus_vida=dados["Bonus_Vida"], 
        esquiva=dados["Esquiva"]
    )

    lista_racas[nome] = nova_raca