import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
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

    (response) => {
        return response;
    },

);

// Auth state management
const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

// Auth endpoints
const auth = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('isLoggedIn', 'true');
        return response.data;
    },

    register: async (userData: {
        email: string;
        password: string;
        name: string;
    }) => {
        const response = await api.post('/auth/register', userData);
        localStorage.setItem('isLoggedIn', 'true');
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        localStorage.removeItem('isLoggedIn');
        return response.data;
    },

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/validate_token');
            localStorage.setItem('isLoggedIn', 'true');
            return response.data;
        } catch (error) {
            localStorage.removeItem('isLoggedIn');
            throw error;
        }
    }
};


export { api, auth, isAuthenticated };