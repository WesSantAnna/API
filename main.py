from fastapi import FastAPI, Depends
from app.api import router as api_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)