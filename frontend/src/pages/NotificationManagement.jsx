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
import Sidebar from "../components/Sidebar";

export default function NotificationManagement() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const location = useLocation();

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

  const [tripSchedule, setTripSchedule] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [expiredInsurance, setExpiredInsurance] = useState([]);
  const [expiredLicenses, setExpiredLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isRowEmpty = (row) => {
    if (!row) return true;
    const values = Object.values(row);
    const isAllPlaceholder = values.every((val) => {
      if (val === null || val === undefined) return true;
      const str = String(val).trim();
      return (
        str === "" ||
        str === "N/A" ||
        str === "No description" ||
        str === "—" ||
        str === "Unknown" ||
        str === "Unassigned" ||
        str === "Location" ||
        str === "Name" ||
        str === "Number" ||
        str === "Type" ||
        str === "Company"
      );
    });

    if (isAllPlaceholder) return true;

    const vehicleId = (row.vehicleId || row.vehicle_id || "").toString().trim();
    const driver = (row.driver || row.driverName || row.driverId || "").toString().trim();
    if ((!vehicleId || vehicleId === "N/A") && (!driver || driver === "N/A")) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notifications`);
        const data = await res.json();

        if (data.tripSchedule) {
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

          const filtered = data.tripSchedule.filter((item) => {
            if (!item.tripDate) return false;
            const tDate = new Date(item.tripDate);
            if (isNaN(tDate.getTime())) return false;
            return tDate >= todayStart && tDate <= maxExpiryDate;
          });

          setTripSchedule(
            filtered
              .map((item) => ({
                date: item.tripDate ? new Date(item.tripDate).toLocaleDateString() : "N/A",
                time: item.tripTime || "N/A",
                destination: item.pickupDestination || item.destination || "N/A",
                vehicleId: item.vehicleId || "N/A",
                driver: item.driverName || item.driver || "N/A",
                contact: item.contactNo || item.contact || item.driverContact || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );
        }

        if (data.maintenanceAlerts) {
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

          const filtered = data.maintenanceAlerts.filter((item) => {
            const mDateVal = item.shiftDate || item.maintenanceDate || item.date || item.requestDate;
            if (!mDateVal) return true;
            const mDate = new Date(mDateVal);
            if (isNaN(mDate.getTime())) return true;
            return mDate >= todayStart && mDate <= maxExpiryDate;
          });

          setMaintenanceAlerts(
            filtered
              .map((item) => ({
                vehicleId: item.vehicleId || "N/A",
                driver: item.driverName || item.driver || "N/A",
                contact: item.contactNo || item.contact || "N/A",
                description: item.description || "N/A",
                company: item.companyName || item.company || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );
        }

        if (data.expiredInsurance) {
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

          const filtered = data.expiredInsurance.filter((item) => {
            if (!item.expiryDate) return false;
            const expDate = new Date(item.expiryDate);
            if (isNaN(expDate.getTime())) return false;
            return expDate >= todayStart && expDate <= maxExpiryDate;
          });

          setExpiredInsurance(
            filtered
              .map((item) => ({
                vehicleId: item.vehicleId || "N/A",
                vehicleType: item.vehicleType || "N/A",
                expiryDate: item.expiryDate
                  ? new Date(item.expiryDate).toLocaleDateString()
                  : "N/A",
                driver: item.driverName || item.driver || "N/A",
                contact: item.contactNo || item.contact || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );
        }

        if (data.expiredLicenses) {
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

          const filtered = data.expiredLicenses.filter((item) => {
            const expiry = item.licenceExpiryDate || item.expiryDate;
            if (!expiry) return false;
            const expDate = new Date(expiry);
            if (isNaN(expDate.getTime())) return false;
            return expDate >= todayStart && expDate <= maxExpiryDate;
          });

          setExpiredLicenses(
            filtered
              .map((item) => ({
                driverId: item.driverId || "N/A",
                driver: item.driverName || item.driver || "N/A",
                expiryDate: item.licenceExpiryDate || item.expiryDate
                  ? new Date(item.licenceExpiryDate || item.expiryDate).toLocaleDateString()
                  : "N/A",
                contact: item.contactNo || item.contact || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );
        }

        // if API returns old-style flat array, then also parse by type
        if (Array.isArray(data) && data.length > 0 && !data.tripSchedule) {
          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const maxExpiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 23, 59, 59, 999);

          setTripSchedule(
            data
              .filter((item) => {
                if (item.type !== "trip" || !item.tripDate) return false;
                const tDate = new Date(item.tripDate);
                if (isNaN(tDate.getTime())) return false;
                return tDate >= todayStart && tDate <= maxExpiryDate;
              })
              .map((item) => ({
                date: item.tripDate ? new Date(item.tripDate).toLocaleDateString() : "N/A",
                time: item.tripTime || "N/A",
                destination: item.destination || item.pickupDestination || "N/A",
                vehicleId: item.vehicleId || "N/A",
                driver: item.driver || item.driverName || "N/A",
                contact: item.contact || item.driverContact || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );

          setMaintenanceAlerts(
            data
              .filter((item) => {
                if (item.type !== "maintenance") return false;
                const mDateVal = item.maintenanceDate || item.date || item.requestDate;
                if (!mDateVal) return true;
                const mDate = new Date(mDateVal);
                if (isNaN(mDate.getTime())) return true;
                return mDate >= todayStart && mDate <= maxExpiryDate;
              })
              .map((item) => ({
                vehicleId: item.vehicleId || "N/A",
                driver: item.driver || item.driverName || "N/A",
                contact: item.contact || item.contactNo || "N/A",
                description: item.description || item.message || "N/A",
                company: item.company || item.companyName || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );

          setExpiredInsurance(
            data
              .filter((item) => {
                if (item.type !== "insurance" || !item.expiryDate) return false;
                const expDate = new Date(item.expiryDate);
                if (isNaN(expDate.getTime())) return false;
                return expDate >= todayStart && expDate <= maxExpiryDate;
              })
              .map((item) => ({
                vehicleId: item.vehicleId || "N/A",
                vehicleType: item.vehicleType || "N/A",
                expiryDate: item.expiryDate
                  ? new Date(item.expiryDate).toLocaleDateString()
                  : "N/A",
                driver: item.driver || item.driverName || "N/A",
                contact: item.contact || item.contactNo || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );

          setExpiredLicenses(
            data
              .filter((item) => {
                if (item.type !== "license") return false;
                const expiry = item.licenceExpiryDate || item.expiryDate;
                if (!expiry) return false;
                const expDate = new Date(expiry);
                if (isNaN(expDate.getTime())) return false;
                return expDate >= todayStart && expDate <= maxExpiryDate;
              })
              .map((item) => ({
                driverId: item.driverId || "N/A",
                driver: item.driver || item.driverName || "N/A",
                expiryDate: item.expiryDate
                  ? new Date(item.expiryDate).toLocaleDateString()
                  : "N/A",
                contact: item.contact || item.contactNo || "N/A",
              }))
              .filter((row) => !isRowEmpty(row))
          );
        }
      } catch (err) {
        console.error("Notification fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  


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
      data: tripSchedule,
    },
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
      data: maintenanceAlerts,
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
      data: expiredInsurance,
    },
    {
      title: "Expired Driver License",
      searchPlaceholder: "Search Driver Name",
      columns: ["Driver ID", "Driver Name", "License Expiry Date", "Contact Number"],
      data: expiredLicenses,
    },
  ];

  const [searches, setSearches] = useState(["", "", "", ""]);

  const handleSearchChange = (index, value) => {
    const newSearches = [...searches];
    newSearches[index] = value;
    setSearches(newSearches);
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        active="Notification Management"
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
            <h1>Notification Management Center</h1>
            <p>Latest updated trips, Maintenance of vehicles, Expired Insurance</p>
          </div>

          {/* TABLE RENDERING */}
          <div className="trip-section">
            {tableData.map((table, index) => {
              const filtered = table.data.filter((item) => {
                if (isRowEmpty(item)) return false;
                const searchValue = searches[index].toLowerCase();
                return Object.values(item).some((val) =>
                  String(val).toLowerCase().includes(searchValue)
                );
              });

              return (
                <div key={index} className="trip-table-container">
                  <div className="trip-header">
                    <h3>{table.title}</h3>
                    <div className="nm-search-bar">
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
                        {table.columns.map((col, i) => (
                          <th key={i}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {isMenuOpen && (
        <div className="user-menu" style={{position: 'absolute', top: '60px', right: '20px', zIndex: 1000}}>
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
        </div>
      )}
    </div>
  );
}
