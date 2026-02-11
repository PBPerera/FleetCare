// src/pages/RepairApprove.jsx
import { useContext } from 'react';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import Table from '../components/DataTable/Table.jsx';
import Button from '../components/Buttons/Button.jsx';
import ExportPdfBtn from '../components/ExportPdfBtn.jsx';
import Layout from '../components/Layout/Layout.jsx';
import { MaintenanceContext } from '../Context/MaintenanceContext.jsx';

export default function RepairApprove() {
  const { 
    state, 
    setFilters, 
    updateRepair, 
    addRepair, 
    deleteRepair 
  } = useContext(MaintenanceContext);

  const approvalColumns = [
    { key: 'maintenanceId', label: 'Maintain ID' },
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'priority', label: 'Priority' },
    { key: 'developmentOfficer', label: 'Development Officer' },
    { key: 'procurementStage1', label: 'Procurement Stage 1' },
    { key: 'tenderCall', label: 'Tender Call' },
    { key: 'engineer', label: 'Engineer' },
    { key: 'engineerDate', label: 'Engineer Date' },
    { key: 'procurementStage2', label: 'Procurement Stage 2' },
    { key: 'shiftDate', label: 'Shift Date' },
    { key: 'completeDate', label: 'Complete Date' },
    { key: 'cost', label: 'Cost ($)' },
    { key: 'status', label: 'Status' }
  ];

  const handleAddApproval = async () => {
    const newApproval = {
      vehicleId: '',
      driverName: '',
      description: '',
      companyName: '',
      requestDate: new Date().toISOString().split('T')[0],
      shiftDate: '',
      completeDate: '',
      cost: 0,
      status: 'Pending',
      priority: 'Medium',
      procurementStage1: '',
      tenderCall: '',
      engineer: '',
      engineerDate: '',
      procurementStage2: '',
      developmentOfficer: ''
    };
    
    try {
      await addRepair(newApproval);
      alert('Repair record added successfully!');
    } catch (error) {
      alert('Error adding approval record: ' + error.message);
    }
  };

  const handleApprovalEdit = async (id, updatedData) => {
    try {
      // Clean up empty strings for enum fields
      const cleanedData = {
        ...updatedData,
        procurementStage1: updatedData.procurementStage1 || '',
        tenderCall: updatedData.tenderCall || '',
        procurementStage2: updatedData.procurementStage2 || ''
      };
      
      await updateRepair(id, cleanedData);
      alert('Repair updated successfully!');
    } catch (error) {
      alert('Error updating approval: ' + error.message);
    }
  };

  const handleApprovalDelete = async (id) => {
    try {
      await deleteRepair(id);
      alert('Repair deleted successfully!');
    } catch (error) {
      alert('Error deleting approval: ' + error.message);
    }
  };

  const handleAction = (action, row) => {
    console.log('Approval action:', action, row);
  };

  // Filter for pending repairs
  const pendingRepairs = state.repairs.filter(r => r.status === 'Pending');

  return (
    <Layout title="Maintenance Management > Maintenance Repair Approve">
      <div className="page-container">
        {state.loading && <div className="loading">Loading...</div>}
        {state.error && <div className="error">Error: {state.error}</div>}

        <h2 className="page-subtitle">
          Pending Repair Approvals ({pendingRepairs.length})
        </h2>

        <SearchBar onFilterChange={setFilters} filterLabel="Search by Vehicle ID or Company" />

        <div className="action-bar">
          <ExportPdfBtn data={pendingRepairs} filename="repair-approvals" />
          <Button variant="primary" onClick={handleAddApproval}>
            + Add Repair Record
          </Button>
        </div>

        <Table 
          columns={approvalColumns} 
          rows={pendingRepairs} 
          onAction={handleAction}
          editable={true}
          onEdit={handleApprovalEdit}
          onDelete={handleApprovalDelete}
        />
      </div>
    </Layout>
  );
}