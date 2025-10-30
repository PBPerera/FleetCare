import React from "react";
import { Routes, Route } from "react-router-dom";
import Onboard from "./pages/Onboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password/*" element={<ForgotPasswordFlow />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
