import React from "react";
import UpdateDriverForm from "./UpdateDriverForm";

export default function UpdateDriverPage() {
  const handleDriverSubmit = (data) => {
    console.log("Driver details updated:", data);
    alert("Driver details updated successfully!");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-main">
        <UpdateDriverForm onSubmit={handleDriverSubmit} />
      </div>
    </div>
  );
}
