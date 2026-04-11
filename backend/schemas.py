from pydantic import BaseModel
from datetime import date

class TodoCreate(BaseModel):
    title: str
    description: str
    due_date: date
    status: str

class Todo(TodoCreate):
    id: int

    class Config:
        orm_mode = True