// UserManagement.jsx
import React from "react";

export default function UserManagement() {
  return (
    <div className="page-container user-management">
      <header className="sub-header">User Management</header>

      <div className="panel search-bar">
        <input placeholder="Search by User Name" />
        <button>Search</button>
      </div>

      <div className="table-card">
        <h3>Users & Roles</h3>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sarath</td>
              <td>K. Sarath Perera</td>
              <td>Admin</td>
              <td>sarath@fleetcare.lk</td>
              <td>09-25-2025</td>
            </tr>
            <tr>
              <td>Priyal</td>
              <td>G. Priyal Silva</td>
              <td>Staff</td>
              <td>priyal@fleetcare.lk</td>
              <td>09-27-2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
