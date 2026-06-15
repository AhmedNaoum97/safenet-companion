# Necessary imports
from fastapi import FastAPI
from app.schemas import ChatRequest, ChatResponse
from app.llm import generate_reply


# Create application instance with FastAPI
app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "okay"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    reply = generate_reply(request.message, request.age_group)
    return {"reply": reply}