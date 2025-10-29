
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://auth-server-93m8.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Adds Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handles 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw error;
  }
);

export const authAPI = {
  register: (data) => 
    api.post('/auth/register', data),

  verifyOTP: (data) =>
    api.post('/auth/verify-otp', data),

  login: (data) =>
    api.post('/auth/login', data),

  logout: () =>
    api.post('/auth/logout'),

  forgotPassword: (data) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (token, data) =>
    api.post(`/auth/reset-password/${token}`, data),

  getProfile: () =>
    api.get('/auth/profile'),

  updateProfile: (data) =>
    api.put('/auth/profile', data),

  changePassword: (data) =>
    api.put('/auth/change-password', data),
};

export default api;
