import { useState } from 'react';

export default function ResearchPanel() {
  const [activeCategory, setActiveCategory] = useState('papers');

  const researchPapers = [
    {
      title: "SARS-CoV-2 Spike Protein Structure and Function Analysis",
      authors: "Chen et al.",
      journal: "Nature",
      year: "2024",
      citations: 1247,
      abstract: "Comprehensive structural analysis of the SARS-CoV-2 spike protein revealing key binding domains and mutation hotspots..."
    },
    {
      title: "Novel Antiviral Compounds Against RNA Viruses",
      authors: "Johnson et al.",
      journal: "Science",
      year: "2024",
      citations: 892,
      abstract: "Discovery of broad-spectrum antiviral compounds targeting viral RNA polymerase with high efficacy..."
    },
    {
      title: "Machine Learning Approaches to Viral Mutation Prediction",
      authors: "Wang et al.",
      journal: "Cell",
      year: "2023",
      citations: 1456,
      abstract: "AI-driven prediction models for viral evolution and mutation pathways using deep learning techniques..."
    }
  ];

  const datasets = [
    {
      name: "Global Viral Sequence Database",
      entries: "2.4M sequences",
      updated: "Daily",
      access: "Public",
      description: "Comprehensive collection of viral genomic sequences from around the world"
    },
    {
      name: "Protein Structure Repository",
      entries: "156K structures",
      updated: "Weekly",
      access: "Public",
      description: "3D protein structures including viral proteins and host cell targets"
    },
    {
      name: "Drug-Target Interaction Database",
      entries: "89K interactions",
      updated: "Monthly",
      access: "Licensed",
      description: "Curated database of drug-protein interactions for antiviral research"
    }
  ];

  const tools = [
    {
      name: "ViralPredict AI",
      category: "Prediction",
      description: "Machine learning platform for viral mutation forecasting",
      status: "Available"
    },
    {
      name: "StructureAlign Pro",
      category: "Analysis",
      description: "Advanced protein structure alignment and comparison tool",
      status: "Available"
    },
    {
      name: "DrugDiscovery Suite",
      category: "Discovery",
      description: "Integrated platform for antiviral drug discovery and optimization",
      status: "Beta"
    }
  ];

  return (
    <div className="panel-body">
      <div className="research-header" style={{marginBottom: '20px'}}>
        <h3>Research Hub</h3>
        <p>Access latest research papers, datasets, and analysis tools</p>
      </div>

      <div className="category-tabs" style={{marginBottom: '20px'}}>
        <div style={{display: 'flex', gap: '5px', borderBottom: '1px solid #ddd'}}>
          {[
            {id: 'papers', label: '📄 Papers', icon: '📄'},
            {id: 'datasets', label: '📊 Datasets', icon: '📊'},
            {id: 'tools', label: '🛠️ Tools', icon: '🛠️'}
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: activeCategory === tab.id ? '#4ecdc4' : 'transparent',
                color: activeCategory === tab.id ? 'white' : '#666',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                fontWeight: activeCategory === tab.id ? 'bold' : 'normal'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === 'papers' && (
        <div className="papers-section">
          {researchPapers.map((paper, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#fff'
            }}>
              <h4 style={{color: '#333', marginBottom: '8px', fontSize: '16px'}}>
                {paper.title}
              </h4>
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '10px',
                fontSize: '12px',
                color: '#666'
              }}>
                <span><strong>Authors:</strong> {paper.authors}</span>
                <span><strong>Journal:</strong> {paper.journal}</span>
                <span><strong>Year:</strong> {paper.year}</span>
                <span><strong>Citations:</strong> {paper.citations}</span>
              </div>
              <p style={{fontSize: '13px', color: '#555', lineHeight: '1.4'}}>
                {paper.abstract}
              </p>
              <button style={{
                marginTop: '10px',
                padding: '6px 12px',
                backgroundColor: '#4ecdc4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}>
                Read Full Paper
              </button>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'datasets' && (
        <div className="datasets-section">
          {datasets.map((dataset, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#fff'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div style={{flex: 1}}>
                  <h4 style={{color: '#333', marginBottom: '8px'}}>{dataset.name}</h4>
                  <p style={{fontSize: '13px', color: '#555', marginBottom: '10px'}}>
                    {dataset.description}
                  </p>
                  <div style={{display: 'flex', gap: '15px', fontSize: '12px'}}>
                    <span><strong>Entries:</strong> {dataset.entries}</span>
                    <span><strong>Updated:</strong> {dataset.updated}</span>
                    <span><strong>Access:</strong> {dataset.access}</span>
                  </div>
                </div>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#6bcf7f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  Access Dataset
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'tools' && (
        <div className="tools-section">
          {tools.map((tool, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#fff'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                    <h4 style={{color: '#333', margin: 0}}>{tool.name}</h4>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: '#ffd93d',
                      color: '#666',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {tool.category}
                    </span>
                  </div>
                  <p style={{fontSize: '13px', color: '#555', marginBottom: '10px'}}>
                    {tool.description}
                  </p>
                  <div style={{fontSize: '12px', color: tool.status === 'Available' ? '#4ecdc4' : '#ff9f43'}}>
                    <strong>Status:</strong> {tool.status}
                  </div>
                </div>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: tool.status === 'Available' ? '#4ecdc4' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: tool.status === 'Available' ? 'pointer' : 'not-allowed'
                }}>
                  {tool.status === 'Available' ? 'Launch Tool' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
