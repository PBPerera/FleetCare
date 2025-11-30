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


import React, { useState } from "react";
import {
  FaUserCircle, FaPhoneAlt, FaBell,
} from "react-icons/fa";
import {
  MdInfoOutline
} from "react-icons/md";

export default function NotificationCenter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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

  // SEND BUTTON FUNCTION
  const sendWhatsApp = (number, message) => {
    fetch("http://localhost:4000/api/notifications/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ number, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("WhatsApp message sent successfully!");
        } else {
          alert("Failed to send WhatsApp message.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error sending WhatsApp message.");
      });
  };

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        

        {/* MAIN AREA */}
        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <FaBell />
              <h3>Notification Management</h3>
            </div>

            <div className="fausercircle" onClick={handleUserClick}>
              <FaUserCircle size={26} />
            </div>
          </header>

          <div className="text">
            <h1>Notification Center</h1>
            <p>Driver Alerts, Driver Location Status</p>
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
                        <th>Enter WhatsApp Number</th>
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
                              placeholder="Type the message here"
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
                              placeholder="Enter Phone Number"
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
                                  alert("Enter a valid phone number.");
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
        </main>
      </div>

      {/* USER MENU */}
      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
        </div>
      )}

      {/* POPUP */}
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
