<<<<<<< HEAD
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
=======
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./styles/global.css" 
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
import "./App.css";
import "./components/Buttons/Button.css"
import "./components/DashboardCards/Cards.css"
import "./components/DataTable/Table.css"
import "./components/Layout/Layout.css"
import "./components/Modals/Modal.css"
import "./components/Pagination.css"
import "./components/SearchBar/SearchBar.css"
import "./pages/Pages.css"
import "./pages/Maintenance.css"
import { MaintenanceProvider } from "./context/MaintenanceContext.jsx";

import "./pages/NotificationManagement.css";
import "./pages/NotificationCenter.css";
import "./pages/NotificationStaff.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);
