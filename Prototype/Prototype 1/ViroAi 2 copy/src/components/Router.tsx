import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import DataAnalysis from '../pages/DataAnalysis';
import GeneticResearch from '../pages/GeneticResearch';
import VirusTracking from '../pages/VirusTracking';
import MedicalInsights from '../pages/MedicalInsights';
import VisualizationTools from '../pages/VisualizationTools';
import Collaboration from '../pages/Collaboration';
import { useAuth } from '../contexts/AuthContext';

export default function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    // Protected routes - require authentication
    const protectedRoutes = ['/dashboard', '/data-analysis', '/genetic-research', '/virus-tracking', '/medical-insights', '/visualization-tools', '/collaboration'];
    
    if (protectedRoutes.includes(currentPath) && !user) {
      // Redirect to login if not authenticated
      window.location.hash = '/login';
      return <Login />;
    }

    // If user is logged in and tries to access login/signup, redirect to dashboard
    if ((currentPath === '/login' || currentPath === '/signup') && user) {
      window.location.hash = '/dashboard';
      return <Dashboard />;
    }

    // If user logs out and tries to access dashboard, force redirect to login
    if (currentPath === '/dashboard' && !user && !loading) {
      window.location.hash = '/login';
      return <Login />;
    }

    switch (currentPath) {
      case '/':
        return <Home />;
      case '/login':
        return <Login />;
      case '/signup':
        return <SignUp />;
      case '/dashboard':
        return <Dashboard />;
      case '/data-analysis':
        return <DataAnalysis />;
      case '/genetic-research':
        return <GeneticResearch />;
      case '/virus-tracking':
        return <VirusTracking />;
      case '/medical-insights':
        return <MedicalInsights />;
      case '/visualization-tools':
        return <VisualizationTools />;
      case '/collaboration':
        return <Collaboration />;
      default:
        return <Home />;
    }
  };

  return <>{renderPage()}</>;
}
