
import React from "react";

const widgets = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: "Photo",
  subtitle: "Text",
}));

export default function AdminHome() {
  return (
    <div style={{ padding: 18 }}>
      {/* Top small header with organization name */}
      <div className="admin-header card">
        <div className="org-left">
          <div className="org-circle" />
          <div className="org-name">RDHS Kalutara</div>
        </div>
        <div className="org-badge">RDHS<br /><span>Kalutara</span></div>
        <div className="org-right">
          <div className="user-circle" title="Profile" />
        </div>
      </div>

      {/* Main widgets panel */}
      <div className="main-panel card">
        <div className="panel-inner">
          <div className="widgets-grid">
            {widgets.map((w) => (
              <div className="widget-card" key={w.id}>
                <div className="photo-circle">{w.title}</div>
                <div className="widget-text">{w.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
