
from fastapi import FastAPI
app = FastAPI(title="Academic Service")
@app.get("/health")
def health():
    return {"status":"ok"}
