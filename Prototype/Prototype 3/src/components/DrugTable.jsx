import React from 'react';
import ProgressBar from './ProgressBar';

const DrugTable = ({ drugs: backendDrugs }) => {
  // Fallback data if backend is not available
  const fallbackDrugs = [
    {
      rank: 1,
      drug_name: "Remdesivir",
      drawbacks: "Limited efficacy, side effects",
      improvement: "Enhanced binding affinity, reduced toxicity",
      predicted_affinity: 0.85,
      estimated_ic50_nm: 100
    },
    {
      rank: 2,
      drug_name: "Paxlovid",
      drawbacks: "Drug interactions, resistance potential",
      improvement: "Modified protease inhibition",
      predicted_affinity: 0.78,
      estimated_ic50_nm: 150
    },
    {
      rank: 3,
      drug_name: "Molnupiravir",
      drawbacks: "Mutagenic concerns, variable response",
      improvement: "Safer nucleotide analogue design",
      predicted_affinity: 0.72,
      estimated_ic50_nm: 200
    },
    {
      rank: 4,
      drug_name: "Favipiravir",
      drawbacks: "Moderate efficacy, toxicity",
      improvement: "Optimized ribavirin analogue",
      predicted_affinity: 0.65,
      estimated_ic50_nm: 300
    },
    {
      rank: 5,
      drug_name: "Ivermectin",
      drawbacks: "Low specificity, limited evidence",
      improvement: "Targeted viral protein binding",
      predicted_affinity: 0.45,
      estimated_ic50_nm: 500
    },
    {
      rank: 6,
      drug_name: "Hydroxychloroquine",
      drawbacks: "Ineffective, cardiac risks",
      improvement: "Complete structural redesign",
      predicted_affinity: 0.25,
      estimated_ic50_nm: 1000
    }
  ];

  // Use backend drugs if available, otherwise use fallback
  const drugs = backendDrugs || fallbackDrugs;

  // Map backend drug data to table format
  const mappedDrugs = drugs.map(drug => ({
    rank: drug.rank,
    name: drug.drug_name,
    drawbacks: getDrawbacks(drug.drug_name),
    improvement: getImprovement(drug.drug_name),
    affinity: Math.round((drug.predicted_affinity || 0) * 100), // Convert 0-1 to percentage
    ic50: drug.estimated_ic50_nm || 0,
    bindingStrength: drug.binding_strength || ''
  }));

  // Get common drawbacks for known drugs
  function getDrawbacks(drugName) {
    const knownDrawbacks = {
      'Remdesivir': 'Limited efficacy, side effects',
      'Nirmatrelvir': 'Drug interactions, renal impairment',
      'Paxlovid': 'Drug interactions, resistance potential',
      'Molnupiravir': 'Mutagenic concerns, variable response',
      'Favipiravir': 'Moderate efficacy, toxicity',
      'Oseltamivir': 'Resistance development, limited spectrum',
      'Zanamivir': 'Administration route, limited efficacy',
      'Baloxavir': 'Resistance mutations, cost',
      'Peramivir': 'Intravenous only, limited data',
      'Daclatasvir': 'Genotype specific, drug interactions',
      'Rilpivirine': 'Resistance mutations, dietary restrictions',
      'Glecaprevir': 'Liver toxicity risk, resistance'
    };
    return knownDrawbacks[drugName] || 'Limited efficacy data, potential side effects';
  }

  // Get AI improvement suggestions
  function getImprovement(drugName) {
    const knownImprovements = {
      'Remdesivir': 'Enhanced binding affinity, reduced toxicity',
      'Nirmatrelvir': 'Improved oral bioavailability',
      'Paxlovid': 'Modified protease inhibition, broader spectrum',
      'Molnupiravir': 'Safer nucleotide analogue design',
      'Favipiravir': 'Optimized ribavirin analogue',
      'Oseltamivir': 'Resistance-proof modifications',
      'Zanamivir': 'Oral formulation development',
      'Baloxavir': 'Mutation-resistant binding site',
      'Peramivir': 'Oral bioavailability enhancement',
      'Daclatasvir': 'Pan-genotypic modifications',
      'Rilpivirine': 'Higher genetic barrier modifications',
      'Glecaprevir': 'Reduced hepatotoxicity, pan-viral activity'
    };
    return knownImprovements[drugName] || 'Optimize binding affinity and reduce toxicity';
  }

  const getAffinityColor = (score) => {
    if (score >= 70) return 'green';
    if (score >= 40) return 'orange';
    return 'red';
  };

  return (
    <div className="drug-table-container">
      <div className="table-wrapper">
        <table className="drugs-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Drug Name</th>
              <th>Drawbacks</th>
              <th>AI Suggested Improvement</th>
              <th>Binding Affinity</th>
            </tr>
          </thead>
          <tbody>
            {mappedDrugs.map((drug) => (
              <tr key={drug.rank}>
                <td className="rank-cell">
                  <span className="rank-number">{drug.rank}</span>
                </td>
                <td className="drug-name-cell">
                  <strong>{drug.name}</strong>
                  {drug.ic50 > 0 && (
                    <div style={{ fontSize: '0.75rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                      IC50: {drug.ic50.toFixed(1)} nM
                    </div>
                  )}
                </td>
                <td className="drawbacks-cell">
                  {drug.drawbacks}
                </td>
                <td className="improvement-cell">
                  {drug.improvement}
                </td>
                <td className="affinity-cell">
                  <div className="affinity-container">
                    <ProgressBar 
                      score={drug.affinity} 
                      color={getAffinityColor(drug.affinity)}
                      size="small"
                    />
                    <span className="affinity-score">{drug.affinity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrugTable;
