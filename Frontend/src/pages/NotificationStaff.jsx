import React, { useState } from "react";
//import "./NotificationStaff.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline, MdReport, MdNotifications,MdAssignment } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";

export default function NotificationStaff() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
      const location = useLocation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "approved",
      title: "Request Approved",
      message: "Your trip request for Trip ID T-008 has been approved. Vehicle KL-5678 assigned.",
      time: "5 min ago",
      schedule: "Today, 10:00 AM",
    },
    {
      id: 2,
      type: "rejected",
      title: "Request Rejected",
      from: "RDH Hospital trip ID T-009",
      reason: "Scheduled KL-5678 is unavailable due to unexpected maintenance.",
      time: "1 hour ago",
    },
  ]);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-section">
            <FaUserCircle className="logo-icon" />
          </div>
          <ul className="menu">
            <li onClick={() => navigate("/StaffDashboard")} style={{ cursor: "pointer" }}>
                                      <MdDashboard /> 
                                    </li>
            
            <li><MdDirectionsCar /></li>
            <li><MdAssignment /></li>
            <li><MdDirectionsCar /></li>
            <li><FaUserTie /></li>
            <li><RiUserSettingsLine /></li>
            <li 
              className={location.pathname === "/NotificationStaff" ? "active" : ""} 
              onClick={() => navigate("/NotificationStaff")}
              style={{ cursor: "pointer" }}
            >
              <MdNotifications /> 
            </li>
            
            
          </ul>
          <div className="logout">
            <FaSignOutAlt />
          </div>
        </aside>

        {/* Main Area */}
        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <MdNotifications />
              <h3>Notifications</h3>
            </div>
            <div className="fausercircle" onClick={handleUserClick}>
              <FaUserCircle size={26} />
            </div>
          </header>

          <div className="notification-body">
            {notifications.length === 0 ? (
              <p className="no-notifications">No new notifications 🎉</p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.id}
                  className={`notification-card ${
                    note.type === "approved" ? "approved" : "rejected"
                  }`}
                >
                  <h4>{note.title}</h4>
                  {note.type === "approved" ? (
                    <>
                      <p>{note.message}</p>
                      <p className="time">({note.time})</p>
                      <p className="schedule">🕒 Scheduled: {note.schedule}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>From:</strong> {note.from}</p>
                      <p><strong>Reason:</strong> {note.reason}</p>
                      <p className="time">({note.time})</p>
                    </>
                  )}
                  <button
                    className="mark-read-btn"
                    onClick={() => handleMarkAsRead(note.id)}
                  >
                    Mark as Read
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* User Menu */}
      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item">
            <FaUserCircle /> View Profile
          </div>
          <div className="menu-item">
            <MdInfoOutline /> About Us
          </div>
          <div className="menu-item">
            <FaPhoneAlt /> Contact Us
          </div>
        </div>
      )}
    </div>
  );
}