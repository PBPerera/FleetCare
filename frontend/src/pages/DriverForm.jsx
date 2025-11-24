import React, { useState } from "react";

export default function DriverForm({ onSubmit }) {
  const [driverData, setDriverData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    nicNo: "",
    licenseNo: "",
    licenseExpiryDate: "",
    licenseRenewalDate: "",
    healthAssessment: "",
  });

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(driverData);
    console.log("Driver Data:", driverData);
  };

  return (
    <div className="driver-form-container">
      <h2 className="dform-title">Add Driver Details</h2>
      <form className="driver-form" onSubmit={handleSubmit}>
        <div className="dform-group dfull-width">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="input-field-d"
            value={driverData.fullName}
            onChange={handleChange}
            required
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-group dfull-width">
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            className="input-field-d"
            value={driverData.emailAddress}
            onChange={handleChange}
            required
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-group dfull-width">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="input-field-d"
            value={driverData.phoneNumber}
            onChange={handleChange}
            required
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-group dfull-width">
          <label>NIC Number</label>
          <input
            type="text"
            name="nicNo"
            className="input-field-d"
            value={driverData.nicNo}
            onChange={handleChange}
            required
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-group dfull-width">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNo"
            className="input-field-d"
            value={driverData.licenseNo}
            onChange={handleChange}
            required
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-row">
          <div className="dform-group">
            <label>License Expiry Date</label>
            <input
              type="date"
              name="licenseExpiryDate"
              className="input-field-d"
              value={driverData.licenseExpiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dform-group">
            <label>License Renewal Date</label>
            <input
              type="date"
              name="licenseRenewalDate"
              className="input-field-d"
              value={driverData.licenseRenewalDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="dform-group dfull-width">
          <label>Health Assessment</label>
          <input
            type="text"
            name="healthAssessment"
            className="input-field-d"
            value={driverData.healthAssessment}
            onChange={handleChange}
            style={
              {width: "95%",
              max_width: "700px",  
              padding: "10px 14px",
              border_radius: "8px",
              border: "1px solid rgba(75, 150, 220, 0.45)",
              background: "white",
              font_size: "14px"}
            }
          />
        </div>

        <div className="dform-row">
          <button type="submit" className="gradient-btndriver" >
            Add Driver Details
          </button>
        </div>
      </form>
    </div>
  );
}
