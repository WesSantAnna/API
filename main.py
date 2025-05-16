import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, Security, HTTPException, status
from pydantic import BaseModel
import requests
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBearer,HTTPAuthorizationCredentials
from jose import JWTError, jwt  # Biblioteca para JWT
from datetime import datetime, timedelta

load_dotenv()

app = FastAPI()

# FAZENDO LOGIN
API_URL = os.getenv("API_URL")
USERNAME = os.getenv("USERNAME")  
PASSWORD = os.getenv("PASSWORD")

class TokenRequest(BaseModel):
    username: str
    password: str

@app.post("/token")
async def token(data: TokenRequest):
    url = f"{API_URL}/token"
    headers = {"Content-Type": "application/json"}
    payload = {
        "username": data.username,
        "password": data.password
    }
    #print(f'{PASSWORD} e {USERNAME}')

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {
            "error": "Falha na autenticação",
            "status": response.status_code,
            "details": response.text
        }


# RECEBENDO OS TOKENS GERADOS PELO LOGIN

SECRET_KEY = os.getenv("SECRET_KEY")
security_scheme = HTTPBearer()
#SECRET_KET = "SECRET_KEY"
ALGORITHM = "HS256"

exp = datetime.utcnowc + (7 * 60)
response = requests.get()
valor = response.headers['date']

def auth_token(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    token = credentials.credentials
    try:
    #payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    # Verifica expiração (se o payload tem campo 'exp')
        if "exp" in payload:
            exp_timestamp = payload["exp"]
            if datetime.utcnow() > datetime.fromtimestamp(exp_timestamp):
                raise HTTPException(status_code=401, detail="Token expirado")
    
    return payload

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")
