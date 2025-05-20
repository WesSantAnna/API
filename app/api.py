from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .auth import get_security_scheme, verify_token
from .client import APIClient
from .schema import TokenRequest
import os

router = APIRouter()
security_scheme = get_security_scheme()
api_client = APIClient(os.getenv("API_URL"))

@router.post("/token")
async def get_token(data: TokenRequest):
    response = api_client.get_tokens(data)
    if response.status_code == 200:
        return response.json()
    raise HTTPException(
        status_code=response.status_code,
        detail=response.text
    )

@router.post("/token/verify")
async def verify_access_token(token: str):
    response = api_client.verify_token(token)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Token inválido ou expirado"
        )
    return response.json()

@router.post("/token/refresh")
async def refresh_access_token(refresh_token: str):
    response = api_client.refresh_token(refresh_token)
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Refresh token inválido"
        )
    return response.json()

@router.get("/usercorp")
async def get_user_data(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
   token = credentials.credentials
   response = api_client.user_data(token)
   if response.status_code != 200:
       raise HTTPException(
           status_code=response.status_code,
           detail="You do not have permission to perform this action."
       )       
   return response.json()

@router.get("/implantation/mobile/tree")
async def get_tree(id: str = Query(..., alias="site", description="Site id"),  credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    token = credentials.credentials
    response = api_client.get_tree(id, token)
    if response.status_code != 200:
       raise HTTPException(
           status_code=response.status_code,
           detail="You need to send revision and site parameters!"
       )       
    return response.json()

@router.get("/implantation/mobile/info")
async def get_retrieve_asset_info(id: str = Query(..., alias="site", description="Site id"), credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    token = credentials.credentials
    response = api_client.get_retrieve_asset_info(id, token)
    if response.status_code != 200:
        raise HTTPException(
           status_code=response.status_code,
           detail="Site id is required!"            
        )
    return response.json()

@router.get("/implantation/mobile/static")
async def get_retrieve_static_data(credentials: HTTPAuthorizationCredentials = Depends(security_scheme)):
    token = credentials.credentials
    response = api_client.get_retrieve_static_data(token)
    if response.status_code != 200:
        raise HTTPException(
           status_code=response.status_code,
           detail=response.content         
        )
    return response.json()
