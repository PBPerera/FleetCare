// src/pages/Vehicles.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import "./Pages.css";

export default function Vehicles() {
  const navigate = useNavigate();

  // Sidebar/header UI
  const [collapsed, setCollapsed] = useState(false);

  // map sidebar item → route (kept identical to MaintenanceManagement.jsx)
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

  // ===== Data (demo set; swap with API/context later) =====
  // Keep an internal numeric/string 'id' AND the visible 'vehicleId'
  const [vehicles, setVehicles] = useState([]);

  // ===== Cards / metrics (same style as Maintenance) =====
  const dashboardCards = useMemo(() => {
    const total = vehicles.length;
    const available = vehicles.filter((v) => v.status === "Available").length;
    const assigned = vehicles.filter((v) => v.status === "Assigned").length;
    const maintenance = vehicles.filter((v) => v.status === "Maintenance").length;
    return [
      { title: "Total", count: total, subtitle: "All vehicles", icon: "🚗" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "Assigned", count: assigned, subtitle: "In use", icon: "📌" },
      { title: "Maintenance", count: maintenance, subtitle: "In service", icon: "🛠️" },
    ];
  }, [vehicles]);

  // ===== Table columns (unique keys; with Actions like in repairs table) =====
  const columns = useMemo(
    () => [
      { key: "vehicleId", label: "Vehicle ID" },
      { key: "type", label: "Vehicle Type" },
      { key: "wheelSerial", label: "Wheel Serial No" },
      { key: "wheelSize", label: "Wheel Size" },
      { key: "engineNo", label: "Engine No" },
      { key: "batteryNo", label: "Battery No" },
      { key: "chassisNo", label: "Chassis No" },
      { key: "registerdate", label: "Register Date" },
      { key: "insurancerenewaldate", label: "Insurance Renewal Date" },
      { key: "insuranceExpiry", label: "Insurance Expiry" },
      { key: "status", label: "Status" },
      {
        key: "actions",
        label: "Actions",
        render: (row, onAction) => (
          <div className="action-buttons">
            <button className="action-btn approve" onClick={() => onAction("details", row)}>
              Details
            </button>
            <button className="action-btn" onClick={() => onAction("service", row)}>
              Service
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

  // ===== Filters (kept simple; match Maintenance UX with SearchBar present) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return vehicles.filter((v) => {
      const inQuery =
        !q ||
        [
          v.vehicleId,
          v.type,
          v.wheelSerial,
          v.wheelSize,
          v.engineNo,
          v.batteryNo,
          v.chassisNo,
          v.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : v.status === statusFilter;
      const byType = typeFilter === "All" ? true : v.type === typeFilter;

      return inQuery && byStatus && byType;
    });
  }, [vehicles, keyword, statusFilter, typeFilter]);

  // ===== CRUD handlers (compatible with your TableRow onEdit(row.id, updated)) =====
  const handleAddVehicle = () => {
    const newRow = {
      id: Date.now(),       // internal identifier used by TableRow
      vehicleId: "",        // empty so new row opens in edit mode automatically
      type: "",
      wheelSerial: "",
      wheelSize: "",
      engineNo: "",
      batteryNo: "",
      chassisNo: "",
      registerdate: "",
      insurancerenewaldate: "",
      insuranceExpiry: "",
      status: "Available",
    };
    setVehicles((prev) => [newRow, ...prev]);
  };

  const handleEdit = (id, updated) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
  };

  const handleAction = (action, row) => {
    if (action === "delete") {
      setVehicles((prev) => prev.filter((v) => v.id !== row.id));
    }
    if (action === "details") {
      navigate("/vehicles/details", { state: { vehicle: row } });
    }
    if (action === "service") {
      navigate("/maintenance", { state: { vehicleId: row.vehicleId } });
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Vehicle Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Top Header (same pattern as Maintenance) */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

        <div className="sd-header-title">Vehicle Management</div>
        <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <Cards data={dashboardCards} />

          {/* Vehicles section (mirrors Maintenance section structure) */}
          <h2 className="section-title">Vehicles</h2>

          {/* Helper bar (kept for visual parity; you can wire date logic later) */}
          <SearchBar onFilterChange={() => {}} filterLabel="Insurance Expiry" />

          {/* Action bar: export + add button (same layout as Maintenance) */}
          <div className="action-bar">
            <ExportPdfBtn data={filtered} filename="vehicles" />
            <Button variant="primary" onClick={handleAddVehicle}>+ Add Vehicle</Button>
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
