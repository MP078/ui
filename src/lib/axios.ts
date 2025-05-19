import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get auth headers from localStorage
    const authHeaders = JSON.parse(localStorage.getItem('authHeaders') || '{}');
    
    if (authHeaders) {
      config.headers['access-token'] = authHeaders['access-token'];
      config.headers['client'] = authHeaders['client'];
      config.headers['uid'] = authHeaders['uid'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Save auth headers if present
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
    };

    if (authHeaders['access-token']) {
      localStorage.setItem('authHeaders', JSON.stringify(authHeaders));
    }

    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('authHeaders');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          console.error('Forbidden access');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 422:
          // Handle validation errors
          console.error('Validation error:', error.response.data.errors);
          break;
        case 500:
          // Handle server error
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;