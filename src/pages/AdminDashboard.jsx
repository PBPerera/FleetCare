// // AdminDashboard.jsx
// import React from "react";

// export default function AdminDashboard() {
//   return (
//     <div className="page-container admin-dashboard">
//       <header className="page-header">
//         <div className="brand">FleetCare</div>
//         <div className="org">RDHS Kalutara</div>
//         <div className="avatar">👤</div>
//       </header>

//       <aside className="left-sidebar">
//         <nav className="sidebar-nav">
//           <ul>
//             <li className="active">Dashboard</li>
//             <li>User Management</li>
//             <li>Vehicle Management</li>
//             <li>Driver Management</li>
//             <li>Trip Scheduling</li>
//             <li>Maintenance Management</li>
//             <li>Reporting & Analytics</li>
//             <li>Notification Management</li>
//             <li>Audit Log</li>
//           </ul>
//         </nav>
//         <div className="logout">⟲ Log out</div>
//       </aside>

//       <main className="main-content">
//         <h1 className="page-title">
//           RDHS
//           <br />
//           <span>Kalutara</span>
//         </h1>

//         <section className="cards-grid">
//           {Array.from({ length: 9 }).map((_, i) => (
//             <article className="info-card" key={i}>
//               <div className="photo">Photo</div>
//               <div className="text">Text</div>
//             </article>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// }

import React from "react";
import "./AdminDashboard.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { BiAlignLeft } from "react-icons/bi";
import { MdDashboard, MdPeople, MdDirectionsCar, MdAssignment, MdReport, MdSchedule } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";


export default function FleetCareDashboard() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <FaUserCircle className="logo-icon" />
          <h3>FleetCare</h3>
        </div>
        <ul className="menu">
          <li className="active"><MdDashboard /> Dashboard</li>
          <li><MdPeople /> User Management</li>
          <li><MdDirectionsCar /> Vehicle Management</li>
          <li><FaUserTie /> Driver Management</li>
          <li><MdSchedule /> Trip Scheduling</li>
          <li><FaClipboardList /> Trip Allocation</li>
          <li><FaTools /> Maintainance Management</li>
          <li><HiOutlineDocumentReport /> Reporting And Analytics</li>
          <li><FaBell /> Notification Management</li>
          <li><RiUserSettingsLine /> Audit log</li>
          
        </ul>
        <div className="logout">
          <FaSignOutAlt /> Log out
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="header">
           <div className="header-left">
    <MdDashboard />
    <h3>Dashboard</h3>
  </div>
  <div className="fausercircle">
          <FaUserCircle size={24} />
          
      </div>
        </header>

        <section className="dashboard-body">
          <div className="title-box"><b>RDHS Kalutara</b></div>

          <div className="cards-container">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <div className="card-circle">Photo</div>
                <p>Text</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
