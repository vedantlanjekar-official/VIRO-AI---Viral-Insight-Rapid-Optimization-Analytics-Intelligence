import { Biohazard, Zap, TrendingUp, Database } from 'lucide-react';

function Dashboard({ virusData, onQuickScreen, loading }) {
  const virusList = virusData?.supported_viruses || [];
  const virusDetails = virusData?.virus_details || {};

  const getDeadlinessColor = (score) => {
    if (score >= 70) return 'text-danger-600 bg-danger-50';
    if (score >= 50) return 'text-warning-600 bg-warning-50';
    return 'text-success-600 bg-success-50';
  };

  const getDeadlinessLevel = (score) => {
    if (score >= 70) return 'HIGH RISK';
    if (score >= 50) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Viro-AI</h2>
          <p className="text-xl mb-6 text-blue-100">
            AI-Powered Drug Discovery for Viral Threats
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>190+ Drugs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Biohazard className="h-5 w-5" />
              <span>3 Viruses</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {virusList.map((virusId) => {
          const details = virusDetails[virusId];
          const score = details?.deadliness_score || 0;
          
          return (
            <div key={virusId} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{virusId}</h3>
                  <p className="text-sm text-gray-600">
                    {details?.proteins?.length || 0} protein targets
                  </p>
                </div>
                <Biohazard className="h-8 w-8 text-primary-600" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Deadliness</span>
                    <span className="text-sm font-bold text-gray-900">{score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        score >= 70 ? 'bg-danger-600' : score >= 50 ? 'bg-warning-600' : 'bg-success-600'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
                
                <div className={`badge ${getDeadlinessColor(score)} text-center w-full`}>
                  {getDeadlinessLevel(score)}
                </div>
                
                <button
                  onClick={() => onQuickScreen(virusId)}
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Quick Screen</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Overview */}
      <div className="card">
        <h3 className="text-2xl font-bold mb-6">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg h-fit">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Drug Ranking</h4>
              <p className="text-gray-600 text-sm">
                Get ranked drug candidates with predicted binding affinities and IC50 values.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg h-fit">
              <Biohazard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Threat Assessment</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive viral deadliness scores based on multiple risk factors.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-success-100 p-3 rounded-lg h-fit">
              <Zap className="h-6 w-6 text-success-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Predictions</h4>
              <p className="text-gray-600 text-sm">
                Get results in under 2 seconds with intelligent caching.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg h-fit">
              <Database className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Extensive Database</h4>
              <p className="text-gray-600 text-sm">
                190+ antiviral compounds with validated binding data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

