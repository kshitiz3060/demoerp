from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ERP Backend API")

# 🌐 Allow your frontend (Vite React app) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧾 Define a simple login request model
class LoginRequest(BaseModel):
    username: str
    password: str

# 🧠 Health check route
@app.get("/")
def root():
    return {"message": "Backend running ✅", "status": "ok"}

# 🔐 Login endpoint
@app.post("/login")
def login(data: LoginRequest):
    # Basic dummy validation
    if data.username == "admin1" and data.password == "admin":
        return {
            "access_token": "fake-jwt-token-12345",
            "user": {"id": 1, "username": data.username, "role": "admin"},
        }
    elif data.username == "teacher1" and data.password == "teacher":
        return {
            "access_token": "fake-jwt-token-56789",
            "user": {"id": 2, "username": data.username, "role": "teacher"},
        }
    elif data.username == "student1" and data.password == "student":
        return {
            "access_token": "fake-jwt-token-99999",
            "user": {"id": 3, "username": data.username, "role": "student"},
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# 🧑‍💻 Example protected route
@app.get("/dashboard")
def dashboard():
    return {"message": "Welcome to the ERP Dashboard!"}
