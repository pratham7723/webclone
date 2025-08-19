import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Hospitals API
export const hospitalsAPI = {
  getAll: (params) => api.get('/hospitals', { params }),
  getById: (id) => api.get(`/hospitals/${id}`),
  create: (hospitalData) => api.post('/hospitals', hospitalData),
  update: (id, hospitalData) => api.put(`/hospitals/${id}`, hospitalData),
  delete: (id) => api.delete(`/hospitals/${id}`),
};

// Patients API
export const patientsAPI = {
  getProfile: () => api.get('/patients/profile'),
  updateProfile: (profileData) => api.put('/patients/profile', profileData),
};

// Announcements API
export const announcementsAPI = {
  getAll: () => api.get('/announcements'),
  getById: (id) => api.get(`/announcements/${id}`),
};

// Feedback API
export const feedbackAPI = {
  getAll: (params) => api.get('/feedback', { params }),
  submit: (feedbackData) => api.post('/feedback', feedbackData),
};

export default api; 