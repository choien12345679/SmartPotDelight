from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",  # 로컬호스트 허용
    "http://localhost:19006",  # React Native의 expo가 사용하는 주소
    "http://192.168.0.3",  # 로컬 IP 주소 허용 (PC의 IP)
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    "*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],    # 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

@app.get("/items/{item_id}")
def read_item(item_id: int, name: Optional[str] = None):
    return {"item_id": item_id, "name" : name}