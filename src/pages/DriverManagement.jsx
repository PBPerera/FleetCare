// DriverManagement.jsx
import React from "react";

export default function DriverManagement() {
  return (
    <div className="page-container driver-management">
      <header className="sub-header">Driver Management</header>

      <section className="stats-row small">
        <div className="stat">
          Total Drivers
          <br />
          <strong>05</strong>
        </div>
        <div className="stat">
          Available Drivers
          <br />
          <strong>02</strong>
        </div>
        <div className="stat">
          On Trip
          <br />
          <strong>02</strong>
        </div>
        <div className="stat">
          Off Duty
          <br />
          <strong>01</strong>
        </div>
      </section>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>901234567V</td>
              <td>Kamal Silva</td>
              <td>No. 12, Main St.</td>
              <td>077-1234567</td>
            </tr>
            <tr>
              <td>902345678V</td>
              <td>Athula Bandara</td>
              <td>No. 5, Lake Rd.</td>
              <td>077-2345678</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
