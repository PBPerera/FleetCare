// src/pages/RepairApprove.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import Table from '../components/DataTable/Table.jsx';
import Button from '../components/Buttons/Button.jsx';
import ExportPdfBtn from '../components/ExportPdfBtn.jsx';
import Layout from '../components/Layout/Layout.jsx';
import { MaintenanceContext } from '../Context/MaintenanceContext.jsx';

export default function RepairApprove() {
  const navigate = useNavigate();
  const { 
    state, 
    setFilters, 
    updateRepair, 
    addRepair, 
    deleteRepair 
  } = useContext(MaintenanceContext);

  // Priority, Complete Date, Cost, and Status are set later on the main
  // Repair table (once this approval process is finished) - they don't
  // belong on the approval-process table itself.
  const approvalColumns = [
    { key: 'maintenanceId', label: 'Maintain ID' },
    { key: 'vehicleId', label: 'Vehicle ID' },
    { key: 'driverName', label: 'Driver Name' },
    { key: 'description', label: 'Description' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'developmentOfficer', label: 'Development Officer' },
    { key: 'procurementStage1', label: 'Procurement Stage 1' },
    { key: 'tenderCall', label: 'Tender Call' },
    { key: 'engineer', label: 'Engineer' },
    { key: 'engineerDate', label: 'Engineer Date' },
    { key: 'procurementStage2', label: 'Procurement Stage 2' },
    // Shift Date is last on purpose: with progressiveFill enabled it only
    // becomes fillable once every column before it has a value, which is
    // exactly what marks this approval process as complete.
    { key: 'shiftDate', label: 'Shift Date' },
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
      // Records added directly on this page are already in the approval
      // process, so they should show up here immediately. status stays
      // unset (it's the later Assigned/Completed work status, not part
      // of the approval workflow).
      status: '',
      approvalStatus: 'Approved',
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

      // Shift Date is the last column in this table's progressive fill -
      // it only becomes fillable once every column before it is done, so
      // saving it here is what marks the approval process as complete.
      // Once that happens, jump back to the main Repair table.
      if (cleanedData.shiftDate) {
        navigate('/maintenance');
      }
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

  // Repairs that have been approved go through this table's approval
  // process. They stay listed here even after the process is finished
  // (Shift Date filled in) - the record is never removed from this table.
  const pendingRepairs = state.repairs.filter(r => r.approvalStatus === 'Approved');

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
          progressiveFill={true}
          showDelete={false}
        />
      </div>
    </Layout>
  );
}