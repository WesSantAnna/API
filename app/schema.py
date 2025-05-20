from pydantic import BaseModel

class TokenRequest(BaseModel):
    username: str
    password: str

#class Revision(BaseModel):
#    revision: int
#    nodes: object | None = None