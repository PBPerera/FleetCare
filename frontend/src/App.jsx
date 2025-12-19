// src/App.jsx
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
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest.jsx";
import TripScheduling from "./pages/TripScheduling/TripScheduling.jsx";
import TripAllocation from "./pages/TripAllocation/TripAllocation.jsx";
import MyRequests from "./pages/MyRequests/MyRequests.jsx";
import MaintenanceManagement from "./pages/MaintenanceManagement.jsx";
import RepairApprove from "./pages/RepairApprove.jsx";
import AuditLog from "./pages/AuditLog.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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


      {/* Admin Dashboard */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Staff Dashboard */}
      <Route
        path="/staffdashboard"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />




      {/* Admin area (protected, Admin only) */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute role="Admin">
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification-management"
        element={
          <ProtectedRoute role="Admin">
            <NotificationManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute role="Admin">
            <Vehicles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-management"
        element={
          <ProtectedRoute role="Admin">
            <DriverManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/maintenance"
        element={
          <ProtectedRoute role="Admin">
            <MaintenanceManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/repairs/approve"
        element={
          <ProtectedRoute role="Admin">
            <RepairApprove />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audit-log"
        element={
          <ProtectedRoute role="Admin">
            <AuditLog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-scheduling"
        element={
          <ProtectedRoute role="Admin">
            <TripScheduling />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-allocation"
        element={
          <ProtectedRoute role="Admin">
            <TripAllocation />
          </ProtectedRoute>
        }
      />

      {/* Staff area (protected, Staff or Admin allowed) */}
      <Route
        path="/staffdashboard"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicle-request"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <VehicleRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-requests"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <MyRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification-center"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <NotificationCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification-staff"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <NotificationStaff />
          </ProtectedRoute>
        }
      />

      {/* Staff-specific quick routes (example paths you had) */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/vehicle-request"
        element={
          <ProtectedRoute role={["Staff", "Admin"]}>
            <VehicleRequest />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<h1 style={{ padding: 20 }}>404 - Page not found</h1>} />
    </Routes>
  );
}
