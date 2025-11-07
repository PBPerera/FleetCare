// src/pages/TripScheduling.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportpdfBtn.jsx";
import "./Pages.css";

export default function TripScheduling() {
  const navigate = useNavigate();

  // Sidebar/header state
  const [collapsed, setCollapsed] = useState(false);

  // left menu routing (same pattern as other pages)
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

  // ===== Demo data (swap with API/context later) =====
  const [trips, setTrips] = useState([
    {
      id: 1,
      requestId: "R0001",
      vehicleId: "WWA-2258",
      driverName: "Kumara Silva",
      contact: "07046589",
      pickup: "Panadura Hospital",
      destination: "Colombo Hospital",
      tripDate: "2025-09-25",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: 3,
      status: "Pending", // Pending | Approved | Rejected
    },
    {
      id: 2,
      requestId: "R0002",
      vehicleId: "AAA-1234",
      driverName: "Nuwan Perera",
      contact: "0771234567",
      pickup: "Kandy",
      destination: "Colombo",
      tripDate: "2025-10-01",
      tripTime: "08:30 AM",
      purpose: "Staff Shuttle",
      vehicleType: "Van",
      noOfPassengers: 4,
      status: "Pending",
    },
    {
      id: 3,
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Amal Silva",
      contact: "0719876543",
      pickup: "Galle",
      destination: "Matara",
      tripDate: "2025-10-03",
      tripTime: "02:00 PM",
      purpose: "Delivery",
      vehicleType: "Lorry",
      noOfPassengers: 1,
      status: "Approved",
    },
  ]);

  // ===== Cards / metrics (same style as Vehicle page) =====
  const dashboardCards = useMemo(() => {
    const total = trips.length;
    const approved = trips.filter((t) => t.status === "Approved").length;
    const pending = trips.filter((t) => t.status === "Pending").length;
    const rejected = trips.filter((t) => t.status === "Rejected").length;
    return [
      { title: "Total", count: total, subtitle: "All requests", icon: "🧾" },
      { title: "Approved", count: approved, subtitle: "Ready to dispatch", icon: "✅" },
      { title: "Pending", count: pending, subtitle: "Awaiting action", icon: "⏳" },
      { title: "Rejected", count: rejected, subtitle: "Not scheduled", icon: "❌" },
    ];
  }, [trips]);

  // ===== Table columns (unique keys + Actions) =====
  const columns = useMemo(
    () => [
      { key: "requestId", label: "Request ID" },
      { key: "vehicleId", label: "Vehicle ID" },
      { key: "driverName", label: "Driver Name" },
      { key: "contact", label: "Driver Contact" },
      {
        key: "route",
        label: "Pickup → Destination",
        render: (row) => <span>{row.pickup} → {row.destination}</span>,
      },
      { key: "tripDate", label: "Trip Date" },
      { key: "tripTime", label: "Trip Time" },
      { key: "purpose", label: "Purpose" },
      { key: "vehicleType", label: "Vehicle Type" },
      { key: "noOfPassengers", label: "Passengers" },
      { key: "status", label: "Status" },
      {
        key: "actions",
        label: "Actions",
        render: (row, onAction) => (
          <div className="action-buttons">
            <button className="action-btn approve" onClick={() => onAction("approve", row)}>
              Approve
            </button>
            <button className="action-btn reject" onClick={() => onAction("reject", row)}>
              Reject
            </button>
            <button className="action-btn" onClick={() => onAction("details", row)}>
              Details
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ===== Filters (kept similar to other pages) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return trips.filter((t) => {
      const inQuery =
        !q ||
        [
          t.requestId,
          t.vehicleId,
          t.driverName,
          t.contact,
          t.pickup,
          t.destination,
          t.purpose,
          t.vehicleType,
          t.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : t.status === statusFilter;
      const byType = typeFilter === "All" ? true : t.vehicleType === typeFilter;
      return inQuery && byStatus && byType;
    });
  }, [trips, keyword, statusFilter, typeFilter]);

  // ===== CRUD / actions =====
  const handleAddTrip = () => {
    const newRow = {
      id: Date.now(),
      requestId: `R${String(trips.length + 1).padStart(4, "0")}`,
      vehicleId: "", // empty -> new row starts editable (per TableRow)
      driverName: "",
      contact: "",
      pickup: "",
      destination: "",
      tripDate: "",
      tripTime: "",
      purpose: "",
      vehicleType: "",
      noOfPassengers: "",
      status: "Pending",
    };
    setTrips((prev) => [newRow, ...prev]);
  };

  const handleEdit = (id, updated) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const handleAction = (action, row) => {
    if (action === "approve") {
      setTrips((prev) => prev.map((t) => (t.id === row.id ? { ...t, status: "Approved" } : t)));
      return;
    }
    if (action === "reject") {
      setTrips((prev) => prev.map((t) => (t.id === row.id ? { ...t, status: "Rejected" } : t)));
      return;
    }
    if (action === "details") {
      navigate("/trip-allocation", { state: { requestId: row.requestId } });
      return;
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Trip Scheduling"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Top Header */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Trip Scheduling</div>
          <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <Cards data={dashboardCards} />

          {/* Section title */}
          <h2 className="section-title">Trip Requests</h2>

          {/* Helper bar (kept for parity with other pages) */}
          <SearchBar onFilterChange={() => {}} filterLabel="Trip Date" />

          {/* Action bar: filters + export + add */}
          <div className="action-bar" style={{ gap: 12, flexWrap: "wrap" }}>
            <div className="fc-input-wrap" style={{ minWidth: 260 }}>
              <input
                className="fc-input"
                placeholder="Search request, vehicle, driver, route..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <select
              className="fc-input"
              style={{ minWidth: 160 }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All</option>
              <option>Car</option>
              <option>Van</option>
              <option>Lorry</option>
              <option>Bus</option>
            </select>

            <select
              className="fc-input"
              style={{ minWidth: 160 }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <ExportPdfBtn data={filtered} filename="trip-requests" />
              <Button variant="primary" onClick={handleAddTrip}>+ Add Trip</Button>
            </div>
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
