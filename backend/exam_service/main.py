
from fastapi import FastAPI
app = FastAPI(title="Exam Service")
@app.get("/health")
def health():
    return {"status":"ok"}
