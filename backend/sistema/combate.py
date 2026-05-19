from entidades.jogador import Jogador
from entidades.inimigo import Inimigo, inimigos
from sistema.dados import rolar_d20
import random


def iniciar_combate(jogador, inimigo):
    while jogador.vivo() and inimigo.vivo():
        print("Seu turno!")
        print("1. Atacar")
        print("2. Usar Poção")
        print("3. Fugir")
        escolha = input("Escolha uma opção: ")
        if escolha == "1":
            print("\nVocê atacou o inimigo!")
            jogador.atacar(inimigo)
        elif escolha == "2":
            jogador.usar_pocao()
            if jogador.pocao == 0:
                continue
        elif escolha == "3":
            d20 = rolar_d20()
            print(f"D20 = {d20}")
            if d20 + jogador.esquiva >= 15:
                print(f"Você Fugiu")
                return
            else:
                print(f"Você tentou fugir, mas o inimigo foi mais ligeiro")
        else:
            print("Opção inválida!")
            continue
        if inimigo.vivo():
            print("\nTurno do inimigo!")
            inimigo.atacar(jogador)
            print(f"{inimigo.nome} te atacou!")
    
    if jogador.vivo() and not inimigo.vivo():
        print("Você venceu o combate!")
        jogador.ganhar_experiencia(inimigo.exp_recompensa)
        print(f"Você ganhou {inimigo.exp_recompensa} pontos de experiência!")
    
    elif not jogador.vivo():
        print("Você foi derrotado no combate.")