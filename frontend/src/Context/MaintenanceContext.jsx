// src/context/MaintenanceContext.jsx
import { createContext, useReducer, useEffect } from 'react';
import { servicesApi, repairsApi, maintenanceApi } from '../api/maintenanceApi';

export const MaintenanceContext = createContext();

const initialState = {
  services: [],
  repairs: [],
  dashboardStats: null,
  filters: { vehicleId: '', company: '', date: '' },
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_SERVICES':
      return { ...state, services: action.payload, loading: false };

    case 'SET_REPAIRS':
      return { ...state, repairs: action.payload, loading: false };

    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload };

    case 'SET_FILTERS':
      return { ...state, filters: action.payload };

    case 'ADD_SERVICE':
      return {
        ...state,
        services: [...state.services, action.payload],
      };

    case 'ADD_REPAIR':
      return {
        ...state,
        repairs: [...state.repairs, action.payload],
      };

    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((s) =>
          s._id === action.payload.id ? { ...s, ...action.payload.data } : s
        ),
      };

    case 'UPDATE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.map((r) =>
          r._id === action.payload.id ? { ...r, ...action.payload.data } : r
        ),
      };

    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter((s) => s._id !== action.payload),
      };

    case 'DELETE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.filter((r) => r._id !== action.payload),
      };

    default:
      return state;
  }
};

export const MaintenanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch services from API
  const fetchServices = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await servicesApi.getAll(filters);
      dispatch({ type: 'SET_SERVICES', payload: response.data || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error fetching services:', error);
    }
  };

  // Fetch repairs from API
  const fetchRepairs = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await repairsApi.getAll(filters);
      dispatch({ type: 'SET_REPAIRS', payload: response.data || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error fetching repairs:', error);
    }
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const response = await maintenanceApi.getDashboardStats();
      dispatch({ type: 'SET_DASHBOARD_STATS', payload: response.data });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  // Add service
  const addService = async (serviceData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await servicesApi.create(serviceData);
      dispatch({ type: 'ADD_SERVICE', payload: response.data });
      dispatch({ type: 'SET_LOADING', payload: false });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error adding service:', error);
      throw error;
    }
  };

  // Update service
  const updateService = async (id, data) => {
    try {
      const response = await servicesApi.update(id, data);
      dispatch({ type: 'UPDATE_SERVICE', payload: { id, data: response.data } });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error updating service:', error);
      throw error;
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      await servicesApi.delete(id);
      dispatch({ type: 'DELETE_SERVICE', payload: id });
      await fetchDashboardStats(); // Refresh stats
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  // Add repair
  const addRepair = async (repairData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await repairsApi.create(repairData);
      dispatch({ type: 'ADD_REPAIR', payload: response.data });
      dispatch({ type: 'SET_LOADING', payload: false });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error adding repair:', error);
      throw error;
    }
  };

  // Update repair
  const updateRepair = async (id, data) => {
    try {
      const response = await repairsApi.update(id, data);
      dispatch({ type: 'UPDATE_REPAIR', payload: { id, data: response.data } });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error updating repair:', error);
      throw error;
    }
  };

  // Delete repair
  const deleteRepair = async (id) => {
    try {
      await repairsApi.delete(id);
      dispatch({ type: 'DELETE_REPAIR', payload: id });
      await fetchDashboardStats(); // Refresh stats
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error deleting repair:', error);
      throw error;
    }
  };

  // Approve repair
  const approveRepair = async (id, comments = '') => {
    try {
      const response = await repairsApi.approve(id, comments);
      dispatch({ type: 'UPDATE_REPAIR', payload: { id, data: response.data } });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error approving repair:', error);
      throw error;
    }
  };

  // Reject repair
  const rejectRepair = async (id, reason) => {
    try {
      const response = await repairsApi.reject(id, reason);
      dispatch({ type: 'UPDATE_REPAIR', payload: { id, data: response.data } });
      await fetchDashboardStats(); // Refresh stats
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      console.error('Error rejecting repair:', error);
      throw error;
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    fetchServices(filters);
    fetchRepairs(filters);
  };

  // Load initial data on mount
  useEffect(() => {
    fetchServices();
    fetchRepairs();
    fetchDashboardStats();
  }, []);

  const value = {
    state,
    setFilters,
    addService,
    updateService,
    deleteService,
    addRepair,
    updateRepair,
    deleteRepair,
    approveRepair,
    rejectRepair,
    fetchServices,
    fetchRepairs,
    fetchDashboardStats,
  };

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  );
};