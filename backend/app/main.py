# Necessary imports
from fastapi import FastAPI
from app.schemas import ChatRequest, ChatResponse

# Create application instance with FastAPI
app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "okay"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    return {"reply": f"You said: {request.message}"}