// StaffDashboard.jsx
import React from "react";

export default function StaffDashboard() {
  return (
    <div className="page-container staff-dashboard">
      <header className="page-header small">
        <div className="brand">FleetCare</div>
        <div className="page-name">Dashboard</div>
        <div className="avatar">👤</div>
      </header>

      <aside className="left-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Vehicle Request</li>
            <li>My Requests</li>
            <li>Vehicle Details</li>
            <li>Driver Details</li>
            <li>Search and Reports</li>
            <li>Notifications</li>
          </ul>
        </nav>
        <div className="logout">⟲ Log out</div>
      </aside>

      <main className="main-content">
        <h1 className="page-title">
          RDHS
          <br />
          <span>Kalutara</span>
        </h1>

        <section className="cards-grid small-cards">
          {Array.from({ length: 6 }).map((_, i) => (
            <article className="info-card" key={i}>
              <div className="photo">Photo</div>
              <div className="text">Text</div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
