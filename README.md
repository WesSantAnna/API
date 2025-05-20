# 🧠 Projeto Lógico


## 🔐 Desafio:

  Este desafio propõe o desenvolvimento de uma **API REST** utilizando o framework **FastAPI**, com foco em: 
 - Consumo de dados protegidos da plataforma **Portal Stream**- Autenticação via **JWT (JSON Web Token)**
---

## ✅ **Resumo**

### 1. **Criação de um projeto Python com FastAPI**

> A FastAPI foi escolhida por sua curva de aprendizado mais amigável em comparação ao Django, além de oferecer mais recursos nativos para APIs modernas do que o Flask. Essa escolha viabiliza uma implementação mais enxuta e eficiente.
> 

---

### 2. **Implementação de autenticação JWT completa**

> Foram implementadas rotas para:
> 
> - `/token` – geração de token
> - `/token/refresh` – renovação de token
> - `/token/verify` – verificação de validade

---

### 3. **Consumo de endpoint autenticado da API Portal Stream**

> Utiliza-se o JWT obtido na autenticação para acessar recursos protegidos da API externa.
> 

---

### 4. **Exposição de endpoint próprio**

> A API local expõe uma rota que recebe parâmetros do cliente, autentica-se via JWT, realiza uma chamada ao Portal Stream e retorna os dados processados ao consumidor.
> 

---

## 🧱 **Estrutura do Projeto**

```bash
/API
├── main.py          # Ponto de entrada da aplicação
├── .env             # Variáveis de ambiente (tokens, URLs)
└── /app
    ├── __init__.py
    ├── api.py       # Definição das rotas da API
    ├── auth.py      # Lógica de autenticação com JWT
    ├── client.py    # Integração com a API externa (Portal Stream)
    └── schema.py    # Modelos Pydantic para validação e tipagem

```

---

## 📍 Implementação

A estrutura modular do projeto foi projetada visando **manutenibilidade e escalabilidade**. As responsabilidades foram divididas em arquivos específicos, como:

- `api.py`: centraliza as rotas locais.
- `client.py`: lida com requisições à API externa.
- `auth.py`: gerencia o fluxo de autenticação.
- `schema.py`: define os modelos de entrada e saída.

Essa divisão torna o projeto mais coeso e facilita a realização de testes. Foram implementados **testes individuais para cada rota**, com tratamento de erros e respostas padronizadas.

---

## ✅ Testes

Cada rota da aplicação possui **testes automatizados** que garantem:

- Validação de parâmetros obrigatórios
- Autenticação correta via token
- Manipulação adequada de respostas externas
- Tratamento de erros e respostas esperadas (ex.: 401, 404, 500)

---

## 🎯 Conclusão

O projeto demonstra uma integração segura e organizada com APIs externas protegidas por JWT. A estrutura modular, o uso de tipagem com Pydantic e a implementação de testes garantem qualidade, clareza e facilidade de manutenção do código.

---