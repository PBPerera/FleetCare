import React from "react";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest";
import TripScheduling from "./pages/TripScheduling/TripScheduling";
import TripAllocation from "./pages/TripAllocation/TripAllocation";
import MyRequests from "./pages/MyRequests/MyRequests";

import Home from "./pages/Home";

function App() {
  return  (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      <Route path="/vehicle-request" element={<VehicleRequest />} />
      <Route path="/trip-scheduling" element={<TripScheduling />} />
      <Route path="/trip-allocation" element={<TripAllocation />} />
      <Route path="/my-requests" element={<MyRequests />} />

    </Routes>
  )
}

export default App;