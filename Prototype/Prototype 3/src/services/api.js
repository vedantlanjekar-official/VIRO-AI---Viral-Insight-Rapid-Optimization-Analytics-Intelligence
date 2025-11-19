/**
 * Viro-AI API Service
 * Handles all communication with the Python FastAPI backend
 */

import axios from 'axios';

// API Base URL - can be changed via environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for drug screening
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] ${error.response.status}: ${error.response.data?.detail || 'Unknown error'}`);
    } else if (error.request) {
      console.error('[API Error] No response received from server');
    } else {
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  }
);

// ============================================
// API ENDPOINTS
// ============================================

/**
 * Health Check - Verify API is running
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get list of supported viruses and their proteins
 */
export const getViruses = async () => {
  try {
    const response = await apiClient.get('/viruses');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Predict drug-virus binding affinity
 * @param {Object} params - Prediction parameters
 * @param {string} params.virus_id - Virus ID (e.g., "SARS-CoV-2")
 * @param {string} params.protein_pdb_id - Protein PDB ID (e.g., "6VXX")
 * @param {string[]} params.drug_ids - Optional: specific drug IDs to test
 * @param {number} params.top_n - Number of top candidates to return (default: 10)
 */
export const predictBinding = async ({ virus_id, protein_pdb_id, drug_ids = null, top_n = 10 }) => {
  try {
    const response = await apiClient.post('/predict', {
      virus_id,
      protein_pdb_id,
      drug_ids,
      top_n,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || error.message,
    };
  }
};

/**
 * Get top drugs for a specific virus (quick screening)
 * @param {string} virusId - Virus ID
 * @param {number} limit - Number of top drugs to return
 */
export const getTopDrugs = async (virusId, limit = 10) => {
  try {
    const response = await apiClient.get(`/top_drugs/${virusId}`, {
      params: { limit },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || error.message,
    };
  }
};

/**
 * Get protein structure file (PDB format)
 * Note: This will need to be implemented on backend if needed
 * @param {string} virusId - Virus ID
 * @param {string} pdbId - PDB ID
 */
export const getProteinStructure = async (virusId, pdbId) => {
  try {
    // For now, return the local path - backend doesn't expose PDB files yet
    // In future, this could fetch from AlphaFold API
    return {
      success: true,
      data: {
        pdb_id: pdbId,
        virus: virusId,
        // Path to local PDB file
        local_path: `Viroai_DataBase/structural/${virusId}/proteins/${pdbId}.pdb`,
        // Placeholder for future AlphaFold integration
        alphafold_url: null,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// ============================================
// MOCK DATA FOR MUTATIONS (until backend provides)
// ============================================

/**
 * Get mutation data for a virus
 * Note: Backend doesn't currently provide mutation endpoints
 * This uses mock data matching the frontend structure
 */
export const getVirusMutations = (virusId) => {
  const mutationsData = {
    'SARS-CoV-2': [
      {
        id: 'alpha',
        name: 'Alpha (B.1.1.7)',
        variant: 'ALPHA',
        lineage: 'B.1.1.7',
        description: 'First identified in the UK. Features N501Y mutation with 50% higher transmission rate.',
        position: 501,
        type: 'Spike Protein N501Y',
        impact: 'HIGH',
        deadlinessScore: 78,
        prevalence: '95%',
        region: 'United Kingdom',
        firstDetected: 'September 2020',
        affectedOrgans: {
          'Lungs': 'Causes severe inflammation leading to reduced oxygen exchange and potential ARDS',
          'Heart': 'Can lead to myocarditis and cardiac arrhythmias due to systemic inflammation',
          'Brain': 'Neurological complications including brain fog and cognitive impairment',
          'Vascular System': 'Increases blood clotting risk leading to thrombosis'
        },
        symptoms: [
          { symptom: 'Persistent dry cough', explanation: 'indicating severe airway inflammation and irritation' },
          { symptom: 'High fever (>38.5°C)', explanation: 'caused by intense immune response to infection' },
          { symptom: 'Fatigue and weakness', explanation: 'resulting from systemic viral load and immune activation' },
          { symptom: 'Loss of taste/smell', explanation: 'due to olfactory nerve damage from viral invasion' },
          { symptom: 'Difficulty breathing', explanation: 'from lung inflammation and reduced oxygen capacity' }
        ],
        transmissibility: 85,
        immuneEvasion: 70,
        severity: 78,
        proteinChange: 'N501Y mutation in spike protein RBD enhances ACE2 binding affinity by 3-4 fold'
      },
      {
        id: 'beta',
        name: 'Beta (B.1.351)',
        variant: 'BETA',
        lineage: 'B.1.351',
        description: 'Emerged in South Africa. Contains E484K mutation causing significant immune escape.',
        position: 484,
        type: 'Spike Protein E484K',
        impact: 'HIGH',
        deadlinessScore: 85,
        prevalence: '75%',
        region: 'South Africa',
        firstDetected: 'October 2020',
        affectedOrgans: {
          'Lungs': 'Severe pneumonia with extensive alveolar damage and respiratory failure',
          'Heart': 'Myocardial inflammation and potential for long-term cardiac damage',
          'Immune System': 'Evades neutralizing antibodies reducing vaccine effectiveness',
          'Kidneys': 'Acute kidney injury from direct viral infection and systemic effects'
        },
        symptoms: [
          { symptom: 'Severe respiratory distress', explanation: 'with rapid progression to hypoxemia requiring ventilation' },
          { symptom: 'Persistent high fever', explanation: 'above 39°C lasting multiple days despite treatment' },
          { symptom: 'Extreme fatigue', explanation: 'debilitating exhaustion even after mild exertion' },
          { symptom: 'Muscle and body aches', explanation: 'widespread myalgia from inflammatory cytokine release' },
          { symptom: 'Breakthrough infections', explanation: 'can infect previously vaccinated individuals' }
        ],
        transmissibility: 82,
        immuneEvasion: 88,
        severity: 85,
        proteinChange: 'E484K, K417N, and N501Y mutations create escape from antibody neutralization'
      },
      {
        id: 'gamma',
        name: 'Gamma (P.1)',
        variant: 'GAMMA',
        lineage: 'P.1',
        description: 'Brazilian variant with triple mutation (K417T, E484K, N501Y). Higher reinfection risk.',
        position: 417,
        type: 'Spike Protein Triple Mutation',
        impact: 'HIGH',
        deadlinessScore: 80,
        prevalence: '65%',
        region: 'Brazil',
        firstDetected: 'November 2020',
        affectedOrgans: {
          'Lungs': 'Bilateral pneumonia with ground-glass opacities and severe hypoxia',
          'Liver': 'Hepatocellular injury with elevated transaminase levels',
          'Digestive System': 'Gastrointestinal symptoms including diarrhea and nausea',
          'Blood Vessels': 'Endothelial dysfunction leading to microthrombi formation'
        },
        symptoms: [
          { symptom: 'Severe shortness of breath', explanation: 'rapid onset dyspnea requiring immediate oxygen therapy' },
          { symptom: 'Gastrointestinal distress', explanation: 'nausea, vomiting, and diarrhea from intestinal viral replication' },
          { symptom: 'Blood clotting issues', explanation: 'hypercoagulability causing pulmonary embolism risk' },
          { symptom: 'Reinfection susceptibility', explanation: 'can reinfect previously infected individuals within months' },
          { symptom: 'Prolonged viral shedding', explanation: 'extended infectivity period beyond typical duration' }
        ],
        transmissibility: 88,
        immuneEvasion: 85,
        severity: 80,
        proteinChange: 'K417T, E484K, N501Y triple mutation enhances receptor binding and immune evasion'
      },
      {
        id: 'delta',
        name: 'Delta (B.1.617.2)',
        variant: 'DELTA',
        lineage: 'B.1.617.2',
        description: 'Dominant variant in 2021. L452R and T478K mutations increase viral load 1000-fold.',
        position: 452,
        type: 'Spike Protein L452R+T478K',
        impact: 'VERY HIGH',
        deadlinessScore: 88,
        prevalence: '92%',
        region: 'India',
        firstDetected: 'October 2020',
        affectedOrgans: {
          'Lungs': 'Rapid bilateral pneumonia progression with severe ARDS requiring ICU admission',
          'Heart': 'Acute myocarditis and pericarditis with elevated troponin levels',
          'Blood': 'Severe lymphopenia and hypercoagulability with D-dimer elevation',
          'Nervous System': 'Encephalitis and stroke risk from neurotropic invasion'
        },
        symptoms: [
          { symptom: 'Extremely high viral load', explanation: '1000x higher than original strain causing rapid transmission' },
          { symptom: 'Rapid disease progression', explanation: 'deterioration from mild to severe within 48-72 hours' },
          { symptom: 'Severe hypoxia', explanation: 'dangerously low oxygen saturation (<90%) requiring ventilation' },
          { symptom: 'Multi-organ involvement', explanation: 'simultaneous lung, heart, and kidney dysfunction' },
          { symptom: 'Extended hospitalization', explanation: 'longer ICU stays compared to previous variants' }
        ],
        transmissibility: 95,
        immuneEvasion: 75,
        severity: 88,
        proteinChange: 'L452R increases infectivity; T478K enhances immune evasion; P681R accelerates viral entry'
      },
      {
        id: 'omicron',
        name: 'Omicron (B.1.1.529)',
        variant: 'OMICRON',
        lineage: 'B.1.1.529',
        description: 'Latest major variant with 30+ spike mutations. Highly transmissible but milder severity.',
        position: 371,
        type: 'Spike Protein 30+ mutations',
        impact: 'HIGH',
        deadlinessScore: 55,
        prevalence: '98%',
        region: 'South Africa / Botswana',
        firstDetected: 'November 2021',
        affectedOrgans: {
          'Upper Respiratory Tract': 'Primarily affects throat and upper airways rather than deep lung tissue',
          'Immune System': 'Evades immunity from previous infection or vaccination',
          'Bronchi': 'Bronchial inflammation causing persistent cough',
          'Lymph Nodes': 'Swollen lymph nodes in neck and throat region'
        },
        symptoms: [
          { symptom: 'Sore throat', explanation: 'severe pharyngitis as primary symptom unlike previous variants' },
          { symptom: 'Mild fever', explanation: 'typically lower grade fever (37.5-38.5°C) with shorter duration' },
          { symptom: 'Fatigue', explanation: 'moderate tiredness but less debilitating than Delta variant' },
          { symptom: 'Headache', explanation: 'frontal headache from sinus congestion and inflammation' },
          { symptom: 'Nasal congestion', explanation: 'runny nose and cold-like symptoms predominate' }
        ],
        transmissibility: 98,
        immuneEvasion: 92,
        severity: 45,
        proteinChange: '30+ spike mutations including multiple deletions and insertions causing massive structural change'
      },
    ],
    'Influenza': [
      {
        id: 'H275Y',
        name: 'H275Y',
        position: 275,
        type: 'Neuraminidase',
        impact: 'HIGH',
        deadlinessScore: 72,
        prevalence: '65%',
        region: 'Global',
        firstDetected: 'Jan 2008',
        affectedOrgans: ['Respiratory System', 'Immune System'],
        symptoms: ['High fever', 'Severe cough', 'Body aches', 'Headache'],
        transmissibility: 85,
        immuneEvasion: 60,
        severity: 75,
      },
      {
        id: 'N294S',
        name: 'N294S',
        position: 294,
        type: 'Neuraminidase',
        impact: 'MEDIUM',
        deadlinessScore: 65,
        prevalence: '40%',
        region: 'Asia, Europe',
        firstDetected: 'Mar 2009',
        affectedOrgans: ['Respiratory System'],
        symptoms: ['Fever', 'Cough', 'Sore throat', 'Fatigue'],
        transmissibility: 78,
        immuneEvasion: 55,
        severity: 68,
      },
    ],
    'Ebola': [
      {
        id: 'A82V',
        name: 'A82V',
        position: 82,
        type: 'Glycoprotein',
        impact: 'CRITICAL',
        deadlinessScore: 95,
        prevalence: '30%',
        region: 'West Africa',
        firstDetected: 'Jul 2014',
        affectedOrgans: ['All Major Organs', 'Vascular System', 'Immune System'],
        symptoms: ['Severe hemorrhaging', 'Organ failure', 'Shock', 'High fever'],
        transmissibility: 60,
        immuneEvasion: 70,
        severity: 98,
      },
      {
        id: 'GP-T544I',
        name: 'GP-T544I',
        position: 544,
        type: 'Glycoprotein',
        impact: 'HIGH',
        deadlinessScore: 90,
        prevalence: '25%',
        region: 'Central Africa',
        firstDetected: 'Nov 2014',
        affectedOrgans: ['Liver', 'Kidneys', 'Vascular System'],
        symptoms: ['Internal bleeding', 'Organ failure', 'Severe weakness'],
        transmissibility: 55,
        immuneEvasion: 65,
        severity: 95,
      },
    ],
  };

  return mutationsData[virusId] || [];
};

export default {
  checkHealth,
  getViruses,
  predictBinding,
  getTopDrugs,
  getProteinStructure,
  getVirusMutations,
};

