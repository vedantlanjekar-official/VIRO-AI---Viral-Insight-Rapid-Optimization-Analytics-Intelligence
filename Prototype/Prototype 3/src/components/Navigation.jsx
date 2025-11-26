import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 100px only on landing page
      if (location.pathname === '/') {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Always visible on other pages
        setIsVisible(true);
      }
    };

    // Set initial visibility based on page
    if (location.pathname === '/') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">VIRO-AI</Link>
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/analyze" 
            className={`navbar-link ${isActive('/analyze') ? 'active' : ''}`}
          >
            Analyze
          </Link>
          <Link 
            to="/drug-antidote" 
            className={`navbar-link ${isActive('/drug-antidote') ? 'active' : ''}`}
          >
            Drug / Antidote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

