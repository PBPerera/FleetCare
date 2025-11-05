// src/pages/DriverManagement.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./DriverManagement.css";

export default function DriverManagement() {
  const navigate = useNavigate();

  // sidebar/header state
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

  // ===== demo data (swap with API) =====
  const drivers = useMemo(
    () => [
      {
        nic: "199912365498",
        name: "Sarath Kumara",
        address: "No. 25, Temple Road, Kandy",
        email: "sarathkumara@gmail.com",
        phone: "0760021526",
        licenseNo: "B1234567",
        status: "Available",
        licenseExpiry: "2025-09-25",
      },
      {
        nic: "200078945612",
        name: "Ajith Pushpakumara",
        address: "45/3, Galle Road, Colombo 06",
        email: "ajithpushpakumara@gmail.com",
        phone: "0723816829",
        licenseNo: "B7654321",
        status: "On Trip",
        licenseExpiry: "2025-10-12",
      },
      {
        nic: "199854123698",
        name: "Kasun Thilakarathna",
        address: "No. 12, Station Lane, Kurunegala",
        email: "kasunthilakarathna@gmail.com",
        phone: "0714856045",
        licenseNo: "B1715942",
        status: "Off Duty",
        licenseExpiry: "2025-08-31",
      },
    ],
    []
  );

  // metrics
  const total = drivers.length;
  const available = drivers.filter((d) => d.status === "Available").length;
  const onTrip = drivers.filter((d) => d.status === "On Trip").length;
  const offDuty = drivers.filter((d) => d.status === "Off Duty").length;

  // controls
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("Any"); // Any | Expiring Soon | Expired

  const filtered = useMemo(() => {
    const now = new Date();
    const soon = 1000 * 60 * 60 * 24 * 30; // 30 days

    let list = drivers;

    // search by name / NIC / email / license
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((d) =>
        [d.nic, d.name, d.email, d.licenseNo, d.address, d.phone]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    // status
    if (status !== "All") list = list.filter((d) => d.status === status);

    // license expiry filter
    if (licenseFilter !== "Any") {
      list = list.filter((d) => {
        const exp = new Date(d.licenseExpiry);
        if (licenseFilter === "Expired") return exp < now;
        if (licenseFilter === "Expiring Soon") return exp >= now && exp - now <= soon;
        return true;
      });
    }

    return list;
  }, [drivers, q, status, licenseFilter]);

  const exportPdf = () => window.print(); // stub

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Driver Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

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

          <div className="ad-header-title">Driver Management</div>
          <div className="ad-header-right" />
        </header>

        <div className="ad-content">
          {/* Metrics */}
          <section className="dm-metrics">
            <Metric title="Total Drivers" value={pad(total)} />
            <Metric title="Available Drivers" value={pad(available)} />
            <Metric title="On Trip" value={pad(onTrip)} />
            <Metric title="Off Duty" value={pad(offDuty)} />
          </section>

          {/* Toolbar */}
          <section className="dm-toolbar">
            <div className="dm-search">
              <span className="dm-search-ico" aria-hidden>🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Driver Name / NIC / License"
              />
            </div>

            <div className="dm-filters">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>All</option>
                <option>Available</option>
                <option>On Trip</option>
                <option>Off Duty</option>
              </select>

              <select
                value={licenseFilter}
                onChange={(e) => setLicenseFilter(e.target.value)}
              >
                <option value="Any">License Expiry Date</option>
                <option value="Expiring Soon">Expiring Soon (30d)</option>
                <option value="Expired">Expired</option>
              </select>

              <button className="dm-export" onClick={exportPdf}>
                Export Pdf
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="dm-card">
            <div className="dm-card-head">
              <h3>Drivers</h3>
            </div>

            <div className="dm-table-wrap">
              <table className="dm-table">
                <thead>
                  <tr>
                    <th>NIC No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>License No</th>
                    <th>Status</th>
                    <th>License Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.nic}>
                      <td>{d.nic}</td>
                      <td>{d.name}</td>
                      <td>{d.address}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td>{d.licenseNo}</td>
                      <td>
                        <span className={`dm-badge ${tone(d.status)}`}>{d.status}</span>
                      </td>
                      <td>{fmt(d.licenseExpiry)}</td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan="8" className="dm-empty">
                        No drivers match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* helpers */
function Metric({ title, value }) {
  return (
    <div className="dm-metric">
      <div className="dm-metric-title">{title}</div>
      <div className="dm-metric-value">{value}</div>
    </div>
  );
}
const pad = (n) => String(n).padStart(2, "0");
const tone = (s) =>
  s === "Available" ? "green" : s === "On Trip" ? "blue" : s === "Off Duty" ? "amber" : "gray";

function fmt(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}
