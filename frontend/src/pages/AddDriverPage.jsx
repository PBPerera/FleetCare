import React from "react";
import DriverForm from "./DriverForm";

export default function AddDriverPage() {
  const handleDriverSubmit = (data) => {
    console.log("Driver details submitted:", data);
    alert("Driver details added successfully!");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-main">
        <DriverForm onSubmit={handleDriverSubmit} />
      </div>
    </div>
  );
}
