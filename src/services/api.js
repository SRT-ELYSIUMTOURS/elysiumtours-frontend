import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token = cookies.get('auth_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling errors (e.g., token expiration)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (clear cookies, redirect, etc.)
      const cookies = new Cookies();
      cookies.remove('auth_token', { path: '/' });
      // Reload or dispatch logout if possible 
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
