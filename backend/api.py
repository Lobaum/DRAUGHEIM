from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from entidades.jogador import Jogador
from entidades.inimigo import spawn_inimigo_por_nivel
from classe.classe import classes_dados
from raca.raca import racas_dados
from sistema.dados import rolar_d6, rolar_d20
import random
from recompensas.tesouros import bau_aleatorio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


game = {
    "player": None,
    "enemy": None,
    "logs": [],
    "region": "Asgard"
}

class CriarPersonagemRequest(BaseModel):
    nome: str
    raca: str
    vocacao: str

def player_to_dict(player):
    return {
        "name": player.nome,
        "race": player.raca,
        "charClass": player.vocacao,
        "level": player.nivel,
        "xp": player.exp,
        "hp": player.vida_atual,
        "maxHp": player.vida_maxima,
        "energy": player.energia,
        "maxEnergy": player.energia_maxima,
        "potions": player.pocao,
        "attributes": {
            "power": player.poder,
            "defense": player.defesa,
            "evasion": player.esquiva,
            "lifeBonus": player.vida_maxima
        }
    }

def enemy_to_dict(enemy):
    if not enemy:
        return None

    return {
        "name": enemy.nome,
        "hp": enemy.vida_atual,
        "maxHp": enemy.vida_maxima,
        "level": 1,
        "region": game["region"]
    }

@app.post("/character")
def criar_personagem(data: CriarPersonagemRequest):
    raca = racas_dados[data.raca]
    vocacao = classes_dados[data.vocacao]

    vida = vocacao["pv_base"] + raca["Bonus_Vida"]

    player = Jogador(
        nome=data.nome,
        poder=raca["Poder"],
        defesa=raca["Defesa"],
        vida_maxima=vida,
        vida_atual=vida,
        esquiva=raca["Esquiva"],
        energia=vocacao["pe_por_nivel"],
        energia_maxima=vocacao["pe_por_nivel"],
        raca=data.raca,
        vocacao=data.vocacao,
        pocao=3,
        exp=0,
        inventario=[]
    )

    game["player"] = player
    game["logs"] = [f"{player.nome} inicia sua jornada em Asgard!"]

    return {
        "character": player_to_dict(player),
        "region": game["region"],
        "logs": game["logs"]
    }

@app.post("/explore")
def explorar():
    player = game["player"]

    if not player:
        return {"error": "Nenhum personagem criado."}

    if player.energia <= 0:
        game["logs"].append("Você precisa descansar para continuar.")
        return {
            "state": "EXPLORATION",
            "character": player_to_dict(player),
            "logs": game["logs"]
        }

    player.energia -= 1
    d6 = rolar_d6()

    if d6 == 1:
        enemy = spawn_inimigo_por_nivel(player.nivel)
        game["enemy"] = enemy
        game["logs"].append(f"Um {enemy.nome} surgiu das sombras!")

        return {
            "state": "COMBAT",
            "character": player_to_dict(player),
            "enemy": enemy_to_dict(enemy),
            "logs": game["logs"]
        }

    if d6 <= 5:
        game["logs"].append("Tudo calmo. Você encontra apenas neve e ruínas congeladas.")
        return {
            "state": "EXPLORATION",
            "character": player_to_dict(player),
            "logs": game["logs"]
        }

    game["logs"].append("Você encontrou um evento misterioso.")
    return {
        "state": "EVENT",
        "event": {
            "type": "Evento Especial",
            "description": "Você encontra uma ruína congelada emanando energia rúnica."
        },
        "character": player_to_dict(player),
        "logs": game["logs"]
    }

@app.post("/rest")
def descansar():
    player = game["player"]

    player.vida_atual = min(player.vida_atual + 7, player.vida_maxima)
    player.energia = min(player.energia + 3, player.energia_maxima)

    game["logs"].append("Você monta acampamento e recupera suas forças.")

    return {
        "character": player_to_dict(player),
        "logs": game["logs"]
    }

