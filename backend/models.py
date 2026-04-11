from sqlalchemy import Column, Integer, String, Date
from database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    due_date = Column(Date)
    status = Column(String)