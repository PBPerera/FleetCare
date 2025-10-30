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
      // Auto-complete service when completeDate is added
      const updatedServiceData = action.payload.data
      const hasCompleteDate = updatedServiceData.completeDate && updatedServiceData.completeDate.trim() !== ''
      
      return {
        ...state,
        services: state.services.map(s =>
          s.id === action.payload.id 
            ? { 
                ...s, 
                ...updatedServiceData,
                status: hasCompleteDate ? 'Completed' : (s.status || 'Pending')
              } 
            : s
        ),
      }

    case 'UPDATE_REPAIR':
      // Auto-complete repair when completeDate is added (and status is Approved)
      const updatedRepairData = action.payload.data
      const hasRepairCompleteDate = updatedRepairData.completeDate && updatedRepairData.completeDate.trim() !== ''
      
      return {
        ...state,
        repairs: state.repairs.map(r =>
          r.id === action.payload.id 
            ? { 
                ...r, 
                ...updatedRepairData,
                // Only mark as Completed if it has completeDate AND is Approved
                status: hasRepairCompleteDate && (r.status === 'Approved' || updatedRepairData.status === 'Approved')
                  ? 'Completed' 
                  : (updatedRepairData.status || r.status || 'Pending')
              } 
            : r
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