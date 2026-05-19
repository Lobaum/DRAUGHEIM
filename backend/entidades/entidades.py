from sistema.dados import rolar_d20, rolar_d6

class Entidade:
    def __init__(self, poder, defesa, vida_atual:int, vida_maxima:int, esquiva, energia):
        self.poder = poder
        self.defesa = defesa
        self.vida_maxima = vida_maxima
        self.vida_atual = vida_maxima
        self.esquiva = esquiva
        self.energia = energia
    
    def vivo(self):
        return self.vida_atual > 0
    
    def status(self):
        if self.vivo():
            print(f"vivo: {self.vida_atual}/{self.vida_maxima}")
        else:
            print(f"morto: {self.vida_atual}/{self.vida_maxima}")

    def atacar(self, alvo):
        d20 = rolar_d20()
        print(f"D20 = {d20}")
        if d20 == 1:
            print(f"Rolou {d20}! Ataque Falhou")
        elif d20 + self.poder >= alvo.defesa + 10:
            print(f"Ataque quebrou a defesa")
            d6 = rolar_d6()
            if d20 == 20:
                print(f"Rolou um {d20}!! Acerto CRÍTICO!!")
                dano = self.poder + d6
                dano_final = dano * 2

            else:
                dano = (self.poder + d6) - alvo.defesa
                dano_final = max(1, dano)

            alvo.receber_dano(dano_final)
            print(f"O alvo recebeu {dano_final} de dano! (Vida restante: {alvo.vida_atual})")

        else:
            print(f"Defesa do alvo muito grande")

    def receber_dano(self, dano):
        self.vida_atual = self.vida_atual - dano
        self.vida_atual = max(0, self.vida_atual)