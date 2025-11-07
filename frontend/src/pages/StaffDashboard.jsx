
import React, { useState } from "react";
//import "./AdminDashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline, MdReport, MdNotifications,MdAssignment } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import Logo from "../assets/logo-small.png";

export default function StaffDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        {/* Sidebar */}
        <aside className="sidebar1">
          <div className="logo-section1">
           <img
          src={Logo}
          alt="logo"
          className="logo-icon1"
        />
            <h3>FleetCare</h3>
          </div>
          <ul className="menu1">
            <li className={location.pathname === "/StaffDashboard" ? "active" : ""} 
                          onClick={() => navigate("/StaffDashboard")}
                          style={{ cursor: "pointer" }}
                        >
                          <MdDashboard /> Dashboard
                        </li>
            <li><MdDirectionsCar /> Vehicle Request</li>
            <li><MdAssignment /> My Requests</li>
            <li><MdDirectionsCar /> Vehicle Details</li>
            <li><FaUserTie /> Driver Details</li>
            <li><RiUserSettingsLine /> Search and Reports</li>
            <li onClick={() => navigate("/NotificationStaff")} style={{ cursor: "pointer" }}>
                          <MdNotifications /> Notifications
                        </li>
            
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