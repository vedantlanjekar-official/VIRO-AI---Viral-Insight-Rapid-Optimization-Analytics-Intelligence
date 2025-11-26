import api from './api';

export const predictionAPI = {
  // Create new prediction
  async createPrediction(formData) {
    const response = await api.post('/predictions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all predictions for user
  async getUserPredictions(page = 1, limit = 10) {
    const response = await api.get('/predictions', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get specific prediction
  async getPrediction(predictionId) {
    const response = await api.get(`/predictions/${predictionId}`);
    return response.data;
  },

  // Get prediction status
  async getPredictionStatus(predictionId) {
    const response = await api.get(`/predictions/${predictionId}/status`);
    return response.data;
  },

  // Delete prediction
  async deletePrediction(predictionId) {
    const response = await api.delete(`/predictions/${predictionId}`);
    return response.data;
  },

  // Get results
  async getResults(predictionId) {
    const response = await api.get(`/results/${predictionId}`);
    return response.data;
  },

  // Download results
  async downloadResults(predictionId, format = 'json') {
    const response = await api.get(`/results/${predictionId}/download`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};


