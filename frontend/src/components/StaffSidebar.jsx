import React from "react";
import {
  LayoutDashboard,
  Car,
  FileText,
  ClipboardList,
  User,
  BarChart3,
  Bell,
} from "lucide-react";
import logo from "../assets/logo-smallss.png"; 

export default function StaffSidebar({
  collapsed = false,
  active = "Dashboard",
  onNavigate,
  onLogout,
}) {
  const items = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { icon: <Car size={18} />, label: "Vehicle Request" },
    { icon: <FileText size={18} />, label: "My Requests" },
    { icon: <ClipboardList size={18} />, label: "Vehicle Details" },
    { icon: <User size={18} />, label: "Driver Details" },
    { icon: <Bell size={18} />, label: "Notifications" },
  ];

  return (
    <aside
      className={`sd-sidebar ${collapsed ? "sd-collapsed" : ""}`}
      aria-label="Staff sidebar"
    >
      {/* Brand */}
      <div className="sd-brand">
        <div className="sd-logo" aria-hidden>
          <img
            src={logo}
            alt="FleetCare Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
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
            <span className="sd-ico" aria-hidden>
              {it.icon}
            </span>
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
        <span className="sd-ico" aria-hidden>
          ↩️
        </span>
        {!collapsed && <span className="sd-text">Log out</span>}
      </button>
    </aside>
  );
}
