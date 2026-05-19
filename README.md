# DRAUGHEIM

DRAUGHEIM é um RPG com tema de mitologia nórdica, feito com:

- **Backend:** Python + FastAPI
- **Frontend:** React + Vite + TypeScript

Este guia mostra, passo a passo, como baixar e rodar o projeto localmente no computador.

---

# 1. Baixando o projeto pelo GitHub

Escolha uma pasta onde você quer salvar o projeto.

rode:

```bash
git clone COLE_AQUI_A_URL_DO_REPOSITORIO
```

Exemplo:

```bash
git clone https://github.com/seu-usuario/draugheim.git
```

Depois entre na pasta do projeto:

```bash
cd draugheim
```

---

# 3. Estrutura esperada do projeto

O projeto deve estar organizado assim:

```txt
draugheim/
├── backend/
│   ├── api.py
│   ├── requirements.txt
│   ├── entidades/
│   ├── sistema/
│   ├── recompensas/
│   ├── classe/
│   └── raca/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│
└── README.md
```

---

# 4. Rodando o backend

No terminal, dentro da pasta principal do projeto, rode:

```bash
cd backend
```

---

## 4.1 Instalar as dependências do backend

rode:

```bash
pip install -r requirements.txt
```

Se der erro dizendo que o arquivo `requirements.txt` não existe, crie esse arquivo dentro da pasta `backend` com este conteúdo:

```txt
fastapi
uvicorn
```

Depois rode novamente:

```bash
pip install -r requirements.txt
```

---

## 4.4 Iniciar o backend

Ainda dentro da pasta `backend`, rode:

```bash
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

Se deu certo, vai aparecer algo parecido com:

```bash
Uvicorn running on http://127.0.0.1:8000
```

Não feche esse terminal enquanto estiver jogando.

---

## 4.5 Testar se o backend está funcionando

Abra no navegador:

```txt
http://127.0.0.1:8000/docs
```

Se abrir uma tela chamada **Swagger UI**, o backend está funcionando.

---

# 5. Rodando o frontend

Abra **outro terminal**. Não feche o terminal do backend.

## 5.1 Entrar na pasta do frontend

No novo terminal, vá até a pasta do projeto:

```bash
cd Downloads\draugheim
```

Depois entre na pasta do frontend:

```bash
cd frontend
```

---

## 5.2 Instalar as dependências do frontend

Rode:

```bash
npm install
```

---

## 5.3 Criar o arquivo de ambiente

Dentro da pasta `frontend`, crie um arquivo chamado:

```txt
.env
```

Dentro dele, coloque:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Esse arquivo informa ao frontend onde está rodando o backend.

---

## 5.4 Iniciar o frontend

Ainda dentro da pasta `frontend`, rode:

```bash
npm run dev
```

Se deu certo, vai aparecer algo parecido com:

```bash
Local: http://localhost:5173/
```

Abra esse link no navegador:

```txt
http://localhost:5173/
```

Agora o jogo deve abrir.

---

# 6. Problemas comuns

## Problema: `uvicorn não é reconhecido`

Isso acontece quando o Uvicorn não foi instalado.

Resolva com:

```bash
pip install fastapi uvicorn
```

Ou:

```bash
python -m pip install fastapi uvicorn
```

Depois rode novamente:

```bash
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

---

## Problema: erro de conexão no frontend

Se aparecer erro parecido com:

```txt
ERR_CONNECTION_REFUSED
```

Significa que o backend não está rodando.

Confira se o backend está aberto em:

```txt
http://127.0.0.1:8000/docs
```

Se não abrir, inicie o backend novamente.

---

## Problema: `npm não é reconhecido`

Isso significa que o Node.js não está instalado ou não foi adicionado ao PATH.

Instale o Node.js LTS:

https://nodejs.org/

Depois feche e abra o terminal novamente.

---

## Problema: frontend abre, mas personagem não é criado

Confira se:

1. O backend está rodando.
2. O arquivo `.env` do frontend contém:

```env
VITE_API_URL=http://127.0.0.1:8000
```

3. Depois de alterar o `.env`, pare o frontend com `CTRL + C` e rode novamente:

```bash
npm run dev
```

---

# 8. Como parar o projeto

Para parar o backend ou frontend, clique no terminal e aperte:

```bash
CTRL + C
```

---

# 9. Observação importante

Para o jogo funcionar, o backend e o frontend precisam estar rodando ao mesmo tempo.

Se abrir apenas o frontend, o jogo pode carregar, mas não conseguirá criar personagem, explorar, lutar ou usar eventos.
