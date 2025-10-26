
from pydantic import BaseModel
from typing import Optional
from datetime import date

class StudentCreate(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    email: str
    dob: Optional[date] = None

class StudentOut(StudentCreate):
    id: int
    class Config:
        orm_mode = True
