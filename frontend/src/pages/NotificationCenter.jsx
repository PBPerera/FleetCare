// import React, { useState } from "react";
// //import "./NotificationCenter.css";
// import {
//   FaUserCircle, FaSignOutAlt, FaPhoneAlt, FaUserTie, FaBell, FaTools, FaClipboardList
// } from "react-icons/fa";
// import {
//   MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline
// } from "react-icons/md";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { RiUserSettingsLine } from "react-icons/ri";

// export default function NotificationCenter() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const handleUserClick = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleViewMessage = (message) => {
//     setPopupMessage(message);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const tables = [
//     {
//       title: "Trip Schedule Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "" },
//         { name: "Nimal Perera", contact: "0712345678", message: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "" },
//         { name: "Ruwan Jayasuriya", contact: "0717894561", message: "" },
//       ],
//     },
//     {
//       title: "Vehicle Maintenance Notification for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "" },
//       ],
//     },
//     {
//       title: "Vehicle Insurance Expiry Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "" },
//         { name: "Nimal Perera", contact: "0712345678", message: "" },
//       ],
//     },
//     {
//       title: "Driver License Expiry Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "" },
//       ],
//     },
//   ];

//   const [tableData, setTableData] = useState(tables);

//   const handleInputChange = (tableIndex, rowIndex, value) => {
//     const updatedTables = [...tableData];
//     updatedTables[tableIndex].data[rowIndex].message = value;
//     setTableData(updatedTables);
//   };

//   return (
//     <div className="app-wrapper">
//       <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        

//         {/* Main Area */}
//         <main className="main-content">
//           <header className="header">
//             <div className="header-left">
//               <FaBell />
//               <h3>Notification Management</h3>
//             </div>
//             <div className="fausercircle" onClick={handleUserClick}>
//               <FaUserCircle size={26} />
//             </div>
//           </header>

//           <div className="text">
//             <h1>Notification Center</h1>
//             <p>Driver Alerts, Driver Location Status</p>
//           </div>

//           {/* Scrollable dashboard */}
//           <div className="dashboard-body">
//             {tableData.map((table, tableIndex) => (
//               <div key={tableIndex} className="notification-table">
//                 <h4>{table.title}</h4>
//                 <div className="table-scroll">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Driver Name</th>
//                         <th>Contact No</th>
//                         <th>Message</th>
//                         <th>Enter WhatsApp Number</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {table.data.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           <td>{row.name}</td>
//                           <td>{row.contact}</td>
//                           <td>
//                             <input
//                               type="text"
//                               value={row.message}
//                               onChange={(e) =>
//                                 handleInputChange(
//                                   tableIndex,
//                                   rowIndex,
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="Type the message here"
//                             />
//                             <button
//                               className="view-btn"
//                               onClick={() =>
//                                 handleViewMessage(row.message || "No message typed")
//                               }
//                             >
//                               View
//                             </button>
//                           </td>
//                           <td>
//                             <input type="text" placeholder="Enter Phone Number" />
//                           </td>
//                           <td>
//                             <button className="send-btn">Send</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* User Menu */}
//       {isMenuOpen && (
//         <div className="user-menu">
//           <div className="menu-item"><FaUserCircle /> View Profile</div>
//           <div className="menu-item"><MdInfoOutline /> About Us</div>
//           <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
//         </div>
//       )}

//       {/* Popup */}
//       {showPopup && (
//         <div className="popup-overlay" onClick={handleClosePopup}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <h4>Message</h4>
//             <p>{popupMessage}</p>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import {
//   FaUserCircle, FaPhoneAlt, FaBell,
// } from "react-icons/fa";
// import {
//   MdInfoOutline
// } from "react-icons/md";

// export default function NotificationCenter() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

//   const handleViewMessage = (message) => {
//     setPopupMessage(message);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => setShowPopup(false);

