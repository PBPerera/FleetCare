import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import "./staff-dashboard.css";

export default function UpdateVehicleForm({ onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);

  // Get vehicle data from navigation state
  const existingVehicle = location.state?.vehicle || null;

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

  // Load existing vehicle data when component mounts
  useEffect(() => {
    if (existingVehicle) {
      setVehicleData({
        vehicleId: existingVehicle.vehicleId || "",
        vehicleType: existingVehicle.type || "",
        wheelSerialNo: existingVehicle.wheelSerial || "",
        wheelSize: existingVehicle.wheelSize || "",
        batteryNo: existingVehicle.batteryNo || "",
        chassisNo: existingVehicle.chassisNo || "",
        engineNo: existingVehicle.engineNo || "",
        vehicleRegisterDate: existingVehicle.registerdate ? new Date(existingVehicle.registerdate).toISOString().split('T')[0] : "",
        insuranceExpiryDate: existingVehicle.insuranceExpiry ? new Date(existingVehicle.insuranceExpiry).toISOString().split('T')[0] : "",
        insuranceRenewalDate: existingVehicle.insurancerenewaldate ? new Date(existingVehicle.insurancerenewaldate).toISOString().split('T')[0] : "",
      });
    }
  }, [existingVehicle]);

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
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!existingVehicle || !existingVehicle.vehicleId) {
      alert("Error: Vehicle ID not found. Please return to Vehicle Management.");
      return;
    }

    try {
      const payload = {
        vehicle_id: parseInt(vehicleData.vehicleId),
        type: vehicleData.vehicleType,
        fuel_average: 15,
        capacity: 5,
        chassis_no: vehicleData.chassisNo,
        engine_no: vehicleData.engineNo,
        battery_serial: vehicleData.batteryNo,
        insurance_expiry: new Date(vehicleData.insuranceExpiryDate).toISOString(),
        wheel_serial: vehicleData.wheelSerialNo,
        wheel_size: vehicleData.wheelSize,
        register_date: new Date(vehicleData.vehicleRegisterDate).toISOString(),
        insurance_renewal_date: new Date(vehicleData.insuranceRenewalDate).toISOString(),
        status: existingVehicle.status || "Active"
      };

      const response = await fetch(`http://localhost:5000/api/vehicle/${existingVehicle.vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.msg || `HTTP error! status: ${response.status}`);
      }

      alert("Vehicle updated successfully!");
      navigate("/vehicles");
    } catch (error) {
      console.error("Error details:", error);
      alert("Error updating vehicle: " + error.message);
    }
  };

  return (
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      <StaffSidebar
        collapsed={collapsed}
        active="Vehicle Details"
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

          <div className="sd-header-title">Update Vehicle Details</div>
          <div className="sd-header-right" />
        </header>

        <div className="sd-content">
          <section className="sd-page-title">
            <h1>Change Vehicle Details</h1>
            <p>Update the vehicle information below.</p>
          </section>

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
                  <option value="Jeep">Jeep</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorbike">Motorbike</option>
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
