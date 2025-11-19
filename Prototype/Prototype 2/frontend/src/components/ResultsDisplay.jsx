import { useState } from 'react';
import { Download, Award, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import DeadlinessChart from './DeadlinessChart';
import DrugRankingsChart from './DrugRankingsChart';

function ResultsDisplay({ results }) {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const getBindingColor = (strength) => {
    switch (strength?.toLowerCase()) {
      case 'strong':
        return 'badge-success';
      case 'moderate':
        return 'badge-warning';
      case 'weak':
        return 'badge-danger';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return 'text-danger-600 bg-danger-50';
      case 'MEDIUM':
        return 'text-warning-600 bg-warning-50';
      case 'LOW':
        return 'text-success-600 bg-success-50';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viroai_results_${results.request_id}.json`;
    link.click();
  };

  const downloadCSV = () => {
    const headers = ['Rank', 'Drug Name', 'Drug ID', 'Affinity Score', 'IC50 (nM)', 'Binding Strength', 'Molecular Weight', 'LogP'];
    const rows = results.top_candidates.map(drug => [
      drug.rank,
      drug.drug_name,
      drug.drug_id,
      drug.predicted_affinity.toFixed(3),
      drug.estimated_ic50_nm.toFixed(2),
      drug.binding_strength,
      drug.molecular_weight.toFixed(2),
      drug.logP.toFixed(2)
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viroai_results_${results.request_id}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prediction Results</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Request ID: {results.request_id}</span>
              <span>•</span>
              <span>{new Date(results.timestamp).toLocaleString()}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>{results.processing_time_ms}ms</span>
              </span>
              {results.cached && (
                <>
                  <span>•</span>
                  <span className="badge badge-success">Cached</span>
                </>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={downloadJSON} className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>JSON</span>
            </button>
            <button onClick={downloadCSV} className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 text-sm font-medium mb-1">Target Virus</div>
            <div className="text-2xl font-bold text-blue-900">{results.virus}</div>
            <div className="text-sm text-blue-700 mt-1">{results.protein_name}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-sm font-medium mb-1">Drugs Screened</div>
            <div className="text-2xl font-bold text-green-900">{results.drugs_screened}</div>
            <div className="text-sm text-green-700 mt-1">Antiviral compounds</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-600 text-sm font-medium mb-1">Model Version</div>
            <div className="text-2xl font-bold text-purple-900">{results.model_version}</div>
            <div className="text-sm text-purple-700 mt-1">Fine-tuned</div>
          </div>
        </div>
      </div>

      {/* Deadliness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Viral Threat Assessment</h3>
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Deadliness</span>
              <span className="text-3xl font-bold text-gray-900">
                {results.deadliness_score.overall_score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  results.deadliness_score.overall_score >= 70
                    ? 'bg-danger-600'
                    : results.deadliness_score.overall_score >= 50
                    ? 'bg-warning-600'
                    : 'bg-success-600'
                }`}
                style={{ width: `${results.deadliness_score.overall_score}%` }}
              />
            </div>
            <div className="mt-3">
              <span className={`badge ${getRiskLevelColor(results.deadliness_score.risk_level)}`}>
                {results.deadliness_score.risk_level} RISK
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Transmissibility', value: results.deadliness_score.transmissibility },
              { label: 'Immune Evasion', value: results.deadliness_score.immune_evasion },
              { label: 'Mortality Rate', value: results.deadliness_score.mortality_rate },
              { label: 'Infection Severity', value: results.deadliness_score.infection_severity }
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{metric.label}</span>
                  <span className="font-semibold text-gray-900">{metric.value}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Factor Distribution</h3>
          <DeadlinessChart deadlinessScore={results.deadliness_score} />
        </div>
      </div>

      {/* Top Candidates Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Top Drug Candidates</h3>
          <TrendingUp className="h-6 w-6 text-primary-600" />
        </div>
        <DrugRankingsChart candidates={results.top_candidates.slice(0, 10)} />
      </div>

      {/* Drug Rankings Table */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Rankings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Drug Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Affinity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">IC50 (nM)</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Binding</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">MW</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">LogP</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.top_candidates.map((drug) => (
                <tr
                  key={drug.drug_id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDrug(drug)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {drug.rank <= 3 && <Award className={`h-5 w-5 ${
                        drug.rank === 1 ? 'text-yellow-500' :
                        drug.rank === 2 ? 'text-gray-400' :
                        'text-orange-600'
                      }`} />}
                      <span className="font-semibold text-gray-900">{drug.rank}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{drug.drug_name}</div>
                    <div className="text-xs text-gray-500">{drug.drug_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">
                      {(drug.predicted_affinity * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{drug.estimated_ic50_nm.toFixed(1)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge ${getBindingColor(drug.binding_strength)}`}>
                      {drug.binding_strength}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{drug.molecular_weight.toFixed(1)}</td>
                  <td className="py-3 px-4 text-gray-700">{drug.logP.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDrug(drug);
                      }}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drug Detail Modal */}
      {selectedDrug && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedDrug(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedDrug.drug_name}</h3>
                <p className="text-gray-600">{selectedDrug.drug_id}</p>
              </div>
              <button
                onClick={() => setSelectedDrug(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Rank</div>
                <div className="text-2xl font-bold text-gray-900">#{selectedDrug.rank}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Binding Strength</div>
                <div className="text-2xl font-bold text-gray-900 capitalize">{selectedDrug.binding_strength}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Predicted Affinity</div>
                <div className="text-2xl font-bold text-gray-900">
                  {(selectedDrug.predicted_affinity * 100).toFixed(1)}%
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">IC50 Estimate</div>
                <div className="text-2xl font-bold text-gray-900">{selectedDrug.estimated_ic50_nm.toFixed(1)} nM</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Molecular Properties</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Molecular Weight:</span>
                    <span className="font-medium text-gray-900 ml-2">{selectedDrug.molecular_weight.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">LogP:</span>
                    <span className="font-medium text-gray-900 ml-2">{selectedDrug.logP.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {(selectedDrug.confidence_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-gray-900 ml-2">{selectedDrug.approval_status}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">SMILES Structure</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-xs break-all text-gray-700">
                  {selectedDrug.smiles}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;

