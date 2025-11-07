 

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./App.css"
import "./pages/MyRequests/MyRequests.css"
import "./pages/TripAllocation/TripAllocation.css"
import "./pages/TripScheduling/TripScheduling.css"
import "./pages/VehicleRequest/VehicleRequest.css"
 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
