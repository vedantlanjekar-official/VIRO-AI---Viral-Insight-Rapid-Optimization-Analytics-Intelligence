import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: '🧬',
      title: 'MUTATION PREDICTION',
      description: 'Advanced AI algorithms predict potential viral mutations and their likelihood of occurrence.'
    },
    {
      icon: '⚠️',
      title: 'DEADLINESS SCORE ANALYSIS',
      description: 'Comprehensive risk assessment scoring system to evaluate viral threat levels.'
    },
    {
      icon: '🩺',
      title: 'PREDICTED CLINICAL SYMPTOMS',
      description: 'Machine learning models forecast clinical manifestations and disease progression.'
    },
    {
      icon: '💊',
      title: 'TOP DRUG CANDIDATES',
      description: 'Ranked by binding affinity - identify the most promising therapeutic compounds.'
    },
    {
      icon: '🔬',
      title: '3D MOLECULAR VISUALIZATION',
      description: 'Interactive 3D models of protein structures and drug-target interactions.'
    },
    {
      icon: '🧪',
      title: 'AI-SUGGESTED MODIFICATIONS',
      description: 'Chemical structure recommendations to enhance drug efficacy and specificity.'
    },
    {
      icon: '📋',
      title: 'ACTIONABLE RECOMMENDATIONS',
      description: 'Evidence-based treatment protocols and intervention strategies.'
    },
    {
      icon: '💬',
      title: 'INTERACTIVE CHATBOT',
      description: 'AI-powered assistant for real-time queries and research guidance.'
    }
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Our Powerful Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;

