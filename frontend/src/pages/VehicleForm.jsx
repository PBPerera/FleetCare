import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css";

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
      const payload = {
        vehicle_id: parseInt(vehicleData.vehicleId),
        type: vehicleData.vehicleType,
        fuel_average: 0,
        capacity: 0,
        chassis_no: vehicleData.chassisNo,
        engine_no: vehicleData.engineNo,
        battery_serial: vehicleData.batteryNo,
        insurance_expiry: vehicleData.insuranceExpiryDate,
        wheel_serial: vehicleData.wheelSerialNo,
        wheel_size: vehicleData.wheelSize,
        register_date: vehicleData.vehicleRegisterDate,
        insurance_renewal_date: vehicleData.insuranceRenewalDate,
        status: "Active"
      };

      const response = await fetch("http://localhost:5000/api/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Vehicle added successfully!");
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
    } catch (error) {
      alert("Error adding vehicle: " + error.message);
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
          <div className="vehicle-form-container" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
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
                  <label>Tire No</label>
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
                  <label>Tire Size</label>
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