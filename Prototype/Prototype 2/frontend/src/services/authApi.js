import api from './api';

export const authAPI = {
  // Login
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Signup
  async signup(userData) {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Refresh token
  async refreshToken(refreshToken) {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  // Logout
  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Verify email
  async verifyEmail(token) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // Reset password
  async resetPassword(email) {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  },
};


