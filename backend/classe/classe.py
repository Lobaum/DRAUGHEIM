class Vocacao:
    def __init__(self, nome, pv_base, pv_por_nivel, pe_por_nivel):
        self.nome = nome
        self.pv_base = pv_base
        self.pv_por_nivel = pv_por_nivel
        self.pe_por_nivel = pe_por_nivel

classes_dados = {
    "Quebra-Escudos": {"pv_base": 14, "pv_por_nivel": 4, "pe_por_nivel": 3},
    "Tecelão de Runas": {"pv_base": 10, "pv_por_nivel": 3, "pe_por_nivel": 5},
    "Caminhante da Névoa": {"pv_base": 12, "pv_por_nivel": 3, "pe_por_nivel": 4},
    "Caçador de Feras": {"pv_base": 13, "pv_por_nivel": 4, "pe_por_nivel": 3},
    "Portador de Presságios": {"pv_base": 9, "pv_por_nivel": 3, "pe_por_nivel": 6},
    "Forjador": {"pv_base": 13, "pv_por_nivel": 4, "pe_por_nivel": 4},
    "Errante": {"pv_base": 12, "pv_por_nivel": 3, "pe_por_nivel": 4},
    "Guardião": {"pv_base": 16, "pv_por_nivel": 5, "pe_por_nivel": 3},
    "Glacial": {"pv_base": 13, "pv_por_nivel": 4, "pe_por_nivel": 4},
    "Vigia": {"pv_base": 11, "pv_por_nivel": 3, "pe_por_nivel": 5},
    "Detonador": {"pv_base": 15, "pv_por_nivel": 2, "pe_por_nivel": 3},
}

lista_classes = {}

for nome, dados in classes_dados.items():
    nova_classe = Vocacao(
        nome=nome,
        pv_base=dados["pv_base"],
        pv_por_nivel=dados["pv_por_nivel"],
        pe_por_nivel=dados["pe_por_nivel"]
    )
    lista_classes[nome] = nova_classe