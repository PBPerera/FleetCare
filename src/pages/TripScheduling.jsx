// TripScheduling.jsx
import React from "react";

export default function TripScheduling() {
  return (
    <div className="page-container trip-scheduling">
      <header className="sub-header">Trip Scheduling</header>

      <div className="panel request-form">
        <div className="form-left">
          <label>Trip Date & Time</label>
          <input type="date" />
          <input type="time" />
          <label>Pickup & Destination</label>
          <input placeholder="Pickup" />
          <input placeholder="Destination" />
          <button>Search Available</button>
        </div>

        <div className="form-right">
          <h4>Availables</h4>
          <ul>
            <li>Driver: Kamal Silva</li>
            <li>Vehicle: WP-CAR-1990</li>
            <li>Driver: Priyal</li>
            <li>Vehicle: WP-CCR-2135</li>
          </ul>
        </div>
      </div>

      <div className="table-card">
        <h3>Trip Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Vehicle ID</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R001</td>
              <td>WP-CAR-1990</td>
              <td>Kamal Silva</td>
              <td>Colombo</td>
              <td>09-27-2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
