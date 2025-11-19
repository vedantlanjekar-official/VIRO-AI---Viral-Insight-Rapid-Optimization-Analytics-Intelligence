import React from 'react';

const Step = ({ number, title, description }) => {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload or Select Virus Data',
      description: 'Upload your FASTA or PDB file, or select from our comprehensive stored virus database.'
    },
    {
      number: '02',
      title: 'Analyze Mutations',
      description: 'Get detailed information about various mutations, including structure, behavior, and potential risks.'
    },
    {
      number: '03',
      title: 'Get Drug Recommendations',
      description: 'Receive ranked antidote predictions and existing market drugs with AI-suggested chemical modifications.'
    }
  ];

  return (
    <section className="how-it-works-section">
      <h2 className="section-title">How Our System Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

