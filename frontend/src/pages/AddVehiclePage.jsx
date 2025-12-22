<<<<<<< HEAD

=======
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
import React from "react";
import VehicleForm from "./VehicleForm";
import TopBarSlim from "../components/TopBar";

export default function AddVehiclePage() {
  const handleVehicleSubmit = (data) => {
<<<<<<< HEAD
    console.log("Vehicle information submitted:", data);
    alert("Vehicle information added successfully!");
=======
    console.log("Vehicle submitted:", data);
    alert("Vehicle added successfully!");
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
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
