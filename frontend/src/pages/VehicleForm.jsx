import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css"; // Use staff dashboard CSS for consistent styling

export default function VehicleForm({ onSubmit }) {
  const navigate = useNavigate();

  // Sidebar + header state (same as StaffDashboard)
  const [collapsed, setCollapsed] = useState(false);

  // Vehicle form state
  const [vehicleData, setVehicleData] = useState({
    vehicleId: "",
    vehicleType: "",
    wheelSerialNo: "",
    wheelSize: "",
    batteryNo: "",
    chassisNo: "",
    engineNo: "",
    vehicleRegisterDate: "",
    insuranceExpiryDate: "",
    insuranceRenewalDate: "",
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

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert date strings to Date objects
      const payload = {
        ...vehicleData,
        vehicleRegisterDate: new Date(vehicleData.vehicleRegisterDate),
        insuranceExpiryDate: new Date(vehicleData.insuranceExpiryDate),
        insuranceRenewalDate: new Date(vehicleData.insuranceRenewalDate),
      };

      const res = await fetch("http://localhost:5000/api/vehicles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Vehicle added successfully!");
        // Reset form
        setVehicleData({
          vehicleId: "",
          vehicleType: "",
          wheelSerialNo: "",
          wheelSize: "",
          batteryNo: "",
          chassisNo: "",
          engineNo: "",
          vehicleRegisterDate: "",
          insuranceExpiryDate: "",
          insuranceRenewalDate: "",
        });
      } else {
        alert("Failed to add vehicle: " + data.msg);
      }

      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Error connecting to backend. Check console.");
    }
  };

  return (
    // Use sd-shell (Staff Dashboard shell) instead of ad-shell
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Use StaffSidebar with same navigation as StaffDashboard */}
      <StaffSidebar
        collapsed={collapsed}
        active="Vehicle Details"
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
          <div className="sd-header-title">Vehicle Details</div>
          <div className="sd-header-right" />
        </header>

        {/* Content area - replaces dashboard content with vehicle form */}
        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Add Vehicle Details</h1>
            <p>Fill in the form below to add a new vehicle to the system.</p>
          </section>

          {/* Vehicle form container */}
          <div className="vehicle-form-container">
            <form className="vehicle-form" onSubmit={handleSubmit}>
              {/* Vehicle ID */}
              <div className="form-group full-width">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  name="vehicleId"
                  className="input-field-vehicleID"
                  value={vehicleData.vehicleId}
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

              {/* Vehicle Type */}
              <div className="form-group full-width">
                <label>Vehicle Type</label>
                <select
                  name="vehicleType"
                  className="input-field-vehicleType"
                  value={vehicleData.vehicleType}
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
                >
                  <option value="">Select Type</option>
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorbike">Motorbike</option>
                  <option value="Bus">Bus</option>
                  <option value="Van">Van</option>
                </select>
              </div>

              {/* Two-column fields */}
              <div className="form-row">
                <div className="form-group">
                  <label>Wheel Serial No</label>
                  <input
                    type="text"
                    name="wheelSerialNo"
                    className="input-field"
                    value={vehicleData.wheelSerialNo}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Wheel Size</label>
                  <input
                    type="text"
                    name="wheelSize"
                    className="input-field"
                    value={vehicleData.wheelSize}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Battery No</label>
                  <input
                    type="text"
                    name="batteryNo"
                    className="input-field"
                    value={vehicleData.batteryNo}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Chassis No</label>
                  <input
                    type="text"
                    name="chassisNo"
                    className="input-field"
                    value={vehicleData.chassisNo}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Engine No</label>
                  <input
                    type="text"
                    name="engineNo"
                    className="input-field"
                    value={vehicleData.engineNo}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Register Date</label>
                  <input
                    type="date"
                    name="vehicleRegisterDate"
                    className="input-field"
                    value={vehicleData.vehicleRegisterDate}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Insurance Expiry Date</label>
                  <input
                    type="date"
                    name="insuranceExpiryDate"
                    className="input-field"
                    value={vehicleData.insuranceExpiryDate}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Insurance Renewal Date</label>
                  <input
                    type="date"
                    name="insuranceRenewalDate"
                    className="input-field"
                    value={vehicleData.insuranceRenewalDate}
                    onChange={handleChange}
                    style={{
                      height: "40px",
                      width: "613px",
                      padding: "10px",
                      fontSize: "14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(75, 150, 220, 0.45)",
                    }}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="btn-row">
                <button type="submit" className="gradient-btn">
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}