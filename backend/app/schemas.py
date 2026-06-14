from pydantic import BaseModel, Field
from typing import Literal

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    age_group: Literal["child", "teen", "adult", "senior"] = "adult"
    history: list = []

class ChatResponse(BaseModel):
    reply: str