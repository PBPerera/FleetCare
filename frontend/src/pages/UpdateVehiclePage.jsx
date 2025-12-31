
import React from "react";
import UpdateVehicleForm from "./UpdateVehicleForm";

export default function UpdateVehiclePage() {
  const handleVehicleSubmit = (data) => {
    console.log("Vehicle information updateded:", data);
    alert("Vehicle information updated successfully!");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-main">
        <UpdateVehicleForm onSubmit={handleVehicleSubmit} />
      </div>
    </div>
  );
}
