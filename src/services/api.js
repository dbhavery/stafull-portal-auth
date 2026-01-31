import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/request-reset', { email });
    return response.data;
  },

  resetPassword: async (email, code, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, code, newPassword });
    return response.data;
  },

  verifyEmail: async (email, code) => {
    const response = await api.post('/auth/verify-email', { email, code });
    return response.data;
  },

  resendVerification: async (email) => {
    const response = await api.post('/auth/send-verification', { email });
    return response.data;
  },

  checkAddress: async (address) => {
    const response = await api.post('/auth/check-address', address);
    return response.data;
  },

  expressInterest: async (data) => {
    const response = await api.post('/waitlist/interest', data);
    return response.data;
  }
};

// Check if running in development (localhost)
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Portal redirect map - uses localhost in dev, production domains otherwise
export const portalRedirectMap = isLocalhost ? {
  holdings_admin: 'http://localhost:5174',
  franchise_owner: 'http://localhost:5175',
  manager: 'http://localhost:5175',
  driver: 'http://localhost:5176',
  customer: 'http://localhost:5177',
  employer: 'http://localhost:5177',
  employee: 'http://localhost:5177',
  investor: 'http://localhost:5177',
  sba_lender: 'http://localhost:5177'
} : {
  holdings_admin: 'https://hq.stafull.com',
  franchise_owner: 'https://franchise.stafull.com',
  manager: 'https://franchise.stafull.com',
  driver: 'https://driver.stafull.com',
  customer: 'https://my.stafull.com',
  employer: 'https://my.stafull.com',
  employee: 'https://my.stafull.com',
  investor: 'https://my.stafull.com',
  sba_lender: 'https://my.stafull.com'
};

export default api;
