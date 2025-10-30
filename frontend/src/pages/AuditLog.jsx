import { useContext, useState } from 'react'
import Layout from '../components/Layout/Layout.jsx'
import Table from '../components/DataTable/Table.jsx'
import { MaintenanceContext } from '../Context/MaintenanceContext.jsx'
import './Pages.css'

function AuditLog() {
  const { state } = useContext(MaintenanceContext)
  
  const [serviceFilters, setServiceFilters] = useState({
    vehicleId: '',
    company: '',
  })
  
  const [repairFilters, setRepairFilters] = useState({
    vehicleId: '',
    company: '',
  })

  // Audit log columns - simplified view
  const auditColumns = [
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { key: 'cost', label: 'Cost' },
    { key: 'companyName', label: 'Company' },
  ]

  // Filter completed services (services with completeDate filled)
  const filterServices = (services) => {
    return services
      .filter(service => service.status === 'Completed' && service.completeDate)
      .filter(service => {
        const matchesVehicleId = !serviceFilters.vehicleId || 
          service.vehicleId.toLowerCase().includes(serviceFilters.vehicleId.toLowerCase())
        const matchesCompany = !serviceFilters.company || 
          service.companyName.toLowerCase().includes(serviceFilters.company.toLowerCase())
        return matchesVehicleId && matchesCompany
      })
  }

  // Filter completed repairs (repairs with status 'Completed' and completeDate filled)
  const filterRepairs = (repairs) => {
    return repairs
      .filter(repair => repair.status === 'Completed' && repair.completeDate)
      .filter(repair => {
        const matchesVehicleId = !repairFilters.vehicleId || 
          repair.vehicleId.toLowerCase().includes(repairFilters.vehicleId.toLowerCase())
        const matchesCompany = !repairFilters.company || 
          repair.companyName.toLowerCase().includes(repairFilters.company.toLowerCase())
        return matchesVehicleId && matchesCompany
      })
  }

  const filteredServices = filterServices(state.services)
  const filteredRepairs = filterRepairs(state.repairs)

  // Get unique companies for filter dropdown
  const serviceCompanies = [...new Set(
    state.services
      .filter(s => s.status === 'Completed')
      .map(s => s.companyName)
  )]
  
  const repairCompanies = [...new Set(
    state.repairs
      .filter(r => r.status === 'Completed')
      .map(r => r.companyName)
  )]

  const handleServiceSearch = (filters) => {
    setServiceFilters(filters)
  }

  const handleRepairSearch = (filters) => {
    setRepairFilters(filters)
  }

  const handleAction = (action, row) => {
    console.log('Audit log action:', action, row)
  }

  return (
    <Layout title="Audit Log">
      <div className="audit-log-container">
        {/* Audit Logs for Service */}
        <h2 className="section-title">Audit Logs for Service</h2>
        
        <div className="searchbar-container">
          <div className="searchbar-input-wrapper">
            <input
              type="text"
              placeholder="Search by Vehicle ID"
              value={serviceFilters.vehicleId}
              onChange={(e) => handleServiceSearch({ ...serviceFilters, vehicleId: e.target.value })}
              className="searchbar-main-input"
            />
            <button className="searchbar-icon-btn">🔍</button>
          </div>
          <select
            value={serviceFilters.company}
            onChange={(e) => handleServiceSearch({ ...serviceFilters, company: e.target.value })}
            className="searchbar-select"
          >
            <option value="">Company</option>
            {serviceCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <Table 
          columns={auditColumns} 
          rows={filteredServices} 
          onAction={handleAction}
          editable={false}
        />

        {/* Audit Logs for Repair */}
        <h2 className="section-title">Audit Logs for Repair</h2>
        
        <div className="searchbar-container">
          <div className="searchbar-input-wrapper">
            <input
              type="text"
              placeholder="Search by Vehicle ID"
              value={repairFilters.vehicleId}
              onChange={(e) => handleRepairSearch({ ...repairFilters, vehicleId: e.target.value })}
              className="searchbar-main-input"
            />
            <button className="searchbar-icon-btn">🔍</button>
          </div>
          <select
            value={repairFilters.company}
            onChange={(e) => handleRepairSearch({ ...repairFilters, company: e.target.value })}
            className="searchbar-select"
          >
            <option value="">Company</option>
            {repairCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <Table 
          columns={auditColumns} 
          rows={filteredRepairs} 
          onAction={handleAction}
          editable={false}
        />
      </div>
    </Layout>
  )
}

export default AuditLog