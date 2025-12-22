import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-wrap">
      <div className="welcome-card">
        <h1>FleetCare Demo</h1>
        <p>Testing Forgot Password flow (frontend mock).</p>
        <div className="links">
          <Link className="link-btn" to="/forgot-password">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}