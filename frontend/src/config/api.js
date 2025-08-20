// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5001',
    endpoints: {
      hospitalEmpanelment: '/api/hospital-empanelment',
      saveDraft: '/api/hospital-empanelment/save-draft',
      resumeDraft: '/api/hospital-empanelment/resume',
      submitFromDraft: '/api/hospital-empanelment/submit-from-draft',
      getDrafts: '/api/hospital-empanelment/drafts',
      feedback: '/api/feedback',
      feedbackStats: '/api/feedback/stats/overview'
    }
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com',
    endpoints: {
      hospitalEmpanelment: '/api/hospital-empanelment',
      saveDraft: '/api/hospital-empanelment/save-draft',
      resumeDraft: '/api/hospital-empanelment/resume',
      submitFromDraft: '/api/hospital-empanelment/submit-from-draft',
      getDrafts: '/api/hospital-empanelment/drafts',
      feedback: '/api/feedback',
      feedbackStats: '/api/feedback/stats/overview'
    }
  }
};

const environment = process.env.NODE_ENV || 'development';
const config = API_CONFIG[environment];

export const buildApiUrl = (endpoint) => {
  return `${config.baseURL}${endpoint}`;
};

export const API_ENDPOINTS = config.endpoints;
export const API_BASE_URL = config.baseURL;
export default config;
