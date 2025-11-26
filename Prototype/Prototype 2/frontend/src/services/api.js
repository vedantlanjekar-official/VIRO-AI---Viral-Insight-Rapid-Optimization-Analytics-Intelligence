import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.detail || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
);

// API service methods
export const viroAI = {
  // Health check
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  },

  // Get list of supported viruses
  async listViruses() {
    const response = await api.get('/viruses');
    return response.data;
  },

  // Predict drug-virus binding
  async predictBinding(payload) {
    const response = await api.post('/predict', payload);
    return response.data;
  },

  // Get top drugs for a virus (quick screening)
  async getTopDrugs(virusId, limit = 10) {
    const response = await api.get(`/top_drugs/${virusId}`, {
      params: { limit }
    });
    return response.data;
  },

  // Cache management
  async getCacheStats() {
    const response = await api.get('/cache/stats');
    return response.data;
  },

  async clearCache() {
    const response = await api.post('/cache/clear');
    return response.data;
  },
};

export default api;