@app.post("/combat/attack")
def atacar():
    player = game["player"]
    enemy = game["enemy"]

    if not player or not enemy:
        return {"error": "Nenhum combate ativo."}

    if player.vida_atual <= 0:
        return {
            "state": "DEAD",
            "character": player_to_dict(player),
            "enemy": None,
            "logs": game["logs"]
        }

    player.atacar(enemy)

    if enemy.vivo():
        enemy.atacar(player)
        game["logs"].append(f"{enemy.nome} contra-atacou.")

        if player.vida_atual <= 0:
            game["logs"].append(f"{player.nome} caiu em batalha. Sua saga chegou ao fim.")
            game["enemy"] = None

            return {
                "state": "DEAD",
                "character": player_to_dict(player),
                "enemy": None,
                "logs": game["logs"]
            }

    else:
        player.ganhar_experiencia(enemy.exp_recompensa)
        game["logs"].append(f"Você derrotou {enemy.nome} e ganhou {enemy.exp_recompensa} XP.")
        game["enemy"] = None

    return {
        "state": "COMBAT" if game["enemy"] else "EXPLORATION",
        "character": player_to_dict(player),
        "enemy": enemy_to_dict(game["enemy"]),
        "logs": game["logs"]
    }

@app.post("/combat/potion")
def usar_pocao():
    player = game["player"]

    if not player:
        return {"error": "Nenhum personagem criado."}

    if player.vida_atual <= 0:
        return {
            "state": "DEAD",
            "character": player_to_dict(player),
            "enemy": None,
            "logs": game["logs"]
        }

    player.usar_pocao()
    game["logs"].append("Você usou uma poção.")

    return {
        "state": "COMBAT" if game["enemy"] else "EXPLORATION",
        "character": player_to_dict(player),
        "enemy": enemy_to_dict(game["enemy"]),
        "logs": game["logs"]
    }

@app.post("/combat/flee")
def fugir():
    player = game["player"]

    if not player:
        return {"error": "Nenhum personagem criado."}

    if player.vida_atual <= 0:
        return {
            "state": "DEAD",
            "character": player_to_dict(player),
            "enemy": None,
            "logs": game["logs"]
        }

    game["enemy"] = None
    game["logs"].append("Você fugiu do combate.")

    return {
        "state": "EXPLORATION",
        "character": player_to_dict(game["player"]),
        "logs": game["logs"]
    }

@app.post("/event/interact")
def interagir_evento():
    player = game["player"]

    if not player:
        return {"error": "Nenhum personagem criado."}

    evento = random.choice(["bau", "altar"])

    if evento == "bau":
        bau = bau_aleatorio()
        d20 = rolar_d20()

        game["logs"].append(
            f"Você encontrou um Baú {bau.raridade}. Dificuldade: {bau.dificuldade}."
        )
        game["logs"].append(f"Rolagem para abrir o baú: D20 = {d20}.")

        if d20 >= bau.dificuldade:
            item_ganho = random.choice(bau.tesouros)
            player.inventario.append(item_ganho)

            if item_ganho == "Poção de Hidromel":
                player.pocao += 1

            game["logs"].append(f"CLACK! O baú abriu. Você encontrou: {item_ganho}.")
        else:
            game["logs"].append("Falha! A chave entortou e o baú permaneceu fechado.")

    else:
        dificuldade = 15
        d20 = rolar_d20()
        bonus = 4 if player.vocacao == "Tecelão de Runas" else 0
        total = d20 + bonus

        game["logs"].append("Você se aproxima de um Altar de Runas Primordiais.")
        game["logs"].append(f"Rolagem para decifrar runa: D20 {d20} + bônus {bonus} = {total}.")

        if total >= dificuldade:
            player.poder += 2
            game["logs"].append("SUCESSO! Uma aura azul envolve seu corpo. Você recebeu +2 de Poder.")
        else:
            dano = rolar_d6()
            player.receber_dano(dano)
            game["logs"].append(f"FALHA! O altar explode em energia sombria e causa {dano} de dano.")

    return {
        "state": "EXPLORATION",
        "character": player_to_dict(player),
        "logs": game["logs"]
    }