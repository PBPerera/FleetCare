// src/pages/DriverManagement.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import "./Pages.css";

export default function DriverManagement() {
  const navigate = useNavigate();

  // sidebar/header state
  const [collapsed, setCollapsed] = useState(false);

  const routeMap = {
    Dashboard: "/admindashboard",
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

  // ===== Demo data (swap with API/Context later) =====
  // NOTE: To cooperate with your TableRow's "new row" detection,
  // we assign vehicleId = nic for existing rows (non-empty),
  // and set vehicleId = "" only for newly added rows.
  const [drivers, setDrivers] = useState([]);

  // ===== Cards / metrics (same pattern as Vehicles/Maintenance) =====
  const dashboardCards = useMemo(() => {
    const total = drivers.length;
    const available = drivers.filter((d) => d.status === "Available").length;
    const onTrip = drivers.filter((d) => d.status === "On Trip").length;
    const offDuty = drivers.filter((d) => d.status === "Off Duty").length;
    return [
      { title: "Total", count: total, subtitle: "All drivers", icon: "🧑‍✈️" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "On Trip", count: onTrip, subtitle: "Active trips", icon: "📍" },
      { title: "Off Duty", count: offDuty, subtitle: "Resting", icon: "🌙" },
    ];
  }, [drivers]);

  // ===== Table columns (unique keys + Actions) =====
  const columns = useMemo(
    () => [
      { key: "nic", label: "NIC No" },
      { key: "name", label: "Name" },
      { key: "address", label: "Address" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone No" },
      { key: "licenseNo", label: "License No" },
      { key: "registerDate", label: "Register Date" },
      { key: "licenseRenewalDate", label: "License Renewal Date" },
      { key: "licenseExpiry", label: "License Expiry Date" },
      { key: "healthAssessment", label: "Health Assessment" },
      { key: "status", label: "Status" },
      {
        key: "actions",
        label: "Actions",
        render: (row, onAction) => (
          <div className="action-buttons">
            <button className="action-btn approve" onClick={() => onAction("details", row)}>
              Details
            </button>
            <button className="action-btn" onClick={() => onAction("assign", row)}>
              Assign
            </button>
            <button className="action-btn reject" onClick={() => onAction("delete", row)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ===== Filters (kept similar to your prior screen) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("Any"); // Any | Expiring Soon | Expired

  const filtered = useMemo(() => {
    const now = new Date();
    const soonMs = 1000 * 60 * 60 * 24 * 30; // 30 days

    return drivers.filter((d) => {
      const q = keyword.trim().toLowerCase();
      const inQuery =
        !q ||
        [d.nic, d.name, d.email, d.licenseNo, d.address, d.phone]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : d.status === statusFilter;

      const byLicense =
        licenseFilter === "Any"
          ? true
          : (() => {
              const exp = new Date(d.licenseExpiry);
              if (isNaN(exp)) return true;
              if (licenseFilter === "Expired") return exp < now;
              if (licenseFilter === "Expiring Soon") return exp >= now && exp - now <= soonMs;
              return true;
            })();

      return inQuery && byStatus && byLicense;
    });
  }, [drivers, keyword, statusFilter, licenseFilter]);

  // ===== CRUD handlers (compatible with your TableRow onEdit signature) =====
  const handleAddDriver = () => {
    const newRow = {
      id: Date.now(),
      vehicleId: "", // empty -> new row opens in edit mode (per TableRow logic)
      nic: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      licenseNo: "",
      registerDate: "",
      licenseRenewalDate: "",
      licenseExpiry: "",
      healthAssessment: "",
      status: "Available",
    };
    setDrivers((prev) => [newRow, ...prev]);
  };

  const handleEdit = (id, updated) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
  };

  const handleAction = (action, row) => {
    if (action === "delete") {
      setDrivers((prev) => prev.filter((d) => d.id !== row.id));
    }
    if (action === "details") {
      navigate("/drivers/details", { state: { driver: row } });
    }
    if (action === "assign") {
      navigate("/trip-allocation", { state: { driverNic: row.nic } });
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Driver Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Top Header (same pattern as Vehicles/Maintenance) */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Driver Management</div>
          <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
               <Cards data={dashboardCards} />
          </div>


          {/* Section title */}
          <h2 className="section-title">Drivers</h2>

          {/* (Optional) helper bar for parity with other pages */}
          <SearchBar onFilterChange={() => {}} filterLabel="License Expiry" />

          {/* Action bar: export + add button (same layout as Maintenance/Vehicles) */}
          <div className="action-bar">
            <ExportPdfBtn data={filtered} filename="drivers" />
          </div>

          {/* Data table */}
          <Table
            columns={columns}
            rows={filtered}
            showCheckbox
            editable
            onEdit={handleEdit}
            onAction={handleAction}
          />
        </div>
      </main>
    </div>
  );
}
