import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import UserProfileMenu from "../components/UserProfileMenu";
import { apiUrl } from "../lib/apiBase";
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
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    "Notifications": "/notification-staff",
  };

  // Real counts (by status) and the 4 most recent vehicle requests,
  // sourced from the Vehicle Request records.
  const [requestStats, setRequestStats] = useState({ pending: 0, approved: 0 });
  const [recentRequests, setRecentRequests] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Same demo staff id the Notification Staff page uses to fetch its list,
  // so this card's count matches what that page actually shows.
  const staffId = "6961093b585ed584551b0864";

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(apiUrl("/vehicleRequests/stats"));
        const json = await res.json();
        if (!cancelled && res.ok) {
          const counts = { pending: 0, approved: 0 };
          (json.data || []).forEach((s) => {
            if (s._id === "Pending") counts.pending = s.count;
            if (s._id === "Approved") counts.approved = s.count;
          });
          setRequestStats(counts);
        }
      } catch (e) {
        // keep the metrics at 0 rather than breaking the dashboard
      }
    })();

    (async () => {
      try {
        const res = await fetch(apiUrl("/vehicleRequests"));
        const json = await res.json();
        if (!cancelled && res.ok) {
          setRecentRequests((json.data || []).slice(0, 4));
        }
      } catch (e) {
        // keep the widget empty rather than breaking the dashboard
      }
    })();

    (async () => {
      try {
        // Hit the general notifications endpoint first - as a side effect
        // it upserts a Notification for every vehicle whose insurance is
        // expiring within 3 days, so this count includes those alerts too,
        // not just approved-request ones.
        await fetch(apiUrl("/notifications"));

        const res = await fetch(apiUrl(`/notifications/staff/${staffId}`));
        const json = await res.json();
        if (!cancelled && res.ok) {
          // covers both Request Approved and Vehicle Insurance Expiry
          // notifications - the endpoint returns read + unread of both
          // types, so count only the unread ones
          setUnreadNotifications((json || []).filter((n) => !n.isRead).length);
        }
      } catch (e) {
        // keep the metric at 0 rather than breaking the dashboard
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

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
          <div className="sd-header-right" style={{ marginLeft: "auto" }}>
            <UserProfileMenu />
          </div>
        </header>

        {/* Content */}
        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Dashboard</h1>
            <p>Welcome back! Here’s your quick overview.</p>
          </section>

          {/* Metric cards */}
          <section className="sd-metrics">
            <MetricCard title="Pending Requests" value={requestStats.pending} icon="🕒" />
            <MetricCard title="Approved" value={requestStats.approved} icon="✅" />
            <MetricCard title="Notifications" value={unreadNotifications} change="Unread" icon="🔔" />
          </section>

          {/* Recent items */}
          <section className="sd-section">
            <div className="sd-section-head">
              <h2>Recent Vehicle Requests</h2>
            </div>

            <div className="sd-req-grid sd-req-grid-4">
              {recentRequests.length ? (
                recentRequests.map((r) => (
                  <RequestCard
                    key={r._id}
                    vehicleId={r.vehicleId}
                    purpose={r.purpose}
                    status={r.status}
                    dateTime={`${formatDate(r.tripDate)} • ${r.tripTime}`}
                    destination={r.pickupDestination}
                  />
                ))
              ) : (
                <div className="sd-req-empty">No recent vehicle requests.</div>
              )}
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

function RequestCard({ vehicleId, purpose, status, dateTime, destination }) {
  const tone =
    status === "Approved" ? "green" :
    status === "Pending" ? "amber" : "gray";

  return (
    <div className="sd-card sd-req">
      <div className="sd-req-head">
        <div className="sd-req-title">
          <div className="sd-req-icon">🚐</div>
          <div>
            <div className="sd-req-id">{vehicleId}</div>
            <div className="sd-req-purpose">{purpose}</div>
          </div>
        </div>
        <span className={`sd-badge ${badgeTone(tone)}`}>{status}</span>
      </div>

      <div className="sd-req-info">
        <Row icon="📅" label={dateTime} />
        <Row icon="📍" label={destination} />
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return String(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
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
