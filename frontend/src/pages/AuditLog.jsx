import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Table from "../components/DataTable/Table.jsx";
import { MaintenanceContext } from "../context/MaintenanceContext.jsx";
import { auditApi } from "../api/maintenanceApi";
import "./Pages.css";

export default function AuditLog() {
  const navigate = useNavigate();
  const ctx = useContext(MaintenanceContext);

  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedServices, setCompletedServices] = useState([]);
  const [completedRepairs, setCompletedRepairs] = useState([]);

  const [serviceFilters, setServiceFilters] = useState({
    vehicleId: "",
    company: "",
  });

  const [repairFilters, setRepairFilters] = useState({
    vehicleId: "",
    company: "",
  });

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

  // Updated columns - Added Maintenance ID
  const auditColumns = [
    { key: "maintenanceId", label: "Maintenance ID" },
    { key: "vehicleId", label: "Vehicle ID" },
    { key: "driverName", label: "Driver Name" },
    { key: "description", label: "Description" },
    { key: "cost", label: "Cost" },
    { key: "companyName", label: "Company" },
    { key: "completeDate", label: "Completed Date" },
  ];

  const fetchCompletedServices = async () => {
    try {
      setLoading(true);
      const params = {};
      if (serviceFilters.vehicleId) params.vehicleId = serviceFilters.vehicleId;
      if (serviceFilters.company) params.company = serviceFilters.company;

      const response = await auditApi.getCompletedServices(params);
      setCompletedServices(response.data || []);
    } catch (error) {
      console.error('Error fetching completed services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedRepairs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (repairFilters.vehicleId) params.vehicleId = repairFilters.vehicleId;
      if (repairFilters.company) params.company = repairFilters.company;

      const response = await auditApi.getCompletedRepairs(params);
      setCompletedRepairs(response.data || []);
    } catch (error) {
      console.error('Error fetching completed repairs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedServices();
    fetchCompletedRepairs();
  }, []);

  useEffect(() => {
    fetchCompletedServices();
  }, [serviceFilters]);

  useEffect(() => {
    fetchCompletedRepairs();
  }, [repairFilters]);

  const handleServiceSearch = (filters) => setServiceFilters(filters);
  const handleRepairSearch = (filters) => setRepairFilters(filters);

  const serviceCompanies = [...new Set(completedServices.map(s => s.companyName))].filter(Boolean);
  const repairCompanies = [...new Set(completedRepairs.map(r => r.companyName))].filter(Boolean);

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Audit Log"
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

          <div className="sd-header-title">Audit Log</div>
          <div className="sd-header-right" />
        </header>

        <div className="ad-content">
          {loading && <div className="loading">Loading...</div>}

          {/* SERVICES AUDIT */}
          <h2 className="section-title">Audit Logs for Service ({completedServices.length})</h2>
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
              <option value="">All Companies</option>
              {serviceCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <Table
            columns={auditColumns}
            rows={completedServices}
            editable={false}
            showActions={false}
          />

          {/* REPAIRS AUDIT */}
          <h2 className="section-title">Audit Logs for Repair ({completedRepairs.length})</h2>
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
              <option value="">All Companies</option>
              {repairCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <Table
            columns={auditColumns}
            rows={completedRepairs}
            editable={false}
            showActions={false}
          />
        </div>
      </main>
    </div>
  );
}