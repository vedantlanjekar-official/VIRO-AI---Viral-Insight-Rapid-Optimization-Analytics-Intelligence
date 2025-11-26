import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Left Side */}
        <div className="footer-left">
          <div className="footer-branding">
            <span className="footer-logo-text">VIRO-AI</span>
            
            <a 
              href="https://drive.google.com/drive/folders/1BQ701dxHz6_xExREs6aze_4dtTX07OtU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-icon-link"
              title="Google Drive"
            >
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.71 3.5L1.15 15l3.98 6.5L12 9.5 7.71 3.5zM12 9.5l6.29 12h-8.48L12 9.5zm6.29 12L23 15l-6.56-11.5-3.98 6.5L18.29 21.5z"/>
              </svg>
            </a>
            
            <a 
              href="https://youtu.be/IXgFhYPbbvY?si=muieDPJy5rPl2HXd" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-icon-link"
              title="YouTube"
            >
              <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
            <a 
              href="tel:+917499489664" 
              className="footer-icon-link footer-phone"
              title="Call us"
            >
              <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="phone-number">+91 7499489664</span>
            </a>
          </div>
          
          <p className="footer-tagline">
            Powered by Viral Insight & Rapid Optimization Analytics Intelligence
          </p>
        </div>
        
        {/* Right Side - Logo */}
        <div className="footer-right">
          <img 
            src="/bg_component2_viro.png" 
            alt="Viro-AI Logo" 
            className="footer-logo-image"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
