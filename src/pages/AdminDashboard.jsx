// AdminDashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="page-container admin-dashboard">
      <header className="page-header">
        <div className="brand">FleetCare</div>
        <div className="org">RDHS Kalutara</div>
        <div className="avatar">👤</div>
      </header>

      <aside className="left-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>User Management</li>
            <li>Vehicle Management</li>
            <li>Driver Management</li>
            <li>Trip Scheduling</li>
            <li>Maintenance Management</li>
            <li>Reporting & Analytics</li>
            <li>Notification Management</li>
            <li>Audit Log</li>
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

        <section className="cards-grid">
          {Array.from({ length: 9 }).map((_, i) => (
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
