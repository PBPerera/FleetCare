// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import Home from "./pages/Home";

// Trip Management Routes
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest";
import TripScheduling from "./pages/TripScheduling/TripScheduling";
import TripAllocation from "./pages/TripAllocation/TripAllocation";
import MyRequests from "./pages/MyRequests/MyRequests";

// Dashboard & Notification Routes
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import NotificationM from "./pages/NotificationM";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationStaff from "./pages/NotificationStaff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Authentication */}
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      
      {/* Trip Management */}
      <Route path="/vehicle-request" element={<VehicleRequest />} />
      <Route path="/trip-scheduling" element={<TripScheduling />} />
      <Route path="/trip-allocation" element={<TripAllocation />} />
      <Route path="/my-requests" element={<MyRequests />} />
      
      {/* Dashboard & Notifications */}
      <Route path="/FleetcareDashboard1" element={<AdminDashboard />} />
      <Route path="/StaffDashboard" element={<StaffDashboard />} />
      <Route path="/NotificationManagement" element={<NotificationM />} />
      <Route path="/NotificationCenter" element={<NotificationCenter />} />
      <Route path="/NotificationStaff" element={<NotificationStaff />} />
      
      {/* 404 fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
