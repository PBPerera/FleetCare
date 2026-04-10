import React, { useState, useEffect } from "react";
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

  const [tripData, setTripData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [insuranceData, setInsuranceData] = useState([]);
  const [licenseData, setLicenseData] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trips");
        const result = await response.json();
        if (result.success) {
          const mapped = result.data.map((t) => ({
            date: t.tripDate ? new Date(t.tripDate).toLocaleDateString() : "—",
            time: t.tripTime || "—",
            destination: t.pickupDestination || "—",
            vehicleId: t.vehicleId || "—",
            driver: t.driverName || "—",
            contact: t.driverContact || "—",
          }));
          setTripData(mapped);
        }
      } catch (error) {
        console.error("Error fetching trips for notifications:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services?status=Scheduled");
        const result = await response.json();
        if (result.success) {
          const mapped = result.data.map((s) => ({
            vehicleId: s.vehicleId || "—",
            driver: s.driverName || "—",
            contact: s.driverContact || "—",
            description: s.description || "—",
            company: s.companyName || "—",
          }));
          setServiceData(mapped);
        }
      } catch (error) {
        console.error("Error fetching services for notifications:", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vehicle");
        const result = await response.json();
        if (result.vehicles) {
          const today = new Date();
          const expired = result.vehicles
            .filter((v) => v.insurance_expiry && new Date(v.insurance_expiry) <= today)
            .map((v) => ({
              vehicleId: v.vehicle_id || "—",
              type: v.type || "—",
              expiryDate: v.insurance_expiry ? new Date(v.insurance_expiry).toLocaleDateString() : "—",
              driver: v.driverName || "—",
              contact: v.driverContact || "—",
            }));
          setInsuranceData(expired);
        }
      } catch (error) {
        console.error("Error fetching vehicles for notifications:", error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/driver");
        const result = await response.json();
        if (result.Drivers) {
          const today = new Date();
          const expired = result.Drivers
            .filter((d) => d.licenseExpiryDate && new Date(d.licenseExpiryDate) <= today)
            .map((d) => ({
              driverId: d.driver_id || "—",
              driver: d.name || "—",
              expiryDate: d.licenseExpiryDate ? new Date(d.licenseExpiryDate).toLocaleDateString() : "—",
              contact: d.phone_no || "—",
            }));
          setLicenseData(expired);
        }
      } catch (error) {
        console.error("Error fetching drivers for notifications:", error);
      }
    };

    fetchTrips();
    fetchServices();
    fetchVehicles();
    fetchDrivers();
  }, []);

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
      data: tripData,
    },
    {
      title: "Maintenance Alert for Services",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Driver Name", "Contact No", "Description", "Company Name"],
      data: serviceData,
    },
    {
      title: "Expired Vehicles Insurance",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Vehicle Type", "Insurance Expiry Date", "Driver Name", "Contact Number"],
      data: insuranceData,
    },
    {
      title: "Expired Driver License",
      searchPlaceholder: "Search Driver Name",
      columns: ["Driver ID", "Driver Name", "License Expiry Date", "Contact Number"],
      data: licenseData,
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

          <div className="sd-header-title">Notification Managements</div>
          <div className="sd-header-right" />
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
