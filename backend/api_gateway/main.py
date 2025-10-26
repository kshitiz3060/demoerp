from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
import logging

# Set up logging for better debugging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="API Gateway")

# CORS middleware for handling cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use "*" for development, specify in production (e.g., ["http://localhost:5173"])
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set default URLs for the services if the environment variables are not set
AUTH_URL = os.getenv("AUTH_URL", "http://localhost:8001")  # Change if the auth service is running elsewhere
STUDENT_URL = os.getenv("STUDENT_URL", "http://localhost:8002")  # Change if the student service is running elsewhere

@app.get("/health")
async def health():
    """Health check for the API Gateway"""
    return {"status": "ok"}

@app.post("/login")
async def login(request: Request):
    """Proxy for the login request to the authentication service"""
    payload = await request.json()
    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Forwarding login request to {AUTH_URL}/auth/login")
            r = await client.post(f"{AUTH_URL}/auth/login", json=payload, timeout=10)
            r.raise_for_status()  # Raise error for bad status codes
            return r.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"Request failed with status {e.response.status_code}")
        raise HTTPException(status_code=e.response.status_code, detail=f"Login failed: {e.response.text}")
    except httpx.RequestError as e:
        logger.error(f"Error occurred while making the request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error contacting the auth service: {str(e)}")

@app.get("/students/{student_id}")
async def get_student(student_id: int, token: str = None):
    """Proxy for fetching student data from the student service"""
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Fetching student {student_id} from {STUDENT_URL}/students/{student_id}")
            r = await client.get(f"{STUDENT_URL}/students/{student_id}", headers=headers, timeout=10)
            r.raise_for_status()  # Raise error for bad status codes
            return r.json()
    except httpx.HTTPStatusError as e:
        logger.error(f"Request failed with status {e.response.status_code}")
        raise HTTPException(status_code=e.response.status_code, detail=f"Failed to fetch student data: {e.response.text}")
    except httpx.RequestError as e:
        logger.error(f"Error occurred while making the request: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error contacting the student service: {str(e)}")
