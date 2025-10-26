
from sqlalchemy.orm import Session
from . import models, schemas

def create_student(db: Session, student_in: schemas.StudentCreate):
    student = models.Student(**student_in.dict())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student

def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()
