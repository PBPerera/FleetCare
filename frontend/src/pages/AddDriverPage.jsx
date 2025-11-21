import React from "react";
import DriverForm from "./DriverForm";
import TopBarSlim from "../components/TopBar";

export default function AddDriverPage() {
  const handleDriverSubmit = (data) => {
    console.log("Driver details submitted:", data);
    alert("Driver details added successfully!");
  };

  return (
    <>
    <TopBarSlim title="Forgot Password" to="/login" />
    <div className="forgot-page">
      <div className="forgot-main">
        <DriverForm onSubmit={handleDriverSubmit} />
      </div>
    </div>
    </>
  );
}
