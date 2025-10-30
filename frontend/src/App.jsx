import React from "react";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import "./App.css";
import TripAllocation from "./pages/TripAllocation/TripAllocation";
import TripScheduling from "./pages/TripScheduling/TripShceduling";
import MyRequests from "./pages/MyRequests/MyRequests";
import VehicleRequest from "./pages/VehicleRequest/VehicleRequest";

function App() {
  return <>
  <ForgotPasswordFlow />
  <TripAllocation />
  <TripScheduling />
  <MyRequests /> ,
  <VehicleRequest /> 
  </> ;
}

export default App;