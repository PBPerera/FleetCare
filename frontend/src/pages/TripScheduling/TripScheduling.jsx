// src/pages/TripScheduling/TripScheduling.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Cards from "../../components/DashboardCards/Cards.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Table from "../../components/DataTable/Table.jsx";
import Button from "../../components/Buttons/Button.jsx";
import ExportPdfBtn from "../../components/ExportPdfBtn.jsx";
import "../Pages.css";

export default function TripScheduling() {
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

  const [requests, setRequests] = useState([]);

  // Load trips from backend
  const fetchTrips = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/trips");
      const result = await response.json();
      if (result.success) {
        setRequests(result.data.map(t => ({ 
          ...t, 
          id: t._id,
          contact: t.driverContact,
          route: t.pickupDestination
        })));
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // ===== Cards / metrics (same style as your other screens) =====
  const dashboardCards = useMemo(() => {
    const total = requests.length;
    const approved = requests.filter((r) => r.status === "Approved").length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const rejected = requests.filter((r) => r.status === "Rejected").length;
    return [
      { title: "Total", count: total, subtitle: "All requests", icon: "🧾" },
      { title: "Approved", count: approved, subtitle: "Ready to dispatch", icon: "✅" },
      { title: "Pending", count: pending, subtitle: "Awaiting review", icon: "⏳" },
      { title: "Rejected", count: rejected, subtitle: "Declined", icon: "❌" },
    ];
  }, [requests]);

  // ===== Table columns (unique keys + Actions) =====
  const columns = useMemo(
    () => [
      { key: "requestId", label: "Request ID" },
      { key: "vehicleId", label: "Vehicle ID" },
      { key: "driverName", label: "Driver Name" },
      { key: "contact", label: "Driver Contact No" },
      {
        key: "route",
        label: "Pickup & Destination",
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
            <button className="action-btn" onClick={() => onAction("allocate", row)}>
              Allocate
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ===== Filters (similar structure to your Driver screen) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All"); // Van | Car | Bus | Lorry

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return requests.filter((r) => {
      const inQuery =
        !q ||
        [
          r.requestId,
          r.vehicleId,
          r.driverName,
          r.contact,
          r.pickup,
          r.destination,
          r.purpose,
          r.vehicleType,
          String(r.noOfPassengers),
          r.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : r.status === statusFilter;
      const byType = typeFilter === "All" ? true : r.vehicleType === typeFilter;

      return inQuery && byStatus && byType;
    });
  }, [requests, keyword, statusFilter, typeFilter]);

  // ===== CRUD-ish handlers (compatible with TableRow onEdit) =====
  const handleEdit = (id, updated) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const handleAction = async (action, row) => {
    if (action === "approve" || action === "reject") {
      const newStatus = action === "approve" ? "Approved" : "Rejected";
      try {
        const response = await fetch(`http://localhost:5000/api/trips/${row._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        const result = await response.json();
        if (result.success) {
          setRequests((prev) =>
            prev.map((r) => (r.id === row.id ? { ...r, status: newStatus } : r))
          );
        }
      } catch (error) {
        console.error(`Error updating status to ${newStatus}:`, error);
      }
      return;
    }
    if (action === "allocate") {
      navigate("/trip-allocation", { state: { request: row } });
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
        {/* Top Header (same pattern as your other screens) */}
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
          {/* Cards (forced to one line as you requested) */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
            <Cards data={dashboardCards} />
          </div>

          {/* Section title */}
          <h2 className="section-title">Trip Requests</h2>

          {/* Helper bar for parity with other pages */}
          <SearchBar onFilterChange={() => {}} filterLabel="Trip Date" />

          {/* Action bar (filters on left, export on right) */}
          <div className="action-bar" style={{ gap: 12, flexWrap: "wrap" }}>
            {/* Keyword */}
            <div className="fc-input-wrap" style={{ minWidth: 260 }}>
              <input
                className="fc-input"
                placeholder="Search by driver, vehicle, route, purpose..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {/* Status filter */}
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

            {/* Vehicle type filter */}
            <select
              className="fc-input"
              style={{ minWidth: 160 }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All</option>
              <option>Van</option>
              <option>Car</option>
              <option>Lorry</option>
              <option>Bus</option>
            </select>

            {/* Right-side actions */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <ExportPdfBtn data={filtered} filename="trip-requests" />
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
