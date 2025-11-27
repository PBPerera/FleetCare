// src/api/maintenanceApi.js
const API_BASE_URL = 'http://localhost:4000/api';

// Helper function for API calls
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Services API
export const servicesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/services?${queryString}` : '/services';
    return fetchAPI(endpoint);
  },

  getById: async (id) => {
    return fetchAPI(`/services/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/services/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return fetchAPI('/services/stats');
  },
};

// Repairs API
export const repairsApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/repairs?${queryString}` : '/repairs';
    return fetchAPI(endpoint);
  },

  getPending: async () => {
    return fetchAPI('/repairs/pending');
  },

  getById: async (id) => {
    return fetchAPI(`/repairs/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/repairs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/repairs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/repairs/${id}`, {
      method: 'DELETE',
    });
  },

  approve: async (id, comments = '') => {
    return fetchAPI(`/repairs/${id}/approve`, {
      method: 'PUT',
      body: JSON.stringify({ comments }),
    });
  },

  reject: async (id, reason) => {
    return fetchAPI(`/repairs/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  },

  updateStage: async (id, data) => {
    return fetchAPI(`/repairs/${id}/approval-stage`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getStats: async () => {
    return fetchAPI('/repairs/stats');
  },
};

// Maintenance API
export const maintenanceApi = {
  getDashboardStats: async () => {
    return fetchAPI('/maintenance/dashboard/stats');
  },

  search: async (query, type = 'all') => {
    return fetchAPI(`/maintenance/search?query=${query}&type=${type}`);
  },

  getHistory: async (vehicleId) => {
    return fetchAPI(`/maintenance/history/${vehicleId}`);
  },
};