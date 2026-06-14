import { useAppStore } from "../state/appStore";
import type { AgeGroup } from "../state/appStore";

// ── Tip data ──────────────────────────────────────────────────────────────────
type Tip = {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
};

const tips: Record<AgeGroup, Tip[]> = {
  child: [
    { title: "Never share personal information", description: "Your full name, address, school, and phone number are private. Never give these to someone you only know online, even if they seem friendly.", severity: "high" },
    { title: "Ask a trusted adult first", description: "If someone online you don't know starts talking to you, show the conversation to a parent or teacher before replying.", severity: "high" },
    { title: "You never have to send photos", description: "No one should ever ask you to send photos of yourself. If someone does, stop talking to them and tell an adult immediately. It is never your fault.", severity: "high" },
    { title: "Be careful what you click", description: "Some links and pop-ups try to trick you. If something looks strange or too good to be true, don't click it — ask an adult first.", severity: "medium" },
    { title: "Tell someone if something feels wrong", description: "If something online makes you feel scared or uncomfortable, you are not in trouble for telling an adult. It is always OK to ask for help.", severity: "medium" },
    { title: "Keep your passwords secret", description: "Your password is like a key to your house. Don't share it with friends, classmates, or anyone online.", severity: "low" },
  ],
  teen: [
    { title: "Sextortion is a crime — never your fault", description: "If someone is threatening to share your photos unless you pay or send more, this is sextortion. Stop all contact, do not pay, and report to Kripos at tips.kripos.no immediately.", severity: "high" },
    { title: "Check who is really messaging you", description: "Fake profiles are common. Someone claiming to be your age could be an adult. Video call before trusting anyone you met online.", severity: "high" },
    { title: "Once a photo is sent, you lose control", description: "Even trusted people can share images without your permission. Never send anything you would not want a parent or employer to see.", severity: "high" },
    { title: "Recognise grooming behaviour", description: "Grooming often looks like: excessive compliments, wanting to keep your friendship secret, and slowly pushing boundaries. Trust your gut — if something feels off, it probably is.", severity: "high" },
    { title: "Social media scams targeting teens", description: "Fake giveaways, fake job offers, and fake romantic interest are common. If it sounds too good to be true, it is.", severity: "medium" },
    { title: "Use strong, unique passwords", description: "If your email password is the same as your Instagram password, one breach exposes everything. Use a password manager or at least make each password different.", severity: "low" },
  ],
  adult: [
    { title: "How to recognise a phishing email", description: "Phishing emails pretend to be from your bank, Netflix, or government agencies. Warning signs: urgent language, generic greeting, suspicious sender address, and links that don't match the real site.", severity: "high" },
    { title: "Verify before transferring money", description: "If you get a message asking you to urgently transfer money — even from someone you know — call them directly to confirm. Accounts get hacked, and this is one of the most common scams.", severity: "high" },
    { title: "How to spot a fake website", description: "Check the URL carefully for slight misspellings. Look for HTTPS. When in doubt, type the address directly into your browser instead of clicking a link.", severity: "high" },
    { title: "Keep software and apps updated", description: "Most malware exploits security holes in outdated software. Enable automatic updates on your phone, computer, and browser.", severity: "medium" },
    { title: "Use two-factor authentication", description: "2FA means that even if someone steals your password, they still cannot log in without a second code. Enable it on your email, bank, and social media accounts.", severity: "medium" },
    { title: "Use a password manager", description: "Tools like Bitwarden (free) generate and store strong, unique passwords for every site. You only need to remember one master password.", severity: "low" },
  ],
  senior: [
    { title: "Grandparent scam — know it before it hits", description: "Scammers call pretending to be a grandchild in trouble, asking for urgent money. Always hang up and call the grandchild directly on their real number first.", severity: "high" },
    { title: "Your bank will never ask for your PIN", description: "If someone calls claiming to be from your bank and asks for your PIN, card number, or online password — hang up immediately. Banks never ask for this over the phone.", severity: "high" },
    { title: "Beware of tech support scams", description: "Pop-ups saying your computer is infected, or callers claiming to be from Microsoft or Apple, are almost always scams. Legitimate companies do not contact you unsolicited about your device.", severity: "high" },
    { title: "Think before clicking links", description: "A link in an email or text from an unknown sender can install malware. When in doubt, go directly to the website by typing the address yourself.", severity: "medium" },
    { title: "How to report scams in Norway", description: "If you think you have been targeted by a scam, report it to the police at politiet.no or contact Datatilsynet at datatilsynet.no.", severity: "medium" },
    { title: "Protect your identity online", description: "Use different passwords for different accounts and consider a PIN on your phone. If you think your identity has been stolen, contact your bank and BankID immediately.", severity: "low" },
  ],
};

// ── Severity badge ─────────────────────────────────────────────────────────────
function SeverityBadge({ severity }: { severity: Tip["severity"] }) {
  const map = {
    high:   { bg: "rgba(239,68,68,0.15)",   color: "#fca5a5", border: "rgba(239,68,68,0.3)",   label: "High priority" },
    medium: { bg: "rgba(251,191,36,0.15)",  color: "#fcd34d", border: "rgba(251,191,36,0.3)",  label: "Good to know" },
    low:    { bg: "rgba(52,211,153,0.15)",  color: "#6ee7b7", border: "rgba(52,211,153,0.3)",  label: "Best practice" },
  }[severity];

  return (
    <span style={{
      background: map.bg, color: map.color,
      border: `1px solid ${map.border}`,
      display: "inline-block",
      padding: "0.2rem 0.65rem", borderRadius: "999px",
      fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.75rem",
    }}>
      {map.label}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
function LearnPage() {
  const { ageGroup, age } = useAppStore();
  const group = ageGroup ?? "adult";
  const pageTips = tips[group];

  const groupLabel: Record<string, string> = {
    child: "for children", teen: "for teenagers",
    adult: "for adults", senior: "for older adults",
  };

  return (
    <main className="page">
      <div className="page-header" style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "#f8fafc", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, margin: "0 0 0.5rem" }}>
          Online safety tips {groupLabel[group]}
        </h1>
        <p style={{ color: "#94a3b8", margin: 0 }}>
          Based on your age ({age}), here are the most important things to know.
          These are real risks — not just theory.
        </p>
      </div>

      <div className="features-grid">
        {pageTips.map((tip) => (
          <article key={tip.title} className="feature-card">
            <SeverityBadge severity={tip.severity} />
            <h3 className="feature-card-title">{tip.title}</h3>
            <p className="feature-card-text">{tip.description}</p>
          </article>
        ))}
      </div>

      <p style={{ marginTop: "2.5rem", color: "#475569", fontSize: "0.85rem", textAlign: "center" }}>
        Have a specific question?{" "}
        <a href="/chat" style={{ color: "#38bdf8" }}>Ask the Safety Chat.</a>
      </p>
    </main>
  );
}

export default LearnPage;