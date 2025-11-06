import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Search } from "lucide-react";
import "./UserManagement.css";

export default function UserManagement() {
  const navigate = useNavigate();

  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routeMap = {
    Dashboard: "/admindashboard",
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

  // ----- Sample data -----
  const users = useMemo(
    () => [
      {
        username: "Sarath",
        fullName: "K. Sarath Perera",
        role: "Admin",
        email: "mapsarath@fleetcare.lk",
        lastLoginDate: "2025-09-25",
        lastLoginTime: "07:54 am",
      },
      {
        username: "Piyal",
        fullName: "G. Piyal Silva",
        role: "Staff",
        email: "wagpiyal@fleetcare.lk",
        lastLoginDate: "2025-09-27",
        lastLoginTime: "08:54 am",
      },
      {
        username: "Sunil",
        fullName: "P. Sunil Perera",
        role: "Staff",
        email: "gtasunil@fleetcare.lk",
        lastLoginDate: "2025-09-29",
        lastLoginTime: "03:54 pm",
      },
      {
        username: "Anura",
        fullName: "Anura Gunarathne",
        role: "Admin",
        email: "jvpanura@fleetcare.lk",
        lastLoginDate: "2025-09-30",
        lastLoginTime: "09:54 am",
      },
    ],
    []
  );

  // controls
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("Last Login Date");
  const [role, setRole] = useState("All");

  const filtered = useMemo(() => {
    let list = users;
    const query = q.trim().toLowerCase();

    if (query) {
      list = list.filter((u) =>
        [u.username, u.fullName, u.email, u.role, u.lastLoginDate, u.lastLoginTime]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    if (role !== "All") {
      list = list.filter((u) => u.role === role);
    }

    if (sortBy === "Last Login Date") {
      list = [...list].sort(
        (a, b) => new Date(b.lastLoginDate) - new Date(a.lastLoginDate)
      );
    } else if (sortBy === "User Name") {
      list = [...list].sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortBy === "Role") {
      const order = { Admin: 1, Staff: 2 };
      list = [...list].sort(
        (a, b) => (order[a.role] || 99) - (order[b.role] || 99)
      );
    }

    return list;
  }, [users, q, role, sortBy]);

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="User Management"
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main section */}
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

          <div className="sd-header-title">User Management</div>
          <div className="sd-header-right" />
        </header>

        

        {/* Content area */}
        <div className="ad-content">
          {/* Toolbar */}
          <div className="um-toolbar">
            <div className="um-search">
              <span className="um-search-ico">
                <Search size={16} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by User Name, Full Name, or Email"
              />
            </div>

            <div className="um-actions">
              <div className="um-select">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>All</option>
                  <option>Admin</option>
                  <option>Staff</option>
                </select>
              </div>

              <div className="um-select">
                <label>Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Last Login Date</option>
                  <option>User Name</option>
                  <option>Role</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <section className="um-table-container">
            <h3 className="um-title">Users & Roles</h3>

            <div className="um-table-wrapper">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Last Login Date</th>
                    <th>Last Login Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.email}>
                      <td>{u.username}</td>
                      <td>{u.fullName}</td>
                      <td>
                        <span className={`um-badge ${u.role.toLowerCase()}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.email}</td>
                      <td>{formatDate(u.lastLoginDate)}</td>
                      <td>{u.lastLoginTime}</td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={6} className="um-empty">
                        No users match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {isMenuOpen && <div className="user-menu">…</div>}
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  const mm = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}
