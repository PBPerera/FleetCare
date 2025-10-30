import { useContext } from 'react'
import Layout from '../components/Layout/Layout.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import Table from '../components/DataTable/Table.jsx'
import Button from '../components/Buttons/Button.jsx'
import ExportPdfBtn from '../components/ExportPdfBtn.jsx'
import { MaintenanceContext } from '../context/MaintenanceContext.jsx'


function RepairApprove() {
  const { state, setFilters, updateRepair, addRepair } = useContext(MaintenanceContext)

  const approvalColumns = [
    { 
      key: 'procurementStage1', 
      label: 'Procurement Stage 1',
    },
    { 
      key: 'tenderCall', 
      label: 'Tender Call',
    },
    { 
      key: 'engineer', 
      label: 'Engineer',
    },
    { 
      key: 'procurementStage2', 
      label: 'Procurement Stage 2',
    },
    { 
      key: 'shiftDate', 
      label: 'Shift Date Of Maintenance',
    },
    { key: 'companyName', label: 'Company Name' },
    { key: 'maintenanceId', label: 'Maintain ID' },
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { 
      key: 'developmentOfficer', 
      label: 'Development Officer',
    },
    { 
      key: 'engineerDate', 
      label: 'Engineer Date',
    },
  ]

  const handleAddApproval = () => {
    const newApproval = {
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
      procurementStage1: '',
      tenderCall: '',
      engineer: '',
      procurementStage2: '',
      developmentOfficer: '',
      engineerDate: '',
    }
    addRepair(newApproval)
  }

  const handleApprovalEdit = (id, updatedData) => {
    updateRepair(id, updatedData)
  }

  const handleAction = (action, row) => {
    console.log('Approval action:', action, row)
  }

  const pendingRepairs = state.repairs.filter(r => r.status === 'Pending')

  return (
    <Layout title="Maintenance Management > Maintenance Repair Approve">
      <div className="page-container">
        <SearchBar onFilterChange={setFilters} filterLabel="Company Name" />

        <div className="action-bar">
          <ExportPdfBtn data={pendingRepairs} filename="repair-approvals" />
          <Button variant="primary" onClick={handleAddApproval}>
            + Add Approval Record
          </Button>
        </div>

        <Table 
          columns={approvalColumns} 
          rows={pendingRepairs} 
          onAction={handleAction}
          editable={true}
          onEdit={handleApprovalEdit}
        />
      </div>
    </Layout>
  )
}

export default RepairApprove
