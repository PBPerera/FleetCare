// VehicleManagement.jsx
import React from "react";

export default function VehicleManagement() {
  return (
    <div className="page-container vehicle-management">
      <header className="sub-header">Vehicle Management</header>

      <section className="stats-row">
        <div className="stat">
          Total Vehicles
          <br />
          <strong>05</strong>
        </div>
        <div className="stat">
          Available Vehicle
          <br />
          <strong>02</strong>
        </div>
        <div className="stat">
          Assigned Vehicle
          <br />
          <strong>02</strong>
        </div>
        <div className="stat">
          Maintenance
          <br />
          <strong>01</strong>
        </div>
      </section>

      <div className="panel search-bar">
        <input placeholder="Search by Vehicle ID" />
        <select>
          <option>All</option>
          <option>Available</option>
          <option>Assigned</option>
        </select>
        <button>Search</button>
      </div>

      <div className="table-card">
        <h3>Vehicles</h3>
        <table>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Type</th>
              <th>Wheel Serial</th>
              <th>Engine No</th>
              <th>Battery No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WP-CAR-1990</td>
              <td>Car</td>
              <td>BR12345</td>
              <td>E11145</td>
              <td>B00245</td>
            </tr>
            <tr>
              <td>WP-CCR-2135</td>
              <td>Truck</td>
              <td>BR22345</td>
              <td>E21145</td>
              <td>B10245</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
