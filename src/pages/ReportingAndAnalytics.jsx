// ReportingAnalytics.jsx
import React from "react";

export default function ReportingAnalytics() {
  return (
    <div className="page-container reporting-analytics">
      <header className="sub-header">Reporting & Analytics</header>

      <div className="panel report-controls">
        <label>From</label>
        <input type="date" />
        <label>To</label>
        <input type="date" />
        <button>Generate Report</button>
      </div>

      <section className="charts-grid">
        <div className="chart-card">Vehicle Usage (chart placeholder)</div>
        <div className="chart-card">Driver Duty Logs (chart placeholder)</div>
        <div className="chart-card">Maintenance Costs (chart placeholder)</div>
      </section>

      <div className="table-card small">
        <h3>Vehicle Usage Report</h3>
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Driver NIC</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WP-CAR-1990</td>
              <td>900123456V</td>
              <td>Trip</td>
              <td>09-27-2025</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
