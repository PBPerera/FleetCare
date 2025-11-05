// src/pages/NotificationManagement.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./NotificationManagement.css";

import { FaBell, FaUserCircle, FaPhoneAlt } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

export default function NotificationManagement() {
  const navigate = useNavigate();

  // sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const tableData = [
    {
      title: "Trip Schedule",
      searchPlaceholder: "Search Vehicle ID",
      columns: [
        "Trip Date",
        "Trip Time",
        "Pickup & Destination",
        "Vehicle ID",
        "Driver Name",
        "Contact No",
      ],
      data: [
        {
          date: "09-27-2025",
          time: "10.00 AM",
          destination: "Panadura hospital to Colombo hospital",
          vehicleId: "WP-CAR-1990",
          driver: "Saman Kumara",
          contact: "0768649704",
        },
        {
          date: "09-27-2025",
          time: "—",
          destination: "Location",
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
        },
        {
          date: "09-27-2025",
          time: "—",
          destination: "Location",
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
        },
      ],
    },
    {
      title: "Maintenance Alert for Services",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Driver Name", "Contact No", "Description", "Company Name"],
      data: [
        {
          vehicleId: "WP-CAR-1990",
          driver: "Saman Kumara",
          contact: "0768649704",
          description: "Oil change",
          company: "ABC Pvt Ltd",
        },
        { vehicleId: "—", driver: "Name", contact: "Number", description: "Type", company: "Company" },
        { vehicleId: "—", driver: "Name", contact: "Number", description: "Type", company: "Company" },
      ],
    },
    {
      title: "Expired Vehicles Insurance",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Vehicle Type", "Insurance Expiry Date", "Driver Name", "Contact Number"],
      data: [
        {
          vehicleId: "WP-CAR-1990",
          vehicleType: "Car",
          expiryDate: "09-27-2025",
          driver: "Saman Kumara",
          contact: "0768649704",
        },
      ],
    },
    {
      title: "Expired Driver License",
      searchPlaceholder: "Search Driver Name",
      columns: ["Driver ID", "Driver Name", "License Expiry Date", "Contact Number"],
      data: [
        {
          driverId: "2002453365",
          driver: "Kumara Silva",
          expiryDate: "10-09-2025",
          contact: "074531892",
        },
      ],
    },
  ];

  const [searches, setSearches] = useState(Array(tableData.length).fill(""));

  const handleSearchChange = (index, value) => {
    const next = [...searches];
    next[index] = value;
    setSearches(next);
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Shared Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Notification Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main area */}
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

          <div className="ad-header-title">
            
            Notification Managements
          </div>

          <div className="ad-header-right">
            <button
              className="ad-avatar"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Open user menu"
              title="User menu"
            >
              <FaUserCircle size={20} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="ad-content">
          <section className="ad-page-title">
            <h1>Notification Management Center</h1>
            <p>Latest updated trips, maintenance alerts, expired insurance & licenses.</p>
          </section>

          {/* Tables */}
          <section className="trip-section">
            {tableData.map((table, index) => {
              const searchValue = searches[index].toLowerCase();
              const filtered = table.data.filter((row) =>
                Object.values(row).some((v) => String(v).toLowerCase().includes(searchValue))
              );

              return (
                <div key={table.title} className="trip-table-container">
                  <div className="trip-header">
                    <h3>{table.title}</h3>
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder={table.searchPlaceholder}
                        value={searches[index]}
                        onChange={(e) => handleSearchChange(index, e.target.value)}
                      />
                    </div>
                  </div>

                  <table className="trip-table">
                    <thead>
                      <tr>
                        {table.columns.map((c) => (
                          <th key={c}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        </div>
      </main>

      {/* User dropdown */}
      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item">
            <FaUserCircle /> View Profile
          </div>
          <div className="menu-item">
            <MdInfoOutline /> About Us
          </div>
          <div className="menu-item">
            <FaPhoneAlt /> Contact Us
          </div>
        </div>
      )}
    </div>
  );
}
