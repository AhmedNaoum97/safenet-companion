import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SafetyChatPage from "./pages/SafetyChatPage";
import LearnPage from "./pages/LearnPage";
import DigitalDetox from "./pages/DigitalDetox";
import ResourcesPage from "./pages/ResourcesPage";
import { useAppStore } from "./state/appStore";
import "./App.css";

// ── Age onboarding modal ───────────────────────────────────────────────────────
// Shows once when ageGroup is null (first visit or cleared localStorage).
// After the user submits their age it disappears permanently.
function AgeModal() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { setAge } = useAppStore();

  function handleSubmit() {
    const n = parseInt(input, 10);
    if (isNaN(n) || n < 5 || n > 110) {
      setError("Please enter a valid age between 5 and 110.");
      return;
    }
    setAge(n);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(2,6,23,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        background: "#0f172a",
        border: "1px solid rgba(148,163,184,0.18)",
        borderRadius: "20px",
        padding: "2.5rem 2rem",
        maxWidth: "420px", width: "100%",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>

        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.5rem", fontWeight: 800, color: "#f8fafc" }}>
          Welcome to SafeNet Companion
        </h2>

        <p style={{ margin: "0 0 1.75rem", fontSize: "0.95rem", lineHeight: 1.7, color: "#94a3b8" }}>
          To give you advice that fits your situation, we need to know your age.
          This is stored only on your device and never shared.
        </p>

        <input
          type="number"
          min={5}
          max={110}
          placeholder="Enter your age"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          style={{
            width: "100%", padding: "0.85rem 1rem",
            borderRadius: "12px",
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(255,255,255,0.06)",
            color: "#f8fafc", fontSize: "1.1rem",
            textAlign: "center", marginBottom: "0.5rem",
            outline: "none", boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#f87171", fontSize: "0.85rem", margin: "0 0 0.75rem" }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "0.75rem" }}
        >
          Let&apos;s get started
        </button>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const { ageGroup } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Show modal if age not yet set */}
      {ageGroup === null && <AgeModal />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<SafetyChatPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/detox" element={<DigitalDetox />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route
          path="*"
          element={
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
              <h1 className="text-4xl font-bold text-cyan-400">404 - Not found</h1>
              <p className="mt-4 text-lg text-slate-300">
                The page you&apos;re looking for does not exist.
              </p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;