// import React, { useRef } from "react";
// import "./TripAllocation.css";
// import { FaSearch, FaUserCircle, FaCalendarAlt, FaAngleDown } from "react-icons/fa";
// import { MdDashboard, MdDirectionsCar, MdNotifications, MdOutlineSettings } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";

// const TripAllocation = () => {
//   const tripRequests = [];

//   const tableRef = useRef(null);

//   const exportToPDF = () => {
//     const tableNode = tableRef.current;
//     if (!tableNode) return;
//     const newWin = window.open('', '_blank', 'noopener,noreferrer');
//     newWin.document.write('<html><head><title>Trip Requests</title>');
//     newWin.document.write('<style>body{font-family: Arial, Helvetica, sans-serif; padding:20px;} table{width:100%;border-collapse:collapse} th,td{padding:8px 12px;border:1px solid #ddd;text-align:left;} th{font-weight:700}</style>');
//     newWin.document.write('</head><body>');
//     newWin.document.write(tableNode.innerHTML);
//     newWin.document.write('</body></html>');
//     newWin.document.close();
//     newWin.focus();
//     newWin.print();
//   };

//   return (
//     <div className="trip-page">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">
//           <MdDashboard size={30} />
//         </div>
//         <nav>
//           <ul>
//             <li><MdDashboard /></li>
//             <li><MdDirectionsCar /></li>
//             <li><MdNotifications /></li>
//             <li><MdOutlineSettings /></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <header className="header">
//           <h2>Trip Allocation</h2>
//           <FaUserCircle className="user-icon" />
//         </header>

//         <div>
//             <h3 className="section-title">Trip Allocated or Rejected</h3>
//         </div>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <div className="search-input">
//             <FaSearch className="input-icon" />
//             <input type="text" placeholder="Search by Vehicle ID" />
//           </div>
//           <div className="status-picker">
//             <div className="status-picker-container">
//               <span className="status-text">Status</span>
//               <FaAngleDown className="down-icon" />
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <section className="trip-allocation">
//           <div className="table-header">
//             <button className="export-btn" onClick={exportToPDF}>Export PDF</button>
//           </div>
//           <div className="table-container" ref={tableRef}>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Request ID</th>
//                   <th>Vehicle ID</th>
//                   <th>Driver Name</th>
//                   <th>Driver Contact Number</th>
//                   <th>Pickup & Destination</th>
//                   <th>Trip Date</th>
//                   <th>Trip Time</th>
//                   <th>Purpose</th>
//                   <th>Vehicle Type</th>
//                   <th>No. of Passengers</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tripRequests.map((trip, index) => (
//                   <tr key={index}>
//                     <td>{trip.requestId}</td>
//                     <td>{trip.vehicleId}</td>
//                     <td>{trip.driverName}</td>
//                     <td>{trip.contact}</td>
//                     <td>{trip.pickup} to {trip.destination}</td>
//                     <td>
//                       <FaCalendarAlt className="calendar-icon" />{" "}
//                       {trip.tripDate}
//                     </td>
//                     <td>{trip.tripTime}</td>
//                     <td>{trip.purpose}</td>
//                     <td>{trip.vehicleType}</td>
//                     <td>{trip.noOfPassengers}</td>
//                     <td>{trip.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default TripAllocation;

import React, { useRef, useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import { Search } from "lucide-react";
import {
  FaSearch,
  FaUserCircle,
  FaCalendarAlt,
  FaAngleDown,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import "./TripAllocation.css";

export default function TripAllocation() {
  const tableRef = useRef(null);
  // sidebar/header state
  const [collapsed, setCollapsed] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch trips on mount
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/trips");
        const data = await response.json();
        if (data.data) {
          setTrips(data.data);
        }
      } catch (err) {
        setError("Failed to fetch trip allocations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Filter trips based on vehicle ID search and status
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesVehicleId = trip.vehicleId
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ? true : trip.status === statusFilter;
      return matchesVehicleId && matchesStatus;
    });
  }, [q, statusFilter, trips]);

  const exportToPDF = () => {
    if (filteredTrips.length === 0) {
      alert("No records to export");
      return;
    }

    // Prepare data for Excel
    const excelData = filteredTrips.map((trip) => ({
      "Request ID": trip.requestId,
      "Vehicle ID": trip.vehicleId,
      "Driver Name": trip.driverName,
      "Driver Contact Number": trip.driverContact,
      "Pickup & Destination": trip.pickupDestination,
      "Trip Date": new Date(trip.tripDate).toISOString().split("T")[0],
      "Trip Time": trip.tripTime,
      "Purpose": trip.purpose,
      "Vehicle Type": trip.vehicleType,
      "No. of Passengers": trip.noOfPassengers,
      Status: trip.status,
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Allocation");

    // Set column widths for better readability
    const columnWidths = [
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 18 },
      { wch: 25 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
    ];
    worksheet["!cols"] = columnWidths;

    // Export Excel file
    const timestamp = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Trip_Allocation_${timestamp}.xlsx`);
  };

  const getStatusBadgeClass = (status) => {
    return status === "Approved" ? "Approved-btn" : "Rejected-btn";
  };

  return (
    <div className="trip-page">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Trip Allocation"
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main section */}
      <main className="main-content">
        {/* Top Header */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="ta-burger" />
          </button>

          <div className="ta-header-title">Trip Allocation</div>
        </header>

        {/* Content area */}
        <div className="ad-content" style={{ display: "block" }}>
          {/* Toolbar */}
          <div className="ta-toolbar">
            <div className="ta-search">
              <span className="ta-search-ico">
                <Search size={16} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Vehicle ID"
              />
            </div>

            <div className="ta-select">
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {/* Loading/Error Messages */}
          {loading && <div className="info-message">Loading trip allocations...</div>}
          {error && <div className="error-message">{error}</div>}

          {/* Table */}
          <section className="ta-table-container">
            <h3 className="ta-title">Trip Allocation - Approved or Rejected</h3>
            <div className="table-header">
              <button className="custom-btn btn-primary" onClick={exportToPDF}>
                📄 Export Excel
              </button>
            </div>
            <div
              className="ta-table-wrapper"
              ref={tableRef}
              style={{
                maxHeight: "calc(60vh)",
                overflowY: "auto",
              }}
            >
              <table className="ta-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Vehicle ID</th>
                    <th>Driver Name</th>
                    <th>Driver Contact Number</th>
                    <th>Pickup & Destination</th>
                    <th>Trip Date</th>
                    <th>Trip Time</th>
                    <th>Purpose</th>
                    <th>Vehicle Type</th>
                    <th>No. of Passengers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip, index) => (
                      <tr key={index}>
                        <td>{trip.requestId}</td>
                        <td>{trip.vehicleId}</td>
                        <td>{trip.driverName}</td>
                        <td>{trip.driverContact}</td>
                        <td>{trip.pickupDestination}</td>
                        <td>
                          <FaCalendarAlt className="calendar-icon" />{" "}
                          {new Date(trip.tripDate).toISOString().split("T")[0]}
                        </td>
                        <td>{trip.tripTime}</td>
                        <td>{trip.purpose}</td>
                        <td>{trip.vehicleType}</td>
                        <td>{trip.noOfPassengers}</td>
                        <td>
                          <button className={getStatusBadgeClass(trip.status)}>
                            {trip.status}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>
                        No trip allocations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

