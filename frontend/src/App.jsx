import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/forgotpassword" element={<ForgotPasswordFlow />} />


        
      </Routes>
    </Router>
  );
}

export default App;