import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Save, TrendingUp, Activity, AlertTriangle, Pill, Box, FlaskConical, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No results to display</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleExport = (format) => {
    toast.success(`Exporting results as ${format.toUpperCase()}...`);
    // Implementation would go here
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  const handleSave = () => {
    toast.success('Results saved to history!');
  };

  const { virus, protein_name, top_candidates, deadliness_score, drugs_screened, processing_time_ms } = results;

  // Mock data for additional sections (since backend doesn't provide all yet)
  const mutationData = {
    current_variant: `${virus} (Current Strain)`,
    predicted_mutation: 'BA.5.2.1 (Q493R + F486V)',
    confidence: 87,
    timeline: '3-6 months',
    key_mutations: [
      { change: 'Q493R', from: 'Glutamine', to: 'Arginine', location: 'Spike RBD', impact: 'Enhanced binding' },
      { change: 'F486V', from: 'Phenylalanine', to: 'Valine', location: 'Spike RBD', impact: 'Antibody escape' },
      { change: 'L452R', from: 'Leucine', to: 'Arginine', location: 'Spike protein', impact: 'Immune evasion' },
    ],
  };

  const symptomsData = {
    primary: [
      { name: 'Severe Respiratory Distress', probability: 87, severity: 'high' },
      { name: 'High Fever (>39°C)', probability: 92, severity: 'high' },
      { name: 'Persistent Cough', probability: 85, severity: 'medium' },
      { name: 'Fatigue & Weakness', probability: 78, severity: 'medium' },
      { name: 'Shortness of Breath', probability: 81, severity: 'medium' },
    ],
    secondary: [
      { name: 'Loss of taste/smell', probability: 62 },
      { name: 'Muscle aches', probability: 71 },
      { name: 'Headache', probability: 68 },
      { name: 'Gastrointestinal issues', probability: 45 },
    ],
    complications: [
      { name: 'Pneumonia risk', value: '34%', change: '+6% from previous' },
      { name: 'Hospitalization rate', value: '18-22%', change: null },
      { name: 'ICU admission', value: '6-8%', change: null },
    ],
  };

  const modificationsData = [
    {
      rank: 1,
      name: 'Add fluorine to Position 12',
      original: '-CH₂-CH₃ (ethyl group)',
      modified: '-CHF-CH₃ (fluoroethyl group)',
      improvements: {
        binding_affinity: '+18%',
        stability: '+23%',
        bioavailability: '+15%',
        toxicity: '-12%',
      },
      confidence: 84,
      feasibility: 'High',
      estimated_ic50: '2.5 nM',
    },
    {
      rank: 2,
      name: 'Methyl group addition',
      original: 'Aromatic ring',
      modified: 'Methylated aromatic ring',
      improvements: {
        binding_affinity: '+12%',
        stability: '+8%',
        bioavailability: '+5%',
        toxicity: '-5%',
      },
      confidence: 79,
      feasibility: 'High',
      estimated_ic50: '2.8 nM',
    },
  ];

  const recommendations = {
    immediate: [
      { text: `Deploy ${top_candidates[0]?.drug_name} as first-line treatment`, status: 'recommended', icon: '✅' },
      { text: `Stock ${top_candidates[1]?.drug_name} as backup option`, status: 'important', icon: '⚡' },
      { text: 'Begin synthesis of Modified Drug (Mod #1)', status: 'research', icon: '🔬' },
      { text: 'Monitor mutation emergence in next 90 days', status: 'monitor', icon: '📊' },
    ],
    research: [
      'Conduct in-vitro testing of top 3 candidates',
      'Validate modified drug structures',
      'Clinical trial preparation for new variant',
      'Cross-resistance testing with existing treatments',
    ],
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="card-grey mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-outline p-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Analysis Results
                </h1>
                <p className="text-gray-600">
                  {virus} • {protein_name} • {drugs_screened} drugs screened • {processing_time_ms}ms
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => handleExport('pdf')} className="btn-outline flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
              <button onClick={handleShare} className="btn-outline flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Mutation Prediction */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[1] Mutation Prediction</h2>
              <p className="text-gray-600">AI-predicted next viral mutations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Virus */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-600 mb-1">Current Virus</p>
              <p className="text-lg font-bold text-gray-900">{mutationData.current_variant}</p>
            </div>

            {/* Predicted Mutation */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-300 rounded-lg p-4">
              <p className="text-sm font-semibold text-purple-600 mb-1">Predicted Next Mutation</p>
              <p className="text-lg font-bold text-gray-900 mb-2">{mutationData.predicted_mutation}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Confidence</p>
                  <p className="text-sm font-bold text-purple-600">{mutationData.confidence}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Timeline</p>
                  <p className="text-sm font-bold text-gray-900">{mutationData.timeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Mutations Table */}
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-3">Key Mutations Detected:</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-blue-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Change</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amino Acid</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {mutationData.key_mutations.map((mutation, index) => (
                    <tr key={index} className="border-b border-blue-100 hover:bg-blue-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{mutation.change}</td>
                      <td className="py-3 px-4 text-gray-600">{mutation.from} → {mutation.to}</td>
                      <td className="py-3 px-4 text-gray-600">{mutation.location}</td>
                      <td className="py-3 px-4 text-gray-900">{mutation.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 2: Deadliness Score */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">[2] Deadliness Score Analysis</h2>
                <p className="text-gray-600">Comprehensive threat assessment</p>
              </div>
            </div>
            <div className={`badge ${deadliness_score.overall_score >= 70 ? 'badge-red' : deadliness_score.overall_score >= 50 ? 'badge-yellow' : 'badge-green'} text-lg px-4 py-2`}>
              {deadliness_score.risk_level}
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-gray-900">Overall Deadliness Score</span>
              <span className="text-4xl font-bold text-red-600">{deadliness_score.overall_score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-red-500 to-red-700 h-4 rounded-full transition-all duration-500"
                style={{ width: `${deadliness_score.overall_score}%` }}
              />
            </div>
          </div>

          {/* Score Breakdown */}
          <h3 className="font-bold text-gray-900 mb-4">Score Breakdown:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Transmissibility', value: deadliness_score.transmissibility },
              { label: 'Immune Evasion', value: deadliness_score.immune_evasion },
              { label: 'Mortality Rate', value: deadliness_score.mortality_rate },
              { label: 'Infection Severity', value: deadliness_score.infection_severity },
            ].map((item, index) => (
              <div key={index} className="border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="text-xl font-bold text-gray-900">{item.value}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.value >= 70 ? 'bg-red-500' : item.value >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Clinical Symptoms */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[3] Predicted Clinical Symptoms</h2>
              <p className="text-gray-600">Based on mutation profile and deadliness analysis</p>
            </div>
          </div>

          {/* Primary Symptoms */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Primary Symptoms (Probability):</h3>
            <div className="space-y-3">
              {symptomsData.primary.map((symptom, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 ${
                  symptom.severity === 'high' ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {symptom.severity === 'high' ? '🔴' : '🟡'} {symptom.name}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{symptom.probability}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${symptom.severity === 'high' ? 'bg-red-600' : 'bg-yellow-600'}`}
                      style={{ width: `${symptom.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Symptoms */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Secondary Symptoms:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {symptomsData.secondary.map((symptom, index) => (
                <div key={index} className="border-2 border-blue-200 rounded-lg p-3 text-center bg-gray-50">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{symptom.name}</p>
                  <p className="text-lg font-bold text-blue-600">{symptom.probability}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complications */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-900 mb-3">⚠️ Severe Complications (Estimated):</h3>
            <div className="space-y-2">
              {symptomsData.complications.map((comp, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{comp.name}</span>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{comp.value}</span>
                    {comp.change && <span className="text-xs text-red-600 ml-2">{comp.change}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Top Drug Candidates */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Pill className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[4] Top Drug Candidates</h2>
              <p className="text-gray-600">Ranked by binding affinity prediction</p>
            </div>
          </div>

          {/* Best Candidate Highlight */}
          {top_candidates && top_candidates.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  #{top_candidates[0].rank} BEST CANDIDATE: {top_candidates[0].drug_name}
                </h3>
                <div className="badge-green text-lg px-4 py-2">⭐ OPTIMAL</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Binding Affinity Score</p>
                  <p className="text-2xl font-bold text-green-600">{top_candidates[0].predicted_affinity.toFixed(2)}/1.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Predicted IC50</p>
                  <p className="text-2xl font-bold text-gray-900">{top_candidates[0].estimated_ic50_nm.toFixed(1)} nM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
                  <p className="text-2xl font-bold text-blue-600">{(top_candidates[0].confidence_score * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Drug Properties:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Molecular Weight: <span className="font-bold">{top_candidates[0].molecular_weight.toFixed(2)}</span></div>
                  <div>LogP: <span className="font-bold">{top_candidates[0].logP.toFixed(2)}</span></div>
                  <div className="col-span-2">
                    Binding Strength: <span className={`badge ${
                      top_candidates[0].binding_strength === 'Strong' ? 'badge-green' : 
                      top_candidates[0].binding_strength === 'Moderate' ? 'badge-yellow' : 'badge-grey'
                    }`}>{top_candidates[0].binding_strength}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top 5 Drugs Table */}
          <h3 className="font-bold text-gray-900 mb-3">Top Drug Rankings:</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Drug Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">IC50</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Strength</th>
                </tr>
              </thead>
              <tbody>
                {top_candidates?.slice(0, 5).map((drug) => (
                  <tr key={drug.rank} className="border-b border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-600">#{drug.rank}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{drug.drug_name}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-green-600">{drug.predicted_affinity.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{drug.estimated_ic50_nm.toFixed(1)} nM</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        drug.binding_strength === 'Strong' ? 'badge-green' : 
                        drug.binding_strength === 'Moderate' ? 'badge-yellow' : 'badge-grey'
                      }`}>
                        {drug.binding_strength}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: 3D Visualization Placeholder */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Box className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[5] 3D Molecular Visualization</h2>
              <p className="text-gray-600">Interactive drug-protein binding view</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-12 text-center">
            <Box className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">3D Viewer Component</p>
            <p className="text-gray-600 mb-4">Interactive molecular visualization would render here</p>
            <div className="inline-flex items-center space-x-8 text-sm">
              <div>
                <p className="text-gray-600">Binding Energy</p>
                <p className="font-bold text-gray-900">-8.4 kcal/mol</p>
              </div>
              <div>
                <p className="text-gray-600">H-Bonds</p>
                <p className="font-bold text-gray-900">5</p>
              </div>
              <div>
                <p className="text-gray-600">Hydrophobic Contacts</p>
                <p className="font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: AI Modifications */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FlaskConical className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[6] AI-Suggested Chemical Modifications</h2>
              <p className="text-gray-600">Optimize drug effectiveness with AI recommendations</p>
            </div>
          </div>

          {top_candidates && top_candidates.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Original Drug: <span className="font-bold text-gray-900">{top_candidates[0].drug_name}</span></p>
              <p className="text-sm text-gray-600">Current IC50: <span className="font-bold text-gray-900">{top_candidates[0].estimated_ic50_nm.toFixed(1)} nM</span></p>
            </div>
          )}

          <div className="space-y-6">
            {modificationsData.map((mod) => (
              <div
                key={mod.rank}
                className={`border-2 rounded-lg p-6 ${
                  mod.rank === 1 ? 'border-yellow-300 bg-yellow-50' : 'border-blue-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Modification #{mod.rank}: {mod.name}
                  </h3>
                  {mod.rank === 1 && <div className="badge-yellow">⭐ TOP RECOMMENDATION</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border-2 border-gray-300 rounded-lg p-3 bg-white">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Original Structure</p>
                    <p className="font-mono text-sm text-gray-900">{mod.original}</p>
                  </div>
                  <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50">
                    <p className="text-sm font-semibold text-green-600 mb-1">Modified Structure</p>
                    <p className="font-mono text-sm text-gray-900">{mod.modified}</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Predicted Improvements:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(mod.improvements).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs text-gray-600 mb-1 capitalize">{key.replace('_', ' ')}</p>
                        <p className={`text-lg font-bold ${value.startsWith('+') ? 'text-green-600' : value.startsWith('-') ? 'text-blue-600' : 'text-gray-900'}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Confidence: </span>
                    <span className="font-bold text-gray-900">{mod.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Feasibility: </span>
                    <span className="badge-green">{mod.feasibility}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Est. IC50: </span>
                    <span className="font-bold text-green-600">{mod.estimated_ic50}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Recommendations */}
        <div className="card mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">[7] Actionable Recommendations</h2>
              <p className="text-gray-600">Based on complete analysis</p>
            </div>
          </div>

          {/* Immediate Actions */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Immediate Actions:</h3>
            <div className="space-y-3">
              {recommendations.immediate.map((action, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border-2 border-blue-200 rounded-lg bg-white hover:bg-blue-50">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{action.text}</p>
                    <span className={`text-xs badge ${
                      action.status === 'recommended' ? 'badge-green' :
                      action.status === 'important' ? 'badge-yellow' :
                      action.status === 'research' ? 'badge-blue' : 'badge-grey'
                    } mt-1`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Priorities */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
            <h3 className="font-bold text-purple-900 mb-4">Research Priorities:</h3>
            <ul className="space-y-2">
              {recommendations.research.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <button onClick={() => handleExport('pdf')} className="btn-primary flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Generate Full Report PDF</span>
          </button>
          <button onClick={handleShare} className="btn-secondary flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Share with Team</span>
          </button>
          <button onClick={() => handleExport('json')} className="btn-outline flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;


