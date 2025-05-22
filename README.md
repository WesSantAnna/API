

# 🧠 Visão Geral

## 🔐 Desafio: Integração com a Plataforma Portal Stream

Este desafio propõe o desenvolvimento de uma **API RESTful** utilizando o framework **FastAPI**, e a criação de um **frontend em React** para consumir essa API, com foco em:

- Autenticação via **JWT (JSON Web Token)**
- Consumo de dados protegidos da **plataforma Portal Stream**
- Arquitetura modular e testável
- Comunicação segura entre backend e frontend

---

## ✅ **Resumo da Solução**

### 1. **Backend com FastAPI**

A escolha pelo FastAPI se deu por sua simplicidade, performance e suporte nativo à documentação automática com Swagger. Ele permite construir APIs modernas com validação de dados via **Pydantic** e recursos assíncronos.

---

### 2. **Rotas implementadas**

- `POST /token` – Geração de token JWT
- `POST /token/verify` – Verificação de validade do token
- `POST /token/refresh` – Renovação do token
- `GET /usercorp` – Apresentação dos dados da rota usercorp
- `GET /implantation/mobile/tree` – Apresentação dos dados da rota usercorp
- `GET /implantation/mobile/info` – Apresentação dos dados da rota implantation/mobile/info
- `GET /implantation/mobile/static` – Apresentação dos dados da rota implantation/mobile/static
- `GET /implantation/mobile/static/get_lubricants` – Apresentação dos dados da rota implantation/mobile/static/get_lubricants

---

### 3. **Integração com API externa protegida (Portal Stream)**

A aplicação realiza autenticação via JWT e utiliza esse token para consumir endpoints protegidos da plataforma externa.

---

### 4. **Exposição de rota própria**

A API local fornece um endpoint customizado que:

- Recebe as credenciais do usuário
- Realiza a autenticação com a API externa
- Retorna os dados processados para o cliente frontend

---

### 5. **Frontend com React + Vite**

Foi utilizado o framework **React**, inicializado com **Vite**, para criar uma interface web leve e responsiva. A comunicação com a API FastAPI ocorre via chamadas `fetch`.

---

### 6. **Visualização da Rota `usercorp`**

Após o login, o frontend exibe os dados estruturados do usuário, separados em:

- Informações do usuário (`user`)
- Corporações (`corporation`)
- Sites associados (`sites`)

---

## 🧱 Estrutura do Projeto

### 📁 Backend (FastAPI)

```bash
/backend
├── main.py            # Ponto de entrada da aplicação FastAPI
├── .env               # Variáveis de ambiente (tokens, URLs, etc.)
└── /app
    ├── __init__.py
    ├── api.py         # Definição das rotas principais
    ├── auth.py        # Lógica de autenticação JWT
    ├── client.py      # Comunicação com a API externa
    └── schema.py      # Modelos Pydantic para validação de dados
```

---

### 📁 Frontend (React com Vite)

```bash
/frontend
├── index.html
├── vite.config.js           # Configuração do servidor Vite (inclui proxy, se necessário)
├── package.json
└── /src
    ├── App.jsx              # Componente principal da aplicação
    ├── ApiService.jsx       # Módulo para autenticação e chamada de dados
    ├── App.css              # Estilização da aplicação
    └── main.jsx             # Ponto de entrada React
```

---

## 🛠️ Implementação

### 🔹 Backend

Cada módulo cumpre uma função específica:

- `api.py`: define e organiza as rotas locais.
- `auth.py`: contém a lógica para geração e validação de tokens JWT.
- `client.py`: responsável por chamadas à API externa (Portal Stream).
- `schema.py`: define os modelos de entrada/saída usando Pydantic.

### 🔹 Frontend

- `App.jsx`: componente principal da aplicação. Contém o formulário de login e exibe os dados da API após autenticação.
- `ApiService.jsx`: módulo com as funções `login()` e `fetchUserData()`, que realizam chamadas para o backend.
- `App.css`: arquivo de estilo da interface.
- `vite.config.js`: pode ser configurado para redirecionar requisições à API backend via proxy.

---

## ✅ Testes

Foram implementados testes unitários e de integração para garantir:

- Validação de parâmetros obrigatórios
- Autenticação com token válido
- Tratamento adequado de erros (ex: 401, 404, 500)
- Consistência das respostas da API externa

---

## ▶️ Inicialização do Projeto

### 🔧 Backend (FastAPI)

```bash
# Comando para iniciar o backend FastAPI
uvicorn main:app --reload
```

- A API ficará disponível em: [http://127.0.0.1:8000](http://127.0.0.1:8000/)
- A documentação interativa Swagger pode ser acessada em: http://127.0.0.1:8000/docs

---

### 💻 Frontend (React + Vite)

```bash
# Criar o projeto com Vite
npm create vite@latest frontend --template react

# Entrar na pasta e instalar dependências
cd frontend
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

- A aplicação será servida em: [http://localhost:5173](http://localhost:5173/)

---

### 🔁 Comunicação Frontend ↔ Backend

A integração só funciona corretamente com **CORS habilitado** no backend e os dois servidores (React e FastAPI) rodando simultaneamente.

**Middleware CORS no FastAPI na main.py:**

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST"],
    allow_credentials = True,
    allow_headers=["*"],
)
```

---

## 🎯 Conclusão

O projeto demonstra uma arquitetura robusta, moderna e segura para consumir APIs externas com autenticação JWT. A separação clara entre responsabilidades (autenticação, chamadas externas, apresentação de dados) promove legibilidade e facilidade de manutenção.

A aplicação também evidencia como uma integração entre **FastAPI + React** pode ser feita de forma escalável, cuidando de frontend e backend.

---