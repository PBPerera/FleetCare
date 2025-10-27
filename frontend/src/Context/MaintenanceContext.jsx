import { createContext, useReducer } from 'react'
import { mockServices, mockRepairs } from '../data/mockMaintenance.js'

export const MaintenanceContext = createContext()

const initialState = {
  services: mockServices,
  repairs: mockRepairs,
  filters: { vehicleId: '', company: '', date: '' },
  selectedService: null,
  selectedRepair: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, filters: action.payload }

    case 'APPROVE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.map(r =>
          r.id === action.payload ? { ...r, status: 'Approved' } : r
        ),
      }

    case 'REJECT_REPAIR':
      return {
        ...state,
        repairs: state.repairs.map(r =>
          r.id === action.payload ? { ...r, status: 'Rejected' } : r
        ),
      }

    case 'ADD_SERVICE':
      return {
        ...state,
        services: [...state.services, action.payload],
      }

    case 'ADD_REPAIR':
      return {
        ...state,
        repairs: [...state.repairs, action.payload],
      }

    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload.data } : s
        ),
      }

    case 'UPDATE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload.data } : r
        ),
      }

    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(s => s.id !== action.payload),
      }

    case 'DELETE_REPAIR':
      return {
        ...state,
        repairs: state.repairs.filter(r => r.id !== action.payload),
      }

    default:
      return state
  }
}

export const MaintenanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    state,
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    approveRepair: (id) => dispatch({ type: 'APPROVE_REPAIR', payload: id }),
    rejectRepair: (id) => dispatch({ type: 'REJECT_REPAIR', payload: id }),
    addService: (service) => dispatch({ type: 'ADD_SERVICE', payload: service }),
    addRepair: (repair) => dispatch({ type: 'ADD_REPAIR', payload: repair }),
    updateService: (id, data) => dispatch({ type: 'UPDATE_SERVICE', payload: { id, data } }),
    updateRepair: (id, data) => dispatch({ type: 'UPDATE_REPAIR', payload: { id, data } }),
    deleteService: (id) => dispatch({ type: 'DELETE_SERVICE', payload: id }),
    deleteRepair: (id) => dispatch({ type: 'DELETE_REPAIR', payload: id }),
  }

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  )
}