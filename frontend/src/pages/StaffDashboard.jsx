import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css";

export default function StaffDashboard() {
  const navigate = useNavigate();

  // sidebar + header state
  const [collapsed, setCollapsed] = useState(false);

  // Map sidebar labels to your routes
  const routeMap = {
    "Dashboard": "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/add-vehicle",
    "Driver Details": "/staff/driver-details",
    "Search and Reports": "/staff/reports",
    "Notifications": "/staff/notifications",
  };

  return (
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      <StaffSidebar
        collapsed={collapsed}
        active="Dashboard"
        onNavigate={(label) => navigate(routeMap[label] || "/staff/dashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      <main className="sd-main">
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

          <div className="sd-header-title">Dashboard</div>
          <div className="sd-header-right" />
        </header>

        {/* Content */}
        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Dashboard</h1>
            <p>Welcome back! Here’s your quick overview.</p>
          </section>

          {/* Metric cards */}
          <section className="sd-metrics">
            <MetricCard title="Pending Requests" value="3" change="+1 today" icon="🕒" trend="up" />
            <MetricCard title="Approved" value="12" change="This month" icon="✅" trend="neutral" />
            <MetricCard title="Vehicles In Use" value="7" change="Now" icon="🚚" trend="neutral" />
            <MetricCard title="Notifications" value="5" change="2 unread" icon="🔔" trend="down" />
          </section>

          {/* Recent items */}
          <section className="sd-section">
            <div className="sd-section-head">
              <h2>Recent Requests</h2>
            </div>

            <div className="sd-req-grid">
              <RequestCard id="REQ-1021" purpose="Clinic supply run" status="Approved" date="2025-11-03" />
              <RequestCard id="REQ-1020" purpose="Lab samples transfer" status="Pending" date="2025-11-02" />
              <RequestCard id="REQ-1019" purpose="Outreach visit" status="Rejected" date="2025-11-01" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------- tiny presentational bits ---------- */

function MetricCard({ title, value, change, icon, trend = "neutral" }) {
  const trendClass =
    trend === "up" ? "sd-trend-up" :
    trend === "down" ? "sd-trend-down" :
    "sd-trend-neutral";

  return (
    <div className="sd-card sd-metric">
      <div className="sd-metric-top">
        <div className="sd-metric-icon">{icon}</div>
      </div>
      <div className="sd-metric-body">
        <p className="sd-metric-title">{title}</p>
        <p className="sd-metric-value">{value}</p>
        {change && <p className={`sd-metric-change ${trendClass}`}>{change}</p>}
      </div>
    </div>
  );
}

function RequestCard({ id, purpose, status, date }) {
  const tone =
    status === "Approved" ? "green" :
    status === "Pending" ? "amber" : "gray";

  return (
    <div className="sd-card sd-req">
      <div className="sd-req-head">
        <div className="sd-req-title">
          <div className="sd-req-icon">📄</div>
          <div>
            <div className="sd-req-id">{id}</div>
            <div className="sd-req-purpose">{purpose}</div>
          </div>
        </div>
        <span className={`sd-badge ${badgeTone(tone)}`}>{status}</span>
      </div>

      <div className="sd-req-info">
        <Row icon="📅" label={date} />
        <Row icon="📍" label="Head Office → Regional Clinic" />
      </div>

      <div className="sd-req-actions">
        <button className="sd-btn-outline">View</button>
        <button className="sd-btn-solid">Track</button>
      </div>
    </div>
  );
}

function Row({ icon, label }) {
  return (
    <div className="sd-row">
      <span className="sd-row-ico">{icon}</span>
      <span className="sd-row-txt">{label}</span>
    </div>
  );
}

function badgeTone(tone) {
  if (tone === "green") return "sd-badge-green";
  if (tone === "amber") return "sd-badge-amber";
  return "sd-badge-gray";
}
