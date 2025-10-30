import React from "react";
import { Routes, Route } from 'react-router-dom';
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import MaintenanceManagement from './pages/MaintenanceManagement';
import RepairApprove from './pages/RepairApprove';
import { MaintenanceProvider } from './context/MaintenanceContext';
import "./App.css";

function App() {
  return (
    <MaintenanceProvider>
    <Routes>
      {/* Your existing route */}
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      
      {/* Maintenance Management Routes */}
      <Route path="/" element={<MaintenanceManagement />} />
      <Route path="/maintenance" element={<MaintenanceManagement />} />
      <Route path="/repairs/approve" element={<RepairApprove />} />
     
    </Routes>
  </MaintenanceProvider>
);
}

export default App;