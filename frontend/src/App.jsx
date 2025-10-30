// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import NotificationM from "./pages/NotificationM";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationStaff from "./pages/NotificationStaff";

import Home from "./pages/Home";

function App() {
  return (   
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      <Route path="/FleetcareDashboard1" element={<AdminDashboard />} />
      <Route path="/StaffDashboard" element={<StaffDashboard />} />
      <Route path="/NotificationManagement" element={<NotificationM />} />
      <Route path="/NotificationCenter" element={<NotificationCenter />} />
      <Route path="/NotificationStaff" element={<NotificationStaff />} />
      
      {/* optional 404 fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes> 
  );
}

export default App;

