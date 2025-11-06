import { Routes, Route, Navigate } from "react-router-dom";

import Onboard from "./pages/Onboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow.jsx";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import NotificationCenter from "./pages/NotificationCenter.jsx";
import NotificationStaff from "./pages/NotificationStaff.jsx";
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest";
import TripScheduling from "./pages/TripScheduling/TripScheduling";
import TripAllocation from "./pages/TripAllocation/TripAllocation";
import MyRequests from "./pages/MyRequests/MyRequests";

// ✅ Keep ONLY ONE of these, matching your actual filename:
import NotificationManagement from "./pages/NotificationManagement.jsx";

import UserManagement from "./pages/UserManagement.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import DriverManagement from "./pages/DriverManagement.jsx";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password/*" element={<ForgotPasswordFlow />} />
      <Route path="/home" element={<Home />} />

      {/* Dashboards */}
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/staffdashboard" element={<StaffDashboard />} />

      {/* Notifications */}
      <Route path="/notification-center" element={<NotificationCenter />} />
      <Route path="/notification-staff" element={<NotificationStaff />} />
      <Route path="/notification-management" element={<NotificationManagement />} />

      {/* Others */}
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/driver-management" element={<DriverManagement />} />
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      <Route path="/vehicle-request" element={<VehicleRequest />} />
      <Route path="/trip-scheduling" element={<TripScheduling />} />
      <Route path="/trip-allocation" element={<TripAllocation />} />
      <Route path="/my-requests" element={<MyRequests />} />

      {/* Staff area */}
  <Route path="/staff/dashboard" element={<StaffDashboard />} />
  <Route path="/staff/vehicle-request" element={<div>Vehicle Request</div>} />
  <Route path="/staff/my-requests" element={<div>My Requests</div>} />
  <Route path="/staff/vehicle-details" element={<div>Vehicle Details</div>} />
  <Route path="/staff/driver-details" element={<div>Driver Details</div>} />
  <Route path="/staff/reports" element={<div>Search & Reports</div>} />
  <Route path="/staff/notifications" element={<div>Notifications</div>} />

      {/* Fallback */}
      <Route path="*" element={<h1 style={{ padding: 20 }}>404</h1>} />
    </Routes>
  );
}
