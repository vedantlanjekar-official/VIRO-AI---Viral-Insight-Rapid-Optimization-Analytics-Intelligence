import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Zap, Activity, TrendingUp, Clock, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { viroAI } from '../services/api';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [virusData, setVirusData] = useState(null);
  const [selectedVirus, setSelectedVirus] = useState('');
  const [selectedProtein, setSelectedProtein] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState([]);

  useEffect(() => {
    loadVirusData();
    loadRecentPredictions();
  }, []);

  const loadVirusData = async () => {
    try {
      const data = await viroAI.listViruses();
      setVirusData(data);
      if (data.supported_viruses && data.supported_viruses.length > 0) {
        setSelectedVirus(data.supported_viruses[0]);
      }
    } catch (error) {
      console.error('Failed to load virus data:', error);
    }
  };

  const loadRecentPredictions = () => {
    // Load from localStorage for demo
    const stored = localStorage.getItem('prediction_history');
    if (stored) {
      const history = JSON.parse(stored);
      setRecentPredictions(history.slice(0, 5));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const validTypes = ['.csv', '.fasta', '.json', '.txt'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
      toast.error('Invalid file type. Please upload CSV, FASTA, JSON, or TXT file.');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 10MB.');
      return;
    }

    setUploadedFile(file);
    toast.success(`File "${file.name}" uploaded successfully!`);
  };

  const handleQuickAnalysis = async (virus) => {
    setLoading(true);
    try {
      const result = await viroAI.getTopDrugs(virus, 10);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('prediction_history') || '[]');
      const newPrediction = {
        ...result,
        timestamp: new Date().toISOString(),
        id: 'pred_' + Date.now(),
      };
      history.unshift(newPrediction);
      localStorage.setItem('prediction_history', JSON.stringify(history.slice(0, 50)));
      
      navigate('/results', { state: { results: result } });
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFullAnalysis = async () => {
    if (!selectedVirus) {
      toast.error('Please select a virus');
      return;
    }

    setLoading(true);
    try {
      const proteins = virusData?.virus_details?.[selectedVirus]?.proteins || [];
      const proteinId = selectedProtein || proteins[0];

      const result = await viroAI.predictBinding({
        virus_id: selectedVirus,
        protein_pdb_id: proteinId,
        drug_ids: null,
        top_n: 10,
      });

      // Save to history
      const history = JSON.parse(localStorage.getItem('prediction_history') || '[]');
      const newPrediction = {
        ...result,
        timestamp: new Date().toISOString(),
        id: 'pred_' + Date.now(),
        uploaded_file: uploadedFile?.name,
      };
      history.unshift(newPrediction);
      localStorage.setItem('prediction_history', JSON.stringify(history.slice(0, 50)));

      navigate('/results', { state: { results: result } });
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getDeadlinessColor = (score) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-300';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-300';
    return 'text-green-600 bg-green-50 border-green-300';
  };

  const availableProteins = selectedVirus && virusData?.virus_details?.[selectedVirus]?.proteins || [];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-custom">
        {/* Welcome Header */}
        <div className="card-grey mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.full_name || user?.username}! 👋
              </h1>
              <p className="text-gray-600">
                Start a new viral analysis or view your recent predictions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/history')}
                className="btn-outline flex items-center space-x-2"
              >
                <Clock className="h-4 w-4" />
                <span>View History</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Zone */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Upload className="h-6 w-6 text-blue-600" />
                <span>Upload Virus Data (Optional)</span>
              </h2>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-600 bg-blue-50'
                    : uploadedFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-blue-300 bg-gray-50 hover:bg-blue-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="animate-fade-in">
                    <FileText className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <p className="text-green-700 font-semibold mb-2">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="btn-outline text-sm px-4 py-2"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-semibold mb-2">
                      Drag & drop your file here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".csv,.fasta,.json,.txt"
                      onChange={handleFileInput}
                    />
                    <label htmlFor="file-upload" className="btn-secondary text-sm cursor-pointer px-6 py-2">
                      Choose File
                    </label>
                    <p className="text-xs text-gray-400 mt-3">
                      Supported: CSV, FASTA, JSON, TXT (max 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Virus Selection */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="h-6 w-6 text-blue-600" />
                <span>Select Virus & Protein</span>
              </h2>

              <div className="space-y-4">
                {/* Virus Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Virus Type
                  </label>
                  <select
                    value={selectedVirus}
                    onChange={(e) => {
                      setSelectedVirus(e.target.value);
                      setSelectedProtein('');
                    }}
                    className="input"
                  >
                    <option value="">Select a virus...</option>
                    {virusData?.supported_viruses?.map((virus) => (
                      <option key={virus} value={virus}>
                        {virus}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Protein Selector */}
                {availableProteins.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Protein
                    </label>
                    <select
                      value={selectedProtein}
                      onChange={(e) => setSelectedProtein(e.target.value)}
                      className="input"
                    >
                      <option value="">Auto-select (recommended)</option>
                      {availableProteins.map((protein) => (
                        <option key={protein} value={protein}>
                          {protein}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Deadliness Score Preview */}
                {selectedVirus && virusData?.virus_details?.[selectedVirus] && (
                  <div className={`border-2 rounded-lg p-4 ${getDeadlinessColor(virusData.virus_details[selectedVirus].deadliness_score)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Deadliness Score</span>
                      <span className="text-2xl font-bold">
                        {virusData.virus_details[selectedVirus].deadliness_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-current"
                        style={{
                          width: `${virusData.virus_details[selectedVirus].deadliness_score}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Analyze Button */}
                <button
                  onClick={handleFullAnalysis}
                  disabled={loading || !selectedVirus}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5" />
                      <span>Start Full Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Analysis */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>Quick Analysis</span>
              </h3>

              <div className="space-y-3">
                {virusData?.supported_viruses?.map((virus) => (
                  <button
                    key={virus}
                    onClick={() => handleQuickAnalysis(virus)}
                    disabled={loading}
                    className="w-full text-left p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {virus}
                        </p>
                        <p className="text-sm text-gray-500">Screen top 10 drugs</p>
                      </div>
                      <Zap className="h-5 w-5 text-blue-400 group-hover:text-blue-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Stats */}
            <div className="card-grey">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>Your Stats</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Predictions</span>
                  <span className="font-bold text-gray-900">{recentPredictions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-gray-900">{recentPredictions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">100%</span>
                </div>
              </div>
            </div>

            {/* Recent Predictions */}
            {recentPredictions.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Recent Predictions</span>
                </h3>

                <div className="space-y-2">
                  {recentPredictions.slice(0, 3).map((pred) => (
                    <div
                      key={pred.id}
                      className="p-3 border-2 border-blue-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => navigate('/results', { state: { results: pred } })}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{pred.virus}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(pred.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/history')}
                  className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


