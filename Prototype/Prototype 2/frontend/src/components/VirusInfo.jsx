import { Biohazard, Shield, Activity } from 'lucide-react';

function VirusInfo({ virusData }) {
  if (!virusData) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">Loading virus information...</p>
      </div>
    );
  }

  const virusList = virusData.supported_viruses || [];
  const virusDetails = virusData.virus_details || {};

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Supported Viruses</h2>
        <p className="text-gray-600 mb-6">
          Complete information about all viruses in our database
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {virusList.map((virusId) => {
            const details = virusDetails[virusId];
            const score = details?.deadliness_score || 0;
            const proteins = details?.proteins || [];

            return (
              <div key={virusId} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{virusId}</h3>
                    <p className="text-sm text-gray-600">{proteins.length} protein targets</p>
                  </div>
                  <Biohazard className="h-10 w-10 text-primary-600" />
                </div>

                <div className="space-y-4">
                  {/* Deadliness Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Deadliness Score</span>
                      <span className="text-2xl font-bold text-gray-900">{score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          score >= 70 ? 'bg-danger-600' : score >= 50 ? 'bg-warning-600' : 'bg-success-600'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="mt-2">
                      <span
                        className={`badge ${
                          score >= 70
                            ? 'badge-danger'
                            : score >= 50
                            ? 'badge-warning'
                            : 'badge-success'
                        }`}
                      >
                        {score >= 70 ? 'HIGH RISK' : score >= 50 ? 'MEDIUM RISK' : 'LOW RISK'}
                      </span>
                    </div>
                  </div>

                  {/* Protein Targets */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Available Proteins</span>
                    </h4>
                    <div className="space-y-1">
                      {proteins.map((protein) => (
                        <div
                          key={protein}
                          className="bg-gray-50 px-3 py-2 rounded text-sm font-mono text-gray-700"
                        >
                          {protein}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-bold text-gray-900">About Deadliness Scores</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              The deadliness score is a comprehensive metric (0-100) that assesses the overall threat
              level of a virus based on multiple factors:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Transmissibility:</strong> How easily the virus spreads</li>
              <li><strong>Immune Evasion:</strong> Ability to evade immune response</li>
              <li><strong>Mortality Rate:</strong> Percentage of fatal infections</li>
              <li><strong>Infection Severity:</strong> How severe symptoms typically are</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
              <p className="text-blue-900">
                <strong>Risk Levels:</strong><br />
                • 70-100: HIGH (Red)<br />
                • 50-69: MEDIUM (Orange)<br />
                • 0-49: LOW (Green)
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Protein Targets</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Each virus has multiple protein structures that can be targeted for drug binding:
            </p>
            <div className="space-y-3 mt-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">SARS-CoV-2</h4>
                <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                  <li>6VXX - Spike Protein</li>
                  <li>6VSB - Spike RBD</li>
                  <li>7BNN - Main Protease (Mpro)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Influenza</h4>
                <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                  <li>1RVX - Hemagglutinin</li>
                  <li>4GMS - Neuraminidase</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Ebola</h4>
                <ul className="list-disc list-inside ml-2 text-xs space-y-1">
                  <li>5JQ3 - Glycoprotein (GP)</li>
                  <li>5JQ7 - GP Complex</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Stats */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <h3 className="text-2xl font-bold mb-4">Database Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">3</div>
            <div className="text-blue-100 text-sm">Viruses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">7</div>
            <div className="text-blue-100 text-sm">Protein Targets</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">190+</div>
            <div className="text-blue-100 text-sm">Drug Compounds</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">81</div>
            <div className="text-blue-100 text-sm">Validated Pairs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirusInfo;

