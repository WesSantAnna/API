from datetime import datetime
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from fastapi import HTTPException

def get_security_scheme():
    return HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials, secret_key: str, algorithm: str):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        if "exp" in payload:
            if datetime.now(datetime.timezone.utc) > datetime.fromtimestamp(payload["exp"]):
                raise HTTPException(status_code=401, detail="Token expirado")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")