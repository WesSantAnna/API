Esse desafio pressupõe a criação de uma API que consuma dados de um endpoit da plataforma Portal Stream utilizando autenticação via token JWT e fazer chamadas autenticadas aos recursos disponíveis. 

Para tal desafio será projetado da seguinte maneira:

## 🧠 Projeto Lógico

---

## ✅ **Resumo**

### 1. **Criar um projeto Python com FastAPI**

> **FastAPI:** Escolhi a FastAPI porque é mais fácil de se utilizar em comparação ao Django e tem mais recursos do que o FlaskAPI. Dado essas condições de framework, optei por **FastAPI**
> 

### 2. **Lidar com autenticação JWT completa**

> Implementar chamadas para /token, /token/refresh e /token/verify.
> 

### 3. **Consumir um endpoint autenticado do Portal Stream**

> Usar o JWT obtido para acessar dados protegidos da API externa.
> 

### 4. **Expor um endpoint na sua API**

> Criar uma rota que recebe um parâmetro, chama a API externa com o token e retorna os dados.
> 

---

## 🧱 **Estrutura do Projeto**

```
Desafio/
        |__ /app
        .       |__ __init__.py
        .       |__ api.py
        .       |__ auth.py
        .       |__ client.py
        |__ .env
        |__ external_api.py
        |__ main.py
        |__ requirements.txt
        |__ README.md
```

## 📍Implementação

## 🔁 Testes

## 👾 Debug

## 🎯Fechamento