import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import AddVehiclePage from "./pages/AddVehiclePage";
import UpdateVehiclePage from "./pages/UpdateVehiclePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />

        <Route path="/add-vehicle" element={<AddVehiclePage />} />

        <Route path="/update-vehicle" element={<UpdateVehiclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
