import { useState } from "react";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import Predictions from "../ui/Predictions";
import Antidotes from "../ui/Antidotes";
import VirusInfo from "../ui/VirusInfo";
import ThreeDPanel from "../ui/ThreeDPanel";
import MutationsPanel from "../ui/MutationsPanel";
import ResearchPanel from "../ui/ResearchPanel";
import VisualizationsPanel from "../ui/VisualizationsPanel";
import ReportsPanel from "../ui/ReportsPanel";
import ChatbotPanel from "../ui/ChatbotPanel";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'mutations':
        return (
          <div className="content">
            <header className="page-header">
              <h1>Viral Mutations Analysis</h1>
              <p>Track and analyze key mutations across different viral proteins</p>
            </header>
            <div className="panel large">
              <MutationsPanel />
            </div>
          </div>
        );
      case 'antidotes':
        return (
          <div className="content">
            <header className="page-header">
              <h1>Antidote Development</h1>
              <p>Research and development of antiviral compounds and therapies</p>
            </header>
            <div className="panel large">
              <Antidotes />
            </div>
          </div>
        );
      case 'research':
        return (
          <div className="content">
            <header className="page-header">
              <h1>Research Hub</h1>
              <p>Access latest research papers, datasets, and analysis tools</p>
            </header>
            <div className="panel large">
              <ResearchPanel />
            </div>
          </div>
        );
      case 'visualizations':
        return (
          <div className="content">
            <header className="page-header">
              <h1>Data Visualizations</h1>
              <p>Interactive charts and graphs for viral data analysis</p>
            </header>
            <div className="panel large">
              <VisualizationsPanel />
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="content">
            <header className="page-header">
              <h1>Research Reports</h1>
              <p>Generate, access, and manage research reports and analytics</p>
            </header>
            <div className="panel large">
              <ReportsPanel />
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="content">
            <header className="page-header">
              <h1>ViroAI Assistant</h1>
              <p>AI-powered research assistant for viral analysis and insights</p>
            </header>
            <div className="panel large">
              <ChatbotPanel />
            </div>
          </div>
        );
      default:
        return (
          <div className="content">
            <header className="page-header">
              <h1>Virus Research Dashboard</h1>
              <p>Real-time analysis and predictions for viral mutations and antidote development</p>
            </header>

            <div className="panels-row">
              <div className="panel">
                <div className="panel-header">Future Mutation Predictions</div>
                <Predictions />
              </div>

              <div className="panel">
                <div className="panel-header">Antidote Information</div>
                <Antidotes />
              </div>

              <div className="panel">
                <div className="panel-header">Virus Description</div>
                <VirusInfo />
              </div>
            </div>

            <div className="panel large">
              <div className="panel-header flex-between">
                <span>3D Virus-Protein Interaction</span>
              </div>
              <ThreeDPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="dashboard-main">
        <Topbar />
        {renderContent()}
      </div>
    </div>
  );
}
