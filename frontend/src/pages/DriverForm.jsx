import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css"; // Use staff dashboard CSS for consistent styling

export default function DriverForm({ onSubmit }) {
  const navigate = useNavigate();

  // Sidebar + header state (same as StaffDashboard)
  const [collapsed, setCollapsed] = useState(false);

  // Driver form state
  const [driverData, setDriverData] = useState({
    fullName: "",
    address: "",
    emailAddress: "",
    phoneNumber: "",
    nicNo: "",
    licenseNo: "",
    licenseExpiryDate: "",
    licenseRenewalDate: "",
    healthAssessment: "",
  });

  // Map sidebar labels to routes (same as StaffDashboard)
  const routeMap = {
    "Dashboard": "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    "Notifications": "/staff/notifications",
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        driver_id: parseInt(Date.now().toString().slice(-6)),
        nic_no: driverData.nicNo,
        name: driverData.fullName,
        address: driverData.address,
        email: driverData.emailAddress,
        phone_no: driverData.phoneNumber,
        licenseNo: driverData.licenseNo,
        registerDate: new Date().toISOString().split('T')[0],
        licenseRenewalDate: driverData.licenseRenewalDate,
        licenseExpiryDate: driverData.licenseExpiryDate,
        healthAssessment: driverData.healthAssessment,
        status: "Active"
      };

      const response = await fetch("http://localhost:5000/api/driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Driver added successfully!");
      setDriverData({
        fullName: "",
        address: "",
        emailAddress: "",
        phoneNumber: "",
        nicNo: "",
        licenseNo: "",
        licenseExpiryDate: "",
        licenseRenewalDate: "",
        healthAssessment: "",
      });
    } catch (error) {
      alert("Error adding driver: " + error.message);
    }
  };

  return (
    // Use sd-shell (Staff Dashboard shell)
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Use StaffSidebar with same navigation as StaffDashboard */}
      <StaffSidebar
        collapsed={collapsed}
        active="Driver Details"
        onNavigate={(label) => navigate(routeMap[label] || "/staff/dashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main content area - same structure as StaffDashboard */}
      <main className="sd-main">
        {/* Top Header - same as StaffDashboard */}
        <header className="sd-header">
          {/* Toggle button for sidebar collapse */}
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          {/* Header title */}
          <div className="sd-header-title">Driver Details</div>
          <div className="sd-header-right" />
        </header>

        {/* Content area - replaces dashboard content with driver form */}
        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Add Driver Details</h1>
            <p>Fill in the form below to add a new driver to the system.</p>
          </section>

          {/* Driver form container */}
          <div className="driver-form-container" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            <form className="driver-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group full-width">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="input-field-d"
                  value={driverData.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* Address */}
              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="input-field-d"
                  value={driverData.address}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* Email Address */}
              <div className="form-group full-width">
                <label>Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  className="input-field-d"
                  value={driverData.emailAddress}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* Phone Number */}
              <div className="form-group full-width">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="input-field-d"
                  value={driverData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* NIC Number */}
              <div className="form-group full-width">
                <label>NIC Number</label>
                <input
                  type="text"
                  name="nicNo"
                  className="input-field-d"
                  value={driverData.nicNo}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* License Number */}
              <div className="form-group full-width">
                <label>License Number</label>
                <input
                  type="text"
                  name="licenseNo"
                  className="input-field-d"
                  value={driverData.licenseNo}
                  onChange={handleChange}
                  required
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* Two-column fields for dates */}
              <div className="form-row">
                <div className="form-group">
                  <label>License Expiry Date</label>
                  <input
                    type="date"
                    name="licenseExpiryDate"
                    className="input-field-d"
                    value={driverData.licenseExpiryDate}
                    onChange={handleChange}
                    required
                    style={{
                      height: "40px",
                      width: "350px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>License Renewal Date</label>
                  <input
                    type="date"
                    name="licenseRenewalDate"
                    className="input-field-d"
                    value={driverData.licenseRenewalDate}
                    onChange={handleChange}
                    required
                    style={{
                      height: "40px",
                      width: "350px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>
              </div>

              {/* Health Assessment */}
              <div className="form-group full-width">
                <label>Health Assessment</label>
                <input
                  type="text"
                  name="healthAssessment"
                  className="input-field-d"
                  value={driverData.healthAssessment}
                  onChange={handleChange}
                  style={{
                    height: "40px",
                    width: "745px",
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(75, 150, 220, 0.45)",
                  }}
                />
              </div>

              {/* Submit button */}
              <div className="btn-row">
                <button type="submit" className="gradient-btn">
                  Add Driver Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}