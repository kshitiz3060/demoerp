
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import models, schemas, crud
from shared.database import engine, SessionLocal, Base
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Auth Service")

@app.post("/auth/register", response_model=schemas.UserOut)
def register(user_in: schemas.UserCreate, db: Session = Depends(crud.get_db)):
    existing = crud.get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = crud.create_user(db, user_in)
    return user

@app.post("/auth/login")
def login(form_data: schemas.UserLogin, db: Session = Depends(crud.get_db)):
    user = crud.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    token = crud.create_access_token(user)
    return {"access_token": token, "token_type": "bearer", "user": {"id": user.id, "email": user.email, "role": user.role}}
