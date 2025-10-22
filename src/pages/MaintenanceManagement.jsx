// MaintenanceManagement.jsx
import React from "react";

export default function MaintenanceManagement() {
  return (
    <div className="page-container maintenance-management">
      <header className="sub-header">Maintenance Management</header>

      <section className="stats-row small">
        <div className="stat">
          Total
          <br />
          <strong>4</strong>
        </div>
        <div className="stat">
          Scheduled
          <br />
          <strong>1</strong>
        </div>
        <div className="stat">
          In Progress
          <br />
          <strong>2</strong>
        </div>
        <div className="stat">
          Completed
          <br />
          <strong>10</strong>
        </div>
      </section>

      <div className="panel search-bar">
        <input placeholder="Search by Vehicle ID" />
        <button>Add Service</button>
      </div>

      <div className="table-card">
        <h3>Maintenance Records for Service</h3>
        <table>
          <thead>
            <tr>
              <th>Maintain ID</th>
              <th>Vehicle ID</th>
              <th>Driver Name</th>
              <th>Description</th>
              <th>Company</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M0001</td>
              <td>WP-CAR-1990</td>
              <td>Kamal Silva</td>
              <td>Oil Change</td>
              <td>Jagath Motors</td>
              <td>09-25-2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
