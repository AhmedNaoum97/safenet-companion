import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../state/appStore";
import type { AgeGroup } from "../state/appStore";
import { sendChatMessage } from "../services/chatApi";


// ── Types ─────────────────────────────────────────────────────────────────────
type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

// ── Quick-start suggestions by age group ──────────────────────────────────────
const suggestions: Record<AgeGroup, string[]> = {
  child: [
    "A stranger online is being very nice to me",
    "Someone asked me to send a photo",
    "I saw something scary online",
    "How do I stay safe on games?",
  ],
  teen: [
    "Someone is threatening to share my photos",
    "I think I'm being scammed",
    "How do I block someone on Instagram?",
    "Someone I met online wants to meet up",
  ],
  adult: [
    "I received a suspicious email from my bank",
    "How do I know if a website is safe?",
    "I think my account has been hacked",
    "What is two-factor authentication?",
  ],
  senior: [
    "I got a call saying my computer has a virus",
    "Someone asked me to transfer money urgently",
    "How do I know if an email is real?",
    "I think I've been scammed — what do I do?",
  ],
};

// ── Placeholder replies (replaced by real AI next week) ───────────────────────
function getReply(msg: string, group: AgeGroup): string {
  const m = msg.toLowerCase();

  if (m.includes("photo") || m.includes("picture") || m.includes("image")) {
    if (group === "child" || group === "teen") {
      return "This is really important. You should never send photos to someone you met online, no matter what reason they give. If someone is asking for or threatening to share your photos, please tell a trusted adult immediately and report it to Kripos at tips.kripos.no. You have done nothing wrong.";
    }
    return "If someone is using photos to threaten or blackmail you, this is called sextortion and it is a crime. Do not pay. Contact Kripos at tips.kripos.no or your local police immediately.";
  }

  if (m.includes("scam") || m.includes("fraud") || m.includes("money")) {
    return "If you think you are being scammed, stop all contact immediately. Do not send any money. Report it to the Norwegian police at politiet.no. If money has already been transferred, contact your bank right away — they may be able to reverse it.";
  }

  if (m.includes("hack") || m.includes("password") || m.includes("account")) {
    return "Change your password immediately on a device you trust. Enable two-factor authentication if you haven't already. Check haveibeenpwned.com to see if your email has appeared in a data breach.";
  }

  if (m.includes("stranger") || m.includes("meet") || m.includes("virus") || m.includes("call")) {
    return "Be very cautious. Scammers often use urgency and fear to get you to act quickly. Take a breath, do not give any information or money, and hang up or close the conversation. If you're unsure, talk to someone you trust before doing anything.";
  }

  return "That's an important question about staying safe online. The full AI chat will be available very soon. In the meantime, check the Learn page for tips relevant to your age, or visit Resources for official help links in Norway.";
}

// ── Typing indicator ───────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: "5px", padding: "14px 16px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: "#38bdf8", opacity: 0.7,
          animation: "safenet-bounce 1.2s infinite",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      <style>{`
        @keyframes safenet-bounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
function SafetyChatPage() {
  const { ageGroup, age } = useAppStore();
  const group = ageGroup ?? "adult";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    try {
      const reply = await sendChatMessage(text.trim(), group);
      setMessages((prev) => [...prev, { id: idRef.current++, role: "assistant", text: reply }]);
    } catch {
      const reply = getReply(text, group); // Offline fallback
      setMessages((prev) => [...prev, { id: idRef.current++, role: "assistant", text: reply }]);
    } finally {
      setIsTyping(false);
    }
  }

  const groupLabel: Record<string, string> = {
    child: "Child mode", teen: "Teen mode",
    adult: "Adult mode", senior: "Senior mode",
  };

  return (
    <main className="page" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 140px)" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.25rem", flexShrink: 0 }}>
        <h1 style={{ color: "#f8fafc", fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.25rem" }}>
          Safety Chat
        </h1>
        <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
          Personalised guidance for age {age} · {groupLabel[group]}
        </p>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto",
        background: "rgba(15,23,42,0.5)",
        border: "1px solid rgba(148,163,184,0.1)",
        borderRadius: "16px", padding: "1.25rem",
        display: "flex", flexDirection: "column", gap: "0.75rem",
        marginBottom: "1rem", minHeight: "320px",
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#475569" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🛡️</div>
            <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>
              Hello! I&apos;m your SafeNet Companion. Ask me anything about staying safe online —
              no question is too small or embarrassing.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%", padding: "0.75rem 1rem",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? "#0ea5e9" : "rgba(30,41,59,0.9)",
              color: "#f8fafc", fontSize: "0.95rem", lineHeight: 1.65,
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "rgba(30,41,59,0.9)", borderRadius: "18px 18px 18px 4px" }}>
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — only before first message */}
      {messages.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem", flexShrink: 0 }}>
          {suggestions[group].map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.3)",
                borderRadius: "999px", color: "#7dd3fc",
                padding: "0.4rem 0.9rem", fontSize: "0.82rem",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, alignItems: "flex-end" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Type your question… (Enter to send)"
          rows={2}
          style={{
            flex: 1, padding: "0.85rem 1rem",
            borderRadius: "14px",
            border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(15,23,42,0.8)",
            color: "#f8fafc", fontSize: "0.95rem",
            resize: "none", outline: "none", lineHeight: 1.5,
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="btn btn-primary"
          style={{
            padding: "0.85rem 1.25rem", flexShrink: 0, margin: 0,
            opacity: !input.trim() || isTyping ? 0.5 : 1,
            cursor: !input.trim() || isTyping ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </main>
  );
}

export default SafetyChatPage;