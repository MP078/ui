import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

// Axios will automatically set the correct Content-Type header for FormData
// This ensures that when FormData is used, it sets multipart/form-data

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
    (error) => {
        console.error('API error:', error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('isLoggedIn');
        }
        return Promise.reject(error);
    }

);

// Auth state management
const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

// Auth endpoints
const auth = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/sign_in', {
            email,
            password,
        });

        localStorage.setItem('isLoggedIn', 'true');
        return response.data;
    },

    register: async (userData: {
        email: string;
        password: string;
        name: string;
    }) => {
        const response = await api.post('/auth', userData);
        localStorage.setItem('isLoggedIn', 'true');
        return response.data;
    },

    logout: async () => {
        const response = await api.delete('/auth/sign_out');
        localStorage.removeItem('isLoggedIn');
        return response.data;
    },

    checkAuth: async () => {
        try {
            const response = await api.get('/users');
            localStorage.setItem('isLoggedIn', 'true');
            return response.data;
        } catch (error) {
            localStorage.removeItem('isLoggedIn');
            throw error;
        }
    }
};

// Utility function to download an image from a URL
// This can be useful if we need to convert URL images to files
const downloadImageFromUrl = async (url: string): Promise<File | null> => {
    try {
        // Fetch the image data
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // Convert to blob
        const blob = await response.blob();

        // Extract filename from URL or use a default
        let filename = 'image.jpg';
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const lastSegment = pathname.split('/').pop();
            if (lastSegment) {
                filename = lastSegment;
            }
        } catch (e) {
            console.warn('Could not parse URL for filename:', e);
        }

        // Create a File object from the blob
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } catch (error) {
        console.error('Error downloading image:', error);
        return null;
    }
};


export { api, auth, isAuthenticated, downloadImageFromUrl };