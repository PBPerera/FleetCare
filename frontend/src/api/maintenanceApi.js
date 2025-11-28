// src/api/maintenanceApi.js
const API_BASE_URL = 'http://localhost:4000/api';

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
      console.error('API Error Response:', data);
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Helper function to remove undefined and empty string values
const cleanData = (obj) => {
  const cleaned = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

export const servicesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/services?${queryString}` : '/services';
    return fetchAPI(endpoint);
  },

  create: async (data) => {
    const formattedData = {
      vehicleId: data.vehicleId || undefined,
      driverName: data.driverName || undefined,
      description: data.description || undefined,
      companyName: data.companyName || undefined,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      shiftDate: data.shiftDate ? new Date(data.shiftDate).toISOString() : undefined,
      completeDate: data.completeDate ? new Date(data.completeDate).toISOString() : undefined,
      cost: data.cost || 0,
      status: data.status || 'Scheduled',
    };
    
    // Remove undefined values
    const cleanedData = cleanData(formattedData);
    
    console.log('Creating service with cleaned data:', cleanedData);
    return fetchAPI('/services', {
      method: 'POST',
      body: JSON.stringify(cleanedData),
    });
  },

  update: async (id, data) => {
    const formattedData = {
      ...data,
      date: data.date ? new Date(data.date).toISOString() : undefined,
      shiftDate: data.shiftDate ? new Date(data.shiftDate).toISOString() : undefined,
      completeDate: data.completeDate ? new Date(data.completeDate).toISOString() : undefined,
    };
    
    const cleanedData = cleanData(formattedData);
    
    return fetchAPI(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanedData),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/services/${id}`, {
      method: 'DELETE',
    });
  },

  getById: async (id) => {
    return fetchAPI(`/services/${id}`);
  },

  getStats: async () => {
    return fetchAPI('/services/stats');
  },
};

export const repairsApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/repairs?${queryString}` : '/repairs';
    return fetchAPI(endpoint);
  },

  getPending: async () => {
    return fetchAPI('/repairs/pending');
  },

  create: async (data) => {
    const formattedData = {
      vehicleId: data.vehicleId || undefined,
      driverName: data.driverName || undefined,
      description: data.description || undefined,
      companyName: data.companyName || undefined,
      requestDate: data.requestDate ? new Date(data.requestDate).toISOString() : new Date().toISOString(),
      shiftDate: data.shiftDate ? new Date(data.shiftDate).toISOString() : undefined,
      completeDate: data.completeDate ? new Date(data.completeDate).toISOString() : undefined,
      engineerDate: data.engineerDate ? new Date(data.engineerDate).toISOString() : undefined,
      cost: data.cost || 0,
      status: data.status || 'Pending',
      priority: data.priority || 'Medium',
      developmentOfficer: data.developmentOfficer || undefined,
      engineer: data.engineer || undefined,
      procurementStage1: data.procurementStage1 || '',
      tenderCall: data.tenderCall || '',
      procurementStage2: data.procurementStage2 || '',
    };
    
    const cleanedData = cleanData(formattedData);
    
    console.log('Creating repair with cleaned data:', cleanedData);
    return fetchAPI('/repairs', {
      method: 'POST',
      body: JSON.stringify(cleanedData),
    });
  },

  update: async (id, data) => {
    const formattedData = {
      ...data,
      requestDate: data.requestDate ? new Date(data.requestDate).toISOString() : undefined,
      shiftDate: data.shiftDate ? new Date(data.shiftDate).toISOString() : undefined,
      completeDate: data.completeDate ? new Date(data.completeDate).toISOString() : undefined,
      engineerDate: data.engineerDate ? new Date(data.engineerDate).toISOString() : undefined,
    };
    
    const cleanedData = cleanData(formattedData);
    
    return fetchAPI(`/repairs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanedData),
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

  getById: async (id) => {
    return fetchAPI(`/repairs/${id}`);
  },

  getStats: async () => {
    return fetchAPI('/repairs/stats');
  },
};

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