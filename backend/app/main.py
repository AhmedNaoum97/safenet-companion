# Necessary imports
import logging
import time
from collections import defaultdict, deque

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import ChatRequest, ChatResponse
from app.llm import generate_reply

# Create logger object named safenet, use to write error and diagnostic messages
logger = logging.getLogger("safenet")

# Rate limit
RATE_LIMIT = 20
RATE_WINDOW = 60
request_log = defaultdict(deque)

# Create application instance with FastAPI
app = FastAPI()

# Allow only what is needed, following the principle of least privilege
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://safenet-companion.vercel.app"
    ],
    allow_methods=["GET", "POST"], # Only methods we use
    allow_headers=["Content-Type"], # Only header our JSON requests need
)


# Rate limit
def check_rate_limit(client_ip: str):
    now = time.time()
    timestamps = request_log[client_ip]

    # Drop timestamps older than the window (sliding window)
    while timestamps and now - timestamps[0] > RATE_WINDOW:
        timestamps.popleft()

    # Too many in the window? Reject.
    if len(timestamps) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    # Otherwise record this request
    timestamps.append(now)


# Health check
@app.get("/api/health")
def health():
    return {"status": "okay"}

@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest, http_request: Request):
    check_rate_limit(http_request.client.host)
    try:
        reply = generate_reply(request.message, request.age_group)
        return {"reply": reply}
    except Exception:
        logger.exception("Chat generation failed")
        raise HTTPException(
            status_code=502,
            detail="The safety assistant is temporarily unavailable. Please try again.",
        )