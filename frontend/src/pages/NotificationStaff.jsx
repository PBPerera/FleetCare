// import React, { useState } from "react";
// //import "./NotificationStaff.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
// import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline, MdReport, MdNotifications,MdAssignment } from "react-icons/md";
// import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { RiUserSettingsLine } from "react-icons/ri";

// export default function NotificationStaff() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//       const location = useLocation();
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: "approved",
//       title: "Request Approved",
//       message: "Your trip request for Trip ID T-008 has been approved. Vehicle KL-5678 assigned.",
//       time: "5 min ago",
//       schedule: "Today, 10:00 AM",
//     },
//     {
//       id: 2,
//       type: "rejected",
//       title: "Request Rejected",
//       from: "RDH Hospital trip ID T-009",
//       reason: "Scheduled KL-5678 is unavailable due to unexpected maintenance.",
//       time: "1 hour ago",
//     },
//   ]);

//   const handleUserClick = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleMarkAsRead = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   return (
//     <div className="app-wrapper">
//       <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
//         {/* Sidebar
//         <aside className="sidebar">
//           <div className="logo-section">
//             <FaUserCircle className="logo-icon" />
//           </div>
//           <ul className="menu">
//             <li onClick={() => navigate("/StaffDashboard")} style={{ cursor: "pointer" }}>
//                                       <MdDashboard /> 
//                                     </li>
            
//             <li><MdDirectionsCar /></li>
//             <li><MdAssignment /></li>
//             <li><MdDirectionsCar /></li>
//             <li><FaUserTie /></li>
//             <li><RiUserSettingsLine /></li>
//             <li 
//               className={location.pathname === "/NotificationStaff" ? "active" : ""} 
//               onClick={() => navigate("/NotificationStaff")}
//               style={{ cursor: "pointer" }}
//             >
//               <MdNotifications /> 
//             </li>
            
            
//           </ul>
//           <div className="logout">
//             <FaSignOutAlt />
//           </div>
//         </aside> */}

//         {/* Main Area */}
//         <main className="main-content">
//           <header className="header">
//             <div className="header-left">
//               <MdNotifications />
//               <h3>Notifications</h3>
//             </div>
//             <div className="fausercircle" onClick={handleUserClick}>
//               <FaUserCircle size={26} />
//             </div>
//           </header>

//           <div className="notification-body">
//             {notifications.length === 0 ? (
//               <p className="no-notifications">No new notifications 🎉</p>
//             ) : (
//               notifications.map((note) => (
//                 <div
//                   key={note.id}
//                   className={`notification-card ${
//                     note.type === "approved" ? "approved" : "rejected"
//                   }`}
//                 >
//                   <h4>{note.title}</h4>
//                   {note.type === "approved" ? (
//                     <>
//                       <p>{note.message}</p>
//                       <p className="time">({note.time})</p>
//                       <p className="schedule">🕒 Scheduled: {note.schedule}</p>
//                     </>
//                   ) : (
//                     <>
//                       <p><strong>From:</strong> {note.from}</p>
//                       <p><strong>Reason:</strong> {note.reason}</p>
//                       <p className="time">({note.time})</p>
//                     </>
//                   )}
//                   <button
//                     className="mark-read-btn"
//                     onClick={() => handleMarkAsRead(note.id)}
//                   >
//                     Mark as Read
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>

//       {/* User Menu */}
//       {isMenuOpen && (
//         <div className="user-menu">
//           <div className="menu-item">
//             <FaUserCircle /> View Profile
//           </div>
//           <div className="menu-item">
//             <MdInfoOutline /> About Us
//           </div>
//           <div className="menu-item">
//             <FaPhoneAlt /> Contact Us
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import "./NotificationStaff.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdAssignment,
  MdInfoOutline,
} from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

import StaffSidebar from "../components/StaffSidebar";

export default function NotificationStaff() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = {
    "Dashboard": "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    "Notifications": "/staff/notifications", // Ensure this matches router definition
  };

  const staffId = "6961093b585ed584551b0864";

  // ✅ FETCH NOTIFICATIONS FROM BACKEND
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/staff/${staffId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("NOTIFICATIONS:", data); // 👈 DEBUG
        setNotifications(data);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
      });
  }, [staffId]);

  const handleUserClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";
    const diff = Date.now() - new Date(timestamp).getTime();
    if (diff < 60000) return `${Math.max(1, Math.floor(diff / 1000))} sec ago`;
    if (diff < 3600000) return `${Math.max(1, Math.floor(diff / 60000))} min ago`;
    if (diff < 86400000) return `${Math.max(1, Math.floor(diff / 3600000))} hour ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // ✅ MARK AS READ (BACKEND + UI)
  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/read/${id}`, {
        method: "PUT",
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  return (
    <div className={`sd-shell ${collapsed ? "is-collapsed" : ""}`}>
      <StaffSidebar
        collapsed={collapsed}
        active="Notifications"
        onNavigate={(label) => {
          if(label === "Notifications") {
             navigate("/notification-staff");
          } else {
             navigate(routeMap[label] || "/staff/dashboard");
          }
        }}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* MAIN AREA */}
      <main className="sd-main">
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>
          <div className="sd-header-title">Notifications</div>
          <div className="sd-header-right">
             <FaUserCircle size={26} onClick={handleUserClick} style={{cursor: "pointer"}}/>
          </div>
        </header>

        <div className="sd-content">
          <div className="notification-body">
            {notifications.length === 0 ? (
              <p className="no-notifications">No new notifications 🎉</p>
            ) : (
              <div className="notification-grid">
                {notifications.map((note) => {
                  const timeLabel = note.time || formatRelativeTime(note.createdAt);
                  const isApproved = note.type === "approved";
                  const statusClass = note.type === "approved" ? "approved" : note.type === "rejected" ? "rejected" : "info";

                  return (
                    <div key={note._id} className={`notification-card ${statusClass}`}>
                      <div className="notification-card__content">
                        <div className="notification-card__header">
                          <h4>{note.title}</h4>
                        </div>
                        <div className="notification-card__body">
                          {isApproved ? (
                            <>
                              <p className="notification-message">{note.message}</p>
                              <p className="notification-meta time">({timeLabel})</p>
                              {note.schedule && (
                                <p className="notification-meta schedule">
                                  <span>🕒 Scheduled:</span> {note.schedule}
                                </p>
                              )}
                            </>
                          ) : (
                            <>
                              {note.from && (
                                <p className="notification-meta">
                                  <strong>From:</strong> {note.from}
                                </p>
                              )}
                              {note.reason && (
                                <p className="notification-meta">
                                  <strong>Reason:</strong> {note.reason}
                                </p>
                              )}
                              <p className="notification-meta time">({timeLabel})</p>
                            </>
                          )}
                        </div>
                        <div className="notification-card__footer">
                          <button
                            className="mark-read-btn"
                            onClick={() => handleMarkAsRead(note._id)}
                          >
                            Mark as Read
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* USER MENU */}
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
