# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite 예시 — 필요에 따라 다른 DB로 변경 가능
SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"

# connect_args={"check_same_thread": False}는 SQLite에서만 필요
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
