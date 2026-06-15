# Necessary imports
from fastapi import FastAPI, HTTPException
import logging
from app.schemas import ChatRequest, ChatResponse
from app.llm import generate_reply
from fastapi.middleware.cors import CORSMiddleware

# Create logger object named safenet, use to write error and diagnostic messages
logger = logging.getLogger("safenet")

# Create application instance with FastAPI
app = FastAPI()

# Allow only what is needed, following the principle of least privilege
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Allowlist, only Vite dev server can call API
    allow_methods=["GET", "POST"], # Receive and deliver methods only allowed
    allow_headers=["Content-Type"], # Only header our JSON requests need
)

@app.get("/api/health")
def health():
    return {"status": "okay"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        reply = generate_reply(request.message, request.age_group)
        return {"reply": reply}
    except Exception:
        logger.exception("Chat generation failed")
        raise HTTPException(
            status_code=502,
            detail="The safety assistant is temporarily unavailable. Please try again.",
        )