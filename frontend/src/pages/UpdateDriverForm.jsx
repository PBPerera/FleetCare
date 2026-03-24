import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css";

export default function UpdateDriverForm({ onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);

  // Get driver data from navigation state (if coming from DriverManagement)
  const existingDriver = location.state?.driver || null;

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

  // Load existing driver data when component mounts
  useEffect(() => {
    if (existingDriver) {
      setDriverData({
        fullName: existingDriver.name || "",
        address: existingDriver.address || "",
        emailAddress: existingDriver.email || "",
        phoneNumber: existingDriver.phone || "",
        nicNo: existingDriver.nic || "",
        licenseNo: existingDriver.licenseNo || "",
        licenseExpiryDate: existingDriver.licenseExpiry ? new Date(existingDriver.licenseExpiry).toISOString().split('T')[0] : "",
        licenseRenewalDate: existingDriver.licenseRenewalDate ? new Date(existingDriver.licenseRenewalDate).toISOString().split('T')[0] : "",
        healthAssessment: existingDriver.healthAssessment || "",
      });
    }
  }, [existingDriver]);

  // Map sidebar labels to routes
  const routeMap = {
    "Dashboard": "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    "Notifications": "/staff/notifications",
  };

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!existingDriver || !existingDriver.driverId) {
      alert("Error: Driver ID not found. Please return to Driver Management.");
      return;
    }

    try {
      const payload = {
        driver_id: existingDriver.driverId,
        nic_no: driverData.nicNo,
        name: driverData.fullName,
        address: driverData.address,
        email: driverData.emailAddress,
        phone_no: driverData.phoneNumber,
        licenseNo: driverData.licenseNo,
        registerDate: existingDriver.registerDate || new Date().toISOString(),
        licenseRenewalDate: new Date(driverData.licenseRenewalDate).toISOString(),
        licenseExpiryDate: new Date(driverData.licenseExpiryDate).toISOString(),
        healthAssessment: driverData.healthAssessment || "Pending",
        status: existingDriver.status || "Active"
      };

      const response = await fetch(`http://localhost:5000/api/driver/${existingDriver.driverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.msg || `HTTP error! status: ${response.status}`);
      }

      alert("Driver updated successfully!");
      navigate("/driver-management");
    } catch (error) {
      console.error("Error details:", error);
      alert("Error updating driver: " + error.message);
    }
  };

  return (
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      <StaffSidebar
        collapsed={collapsed}
        active="Driver Details"
        onNavigate={(label) => navigate(routeMap[label] || "/staff/dashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      <main className="sd-main">
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Update Driver Details</div>
          <div className="sd-header-right" />
        </header>

        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Change Driver Details</h1>
            <p>Update the driver information below.</p>
          </section>

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
                  required
                  placeholder="e.g., Fit, Pending, Medical Review"
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
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
