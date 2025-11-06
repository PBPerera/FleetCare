// src/pages/MaintenanceManagement.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportpdfBtn.jsx";
import { MaintenanceContext } from "../Context/MaintenanceContext.jsx";
import "./Pages.css";




export default function MaintenanceManagement() {
  const navigate = useNavigate();
  const { state, setFilters, addService, addRepair, updateService, updateRepair } =
    useContext(MaintenanceContext);

  // sidebar/header UI
  const [collapsed, setCollapsed] = useState(false);

  // map sidebar item → route
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

  const dashboardCards = [
    { title: "Total",       count: 4,  subtitle: "All records", icon: "📊" },
    { title: "Scheduled",   count: 1,  subtitle: "Upcoming",    icon: "📅" },
    { title: "In Progress", count: 2,  subtitle: "Active Work", icon: "⚙️" },
    { title: "Completed",   count: 10, subtitle: "This month",  icon: "✅" },
  ];

  // NOTE: column keys must be unique. If your Table supports duplicate keys, you can revert,
  // but most tables need unique keys—so Date/Shift/Complete are separate below.
  const serviceColumns = [
    { key: "maintenanceId", label: "Maintain ID" },
    { key: "vehicleId",     label: "Vehicle ID" },
    { key: "driverName",    label: "Driver Name" },
    { key: "description",   label: "Description" },
    { key: "companyName",   label: "Company Name" },
    { key: "date",          label: "Date the Maintenance" },       // was shiftDate
    { key: "shiftDate",     label: "Shift Date of the Maintenance"},
    { key: "completeDate",  label: "Complete Date of the Maintenance" },
    { key: "cost",          label: "Cost" },
  ];

  const repairColumns = [
    { key: "maintenanceId", label: "Maintain ID" },
    { key: "vehicleId",     label: "Vehicle ID" },
    { key: "driverName",    label: "Driver Name" },
    { key: "description",   label: "Description" },
    { key: "requestDate",   label: "Request Date for the Maintenance" }, // was shiftDate
    {
      key: "approveReject",
      label: "Approve / Reject",
      render: (row, onAction) => (
        <div className="action-buttons">
          <button className="action-btn approve" onClick={() => onAction("approve", row)}>
            Approve
          </button>
          <button className="action-btn reject" onClick={() => onAction("reject", row)}>
            Reject
          </button>
        </div>
      ),
    },
    { key: "companyName",  label: "Company Name" },
    { key: "shiftDate",    label: "Shift Date of the Maintenance" },
    { key: "completeDate", label: "Complete Date of the Maintenance" },
    { key: "cost",         label: "Cost" },
  ];

  const handleAddService = () => {
    const newService = {
      id: `S${Date.now()}`,
      maintenanceId: `M${String(state.services.length + 1).padStart(4, "0")}`,
      vehicleId: "",
      driverName: "",
      description: "",
      companyName: "",
      date: "",          // for serviceColumns.date
      shiftDate: "",
      completeDate: "",
      cost: "",
    };
    addService(newService);
  };

  const handleAddRepair = () => {
    const newRepair = {
      id: `R${Date.now()}`,
      maintenanceId: `M${String(state.repairs.length + 1).padStart(4, "0")}`,
      vehicleId: "",
      driverName: "",
      description: "",
      companyName: "",
      requestDate: "",   // for repairColumns.requestDate
      shiftDate: "",
      completeDate: "",
      cost: "",
      status: "Pending",
      developmentOfficer: "",
      engineer: "",
      procurementStage1: "",
      tenderCall: "",
      procurementStage2: "",
    };
    addRepair(newRepair);
  };

  const handleServiceEdit = (id, updated) => updateService(id, updated);
  const handleRepairEdit  = (id, updated) => updateRepair(id, updated);

  const handleServiceAction = (action, row) => {
    console.log("Service action:", action, row);
  };

  const handleRepairAction = (action, row) => {
    if (action === "approve") {
      navigate("/repairs/approve");
    } else if (action === "reject") {
      alert(`Rejected: ${row.maintenanceId}`);
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Maintenance Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Header */}
        <header className="ad-header">
          <button
            className="ad-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="ad-burger" />
          </button>

          <div className="ad-header-title">Maintenance Management</div>

          <div className="ad-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
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
            editable
            onEdit={handleServiceEdit}
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
            editable
            onEdit={handleRepairEdit}
          />
        </div>
      </main>
    </div>
  );
}
