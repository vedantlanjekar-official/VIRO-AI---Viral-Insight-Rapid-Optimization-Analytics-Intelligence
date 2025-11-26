import { useState } from 'react';
import { Search, Loader } from 'lucide-react';

function PredictionForm({ virusData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    virus_id: '',
    protein_pdb_id: '',
    top_n: 10,
    drug_ids: null
  });

  const virusList = virusData?.supported_viruses || [];
  const virusDetails = virusData?.virus_details || {};
  
  const selectedVirusProteins = formData.virus_id
    ? virusDetails[formData.virus_id]?.proteins || []
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleVirusChange = (e) => {
    const virusId = e.target.value;
    const proteins = virusDetails[virusId]?.proteins || [];
    setFormData({
      ...formData,
      virus_id: virusId,
      protein_pdb_id: proteins[0] || ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Drug Screening Prediction</h2>
          <p className="text-gray-600">
            Select a virus and protein target to screen potential drug candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Virus Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Virus *
            </label>
            <select
              value={formData.virus_id}
              onChange={handleVirusChange}
              required
              className="input-field"
            >
              <option value="">Select a virus...</option>
              {virusList.map((virus) => (
                <option key={virus} value={virus}>
                  {virus}
                </option>
              ))}
            </select>
          </div>

          {/* Protein Selection */}
          {formData.virus_id && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protein Target *
              </label>
              <select
                value={formData.protein_pdb_id}
                onChange={(e) => setFormData({ ...formData, protein_pdb_id: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Select a protein...</option>
                {selectedVirusProteins.map((protein) => (
                  <option key={protein} value={protein}>
                    {protein}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Available proteins: {selectedVirusProteins.join(', ')}
              </p>
            </div>
          )}

          {/* Top N Candidates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Top Candidates
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.top_n}
              onChange={(e) => setFormData({ ...formData, top_n: parseInt(e.target.value) })}
              className="input-field"
            />
            <p className="mt-2 text-sm text-gray-500">
              Select how many top drug candidates to return (1-100)
            </p>
          </div>

          {/* Deadliness Info */}
          {formData.virus_id && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Virus Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-blue-700">Deadliness Score:</span>
                  <span className="font-bold text-blue-900 ml-2">
                    {virusDetails[formData.virus_id]?.deadliness_score || 0}/100
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Protein Targets:</span>
                  <span className="font-bold text-blue-900 ml-2">
                    {selectedVirusProteins.length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.virus_id || !formData.protein_pdb_id}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Run Prediction</span>
              </>
            )}
          </button>

          {loading && (
            <div className="text-center text-sm text-gray-600">
              <p>Screening drugs against {formData.virus_id}...</p>
              <p className="mt-1">This may take a few seconds</p>
            </div>
          )}
        </form>
      </div>

      {/* Info Card */}
      <div className="card mt-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Select the virus you want to target</li>
          <li>Choose a specific protein structure for docking</li>
          <li>Our AI model screens 190+ antiviral compounds</li>
          <li>Get ranked results with predicted binding affinities</li>
          <li>Review IC50 estimates and molecular properties</li>
        </ol>
      </div>
    </div>
  );
}

export default PredictionForm;

