# student_service.py
from fastapi import APIRouter

student_router = APIRouter()

@student_router.get("/grades")
def get_grades():
    # Example student grades
    return {
        "grades": {
            "math": "A",
            "science": "B+",
            "history": "A-",
        }
    }

@student_router.get("/assignments")
def get_assignments():
    # Example student assignments
    return {
        "assignments": [
            {"name": "Math Homework 1", "status": "Completed"},
            {"name": "Science Project", "status": "Pending"},
            {"name": "History Essay", "status": "Submitted"},
        ]
    }

@student_router.get("/profile")
def get_profile():
    # Example student profile
    return {
        "id": 3,
        "name": "John Doe",
        "email": "student@erp.com",
        "role": "student",
        "year": "2nd Year",
        "major": "Computer Science"
    }
