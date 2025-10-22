// NotificationManagement.jsx
import React from "react";

export default function NotificationManagement() {
  return (
    <div className="page-container notification-management">
      <header className="sub-header">Notification Management</header>

      <div className="panel notifications-list">
        <h4>Notification Center</h4>

        <div className="notification-card">
          <div className="nc-left">Vehicle Maintenance Notification for Drivers</div>
          <div className="nc-right">
            <input placeholder="Message" />
            <input placeholder="Phone number" />
            <button>Send</button>
          </div>
        </div>

        <div className="notification-card">
          <div className="nc-left">Vehicle Insurance Expiry Alerts</div>
          <div className="nc-right">
            <input placeholder="Message" />
            <input placeholder="Phone number" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
