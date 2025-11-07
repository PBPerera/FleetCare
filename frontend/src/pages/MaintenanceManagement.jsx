import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout.jsx'
import Cards from '../components/DashboardCards/Cards.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import Table from '../components/DataTable/Table.jsx'
import Button from '../components/Buttons/Button.jsx'
import ExportPdfBtn from '../components/ExportPdfBtn.jsx'
import { MaintenanceContext } from '../context/MaintenanceContext.jsx'


function MaintenanceManagement() {
  const { state, setFilters, addService, addRepair, updateService, updateRepair, deleteService, deleteRepair } = useContext(MaintenanceContext)
  const navigate = useNavigate()

  const dashboardCards = [
    {
      title: 'Total',
      count: 4,
      subtitle: 'All records',
      icon: '📊',
    },
    {
      title: 'Scheduled',
      count: 1,
      subtitle: 'Upcoming',
      icon: '📅',
    },
    {
      title: 'In Progress',
      count: 2,
      subtitle: 'Active Work',
      icon: '⚙️',
    },
    {
      title: 'Completed',
      count: 10,
      subtitle: 'This month',
      icon: '✅',
    },
  ]

  // Service table columns - FIXED to allow editing dates
  const serviceColumns = [
    { key: 'maintenanceId', label: 'Maintain ID' },
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { key: 'companyName', label: 'Company Name' },
    { 
      key: 'shiftDate', 
      label: 'Date the Maintenance',
    },
    { 
      key: 'shiftDate', 
      label: 'Shift Date of the Maintenance',
    },
    { 
      key: 'completeDate', 
      label: 'Complete Date of the Maintenance',
    },
    { key: 'cost', label: 'Cost' },
  ]

  // Repair table columns - FIXED to allow editing dates
  const repairColumns = [
    { key: 'maintenanceId', label: 'Maintain ID' },
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { 
      key: 'shiftDate', 
      label: 'Request Date for the Maintenance',
    },
    {
      key: 'approveReject',
      label: 'Approve / Reject',
      render: (row, onAction) => (
        <div className="action-buttons">
          <button 
            className="action-btn approve"
            onClick={() => onAction('approve', row)}
          >
            Approve
          </button>
          <button 
            className="action-btn reject"
            onClick={() => onAction('reject', row)}
          >
            Reject
          </button>
        </div>
      ),
    },
    { key: 'companyName', label: 'Company Name' },
    { 
      key: 'shiftDate', 
      label: 'Shift Date of the Maintenance',
    },
    { 
      key: 'completeDate', 
      label: 'Complete Date of the Maintenance',
    },
    { key: 'cost', label: 'Cost' },
  ]

  const handleAddService = () => {
    const newService = {
      id: `S${Date.now()}`,
      maintenanceId: `M${String(state.services.length + 1).padStart(4, '0')}`,
      vehicleId: '',
      driverName: '',
      description: '',
      companyName: '',
      shiftDate: '',
      completeDate: '',
      cost: '',
    }
    addService(newService)
  }

  const handleAddRepair = () => {
    const newRepair = {
      id: `R${Date.now()}`,
      maintenanceId: `M${String(state.repairs.length + 1).padStart(4, '0')}`,
      vehicleId: '',
      driverName: '',
      description: '',
      companyName: '',
      shiftDate: '',
      completeDate: '',
      cost: '',
      status: 'Pending',
      developmentOfficer: '',
      engineer: '',
      procurementStage1: '',
      tenderCall: '',
      procurementStage2: '',
    }
    addRepair(newRepair)
  }

  const handleServiceEdit = (id, updatedData) => {
    updateService(id, updatedData)
  }

  const handleRepairEdit = (id, updatedData) => {
    updateRepair(id, updatedData)
  }

  const handleServiceDelete = (id) => {
    deleteService(id)
  }

  const handleRepairDelete = (id) => {
    deleteRepair(id)
  }

  const handleServiceAction = (action, row) => {
    console.log('Service action:', action, row)
  }

  const handleRepairAction = (action, row) => {
    if (action === 'approve') {
      navigate('/repairs/approve')
    } else if (action === 'reject') {
      alert(`Rejected: ${row.maintenanceId}`)
    }
  }

  return (
    <Layout title="Maintenance Management">
      <div className="dashboard-container">
        <Cards data={dashboardCards} />
        
        <h2 className="section-title">Maintenance Records for Service</h2>
        
        <SearchBar onFilterChange={setFilters} filterLabel="Date of the Maintenance" />

        <div className="action-bar">
          <ExportPdfBtn data={state.services} filename="maintenance-services" />
          <Button variant="primary" onClick={handleAddService}>
            + Add Service
          </Button>
        </div>

        <Table 
          columns={serviceColumns} 
          rows={state.services} 
          onAction={handleServiceAction}
          editable={true}
          onEdit={handleServiceEdit}
          onDelete={handleServiceDelete}
        />

        <h2 className="section-title">Maintenance Records for Repair</h2>
        
        <SearchBar onFilterChange={setFilters} filterLabel="Request Date" />

        <div className="action-bar">
          <ExportPdfBtn data={state.repairs} filename="maintenance-repairs" />
          <Button variant="primary" onClick={handleAddRepair}>
            + Add Repair
          </Button>
          <Button variant="success" onClick={() => navigate('/repairs/approve')}>
            ✓ Approve Maintain
          </Button>
        </div>

        <Table 
          columns={repairColumns} 
          rows={state.repairs} 
          onAction={handleRepairAction}
          editable={true}
          onEdit={handleRepairEdit}
          onDelete={handleRepairDelete}
        />
      </div>
    </Layout>
  )
}

export default MaintenanceManagement
