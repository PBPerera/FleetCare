
import React from "react";
import VehicleForm from "./VehicleForm";

export default function AddVehiclePage() {
  const handleVehicleSubmit = (data) => {
    console.log("Vehicle information submitted:", data);
    alert("Vehicle information added successfully!");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-main">
        <VehicleForm onSubmit={handleVehicleSubmit} />
      </div>
    </div>
  );
}
