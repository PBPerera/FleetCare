// src/pages/TripScheduling.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./TripScheduling.css";

export default function TripScheduling() {
  const navigate = useNavigate();

  // Sidebar / header
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

  // ===== Demo data (replace with API) =====
  const requests = useMemo(
    () => [
      {
        reqId: "R0001",
        vehicleId: "WWA-2258",
        driver: "Kumara Silva",
        driverPhone: "07046589",
        route: "Panadura Hospital → Colombo Hospital",
        tripDate: "2025-09-25",
      },
      {
        reqId: "R0002",
        vehicleId: "WP-CAR-1990",
        driver: "Saman Perera",
        driverPhone: "0771234567",
        route: "Kandy → Peradeniya",
        tripDate: "2025-09-27",
      },
      {
        reqId: "R0003",
        vehicleId: "WP-VAN-4411",
        driver: "Nuwan Jay",
        driverPhone: "0718884433",
        route: "Galle → Karapitiya Hospital",
        tripDate: "2025-10-01",
      },
    ],
    []
  );

  // Controls
  const [q, setQ] = useState("");                 // search vehicle/req/driver
  const [date, setDate] = useState("");           // yyyy-mm-dd

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return requests.filter((r) => {
      const matchesText =
        !term ||
        [r.reqId, r.vehicleId, r.driver, r.driverPhone, r.route]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesDate = !date || r.tripDate === date;

      return matchesText && matchesDate;
    });
  }, [requests, q, date]);

  const exportPdf = () => window.print(); // simple stub

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Trip Scheduling"
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

          <div className="ad-header-title">Trip Scheduling</div>
          <div className="ad-header-right" />
        </header>

        <div className="ad-content">
          {/* Toolbar */}
          <section className="ts-toolbar">
            <div className="ts-search">
              <span className="ts-ico" aria-hidden>🔎</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Vehicle ID / Request ID / Driver"
              />
            </div>

            <div className="ts-filters">
              <label className="ts-date">
                <span>Trip Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <button className="ts-export" onClick={exportPdf}>
                Export Pdf
              </button>
            </div>
          </section>

          {/* Table Card */}
          <section className="ts-card">
            <div className="ts-card-head">
              <h3>Trip Requests</h3>
            </div>

            <div className="ts-table-wrap">
              <table className="ts-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Vehicle ID</th>
                    <th>Driver Name</th>
                    <th>Driver Contact Number</th>
                    <th>Pickup &amp; Destination</th>
                    <th>Trip Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.reqId}>
                      <td>{r.reqId}</td>
                      <td>{r.vehicleId}</td>
                      <td>{r.driver}</td>
                      <td>{r.driverPhone}</td>
                      <td>{r.route}</td>
                      <td>{fmt(r.tripDate)}</td>
                    </tr>
                  ))}

                  {!filtered.length && (
                    <tr>
                      <td colSpan="6" className="ts-empty">
                        No trip requests match your filters.
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

/* utils */
function fmt(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}
