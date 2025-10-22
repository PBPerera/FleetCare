// src/App.jsx
import React from "react";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import "./App.css";

function App() {
  return (
    <div className="forgot-page">
      {/* Top Navigation Bar */}
      <div className="topbar">
        <div className="topbar-left">
          {/* Back arrow button (inline SVG) */}
          <button
            className="back-btn"
            onClick={() => window.history.back()}
            aria-label="Go back"
            title="Go back"
          >
            {/* Left arrow SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M15 18L9 12L15 6" stroke="#071422" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Logo: replace src with your own file if you have one */}
          <img src="/logo2.png" alt="FleetCare Logo" className="brand-logo" />

          {/* Brand text */}
          <span className="brand-text">FleetCare</span>
        </div>

        {/* If you want items centered / right side later, add them here */}
        <div className="topbar-right" />
      </div>

      {/* Forgot Password Flow */}
      <ForgotPasswordFlow />
    </div>
  );
}

export default App;
