# SafeNet Companion

An AI-powered online-safety companion that gives age-appropriate guidance to everyday users — children, teens, adults, and seniors — as a first line of defense against scams, phishing, grooming, and fraud.

## Live Demo

- **Frontend:** _coming soon_
- **Backend:** _coming soon_

## Why It Exists

Most online-safety advice is written for technically confident people, but the users attackers target most — children being groomed in games, teens facing sextortion, seniors getting scam phone calls — are the least served by generic guidance. SafeNet asks one question, the user's age, and adapts everything to it: a child gets gentle language and a push to tell a trusted adult, while a senior gets concrete advice on phone fraud and bank impersonation. The goal is a first line of defense that meets each person where they are.

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- A Google Gemini API key (free tier, from Google AI Studio)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate         # Windows
source venv/bin/activate      # Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env`:

```
GEMINI_API_KEY=your-key-here
```

```bash
uvicorn app.main:app --reload
```

API available at `http://127.0.0.1:8000` (interactive docs at `/docs`).

### Frontend Setup

```bash
cd front-end
npm install
npm run dev
```

App available at `http://localhost:5173`. To point the frontend at a deployed backend, set `VITE_API_URL` in `front-end/.env`.

## Features

- Age-aware safety chat — the AI's system prompt changes per age group (child, teen, adult, senior), so the same question gets age-appropriate guidance
- Live AI responses via the Google Gemini API
- Learn page with prioritised safety tips per age group
- Resources page with official Norwegian help links (Kripos, Slettmeg, politiet.no)
- Digital Detox page encouraging healthy time off-screen
- Graceful offline fallback — if the backend is unreachable, the chat still gives rule-based guidance

## Security

- API key kept server-side only, read from an environment variable and never exposed to the browser or committed to the repository
- Input validation with Pydantic — messages capped at 2,000 characters, `age_group` validated against a four-value whitelist, rejecting malformed or oversized requests before any code runs
- Per-IP rate limiting (sliding window, 20 requests/minute) to blunt abuse and protect API costs
- CORS allowlist restricting the API to the frontend's origin and the GET/POST methods actually used
- Generic error responses to the client; full errors logged server-side only
- No logging of message content, since users disclose sensitive situations

The principle throughout is least privilege: allow exactly what is needed, nothing more.

## Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Frontend   | React 19, TypeScript, Vite |
| Backend    | FastAPI, Pydantic, Uvicorn |
| AI         | Google Gemini API          |
| Deployment | Railway, Vercel            |

## Project Structure

```
safenet-companion/
├── backend/
│   ├── app/
│   │   ├── main.py        # routes, CORS, rate limiting, error handling
│   │   ├── schemas.py     # Pydantic request/response models
│   │   ├── prompts.py     # age-aware system prompts
│   │   └── llm.py         # Gemini API wrapper
│   ├── .env.example
│   └── requirements.txt
├── front-end/
│   ├── src/
│   │   ├── components/    # Navbar, ParkCard
│   │   ├── pages/         # SafetyChat, Learn, Resources, DigitalDetox, Home
│   │   ├── services/      # chatApi.ts
│   │   ├── state/         # appStore (age group)
│   │   └── types/
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint    | Description                                     |
| ------ | ----------- | ----------------------------------------------- |
| GET    | /api/health | API health check                                |
| POST   | /api/chat   | Send a message, get an age-appropriate AI reply |

## Roadmap

- Real third-party places API on the Digital Detox page
- Streaming chat responses
- Norwegian-language support
