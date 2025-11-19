import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideImage from './SideImage';
import Navigation from './Navigation';
import Abstract from './Abstract';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Viro-AI Frontend Loaded Successfully");

    // Fade-in animation for side images and center text
    const images = document.querySelectorAll(".side-image, .hero-title");
    images.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transition = `opacity 1.2s ease ${index * 0.3}s`;
      setTimeout(() => {
        el.style.opacity = "1";
      }, 100);
    });
  }, []);

  const handleAnalyzeClick = () => {
    navigate('/analyze');
  };

  return (
    <>
      {/* Background DNA Animation - stays in the back */}
      <iframe 
        id="dna-background" 
        src="https://my.spline.design/dnaparticles-KjocSiUnOi078lOnI6RISNof/" 
        frameBorder="0"
        title="DNA Background Animation"
      />

      {/* Left and Right Side Components - kept intact with original positioning */}
      <SideImage 
        src="/bg_component1_viro.png" 
        alt="DNA Helix Left" 
        position="left" 
      />
      <SideImage 
        src="/bg_component1_viro.png" 
        alt="DNA Helix Right" 
        position="right" 
      />

      {/* Navigation Bar - appears on scroll */}
      <Navigation />

      {/* Hero Title */}
      <section className="hero-section">
        <div className="hero-title">
          <h1>VIRO-AI</h1>
          <p>Viral Insight & Rapid Optimization Analytics Intelligence</p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="main-content">
        <Abstract onAnalyzeClick={handleAnalyzeClick} />
        <Features />
        <HowItWorks />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Landing;
