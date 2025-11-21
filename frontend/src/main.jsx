// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

// IMPORTANT: import your Provider from the same file that exports MaintenanceContext
import { MaintenanceProvider } from "./Context/MaintenanceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaintenanceProvider>
        <App />
      </MaintenanceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
