
import React from "react";
import VehicleForm from "./VehicleForm";
import TopBarSlim from "../components/TopBar";

export default function AddVehiclePage() {
  const handleVehicleSubmit = (data) => {
    console.log("Vehicle information submitted:", data);
    alert("Vehicle information added successfully!");
  };

  return (
    <>
    <TopBarSlim title="Forgot Password" to="/login" />
    <div className="forgot-page">
      <div className="forgot-main">
        <VehicleForm onSubmit={handleVehicleSubmit} />
      </div>
    </div>
    </>
  );
}
