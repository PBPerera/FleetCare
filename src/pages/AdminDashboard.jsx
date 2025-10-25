
import React, { useState } from "react";
import "./AdminDashboard.jsx";
import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";

export default function FleetCareDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
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
            <div className="fausercircle" onClick={handleUserClick}>
              <FaUserCircle size={26} />
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

      {/* User Menu (visible even when blurred) */}
      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
        </div>
      )}
    </div>
  );
}
