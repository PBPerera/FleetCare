import React, { useState } from "react";

export default function UpdateVehicleForm({ onSubmit }) {
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
      <h2 className="form-title">Change Vehicle Details</h2>
      <form className="vehicle-form" onSubmit={handleSubmit}>
        {/* Vehicle ID */}
        <div className="form-group full-width">
          <label>Vehicle ID</label>
          <input
            type="text"
            name="vehicleId"
            className="input-field-vehicleID"
            value="Kamal Perera"
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
            value="Van"
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Car">Car</option>
            <option value="Jeep">Jeep</option>
            <option value="Van">Van</option>
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
              value="lah-254-56D"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Wheel Size</label>
            <input
              type="text"
              name="wheelSize"
              className="input-field"
              value="16 inches"
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
              value="BT-45678"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Chassis No</label>
            <input
              type="text"
              name="chassisNo"
              className="input-field"
              value="CH-987654"
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
              value="EN-123456"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vehicle Register Date</label>
            <input
              type="date"
              name="vehicleRegisterDate"
              className="input-field"
              value="2020-05-15"
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
              value="2023-12-31"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Insurance Renewal Date</label>
            <input
              type="date"
              name="insuranceRenewalDate"
              className="input-field"
              value="2023-11-30"
              onChange={handleChange}
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
  );
}
