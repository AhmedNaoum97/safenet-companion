import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="page page-home">
      <section className="hero">
        <p className="hero-kicker">Safe digital guidance for everyday users</p>

        <h1 className="hero-title">
          Stay safer online with confidence.
        </h1>

        <p className="hero-subtitle">
          SafeNet Companion helps people recognize scams, suspicious messages,
          harmful links, unsafe downloads, privacy risks, and unhealthy digital
          habits through simple guidance and supportive tools.
        </p>

        <p className="hero-text">
          Explore practical online safety advice, build stronger habits, and use
          digital wellbeing features that make your online life safer and more
          balanced.
        </p>

        <div className="hero-actions">
          <Link to="/chat" className="btn btn-primary">
            Start Safety Chat
          </Link>
          <Link to="/learn" className="btn btn-secondary">
            Explore Features
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-heading">What SafeNet Companion offers</h2>
        <p className="features-subheading">
          A modern platform that combines online safety guidance, learning tools,
          and healthier digital habits in one place.
        </p>

        <div className="features-grid">
          <article className="feature-card">
            <h3 className="feature-card-title">Safety Chat</h3>
            <p className="feature-card-text">
              Get simple guidance when something online feels suspicious, confusing,
              or unsafe. Use the chatbot to learn what to do next.
            </p>
            <Link to="/chat" className="feature-card-link">
              Open Chat
            </Link>
          </article>

          <article className="feature-card">
            <h3 className="feature-card-title">Learn Online Safety</h3>
            <p className="feature-card-text">
              Read about phishing, scams, fake websites, unsafe downloads, password
              safety, and other common online risks.
            </p>
            <Link to="/learn" className="feature-card-link">
              Start Learning
            </Link>
          </article>

          <article className="feature-card">
            <h3 className="feature-card-title">Digital Detox</h3>
            <p className="feature-card-text">
              Take healthier breaks from screens, reset your focus, and build better
              habits through simple digital wellbeing tools.
            </p>
            <Link to="/detox" className="feature-card-link">
              Visit Detox
            </Link>
          </article>

          <article className="feature-card">
            <h3 className="feature-card-title">Explore and Recharge</h3>
            <p className="feature-card-text">
              Discover parks, activities, and outdoor inspiration that encourage
              balance, reflection, and time away from digital stress.
            </p>
            <Link to="/detox" className="feature-card-link">
              Explore Parks
            </Link>
          </article>
        </div>
      </section>

      <section className="why-section">
        <div className="why-card">
          <p className="why-kicker">Why it matters</p>
          <h2 className="why-title">
            Online safety is not just about technology.
          </h2>
          <p className="why-text">
            Many people struggle with suspicious emails, scam messages, harmful
            links, privacy risks, and unhealthy digital routines. SafeNet Companion
            is designed to make online safety easier to understand while also
            encouraging healthier habits away from the screen.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;