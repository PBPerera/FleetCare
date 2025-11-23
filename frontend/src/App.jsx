import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MaintenanceProvider } from './context/MaintenanceContext';

// Page imports
import Onboard from "./pages/Onboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationStaff from "./pages/NotificationStaff";
import NotificationManagement from "./pages/NotificationManagement";
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest";
import TripScheduling from "./pages/TripScheduling/TripScheduling";
import TripAllocation from "./pages/TripAllocation/TripAllocation";
import MyRequests from "./pages/MyRequests/MyRequests";
import MaintenanceManagement from "./pages/MaintenanceManagement";
import RepairApprove from './pages/RepairApprove';
import AuditLog from './pages/AuditLog';
import UserManagement from "./pages/UserManagement";
import Vehicles from "./pages/Vehicles";
import DriverManagement from "./pages/DriverManagement";

import "./App.css";

export default function App() {
  return (
    <MaintenanceProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password/*" element={<ForgotPasswordFlow />} />
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />
        <Route path="/home" element={<Home />} />

        {/* Dashboards */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/staffdashboard" element={<StaffDashboard />} />

        {/* Notifications */}
        <Route path="/notification-center" element={<NotificationCenter />} />
        <Route path="/notification-staff" element={<NotificationStaff />} />
        <Route path="/notification-management" element={<NotificationManagement />} />

        {/* Vehicle & Trip Management */}
        <Route path="/vehicle-request" element={<VehicleRequest />} />
        <Route path="/trip-scheduling" element={<TripScheduling />} />
        <Route path="/trip-allocation" element={<TripAllocation />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* Maintenance Management Routes */}
        <Route path="/maintenance" element={<MaintenanceManagement />} />
        <Route path="/repairs/approve" element={<RepairApprove />} />
        <Route path="/audit-log" element={<AuditLog />} />

        {/* User, Vehicle & Driver Management */}
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/driver-management" element={<DriverManagement />} />

        {/* Staff Area Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/vehicle-request" element={<div>Vehicle Request</div>} />
        <Route path="/staff/my-requests" element={<div>My Requests</div>} />
        <Route path="/staff/vehicle-details" element={<div>Vehicle Details</div>} />
        <Route path="/staff/driver-details" element={<div>Driver Details</div>} />
        <Route path="/staff/reports" element={<div>Search & Reports</div>} />
        <Route path="/staff/notifications" element={<div>Notifications</div>} />

        {/* Fallback */}
        <Route path="*" element={<h1 style={{ padding: 20 }}>404 - Page Not Found</h1>} />
      </Routes>
    </MaintenanceProvider>
  );
}