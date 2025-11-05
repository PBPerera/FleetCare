import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  collapsed = false,
  active = "Dashboard",
  onLogout,
}) {
  const navigate = useNavigate();

  // Define menu items and route paths
  const items = [
    { icon: "🏠", label: "Dashboard", path: "/admindashboard" },
    { icon: "👥", label: "User Management", path: "/user-management" },
    { icon: "🚗", label: "Vehicle Management", path: "/vehicles" },
    { icon: "🧑‍✈️", label: "Driver Management", path: "/driver-management" },
    { icon: "🗓️", label: "Trip Scheduling", path: "/trip-scheduling" },
    { icon: "📍", label: "Trip Allocation", path: "/trip-allocation" },
    { icon: "🔧", label: "Maintenance Management", path: "/maintenance" },
    { icon: "📊", label: "Reporting & Analytics", path: "/reports" },
    { icon: "🔔", label: "Notification Management", path: "/notification-management" },
    { icon: "📄", label: "Audit Log", path: "/audit-log" },
  ];

  return (
    <aside className="ad-sidebar" aria-label="Sidebar">
      {/* Sidebar Header / Logo */}
      <div className="ad-brand">
        <div className="ad-logo" aria-hidden>🚚</div>
        <span className="ad-brand-text">FleetCare</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="ad-nav">
        {items.map((it) => (
          <a
            key={it.label}
            className={`ad-nav-item ${active === it.label ? "ad-active" : ""}`}
            title={it.label}
            onClick={(e) => {
              e.preventDefault();
              navigate(it.path);
            }}
          >
            <span className="ad-ico">{it.icon}</span>
            <span className="ad-text">{it.label}</span>
          </a>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        className="ad-logout"
        title="Log out"
        onClick={onLogout}
        aria-label="Log out"
      >
        <span className="ad-ico">↩️</span>
        <span className="ad-text">Log out</span>
      </button>
    </aside>
  );
}