//   // Initial table data
//   const initialTables = [
//     {
//       title: "Trip Schedule Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
//         { name: "Nimal Perera", contact: "0712345678", message: "", phoneInput: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
//         { name: "Ruwan Jayasuriya", contact: "0717894561", message: "", phoneInput: "" },
//       ],
//     },
//     {
//       title: "Vehicle Maintenance Notification for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
//       ],
//     },
//     {
//       title: "Vehicle Insurance Expiry Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
//         { name: "Nimal Perera", contact: "0712345678", message: "", phoneInput: "" },
//       ],
//     },
//     {
//       title: "Driver License Expiry Notifications for Drivers",
//       data: [
//         { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
//         { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
//       ],
//     },
//   ];

//   const [tableData, setTableData] = useState(initialTables);

//   // Handle message typing
//   const handleMessageChange = (tableIndex, rowIndex, value) => {
//     const updated = [...tableData];
//     updated[tableIndex].data[rowIndex].message = value;
//     setTableData(updated);
//   };

//   // Handle phone number input
//   const handlePhoneChange = (tableIndex, rowIndex, value) => {
//     const updated = [...tableData];
//     updated[tableIndex].data[rowIndex].phoneInput = value;
//     setTableData(updated);
//   };

//   // SEND BUTTON FUNCTION
//   const sendWhatsApp = (number, message) => {
//     fetch("http://localhost:4000/api/notifications/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ number, message }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === "success") {
//           alert("WhatsApp message sent successfully!");
//         } else {
//           alert("Failed to send WhatsApp message.");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error sending WhatsApp message.");
//       });
//   };

//   return (
//     <div className="app-wrapper">
//       <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        

//         {/* MAIN AREA */}
//         <main className="main-content">
//           <header className="header">
//             <div className="header-left">
//               <FaBell />
//               <h3>Notification Management</h3>
//             </div>

//             <div className="fausercircle" onClick={handleUserClick}>
//               <FaUserCircle size={26} />
//             </div>
//           </header>

//           <div className="text">
//             <h1>Notification Center</h1>
//             <p>Driver Alerts, Driver Location Status</p>
//           </div>

//           {/* TABLES */}
//           <div className="dashboard-body">
//             {tableData.map((table, tableIndex) => (
//               <div key={tableIndex} className="notification-table">
//                 <h4>{table.title}</h4>

//                 <div className="table-scroll">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Driver Name</th>
//                         <th>Contact No</th>
//                         <th>Message</th>
//                         <th>Enter WhatsApp Number</th>
//                         <th>Send</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {table.data.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           <td>{row.name}</td>
//                           <td>{row.contact}</td>

//                           {/* MESSAGE INPUT */}
//                           <td>
//                             <input
//                               type="text"
//                               value={row.message}
//                               onChange={(e) =>
//                                 handleMessageChange(
//                                   tableIndex,
//                                   rowIndex,
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="Type the message here"
//                             />

//                             <button
//                               className="view-btn"
//                               onClick={() =>
//                                 handleViewMessage(
//                                   row.message || "No message typed"
//                                 )
//                               }
//                             >
//                               View
//                             </button>
//                           </td>

//                           {/* PHONE INPUT */}
//                           <td>
//                             <input
//                               type="text"
//                               placeholder="Enter Phone Number"
//                               value={row.phoneInput}
//                               onChange={(e) =>
//                                 handlePhoneChange(
//                                   tableIndex,
//                                   rowIndex,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </td>

//                           {/* SEND BUTTON */}
//                           <td>
//                             <button
//                               className="send-btn"
//                               onClick={() => {
//                                 const phone = row.phoneInput.trim();
//                                 const msg = row.message.trim();

//                                 if (!phone) {
//                                   alert("Enter a valid phone number.");
//                                   return;
//                                 }
//                                 if (!msg) {
//                                   alert("Please type a message.");
//                                   return;
//                                 }

//                                 sendWhatsApp(phone, msg);
//                               }}
//                             >
//                               Send
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* USER MENU */}
//       {isMenuOpen && (
//         <div className="user-menu">
//           <div className="menu-item"><FaUserCircle /> View Profile</div>
//           <div className="menu-item"><MdInfoOutline /> About Us</div>
//           <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
//         </div>
//       )}

