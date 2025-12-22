// src/pages/VehicleForm.jsx
import React, { useState } from "react";

export default function VehicleForm({ onSubmit }) {
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

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vehicleData);
    console.log("Vehicle Data:", vehicleData);
  };

  return (
    <div className="vehicle-form-container">
      <h2 className="form-title">Add Vehicle Details</h2>
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
  );
}
