export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="logo-square">⏳</div>
          <div>
            <strong>Viro AI</strong>
            <div className="muted">Advancing healthcare through artificial intelligence.</div>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Documentation</a>
            <a href="#">API</a>
          </div>

          <div>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="copyright">© {new Date().getFullYear()} Viro AI. All rights reserved.</div>
    </footer>
  );
}
