import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import AddVehiclePage from "./pages/AddVehiclePage";
import AddDriverPage from "./pages/AddDriverPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />

        <Route path="/add-vehicle" element={<AddVehiclePage />} />

        <Route path="/add-driver" element={<AddDriverPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
