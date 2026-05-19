import math
from .entidades import Entidade
from sistema.progressao_de_level import calcular_exp_necessaria, evoluir_atributos

class Jogador(Entidade):
    def __init__(self, poder, defesa, vida_atual, vida_maxima, esquiva, energia, energia_maxima, exp, raca, vocacao, pocao, inventario, nome):
        super().__init__(poder, defesa, vida_atual, vida_maxima, esquiva, energia)
        self.raca = raca
        self.vocacao = vocacao
        self.pocao = pocao
        self.exp = max(0, exp)
        self.nome = nome
        self.nivel = 1
        self.energia_maxima = energia_maxima
        self.inventario = inventario

    def usar_pocao(self):
        if self.pocao > 0:
            self.vida_atual = min((self.vida_maxima // 2) + self.vida_atual, self.vida_maxima)
            self.pocao -= 1
            print(f"Você usou uma poção! Vida atual: {self.vida_atual}, Poções restantes: {self.pocao}")
        else:
            print("Você não tem poções para usar!")

    def ganhar_experiencia(self, quantidade):
        self.exp += quantidade
        self.verificar_level_up()

    def verificar_level_up(self):
        exp_necessaria = calcular_exp_necessaria(self.nivel)
        while self.exp >= exp_necessaria:
            self.exp -= exp_necessaria
            self.subir_de_nivel()
            exp_necessaria = calcular_exp_necessaria(self.nivel)

    def subir_de_nivel(self):
        self.nivel += 1
        evoluir_atributos(self)