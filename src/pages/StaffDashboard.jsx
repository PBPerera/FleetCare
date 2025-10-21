import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
  const nav = useNavigate();
  function logout(){ localStorage.removeItem('user'); nav('/login'); }

  return (
    <div className="dash-root">
      <aside className="dash-side">
        <div className="dash-brand">FleetCare</div>
        <nav className="dash-nav">
          <button className="dash-item active">Dashboard</button>
          <button className="dash-item">Vehicle Request</button>
          <button className="dash-item">My Requests</button>
          <button className="dash-item">Vehicle Details</button>
          <button className="dash-item">Driver Details</button>
          <button className="dash-item">Search & Reports</button>
          <button className="dash-item">Notifications</button>
        </nav>
        <div style={{marginTop:'auto', padding:12}}>
          <button className="lc-btn lc-btn-secondary" onClick={logout}>Log out</button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header"><div className="dash-org">RDHS Kalutara</div></header>

        <section className="dash-grid">
          {[...Array(6)].map((_,i)=>(
            <div key={i} className="dash-card">
              <div className="dash-photo">Photo</div>
              <div className="dash-text">Text</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
