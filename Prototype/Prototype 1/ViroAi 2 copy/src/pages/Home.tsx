import FeatureCard from "../components/FeatureCard";

/* Professional DNA visualization with vibrant colors - perfect for AI/biotech */
const HERO_IMG = "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1600&auto=format&fit=crop&crop=entropy";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero bg-hero">
        <div className="container hero-inner">
          <div className="hero-left">
            <h1>Revolutionizing Healthcare with AI Intelligence</h1>
            <p className="lead">
              Empowering medical researchers and healthcare professionals with advanced AI-driven tools 
              for virus detection, genetic analysis, and breakthrough medical discoveries that save lives.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#/login">Explore Platform →</a>
            </div>
          </div>

          <div className="hero-right">
            <img src={HERO_IMG} alt="Viro AI illustration" className="hero-image" />
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="section white" id="about">
        <div className="container">
          <h2 className="section-title center">What is Viro AI?</h2>
          <p className="section-sub center">
            Viro AI is a cutting-edge healthcare technology platform that combines artificial intelligence 
            with medical research to accelerate virus identification, genetic sequencing, and clinical 
            decision-making for better patient outcomes worldwide.
          </p>

          <div className="features-row">
            <FeatureCard
              title="AI-Powered Virus Detection"
              text="Advanced machine learning algorithms identify viral patterns and mutations in real-time, enabling rapid response to emerging health threats."
              icon="🦠"
            />
            <FeatureCard
              title="Genetic Analysis & Sequencing"
              text="Comprehensive genomic analysis tools that decode DNA sequences and identify genetic markers for personalized medicine approaches."
              icon="�"
            />
            <FeatureCard
              title="Clinical Intelligence Platform"
              text="Transform complex medical data into actionable insights with our AI-driven analytics platform designed for healthcare professionals."
              icon="�"
            />
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="section light" id="features">
        <div className="container">
          <h2 className="section-title center">Platform Features</h2>
          <p className="section-sub center">Comprehensive tools and resources designed for healthcare professionals and researchers.</p>

          <div className="grid-3">
            <div className="card small">
              <h4>AI Data Analysis</h4>
              <p>Advanced statistical analysis and machine learning algorithms for processing large-scale medical datasets with real-time insights.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>

            <div className="card small">
              <h4>Genetic Research</h4>
              <p>Comprehensive genomic analysis tools for identifying genetic patterns and mutations for personalized medicine approaches.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>

            <div className="card small">
              <h4>Virus Tracking</h4>
              <p>Real-time monitoring and prediction of viral outbreaks using advanced epidemiological modeling and AI surveillance.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>

            <div className="card small">
              <h4>Medical Insights</h4>
              <p>AI-powered diagnostic support and treatment recommendations based on comprehensive clinical data analysis.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>

            <div className="card small">
              <h4>Visualization Tools</h4>
              <p>Interactive dashboards and 3D visualization tools for presenting complex medical data in actionable formats.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>

            <div className="card small">
              <h4>Research Collaboration</h4>
              <p>Secure platform for researchers and healthcare professionals to collaborate on projects and share medical discoveries.</p>
              <a className="learn" href="#/login">Login to Access →</a>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION BAND */}
      <section id="mission" className="mission-band">
        <div className="container center">
          <h3>Our Mission</h3>
          <p className="mission-text">
            At Viro AI, we're committed to transforming global healthcare through intelligent technology. 
            Our mission is to accelerate medical breakthroughs by providing researchers and clinicians 
            with powerful AI tools that detect viruses faster, analyze genetic data more accurately, 
            and ultimately save more lives through precision medicine.
          </p>

          <div className="mission-tags">
            <span>✔ Faster Virus Detection</span>
            <span>✔ Precision Medicine</span>
            <span>✔ Global Health Impact</span>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section white">
        <div className="container center">
          <h2>Ready to Transform Healthcare?</h2>
          <p className="section-sub">Join leading healthcare institutions and researchers who are already using Viro AI to advance medical science and improve patient care.</p>

          <div className="cta-row">
            <a className="btn primary" href="#/login">Explore Platform</a>
          </div>
        </div>
      </section>
    </main>
  );
}
