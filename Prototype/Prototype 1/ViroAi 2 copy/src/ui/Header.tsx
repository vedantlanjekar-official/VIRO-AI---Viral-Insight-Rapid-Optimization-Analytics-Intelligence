import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-logo">⏳</div>
          <div className="brand-name">Viro AI</div>
        </div>

        <nav className="top-nav" aria-label="Main">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#mission">Mission</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-cta">
          {user ? (
            <a className="btn primary get-started" href="#/dashboard">Go to Dashboard</a>
          ) : (
            <a className="btn primary get-started" href="#/login">Get Started</a>
          )}
        </div>
      </div>
    </header>
  );
}
