import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
import requests


load_dotenv()

API_URL = os.getenv("API_URL")
USERNAME = os.getenv("USERNAME")  
PASSWORD = os.getenv("PASSWORD")

app = FastAPI()

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
