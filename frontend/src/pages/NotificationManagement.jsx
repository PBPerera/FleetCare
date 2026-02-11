<<<<<<< HEAD
// import React, { useState, useEffect } from "react"; 
// import { useNavigate, useLocation } from "react-router-dom";
// //import "./NotificationM.css";
// import {
//   FaUserCircle,
//   FaSignOutAlt,
//   FaPhoneAlt,
//   FaBell,
//   FaUserTie,
//   FaTools,
//   FaClipboardList,
// } from "react-icons/fa";
// import {
//   MdDashboard,
//   MdPeople,
//   MdDirectionsCar,
//   MdSchedule,
//   MdInfoOutline,
// } from "react-icons/md";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { RiUserSettingsLine } from "react-icons/ri";

// export default function NotificationManagement() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const tableData = [
//     {
//       title: "Trip Schedule",
//       searchPlaceholder: "Search Vehicle ID",
//       columns: [
//         "Trip Date",
//         "Trip Time",
//         "Pickup & Destination",
//         "Vehicle ID",
//         "Driver Name",
//         "Contact No",
//       ],
//       data: [
//         {
//           date: "09-27-2025",
//           time: "10.00 AM",
//           destination: "Panadura hospital to Colombo hospital",
//           vehicleId: "WP-CAR-1990",
//           driver: "Saman Kumara",
//           contact: "0768649704",
//         },
//         {
//           date: "09-27-2025",
//           time: "—",
//           destination: "Location",
//           vehicleId: "—",
//           driver: "Name",
//           contact: "Number",
//         },
//         {
//           date: "09-27-2025",
//           time: "—",
//           destination: "Location",
//           vehicleId: "—",
//           driver: "Name",
//           contact: "Number",
//         },
//       ],
//     },
//     {
//       title: "Maintenance Alert for Services",
//       searchPlaceholder: "Search Vehicle ID",
//       columns: [
//         "Vehicle ID",
//         "Driver Name",
//         "Contact No",
//         "Description",
//         "Company Name",
//       ],
//       data: [
//         {
//           vehicleId: "WP-CAR-1990",
//           driver: "Saman Kumara",
//           contact: "0768649704",
//           description: "Oil change",
//           company: "ABC Pvt Ltd",
//         },
//         {
//           vehicleId: "—",
//           driver: "Name",
//           contact: "Number",
//           description: "Type",
//           company: "Company",
//         },
//         {
//           vehicleId: "—",
//           driver: "Name",
//           contact: "Number",
//           description: "Type",
//           company: "Company",
//         },
//       ],
//     },
//     {
//       title: "Expired Vehicles Insurance",
//       searchPlaceholder: "Search Vehicle ID",
//       columns: [
//         "Vehicle ID",
//         "Vehicle Type",
//         "Insurance Expiry Date",
//         "Driver Name",
//         "Contact Number",
//       ],
//       data: [
//         {
//           vehicleId: "WP-CAR-1990",
//           vehicleType: "Car",
//           expiryDate: "09-27-2025",
//           driver: "Saman Kumara",
//           contact: "0768649704",
//         },
//       ],
//     },
//     {
//       title: "Expired Driver License",
//       searchPlaceholder: "Search Driver Name",
//       columns: ["Driver ID", "Driver Name", "License Expiry Date", "Contact Number"],
//       data: [
//         {
//           driverId: "2002453365",
//           driver: "Kumara Silva",
//           expiryDate: "10-09-2025",
//           contact: "074531892",
//         },
//       ],
//     },
//   ];

//   const [searches, setSearches] = useState(Array(tableData.length).fill(""));

//   // ✅ fixed: added useEffect import
//   useEffect(() => {
//     fetch("http://localhost:4000/api/notifications", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Notifications:", data);
//         // TODO: replace tableData with API data when ready
//       })
//       .catch((err) => console.error("Notification fetch error:", err));
//   }, []);

//   const handleSearchChange = (index, value) => {
//     const newSearches = [...searches];
//     newSearches[index] = value;
//     setSearches(newSearches);
//   };

