import { useAppStore } from "../state/appStore";
import type { AgeGroup } from "../state/appStore";

// ── Resource data ─────────────────────────────────────────────────────────────
type Resource = {
  name: string;
  description: string;
  url: string;
  category: "Reporting" | "Tools" | "Guides" | "Support";
};

const resources: Record<AgeGroup, Resource[]> = {
  child: [
    { name: "Barnevakten", description: "Norwegian organisation helping children and parents navigate digital life safely. Great guides written for young people.", url: "https://www.barnevakten.no", category: "Guides" },
    { name: "Slettmeg.no", description: "Norwegian service that helps you remove personal information, photos, or content from the internet.", url: "https://www.slettmeg.no", category: "Support" },
    { name: "Redd Barna", description: "Save the Children Norway's resources on online safety for children and their parents.", url: "https://www.reddbarna.no", category: "Guides" },
    { name: "Tips to Kripos", description: "Norway's National Criminal Investigation Service. Report online abuse, grooming, or illegal content here.", url: "https://tips.kripos.no", category: "Reporting" },
  ],
  teen: [
    { name: "Tips to Kripos", description: "Report sextortion, online threats, grooming, or any other online crime to Norway's national criminal investigation service.", url: "https://tips.kripos.no", category: "Reporting" },
    { name: "Slettmeg.no", description: "If a photo or video of you has been shared without your consent, this service can help you get it removed.", url: "https://www.slettmeg.no", category: "Support" },
    { name: "Barnevakten", description: "Practical guides on social media safety, what to do if you're being bullied online, and how to protect your privacy.", url: "https://www.barnevakten.no", category: "Guides" },
    { name: "Hjelpelinjen", description: "If something online has affected your mental health or you need someone to talk to, call 116 123 (free, 24/7).", url: "https://www.mentalhelse.no/hjelpelinjen", category: "Support" },
    { name: "Datatilsynet", description: "Norway's Data Protection Authority. Explains your rights regarding your personal data, photos, and online profiles.", url: "https://www.datatilsynet.no", category: "Guides" },
  ],
  adult: [
    { name: "NCSC Norway — NSM", description: "Norway's National Security Authority. Publishes practical security advice for individuals and organisations.", url: "https://www.nsm.no", category: "Guides" },
    { name: "Have I Been Pwned", description: "Check if your email or password has been exposed in a known data breach. Free service by security researcher Troy Hunt.", url: "https://haveibeenpwned.com", category: "Tools" },
    { name: "Bitwarden", description: "Free, open-source password manager. Generates and stores strong, unique passwords for every website you use.", url: "https://bitwarden.com", category: "Tools" },
    { name: "Report to Police", description: "If you have been scammed or defrauded online, file a report with the Norwegian police at politiet.no.", url: "https://www.politiet.no/anmeldelse", category: "Reporting" },
    { name: "Datatilsynet", description: "Report misuse of your personal data, or learn about your rights under GDPR and Norwegian data protection law.", url: "https://www.datatilsynet.no", category: "Reporting" },
    { name: "Get Safe Online", description: "Free expert advice on how to stay safe online. Covers phishing, malware, fraud, and social media.", url: "https://www.getsafeonline.org", category: "Guides" },
  ],
  senior: [
    { name: "Report to Police", description: "If you have been contacted by scammers or lost money to fraud, file a report at politiet.no. It helps protect others too.", url: "https://www.politiet.no/anmeldelse", category: "Reporting" },
    { name: "NCSC Norway — NSM", description: "Simple, trustworthy security guidance from Norway's national security authority, including phone and email safety.", url: "https://www.nsm.no", category: "Guides" },
    { name: "BankID", description: "If you believe your identity or BankID has been stolen or misused, contact BankID Norge immediately.", url: "https://www.bankid.no", category: "Support" },
    { name: "Datatilsynet", description: "If a company or person has misused your personal information, you can file a complaint here.", url: "https://www.datatilsynet.no", category: "Reporting" },
    { name: "Seniornet Norway", description: "Organisation helping older adults use technology confidently and safely. Offers courses and guides in Norwegian.", url: "https://www.seniornet.no", category: "Guides" },
    { name: "Hjelpelinjen", description: "If fraud or an online experience has affected you emotionally, this helpline is free — call 116 123 at any time.", url: "https://www.mentalhelse.no/hjelpelinjen", category: "Support" },
  ],
};

// ── Category badge ─────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: Resource["category"] }) {
  const map = {
    Reporting: { bg: "rgba(239,68,68,0.12)",   color: "#fca5a5", border: "rgba(239,68,68,0.25)" },
    Tools:     { bg: "rgba(56,189,248,0.12)",  color: "#7dd3fc", border: "rgba(56,189,248,0.25)" },
    Guides:    { bg: "rgba(52,211,153,0.12)",  color: "#6ee7b7", border: "rgba(52,211,153,0.25)" },
    Support:   { bg: "rgba(167,139,250,0.12)", color: "#c4b5fd", border: "rgba(167,139,250,0.25)" },
  }[category];

  return (
    <span style={{
      background: map.bg, color: map.color, border: `1px solid ${map.border}`,
      display: "inline-block", padding: "0.2rem 0.65rem",
      borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.75rem",
    }}>
      {category}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
function ResourcesPage() {
  const { ageGroup, age } = useAppStore();
  const group = ageGroup ?? "adult";
  const list = resources[group];

  const groupLabel: Record<string, string> = {
    child: "for children", teen: "for teenagers",
    adult: "for adults", senior: "for older adults",
  };

  return (
    <main className="page">
      <div className="page-header" style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "#f8fafc", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, margin: "0 0 0.5rem" }}>
          Help &amp; resources {groupLabel[group]}
        </h1>
        <p style={{ color: "#94a3b8", margin: 0 }}>
          Based on your age ({age}), these are the most relevant places to get help,
          report problems, or learn more about staying safe online in Norway.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {list.map((r) => (
          <article key={r.name} className="feature-card" style={{ display: "flex", flexDirection: "column" }}>
            <CategoryBadge category={r.category} />
            <h3 className="feature-card-title" style={{ marginBottom: "0.5rem" }}>{r.name}</h3>
            <p className="feature-card-text" style={{ flex: 1 }}>{r.description}</p>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="feature-card-link"
              style={{ alignSelf: "flex-start", marginTop: "auto" }}
            >
              Visit site →
            </a>
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

export default ResourcesPage;