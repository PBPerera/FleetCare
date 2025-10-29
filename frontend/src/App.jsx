import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import "./pages/AdminDashboard.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admindash" element={<AdminDashboard />} />
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />
      </Routes>
    </Router>
  );
}

export default App;