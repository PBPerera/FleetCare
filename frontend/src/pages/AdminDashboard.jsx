import React, { useEffect, useState } from "react";
import "./admin-dashboard.css";
import Sidebar from "../components/Sidebar";
import UserProfileMenu from "../components/UserProfileMenu";
import { apiUrl } from "../lib/apiBase";

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  // Recent vehicle schedules (from Trip Scheduling) and recent maintenance
  // (Service + Repair) records for the dashboard summary widgets.
  const [recentTrips, setRecentTrips] = useState([]);
  const [recentMaintenance, setRecentMaintenance] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(apiUrl("/trips"));
        const json = await res.json();
        if (!cancelled && res.ok) {
          setRecentTrips((json.data || []).slice(0, 4));
        }
      } catch (e) {
        // keep the widget empty rather than breaking the dashboard
      }
    })();

    (async () => {
      try {
        const [serviceRes, repairRes] = await Promise.all([
          fetch(apiUrl("/services?limit=4&sortBy=date&sortOrder=desc")),
          fetch(apiUrl("/repairs?limit=4&sortBy=requestDate&sortOrder=desc")),
        ]);
        const serviceJson = await serviceRes.json();
        const repairJson = await repairRes.json();

        const services = (serviceJson.data || []).map((s) => ({
          id: s._id,
          vehicleId: s.vehicleId,
          type: "Service",
          date: s.date,
        }));
        const repairs = (repairJson.data || []).map((r) => ({
          id: r._id,
          vehicleId: r.vehicleId,
          type: "Repair",
          date: r.requestDate,
        }));

        const merged = [...services, ...repairs]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);

        if (!cancelled) setRecentMaintenance(merged);
      } catch (e) {
        // keep the widget empty rather than breaking the dashboard
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active={active}
        onNavigate={(label) => setActive(label)}
        onLogout={() => (window.location.href = "/login")}
      />

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

          <div className="sd-header-title">Dashboard</div>
          <div className="sd-header-right" style={{ marginLeft: "auto" }}>
            <UserProfileMenu />
          </div>
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
              <h2>Recent Vehicle Schedules</h2>
            </div>

            <div className="ad-mini-grid">
              {recentTrips.length ? (
                recentTrips.map((t) => (
                  <div className="ad-card ad-schedule-card" key={t._id}>
                    <div className="ad-mini-card-top">
                      <span className="ad-mini-ico ad-mini-ico-schedule" aria-hidden>
                        🚐
                      </span>
                      <span className="ad-mini-vehicle">{t.vehicleId}</span>
                      <span className="ad-badge ad-badge-blue ad-mini-pass">
                        {t.noOfPassengers} {t.noOfPassengers === 1 ? "passenger" : "passengers"}
                      </span>
                    </div>
                    <div className="ad-mini-card-body">
                      <div className="ad-mini-row">
                        <span className="ad-mini-row-ico" aria-hidden>👤</span>
                        <span>{t.driverName}</span>
                      </div>
                      <div className="ad-mini-row">
                        <span className="ad-mini-row-ico" aria-hidden>🎯</span>
                        <span>{t.purpose}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="ad-mini-empty-card">No recent vehicle schedules.</div>
              )}
            </div>
          </section>

          <section className="ad-section">
            <div className="ad-section-head">
              <h2>Recent Vehicle Maintenance</h2>
            </div>

            <div className="ad-mini-grid">
              {recentMaintenance.length ? (
                recentMaintenance.map((m) => (
                  <div
                    className={`ad-card ad-maint-card ${
                      m.type === "Service" ? "is-service" : "is-repair"
                    }`}
                    key={m.id}
                  >
                    <div className="ad-mini-card-top">
                      <span className="ad-mini-ico ad-mini-ico-maint" aria-hidden>
                        {m.type === "Service" ? "🛠️" : "🔧"}
                      </span>
                      <span className="ad-mini-vehicle">{m.vehicleId}</span>
                    </div>
                    <div className="ad-mini-card-body">
                      <span
                        className={`ad-badge ${
                          m.type === "Service" ? "ad-badge-green" : "ad-badge-amber"
                        }`}
                      >
                        {m.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="ad-mini-empty-card">No recent maintenance records.</div>
              )}
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

