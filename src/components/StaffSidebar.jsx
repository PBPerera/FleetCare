import React from "react";

/**
 * Staff Sidebar (matches AdminDashboard style)
 * Props:
 *  - collapsed?: boolean
 *  - active?: string (label of current page)
 *  - onNavigate?: (label: string) => void
 *  - onLogout?: () => void
 */
export default function StaffSidebar({
  collapsed = false,
  active = "Dashboard",
  onNavigate,
  onLogout,
}) {
  const items = [
    { icon: "▦", label: "Dashboard" },
    { icon: "🚗", label: "Vehicle Request" },
    { icon: "📄", label: "My Requests" },
    { icon: "🧾", label: "Vehicle Details" },
    { icon: "👤", label: "Driver Details" },
    { icon: "📊", label: "Search and Reports" },
    { icon: "🔔", label: "Notifications" },
  ];

  return (
    <aside className={`sd-sidebar ${collapsed ? "sd-collapsed" : ""}`} aria-label="Staff sidebar">
      {/* Brand */}
      <div className="sd-brand">
        <div className="sd-logo" aria-hidden>🚚</div>
        {!collapsed && <span className="sd-brand-text">FleetCare</span>}
      </div>

      {/* Menu */}
      <nav className="sd-nav">
        {items.map((it) => (
          <a
            key={it.label}
            className={`sd-nav-item ${active === it.label ? "sd-active" : ""}`}
            title={it.label}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.(it.label);
            }}
          >
            <span className="sd-ico" aria-hidden>{it.icon}</span>
            {!collapsed && <span className="sd-text">{it.label}</span>}
          </a>
        ))}
      </nav>

      {/* Logout */}
      <button
        className="sd-logout"
        title="Log out"
        onClick={onLogout}
        aria-label="Log out"
      >
        <span className="sd-ico" aria-hidden>↪</span>
        {!collapsed && <span className="sd-text">Log out</span>}
      </button>
    </aside>
  );
}
