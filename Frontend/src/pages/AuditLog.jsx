import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Table from "../components/DataTable/Table.jsx";
import { MaintenanceContext } from "../Context/MaintenanceContext.jsx";
import "./Pages.css";

export default function AuditLog() {
  const navigate = useNavigate();
  const ctx = useContext(MaintenanceContext);

  // Fallback if context not mounted
  if (!ctx) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Audit Log</h2>
        <p>MaintenanceContext provider is not mounted.</p>
      </div>
    );
  }

  const { state } = ctx;

  const [collapsed, setCollapsed] = useState(false);

  const [serviceFilters, setServiceFilters] = useState({
    vehicleId: "",
    company: "",
  });

  const [repairFilters, setRepairFilters] = useState({
    vehicleId: "",
    company: "",
  });

  // Sidebar route mapping
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

  // Table columns
  const auditColumns = [
    { key: "vehicleId", label: "Vehicle ID" },
    { key: "driverName", label: "Driver Name" },
    { key: "description", label: "Description" },
    { key: "cost", label: "Cost" },
    { key: "companyName", label: "Company" },
  ];

  // Filter completed services
  const filterServices = (services) => {
    return services
      .filter((s) => s.status === "Completed" && s.completeDate)
      .filter((s) => {
        const matchVehicle = !serviceFilters.vehicleId ||
          s.vehicleId.toLowerCase().includes(serviceFilters.vehicleId.toLowerCase());
        const matchCompany = !serviceFilters.company ||
          s.companyName.toLowerCase().includes(serviceFilters.company.toLowerCase());
        return matchVehicle && matchCompany;
      });
  };

  // Filter completed repairs
  const filterRepairs = (repairs) => {
    return repairs
      .filter((r) => r.status === "Completed" && r.completeDate)
      .filter((r) => {
        const matchVehicle = !repairFilters.vehicleId ||
          r.vehicleId.toLowerCase().includes(repairFilters.vehicleId.toLowerCase());
        const matchCompany = !repairFilters.company ||
          r.companyName.toLowerCase().includes(repairFilters.company.toLowerCase());
        return matchVehicle && matchCompany;
      });
  };

  const filteredServices = filterServices(state.services);
  const filteredRepairs = filterRepairs(state.repairs);

  // Dropdown values
  const serviceCompanies = [...new Set(
    state.services
      .filter((s) => s.status === "Completed")
      .map((s) => s.companyName)
  )];

  const repairCompanies = [...new Set(
    state.repairs
      .filter((r) => r.status === "Completed")
      .map((r) => r.companyName)
  )];

  const handleServiceSearch = (filters) => setServiceFilters(filters);
  const handleRepairSearch = (filters) => setRepairFilters(filters);
  const handleAction = (action, row) => console.log("Audit log action:", action, row);

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Audit Log"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        <header className="ad-header">
          <button
            className="ad-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="ad-burger" />
          </button>

          <div className="ad-header-title">Audit Log</div>
          <div className="ad-header-right" />
        </header>

        <div className="ad-content">
          {/* SERVICES AUDIT */}
          <h2 className="section-title">Audit Logs for Service</h2>
          <div className="searchbar-container">
            <div className="searchbar-input-wrapper">
              <input
                type="text"
                placeholder="Search by Vehicle ID"
                value={serviceFilters.vehicleId}
                onChange={(e) =>
                  handleServiceSearch({
                    ...serviceFilters,
                    vehicleId: e.target.value,
                  })
                }
                className="searchbar-main-input"
              />
              <button className="searchbar-icon-btn">🔍</button>
            </div>
            <select
              value={serviceFilters.company}
              onChange={(e) =>
                handleServiceSearch({
                  ...serviceFilters,
                  company: e.target.value,
                })
              }
              className="searchbar-select"
            >
              <option value="">Company</option>
              {serviceCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <Table
            columns={auditColumns}
            rows={filteredServices}
            onAction={handleAction}
            editable={false}
          />

          {/* REPAIRS AUDIT */}
          <h2 className="section-title">Audit Logs for Repair</h2>
          <div className="searchbar-container">
            <div className="searchbar-input-wrapper">
              <input
                type="text"
                placeholder="Search by Vehicle ID"
                value={repairFilters.vehicleId}
                onChange={(e) =>
                  handleRepairSearch({
                    ...repairFilters,
                    vehicleId: e.target.value,
                  })
                }
                className="searchbar-main-input"
              />
              <button className="searchbar-icon-btn">🔍</button>
            </div>
            <select
              value={repairFilters.company}
              onChange={(e) =>
                handleRepairSearch({
                  ...repairFilters,
                  company: e.target.value,
                })
              }
              className="searchbar-select"
            >
              <option value="">Company</option>
              {repairCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
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
      </main>
    </div>
  );
}
