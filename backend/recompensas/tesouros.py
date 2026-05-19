from sistema.dados import rolar_d20, rolar_d6
import random

def bau_aleatorio():
    chances = [
    {"raridade": "Comum", "dificuldade": 7},
    {"raridade": "Raro", "dificuldade": 14},
    {"raridade": "Épico", "dificuldade": 18},
    {"raridade": "Lendário", "dificuldade": 20}
]
    aleatoriedade = random.choice(chances)

    return Bau(raridade=aleatoriedade["raridade"], dificuldade=aleatoriedade["dificuldade"])

class Bau:
    def __init__(self, raridade, dificuldade):
        self.raridade = raridade
        self.dificuldade = dificuldade
        self.tentativas_restantes = 3
        self.esta_aberto = False
        self.foi_trancando = False
        self.tesouros = ["Moedas de Ouro", "Runa de Proteção", "Poção de Hidromel", "Gema da Alma"]

    def tentar_abrir(self, personagem):
        print(f"\nVocê encontrou um Baú {self.raridade} (Dificuldade: {self.dificuldade})")
        
        if self.foi_trancando:
            print("A fechadura está entupida com pedaços de sua chave quebrada. Ele não abrirá mais.")
            return

        while self.tentativas_restantes > 0 and not self.esta_aberto:
            print(f"Tentativas: {self.tentativas_restantes}")
            opcao = input("Pressione [Enter] para usar chave rúnica ou [S] para sair: ").upper()
            
            if opcao == 'S': break

            d20 = rolar_d20()
            total = d20 
            
            print(f"Rolagem: {d20} (Total: {total})")

            if total >= self.dificuldade:
                self.esta_aberto = True
                item_ganho = random.choice(self.tesouros)
                print(f"CLACK! O baú abriu! Você encontrou: [{item_ganho}]!")
            else:
                self.tentativas_restantes -= 1
                print("Falha! A chave entortou.")

        if self.tentativas_restantes <= 0 and not self.esta_aberto:
            self.foi_violado = True
            print("O mecanismo de tranca quebrou permanentemente!")


class AltarDeGelo:
    def __init__(self):
        self.nome = "Altar de Runas Primordiais"
        self.dificuldade = 15
        self.instabilidade = 0
        self.finalizado = False

    def iniciar_evento(self, aventureiro):
        print(f"\nVOCÊ SE APROXIMA DE UM: {self.nome}")
        print("As runas pulsam. Você pode tentar extrair poder ou recuar.")

        while self.instabilidade < 3 and not self.finalizado:
            print(f"\n[Instabilidade Atual: {self.instabilidade}/3]")
            escolha = input("Deseja: [1] Decifrar Runa | [2] Afastar-se: ")

            if escolha == "2":
                print("Você sentiu o perigo e decidiu recuar.")
                break

            d20 = rolar_d20()
            bonus = 4 if aventureiro.vocacao == "Tecelão de Runas" else 0
            total = d20 + bonus

            print(f"Rolagem: {d20} + Bônus: {bonus} = Total: {total}")

            if total >= self.dificuldade:
                print("SUCESSO! Uma aura azul te envolve. (+2 de Poder)")
                aventureiro.poder += 2
                self.finalizado = True
            else:
                self.instabilidade += 1
                print("FALHA! O gelo ao redor do altar começa a rachar...")

        if self.instabilidade >= 3:
            print("O ALTAR EXPLODIU EM ENERGIA SOMBRIA!")
            dano = rolar_d6()
            print(f"A explosão causa {dano} de dano!")
            aventureiro.receber_dano(dano)
            self.finalizado = True

