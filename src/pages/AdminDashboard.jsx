import React, { useState } from "react";
import "./admin-dashboard.css"; // load styles once here
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active={active}
        onNavigate={(label) => setActive(label)}
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

          <div className="ad-header-title">Dashboard</div>
          <div className="ad-header-right" />
        </header>

        <div className="ad-content">
          <section className="ad-page-title">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your fleet overview.</p>
          </section>

          <section className="ad-metrics">
            <MetricCard title="Total Vehicles" value="24" change="+2 this month" icon="🚛" trend="up" />
            <MetricCard title="Active Vehicles" value="18" change="75% operational" icon="📈" trend="up" />
            <MetricCard title="In Maintenance" value="3" change="2 scheduled" icon="🔧" trend="neutral" />
            <MetricCard title="Alerts" value="5" change="2 critical" icon="⚠️" trend="down" />
          </section>

          <section className="ad-section">
            <div className="ad-section-head">
              <h2>Recent Vehicles</h2>
            </div>

            <div className="ad-vehicle-grid">
              <VehicleCard
                name="Fleet-001"
                type="Delivery Van"
                status="Active"
                statusTone="green"
                location="Downtown Depot"
                fuel={85}
                lastService="5 days ago"
                mileage="45,320 km"
              />
              <VehicleCard
                name="Fleet-002"
                type="Box Truck"
                status="Maintenance"
                statusTone="amber"
                location="Service Center"
                fuel={40}
                lastService="2 days ago"
                mileage="78,450 km"
              />
              <VehicleCard
                name="Fleet-003"
                type="Cargo Van"
                status="Active"
                statusTone="green"
                location="North Station"
                fuel={92}
                lastService="1 week ago"
                mileage="32,100 km"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Presentational helpers (unchanged) */
function MetricCard({ title, value, change, icon, trend = "neutral" }) {
  const trendClass =
    trend === "up" ? "ad-trend-up" : trend === "down" ? "ad-trend-down" : "ad-trend-neutral";
  return (
    <div className="ad-card ad-metric">
      <div className="ad-metric-top">
        <div className="ad-metric-icon">{icon}</div>
      </div>
      <div className="ad-metric-body">
        <p className="ad-metric-title">{title}</p>
        <p className="ad-metric-value">{value}</p>
        {change && <p className={`ad-metric-change ${trendClass}`}>{change}</p>}
      </div>
    </div>
  );
}

function VehicleCard({
  name,
  type,
  status,
  statusTone = "green",
  location,
  fuel,
  lastService,
  mileage,
}) {
  return (
    <div className="ad-card ad-vehicle">
      <div className="ad-vehicle-head">
        <div className="ad-vehicle-title">
          <div className="ad-vehicle-icon">🚛</div>
          <div>
            <div className="ad-v-name">{name}</div>
            <div className="ad-v-type">{type}</div>
          </div>
        </div>
        <span className={`ad-badge ${badgeTone(statusTone)}`}>{status}</span>
      </div>

      <div className="ad-vehicle-info">
        <Row icon="📍" label={location} />
        <FuelRow fuel={fuel} />
        <Row icon="⏱️" label={`Last service: ${lastService}`} />
        <div className="ad-v-mileage">{mileage}</div>
      </div>

      <div className="ad-vehicle-actions">
        <button className="ad-btn-outline">View Details</button>
        <button className="ad-btn-solid">Schedule Service</button>
      </div>
    </div>
  );
}

function Row({ icon, label }) {
  return (
    <div className="ad-row">
      <span className="ad-row-ico">{icon}</span>
      <span className="ad-row-txt">{label}</span>
    </div>
  );
}

function FuelRow({ fuel }) {
  return (
    <div className="ad-row">
      <span className="ad-row-ico">⛽</span>
      <span className="ad-row-txt">Fuel: {fuel}%</span>
      <div className="ad-fuelbar">
        <div
          className={`ad-fuelbar-fill ${fuel > 50 ? "ad-green" : fuel > 20 ? "ad-amber" : "ad-red"}`}
          style={{ width: `${fuel}%` }}
        />
      </div>
    </div>
  );
}

function badgeTone(tone) {
  if (tone === "green") return "ad-badge-green";
  if (tone === "amber") return "ad-badge-amber";
  return "ad-badge-gray";
}