//   return (
//     <div className="app-wrapper">
//       <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
//         {/* Main Content */}
//         <main className="main-content scrollable">
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
//             <h1>Notification Management Center</h1>
//             <p>Latest updated trips, Maintenance of vehicles, Expired Insurance</p>
//           </div>

//           {/* Tables Section */}
//           <div className="trip-section">
//             {tableData.map((table, index) => {
//               const filtered = table.data.filter((item) => {
//                 const searchValue = searches[index].toLowerCase();
//                 return Object.values(item).some((val) =>
//                   String(val).toLowerCase().includes(searchValue)
//                 );
//               });

//               return (
//                 <div key={index} className="trip-table-container">
//                   <div className="trip-header">
//                     <h3>{table.title}</h3>
//                     <div className="search-bar">
//                       <input
//                         type="text"
//                         placeholder={table.searchPlaceholder}
//                         value={searches[index]}
//                         onChange={(e) => handleSearchChange(index, e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <table className="trip-table">
//                     <thead>
//                       <tr>
//                         {table.columns.map((col, i) => (
//                           <th key={i}>{col}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filtered.map((row, i) => (
//                         <tr key={i}>
//                           {Object.values(row).map((val, j) => (
//                             <td key={j}>{val}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               );
//             })}
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
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaBell,
} from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

