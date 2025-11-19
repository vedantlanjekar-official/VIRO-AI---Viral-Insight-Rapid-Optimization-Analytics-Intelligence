import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trash2, Eye, Download, Search, Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVirus, setFilterVirus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterAndSortHistory();
  }, [history, searchTerm, filterVirus, sortBy]);

  const loadHistory = () => {
    const stored = localStorage.getItem('prediction_history');
    if (stored) {
      const parsedHistory = JSON.parse(stored);
      setHistory(parsedHistory);
    }
  };

  const filterAndSortHistory = () => {
    let filtered = [...history];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.virus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.protein_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply virus filter
    if (filterVirus !== 'all') {
      filtered = filtered.filter((item) => item.virus === filterVirus);
    }

    // Apply sorting
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (sortBy === 'deadliness') {
      filtered.sort((a, b) => (b.deadliness_score?.overall_score || 0) - (a.deadliness_score?.overall_score || 0));
    }

    setFilteredHistory(filtered);
  };

  const handleView = (prediction) => {
    navigate('/results', { state: { results: prediction } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this prediction?')) {
      const updated = history.filter((item) => item.id !== id);
      setHistory(updated);
      localStorage.setItem('prediction_history', JSON.stringify(updated));
      toast.success('Prediction deleted');
    }
  };

  const handleDownload = (prediction) => {
    const dataStr = JSON.stringify(prediction, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viroai_${prediction.virus}_${prediction.id}.json`;
    link.click();
    toast.success('Downloaded successfully');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all predictions? This cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem('prediction_history');
      toast.success('All predictions deleted');
    }
  };

  const uniqueViruses = [...new Set(history.map((item) => item.virus))];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="card-grey mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Prediction History</h1>
              <p className="text-gray-600">View and manage your past viral analyses</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn-outline text-red-600 border-red-400 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        {history.length > 0 && (
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Search className="inline h-4 w-4 mr-1" />
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by virus or protein..."
                  className="input"
                />
              </div>

              {/* Filter by Virus */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="inline h-4 w-4 mr-1" />
                  Filter by Virus
                </label>
                <select value={filterVirus} onChange={(e) => setFilterVirus(e.target.value)} className="input">
                  <option value="all">All Viruses</option>
                  {uniqueViruses.map((virus) => (
                    <option key={virus} value={virus}>
                      {virus}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Sort By
                </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input">
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="deadliness">Highest Deadliness</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-grey text-center">
              <p className="text-gray-600 mb-2">Total Predictions</p>
              <p className="text-3xl font-bold text-blue-600">{history.length}</p>
            </div>
            <div className="card-grey text-center">
              <p className="text-gray-600 mb-2">Viruses Analyzed</p>
              <p className="text-3xl font-bold text-purple-600">{uniqueViruses.length}</p>
            </div>
            <div className="card-grey text-center">
              <p className="text-gray-600 mb-2">This Month</p>
              <p className="text-3xl font-bold text-green-600">
                {history.filter((item) => {
                  const itemDate = new Date(item.timestamp);
                  const now = new Date();
                  return (
                    itemDate.getMonth() === now.getMonth() &&
                    itemDate.getFullYear() === now.getFullYear()
                  );
                }).length}
              </p>
            </div>
            <div className="card-grey text-center">
              <p className="text-gray-600 mb-2">Avg Processing</p>
              <p className="text-3xl font-bold text-orange-600">
                {history.length > 0
                  ? Math.round(
                      history.reduce((sum, item) => sum + (item.processing_time_ms || 0), 0) / history.length
                    )
                  : 0}
                ms
              </p>
            </div>
          </div>
        )}

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((prediction) => (
              <div key={prediction.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{prediction.virus}</h3>
                      <span className="badge-blue">{prediction.protein_name}</span>
                      {prediction.deadliness_score && (
                        <span
                          className={`badge ${
                            prediction.deadliness_score.overall_score >= 70
                              ? 'badge-red'
                              : prediction.deadliness_score.overall_score >= 50
                              ? 'badge-yellow'
                              : 'badge-green'
                          }`}
                        >
                          Deadliness: {prediction.deadliness_score.overall_score}/100
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <Clock className="inline h-4 w-4 mr-1" />
                        {new Date(prediction.timestamp).toLocaleString()}
                      </div>
                      <div>Drugs Screened: <span className="font-semibold text-gray-900">{prediction.drugs_screened}</span></div>
                      <div>Processing: <span className="font-semibold text-gray-900">{prediction.processing_time_ms}ms</span></div>
                    </div>

                    {prediction.top_candidates && prediction.top_candidates.length > 0 && (
                      <div className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Top Drug Candidate:</p>
                        <p className="font-bold text-green-700">
                          {prediction.top_candidates[0].drug_name}{' '}
                          <span className="text-sm font-normal text-gray-600">
                            (Score: {prediction.top_candidates[0].predicted_affinity.toFixed(2)})
                          </span>
                        </p>
                      </div>
                    )}

                    {prediction.uploaded_file && (
                      <div className="mt-2 text-sm text-gray-500">
                        📎 Uploaded: {prediction.uploaded_file}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleView(prediction)}
                      className="btn-primary flex items-center space-x-2 px-4 py-2 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(prediction)}
                      className="btn-secondary flex items-center space-x-2 px-4 py-2 text-sm"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleDelete(prediction.id)}
                      className="btn-outline text-red-600 border-red-400 hover:bg-red-50 flex items-center space-x-2 px-4 py-2 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            {history.length === 0 ? (
              <>
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Predictions Yet</h3>
                <p className="text-gray-600 mb-6">Start analyzing viruses to build your prediction history</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">
                  Start New Analysis
                </button>
              </>
            ) : (
              <>
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterVirus('all');
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;


