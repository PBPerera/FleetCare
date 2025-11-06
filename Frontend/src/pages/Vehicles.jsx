// src/pages/Vehicles.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Vehicles.css";

export default function Vehicles() {
  const navigate = useNavigate();

  // sidebar/header
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

  // ===== Demo dataset (swap with API) =====
  const vehicles = useMemo(
    () => [
      {
        id: "WP-CAR-1990",
        type: "Car",
        wheelSerial: "BK182553",
        wheelSize: "195/65 R15",
        engineNo: "E111458",
        batteryNo: "B00245",
        chassisNo: "1HGCM82633A123456",
        registerdate: "2022-05-10",
        insurancerenewaldate: "2024-12-10",
        insuranceExpiry: "2025-12-10",
        status: "Available",
        action: "Edit",
        
      },
      {
        id: "WP-NA-4565",
        type: "Van",
        wheelSerial: "BL182553",
        wheelSize: "205/55 R16",
        engineNo: "E118848",
        batteryNo: "B00245",
        chassisNo: "JHMFA16586S012345",
        registerdate: "2021-08-15",
        insurancerenewaldate: "2024-11-05",
        insuranceExpiry: "2025-11-05",
        status: "Assigned",
        action: "Edit",
        
      },
      {
        id: "WP-LB-5425",
        type: "Lorry",
        wheelSerial: "CK182553",
        wheelSize: "225/50 R17",
        engineNo: "E258848",
        batteryNo: "B00245",
        chassisNo: "2T1BU4EE9AC123456",
        registerdate: "2020-03-20",
        insurancerenewaldate: "2024-10-20",
        insuranceExpiry: "2026-01-20",
        status: "Available",
        action: "Edit",
      },
      {
        id: "253-5465",
        type: "Van",
        wheelSerial: "MG182673",
        wheelSize: "235/45 R18",
        engineNo: "E119148",
        batteryNo: "B00245",
        chassisNo: "WDBUF56X98B123456",
        registerdate: "2019-11-30",
        insurancerenewaldate: "2024-09-15",
        insuranceExpiry: "2025-10-15",
        status: "Maintenance",
        action: "Edit",
        
      },
    ],
    []
  );

  // ===== Metrics =====
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === "Available").length;
  const assigned = vehicles.filter((v) => v.status === "Assigned").length;
  const maintenance = vehicles.filter((v) => v.status === "Maintenance").length;

  // ===== Controls =====
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [vtype, setVtype] = useState("All");
  const [insurance, setInsurance] = useState("Any"); // Any | Expiring Soon | Expired

  const filtered = useMemo(() => {
    const now = new Date();
    const soonMs = 1000 * 60 * 60 * 24 * 30; // 30 days

    let list = vehicles;

    // search by vehicle id / chassis / engine
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((v) =>
        [
          v.id,
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
          .includes(query)
      );
    }

    // status
    if (status !== "All") list = list.filter((v) => v.status === status);

    // vehicle type
    if (vtype !== "All") list = list.filter((v) => v.type === vtype);

    // insurance filter
    if (insurance !== "Any") {
      list = list.filter((v) => {
        const d = new Date(v.insuranceExpiry);
        if (insurance === "Expired") return d < now;
        if (insurance === "Expiring Soon") return d >= now && d - now <= soonMs;
        return true;
      });
    }

    return list;
  }, [vehicles, q, status, vtype, insurance]);

  const exportPdf = () => {
    // Stub: wire up jsPDF/print() later
    window.print();
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Vehicle Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

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

          <div className="ad-header-title">Vehicle Management</div>

          <div className="ad-header-right" />
        </header>

        <div className="ad-content">
          {/* Metrics */}
          <section className="vm-metrics">
            <Metric title="Total Vehicles" value={pad(total)} />
            <Metric title="Available Vehicle" value={pad(available)} />
            <Metric title="Assigned Vehicle" value={pad(assigned)} />
            <Metric title="Maintenance" value={pad(maintenance)} />
          </section>

          {/* Toolbar */}
          <section className="vm-toolbar">
            <div className="vm-search">
              <span className="vm-search-ico" aria-hidden>🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by vehicle ID / chassis / engine"
              />
            </div>

            <div className="vm-filters">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>All</option>
                <option>Available</option>
                <option>Assigned</option>
                <option>Maintenance</option>
              </select>

              <select value={insurance} onChange={(e) => setInsurance(e.target.value)}>
                <option value="Any">Insurance Expiry Date</option>
                <option value="Expiring Soon">Expiring Soon (30d)</option>
                <option value="Expired">Expired</option>
              </select>

              <select value={vtype} onChange={(e) => setVtype(e.target.value)}>
                <option>All</option>
                <option>Car</option>
                <option>Van</option>
                <option>Lorry</option>
                <option>Bus</option>
                <option>Bike</option>
              </select>

              <button className="vm-export" onClick={exportPdf}>
                Export Pdf
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="vm-card">
            <div className="vm-card-head">
              <h3>Vehicles</h3>
            </div>
            <div className="vm-table-wrap">
              <table className="vm-table">
                <thead>
                  <tr>
                    <th>Vehicle ID</th>
                    <th>Vehicle Type</th>
                    <th>Wheel Serial No</th>
                    <th>Wheel Size</th>
                    <th>Engine No</th>
                    <th>Battery No</th>
                    <th>Chassis No</th>
                    <th>Register Date</th>
                    <th>Insurance Renewal Date</th>
                    <th>Insurance Expiry</th>
                    <th>Status</th>
                    <th>Action</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td>{v.type}</td>
                      <td>{v.wheelSerial}</td>
                      <td>{v.wheelSize}</td>
                      <td>{v.engineNo}</td>
                      <td>{v.batteryNo}</td>
                      <td className="vm-chassis">{v.chassisNo}</td>
                      <td>{fmt(v.registerdate)}</td>
                      <td>{fmt(v.insurancerenewaldate)}</td>
                      <td>{fmt(v.insuranceExpiry)}</td>
                      <td>
                        <span className={`vm-badge ${badgeTone(v.status)}`}>
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <span className={`vm-badge ${badgeTone(v.action)}`}>
                          {v.action}
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan="9" className="vm-empty">No vehicles match your filters.</td>
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

/* --- small bits --- */
function Metric({ title, value }) {
  return (
    <div className="vm-metric">
      <div className="vm-metric-title">{title}</div>
      <div className="vm-metric-value">{value}</div>
    </div>
  );
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function badgeTone(status) {
  if (status === "Available") return "green";
  if (status === "Assigned") return "blue";
  if (status === "Maintenance") return "amber";
  return "gray";
}

function fmt(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}