//       {/* POPUP */}
//       {showPopup && (
//         <div className="popup-overlay" onClick={handleClosePopup}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <h4>Message Preview</h4>
//             <p>{popupMessage}</p>
//             <button onClick={handleClosePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaBell,
} from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function NotificationCenter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const routeMap = {
    "Dashboard": "/admindashboard",
    "User Management": "/user-management",
    "Vehicle Management": "/vehicles",
    "Driver Management": "/driver-management",
    "Trip Scheduling": "/trip-scheduling",
    "Trip Allocation": "/trip-allocation",
    "Maintenance Management": "/maintenance",
    "Reporting & Analytics": "/reports",
    "Notification Management": "/notification-management",
    "Audit Log": "/audit-log",
  };

  const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

  const handleViewMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  // Initial table data
  const initialTables = [
    {
      title: "Trip Schedule Notifications for Drivers",
      data: [
        { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
        { name: "Nimal Perera", contact: "0712345678", message: "", phoneInput: "" },
        { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
        { name: "Ruwan Jayasuriya", contact: "0717894561", message: "", phoneInput: "" },
      ],
    },
    {
      title: "Vehicle Maintenance Notification for Drivers",
      data: [
        { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
        { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
      ],
    },
    {
      title: "Vehicle Insurance Expiry Notifications for Drivers",
      data: [
        { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
        { name: "Nimal Perera", contact: "0712345678", message: "", phoneInput: "" },
      ],
    },
    {
      title: "Driver License Expiry Notifications for Drivers",
      data: [
        { name: "Saman Kumara", contact: "0763435761", message: "", phoneInput: "" },
        { name: "Kamal Silva", contact: "0771234567", message: "", phoneInput: "" },
      ],
    },
  ];

  const [tableData, setTableData] = useState(initialTables);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications`);
        const data = await res.json();
        
        setTableData(prev => {
          // Create a shallow copy of the tables array and each table object
          const newTables = prev.map(t => ({ ...t }));
          
          if (data.tripSchedule) {
            newTables[0].data = data.tripSchedule.map(item => ({
              name: item.driverName || item.driver || "N/A",
              contact: item.contactNo || item.contact || item.driverContact || "N/A",
              message: "",
              phoneInput: ""
            }));
          }

          if (data.maintenanceAlerts) {
            newTables[1].data = data.maintenanceAlerts.map(item => ({
              name: item.driverName || item.driver || "N/A",
              contact: item.contactNo || item.contact || "N/A",
              message: "",
              phoneInput: ""
            }));
          }

          if (data.expiredInsurance) {
            newTables[2].data = data.expiredInsurance.map(item => ({
              name: item.driverName || item.driver || "N/A",
              contact: item.contactNo || item.contact || "N/A",
              message: "",
              phoneInput: ""
            }));
          }

          if (data.expiredLicenses) {
            newTables[3].data = data.expiredLicenses.map(item => ({
              name: item.driverName || item.driver || "N/A",
              contact: item.contactNo || item.contact || "N/A",
              message: "",
              phoneInput: ""
            }));
          }

          // If the API returned an old-style flat array (just to be absolutely safe)
          if (Array.isArray(data) && data.length > 0 && !data.tripSchedule) {
            newTables[0].data = data.filter(i => i.type === "trip").map(item => ({
              name: item.driver || item.driverName || "N/A",
              contact: item.contact || item.driverContact || "N/A",
              message: "", phoneInput: ""
            }));
            newTables[1].data = data.filter(i => i.type === "maintenance").map(item => ({
              name: item.driver || item.driverName || "N/A",
              contact: item.contact || item.contactNo || "N/A",
              message: "", phoneInput: ""
            }));
            newTables[2].data = data.filter(i => i.type === "insurance").map(item => ({
              name: item.driver || item.driverName || "N/A",
              contact: item.contact || item.contactNo || "N/A",
              message: "", phoneInput: ""
            }));
            newTables[3].data = data.filter(i => i.type === "license").map(item => ({
              name: item.driver || item.driverName || "N/A",
              contact: item.contact || item.contactNo || "N/A",
              message: "", phoneInput: ""
            }));
          }

          return newTables;
        });

      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  // Handle message typing
  const handleMessageChange = (tableIndex, rowIndex, value) => {
    const updated = [...tableData];
    updated[tableIndex].data[rowIndex].message = value;
    setTableData(updated);
  };

  // Handle phone number input
  const handlePhoneChange = (tableIndex, rowIndex, value) => {
    const updated = [...tableData];
    updated[tableIndex].data[rowIndex].phoneInput = value;
    setTableData(updated);
  };

  // ✅ UPDATED SEND FUNCTION
  const sendWhatsApp = async (number, message) => {
    try {
      // Clean and format phone number
      let cleanedNumber = number.replace(/\D/g, ""); // Remove non-digits
      
      // If number starts with 0, replace with Sri Lanka code (94)
      if (cleanedNumber.startsWith("0")) {
        cleanedNumber = "94" + cleanedNumber.substring(1);
      }
      
      // If number doesn't start with country code, add 94 for Sri Lanka
      if (!cleanedNumber.startsWith("94") && !cleanedNumber.startsWith("+")) {
        cleanedNumber = "94" + cleanedNumber;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ number: cleanedNumber, message }),
      });

      const data = await res.json();

      if (data.status === "success" && data.whatsappUrl) {
        // 🔥 Open receiver's WhatsApp chat with message as draft
        window.open(data.whatsappUrl, "_blank");
      } else {
        alert("Failed to open WhatsApp chat.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while opening WhatsApp.");
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Notification Center"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      <main className="ad-main">
        <header className="sd-header nm-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>
          
          <div className="sd-header-title" style={{ display: 'flex', alignItems: 'center' }}>
            <FaBell style={{marginRight: '8px'}} /> Notification Management
          </div>
          <div className="sd-header-right" style={{ marginLeft: 'auto' }}>
            <div className="fausercircle" onClick={handleUserClick} style={{cursor: 'pointer'}}>
              <FaUserCircle size={26} />
            </div>
          </div>
        </header>

        <div className="ad-content">
          <div className="text" style={{marginBottom: '20px'}}>
            <h1>Notification Center</h1>
            <p>Driver Alerts & Notifications</p>
          </div>

          {/* TABLES */}
          <div className="dashboard-body">
            {tableData.map((table, tableIndex) => (
              <div key={tableIndex} className="notification-table">
                <h4>{table.title}</h4>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Driver Name</th>
                        <th>Contact No</th>
                        <th>Message</th>
                        <th>WhatsApp Number</th>
                        <th>Send</th>
                      </tr>
                    </thead>

                    <tbody>
                      {table.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{row.name}</td>
                          <td>{row.contact}</td>

                          {/* MESSAGE INPUT */}
                          <td>
                            <input
                              type="text"
                              value={row.message}
                              onChange={(e) =>
                                handleMessageChange(
                                  tableIndex,
                                  rowIndex,
                                  e.target.value
                                )
                              }
                              placeholder="Type message"
                            />

                            <button
                              className="view-btn"
                              onClick={() =>
                                handleViewMessage(
                                  row.message || "No message typed"
                                )
                              }
                            >
                              View
                            </button>
                          </td>

                          {/* PHONE INPUT */}
                          <td>
                            <input
                              type="text"
                              placeholder="0763435761 or +94763435761"
                              value={row.phoneInput}
                              onChange={(e) =>
                                handlePhoneChange(
                                  tableIndex,
                                  rowIndex,
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          {/* SEND BUTTON */}
                          <td>
                            <button
                              className="send-btn"
                              onClick={() => {
                                const phone = row.phoneInput.trim();
                                const msg = row.message.trim();

                                if (!phone) {
                                  alert("Enter WhatsApp number.");
                                  return;
                                }
                                if (!msg) {
                                  alert("Please type a message.");
                                  return;
                                }

                                sendWhatsApp(phone, msg);
                              }}
                            >
                              Send
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* USER MENU */}
      {isMenuOpen && (
        <div className="user-menu" style={{position: 'absolute', top: '60px', right: '20px', zIndex: 1000}}>
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
        </div>
      )}

      {/* MESSAGE PREVIEW POPUP */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h4>Message Preview</h4>
            <p>{popupMessage}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
