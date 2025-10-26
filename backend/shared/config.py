
import os

POSTGRES_USER = os.getenv("POSTGRES_USER", "erp_user")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "erp_pass")
POSTGRES_DB = os.getenv("POSTGRES_DB", "erp_db")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", 5432))

JWT_SECRET = os.getenv("JWT_SECRET", "changemeverywhere")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
