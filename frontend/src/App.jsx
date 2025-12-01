// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";


import NotificationManagement from "./pages/NotificationManagement";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationStaff from "./pages/NotificationStaff";

import Home from "./pages/Home";

function App() {
  return (   
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      
      
      <Route path="/NotificationManagement" element={<NotificationManagement />} />
      <Route path="/NotificationCenter" element={<NotificationCenter />} />
      <Route path="/NotificationStaff" element={<NotificationStaff />} />
      
      {/* optional 404 fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes> 
  );
}

export default App;

