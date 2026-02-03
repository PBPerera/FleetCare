// src/pages/MaintenanceManagement.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import { MaintenanceContext } from "../context/MaintenanceContext.jsx";
import "./Pages.css";

function MaintenanceManagement() {
  const navigate = useNavigate();
  const { 
    state, 
    setFilters, 
    addService, 
    addRepair, 
    updateService, 
    updateRepair, 
    deleteService, 
    deleteRepair,
    approveRepair,
    rejectRepair 
  } = useContext(MaintenanceContext);

  const [collapsed, setCollapsed] = useState(false);

  const routeMap = {
    "Dashboard": "/admindashboard",
    "User Management": "/user-management",
    "Vehicle Management": "/vehicles",
    "Driver Management": "/driver-management",
    "Trip Scheduling": "/trip-scheduling",
    "Trip Allocation": "/trip-allocation",
    "Maintenance Management": "/maintenance",
    "Reporting & Analytics": "/reports",
    "Notification Management": "/notification-management",
    "Audit Log": "/audit-log",
  };

  const dashboardCards = state.dashboardStats ? [
    { 
      title: "Total", 
      count: state.dashboardStats.overview?.total || 0, 
      subtitle: "All records", 
      icon: "📊" 
    },
    { 
      title: "Scheduled", 
      count: state.dashboardStats.overview?.scheduled || 0, 
      subtitle: "Upcoming", 
      icon: "📅" 
    },
    { 
      title: "In Progress", 
      count: state.dashboardStats.overview?.inProgress || 0, 
      subtitle: "Active Work", 
      icon: "⚙️" 
    },
    { 
      title: "Completed", 
      count: state.dashboardStats.overview?.completedThisMonth || 0, 
      subtitle: "This month", 
      icon: "✅" 
    },
  ] : [
    { title: "Total", count: 0, subtitle: "All records", icon: "📊" },
    { title: "Scheduled", count: 0, subtitle: "Upcoming", icon: "📅" },
    { title: "In Progress", count: 0, subtitle: "Active Work", icon: "⚙️" },
    { title: "Completed", count: 0, subtitle: "This month", icon: "✅" },
  ];

  const serviceColumns = [
    { key: "maintenanceId", label: "Maintain ID" },
    { key: "vehicleId", label: "Vehicle ID" },
    { key: "driverName", label: "Driver Name" },
    { key: "description", label: "Description" },
    { key: "companyName", label: "Company Name" },
    { key: "date", label: "Date the Maintenance" },
    { key: "shiftDate", label: "Shift Date of the Maintenance" },
    { key: "completeDate", label: "Complete Date of the Maintenance" },
    { key: "cost", label: "Cost" },
    { key: "status", label: "Status" },
  ];

  const repairColumns = [
    { key: "maintenanceId", label: "Maintain ID" },
    { key: "vehicleId", label: "Vehicle ID" },
    { key: "driverName", label: "Driver Name" },
    { key: "description", label: "Description" },
    { key: "requestDate", label: "Request Date for the Maintenance" },
    {
      key: "approveReject",
      label: "Approve / Reject",
      render: (row, onAction) => (
        <div className="action-buttons">
          <button 
            className="action-btn approve" 
            onClick={() => onAction("approve", row)}
            disabled={row.status === 'Approved' || row.status === 'Rejected'}
          >
            {row.status === 'Approved' ? '✓ Approved' : 'Approve'}
          </button>
          <button 
            className="action-btn reject" 
            onClick={() => onAction("reject", row)}
            disabled={row.status === 'Approved' || row.status === 'Rejected'}
          >
            {row.status === 'Rejected' ? '✗ Rejected' : 'Reject'}
          </button>
        </div>
      ),
    },
    { key: "companyName", label: "Company Name" },
    { key: "shiftDate", label: "Shift Date of the Maintenance" },
    { key: "completeDate", label: "Complete Date of the Maintenance" },
    { key: "cost", label: "Cost" },
    { key: "status", label: "Status" },
  ];

  const handleAddService = async () => {
    // 1. Find the highest number currently in the state
    const maxId = state.services.reduce((max, service) => {
      const match = service.maintenanceId?.match(/M(\d+)/);
      const num = match ? parseInt(match[1], 10) : 0;
      return num > max ? num : max;
    }, 0);
  
    // 2. Increment by 1 (This ensures even if you delete records, you move forward)
    const nextNumber = maxId + 1;
  
    const newService = {
      maintenanceId: `M${String(nextNumber).padStart(4, '0')}`, 
      vehicleId: "",
      driverName: "",
      description: "",
      companyName: "",
      date: new Date().toISOString().split('T')[0],
      shiftDate: "",
      completeDate: "",
      cost: 0,
      status: "Scheduled"
    };
    
    try {
      await addService(newService);
    } catch (error) {
      // Check if the error message from the backend contains "E11000"
      if (error.message.includes("E11000")) {
        alert("Database Conflict: This ID already exists in the system index. Please refresh or contact admin.");
      } else {
        alert('Error adding service: ' + error.message);
      }
    }
  };

  const handleAddRepair = async () => {
    const newRepair = {
      vehicleId: "",
      driverName: "",
      description: "",
      companyName: "",
      requestDate: new Date().toISOString().split('T')[0],
      shiftDate: "",
      completeDate: "",
      cost: 0,
      status: "Pending",
      priority: "Medium",
      developmentOfficer: "",
      engineer: "",
      procurementStage1: "",
      tenderCall: "",
      procurementStage2: "",
    };
    
    try {
      await addRepair(newRepair);
    } catch (error) {
      alert('Error adding repair: ' + error.message);
    }
  };

  const handleServiceEdit = async (id, updated) => {
    try {
      await updateService(id, updated);
    } catch (error) {
      alert('Error updating service: ' + error.message);
    }
  };

  const handleRepairEdit = async (id, updated) => {
    try {
      await updateRepair(id, updated);
    } catch (error) {
      alert('Error updating repair: ' + error.message);
    }
  };

  const handleServiceDelete = async (id) => {
    try {
      await deleteService(id);
    } catch (error) {
      alert('Error deleting service: ' + error.message);
    }
  };

  const handleRepairDelete = async (id) => {
    try {
      await deleteRepair(id);
    } catch (error) {
      alert('Error deleting repair: ' + error.message);
    }
  };

  const handleServiceAction = (action, row) => {
    console.log("Service action:", action, row);
  };

  const handleRepairAction = async (action, row) => {
    if (action === "approve") {
      try {
        const comments = prompt("Enter approval comments (optional):");
        await approveRepair(row._id, comments || '');
        alert('Repair approved successfully!');
      } catch (error) {
        alert('Error approving repair: ' + error.message);
      }
    } else if (action === "reject") {
      try {
        const reason = prompt("Enter rejection reason:");
        if (reason) {
          await rejectRepair(row._id, reason);
          alert('Repair rejected successfully!');
        }
      } catch (error) {
        alert('Error rejecting repair: ' + error.message);
      }
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Maintenance Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      <main className="ad-main">
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Maintenance Management</div>
          <div className="sd-header-right" />
        </header>

        <div className="ad-content">
          {state.loading && <div className="loading">Loading...</div>}
          {state.error && <div className="error">Error: {state.error}</div>}

          <Cards data={dashboardCards} />

          <h2 className="section-title">Maintenance Records for Service</h2>
          <SearchBar onFilterChange={setFilters} filterLabel="Date of the Maintenance" />

          <div className="action-bar">
            <ExportPdfBtn data={state.services} filename="maintenance-services" />
            <Button variant="primary" onClick={handleAddService}>+ Add Service</Button>
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
            <Button variant="primary" onClick={handleAddRepair}>+ Add Repair</Button>
            <Button variant="success" onClick={() => navigate("/repairs/approve")}>
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
      </main>
    </div>
  );
}

export default MaintenanceManagement;  // ✅ THIS MUST BE HERE!