export default function NotificationManagement() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const location = useLocation();

  const [maintenanceData, setMaintenanceData] = useState([]);   // <-- dynamic data
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH MAINTENANCE ALERTS FOR SERVICES TABLE ONLY
  // ============================================================
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/notifications");
        const data = await res.json();

        // Filter only type == "maintenance"
        const filtered = data.filter((n) => n.type === "maintenance");

        // Convert API data to MATCH TABLE FORMAT
        const formatted = filtered.map((item) => ({
          vehicleId: item.vehicleNumber || "N/A",
          driver: item.driverName || "N/A",
          contact: item.contactNumber || "N/A",
          description: item.message || "N/A",
          company: item.company || "N/A",
        }));

        setMaintenanceData(formatted);
      } catch (err) {
        console.error("Maintenance fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  

=======
// src/pages/NotificationManagement.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./NotificationManagement.css";

import { FaBell, FaUserCircle, FaPhoneAlt } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

export default function NotificationManagement() {
  const navigate = useNavigate();

  // sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852

  const tableData = [
    {
      title: "Trip Schedule",
      searchPlaceholder: "Search Vehicle ID",
      columns: [
        "Trip Date",
        "Trip Time",
        "Pickup & Destination",
        "Vehicle ID",
        "Driver Name",
        "Contact No",
      ],
      data: [
        {
          date: "09-27-2025",
          time: "10.00 AM",
          destination: "Panadura hospital to Colombo hospital",
          vehicleId: "WP-CAR-1990",
          driver: "Saman Kumara",
          contact: "0768649704",
        },
        {
          date: "09-27-2025",
          time: "—",
          destination: "Location",
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
        },
        {
          date: "09-27-2025",
          time: "—",
          destination: "Location",
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
        },
      ],
    },
<<<<<<< HEAD

    // ============================================================
    // MAINTENANCE ALERT TABLE (DYNAMIC DATA)
    // ============================================================
    {
      title: "Maintenance Alert for Services",
      searchPlaceholder: "Search Vehicle ID",
      columns: [
        "Vehicle ID",
        "Driver Name",
        "Contact No",
        "Description",
        "Company Name",
      ],
      data: maintenanceData,   // <-- replaced sample data
    },

    {
      title: "Expired Vehicles Insurance",
      searchPlaceholder: "Search Vehicle ID",
      columns: [
        "Vehicle ID",
        "Vehicle Type",
        "Insurance Expiry Date",
        "Driver Name",
        "Contact Number",
      ],
=======
    {
      title: "Maintenance Alert for Services",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Driver Name", "Contact No", "Description", "Company Name"],
      data: [
        {
          vehicleId: "WP-CAR-1990",
          driver: "Saman Kumara",
          contact: "0768649704",
          description: "Oil change",
          company: "ABC Pvt Ltd",
        },
        { vehicleId: "—", driver: "Name", contact: "Number", description: "Type", company: "Company" },
        { vehicleId: "—", driver: "Name", contact: "Number", description: "Type", company: "Company" },
      ],
    },
    {
      title: "Expired Vehicles Insurance",
      searchPlaceholder: "Search Vehicle ID",
      columns: ["Vehicle ID", "Vehicle Type", "Insurance Expiry Date", "Driver Name", "Contact Number"],
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
      data: [
        {
          vehicleId: "WP-CAR-1990",
          vehicleType: "Car",
          expiryDate: "09-27-2025",
          driver: "Saman Kumara",
          contact: "0768649704",
        },
      ],
    },
<<<<<<< HEAD

=======
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
    {
      title: "Expired Driver License",
      searchPlaceholder: "Search Driver Name",
      columns: ["Driver ID", "Driver Name", "License Expiry Date", "Contact Number"],
      data: [
        {
          driverId: "2002453365",
          driver: "Kumara Silva",
          expiryDate: "10-09-2025",
          contact: "074531892",
        },
      ],
    },
  ];

  const [searches, setSearches] = useState(Array(tableData.length).fill(""));

  const handleSearchChange = (index, value) => {
<<<<<<< HEAD
    const newSearches = [...searches];
    newSearches[index] = value;
    setSearches(newSearches);
  };

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        
        <main className="main-content scrollable">
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
            <h1>Notification Management Center</h1>
            <p>Latest updated trips, Maintenance of vehicles, Expired Insurance</p>
          </div>

          {/* TABLE RENDERING */}
          <div className="trip-section">
            {tableData.map((table, index) => {
              const filtered = table.data.filter((item) => {
                const searchValue = searches[index].toLowerCase();
                return Object.values(item).some((val) =>
                  String(val).toLowerCase().includes(searchValue)
                );
              });

              return (
                <div key={index} className="trip-table-container">
=======
    const next = [...searches];
    next[index] = value;
    setSearches(next);
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Shared Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Notification Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main area */}
      <main className="ad-main">
        {/* Top Header */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Notification Managements</div>
          <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          <section className="ad-page-title">
            <h1>Notification Management Center</h1>
            <p>Latest updated trips, maintenance alerts, expired insurance & licenses.</p>
          </section>

          {/* Tables */}
          <section className="trip-section">
            {tableData.map((table, index) => {
              const searchValue = searches[index].toLowerCase();
              const filtered = table.data.filter((row) =>
                Object.values(row).some((v) => String(v).toLowerCase().includes(searchValue))
              );

              return (
                <div key={table.title} className="trip-table-container">
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
                  <div className="trip-header">
                    <h3>{table.title}</h3>
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder={table.searchPlaceholder}
                        value={searches[index]}
                        onChange={(e) => handleSearchChange(index, e.target.value)}
                      />
                    </div>
                  </div>

                  <table className="trip-table">
                    <thead>
                      <tr>
<<<<<<< HEAD
                        {table.columns.map((col, i) => (
                          <th key={i}>{col}</th>
=======
                        {table.columns.map((c) => (
                          <th key={c}>{c}</th>
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
                        ))}
                      </tr>
                    </thead>
                    <tbody>
<<<<<<< HEAD
                      {loading && index === 1 ? (
                        <tr><td colSpan={table.columns.length}>Loading...</td></tr>
                      ) : filtered.length === 0 ? (
                        <tr><td colSpan={table.columns.length}>No records</td></tr>
                      ) : (
                        filtered.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((val, j) => (
                              <td key={j}>{val}</td>
                            ))}
                          </tr>
                        ))
                      )}
=======
                      {filtered.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j}>{val}</td>
                          ))}
                        </tr>
                      ))}
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
                    </tbody>
                  </table>
                </div>
              );
            })}
<<<<<<< HEAD
          </div>
        </main>
      </div>

      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
=======
          </section>
        </div>
      </main>

      {/* User dropdown */}
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
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
