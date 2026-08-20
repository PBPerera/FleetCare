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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatingRequestId, setUpdatingRequestId] = useState(null);

  // Fetch requests on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/vehicleRequests`);
      const data = await response.json();
      if (data.data) {
        setRequests(data.data);
      }
    } catch (err) {
      setError("Failed to fetch trip allocations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter requests based on vehicle ID search and status
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesVehicleId = request.vehicleId
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ? true : request.status === statusFilter;
      return matchesVehicleId && matchesStatus;
    });
  }, [q, statusFilter, requests]);

  const handleRequestStatusChange = async (requestId, newStatus) => {
    setUpdatingRequestId(requestId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/vehicleRequests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(`Request ${newStatus.toLowerCase()} successfully!`);
        
        // Update the requests list
        setRequests(requests.map((req) =>
          req._id === requestId ? { ...req, status: newStatus } : req
        ));

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update request status");
      }
    } catch (err) {
      setError("Network error: Failed to update request status");
      console.error(err);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  const exportToExcel = () => {
    if (filteredRequests.length === 0) {
      alert("No records to export");
      return;
    }

    // Prepare data for Excel
    const excelData = filteredRequests.map((request) => ({
      "Request ID": request.requestId,
      "Vehicle ID": request.vehicleId,
      "Driver Name": request.driverName,
      "Driver Contact Number": request.driverContact,
      "Pickup & Destination": request.pickupDestination,
      "Trip Date": new Date(request.tripDate).toISOString().split("T")[0],
      "Trip Time": request.tripTime,
      "Purpose": request.purpose,
      "Vehicle Type": request.vehicleType,
      "No. of Passengers": request.noOfPassengers,
      Status: request.status,
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
    if (status === "Approved") return "status-approved";
    if (status === "Rejected") return "status-rejected";
    if (status === "Completed") return "status-completed";
    return "status-pending";
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
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {/* Loading/Error Messages */}
          {loading && <div className="info-message">Loading trip allocations...</div>}
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Table */}
          <section className="ta-table-container">
            <h3 className="ta-title">Trip Allocation - Status Management</h3>
            <div className="table-header">
              <button className="custom-btn btn-primary" onClick={exportToExcel}>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request, index) => (
                      <tr key={request._id || index}>
                        <td>{request.requestId}</td>
                        <td>{request.vehicleId}</td>
                        <td>{request.driverName}</td>
                        <td>{request.driverContact}</td>
                        <td>{request.pickupDestination}</td>
                        <td>
                          <FaCalendarAlt className="calendar-icon" />{" "}
                          {new Date(request.tripDate).toISOString().split("T")[0]}
                        </td>
                        <td>{request.tripTime}</td>
                        <td>{request.purpose}</td>
                        <td>{request.vehicleType}</td>
                        <td>{request.noOfPassengers}</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="ta-actions">
                          <button
                            className="btn-approve"
                            onClick={() => handleRequestStatusChange(request._id, "Approved")}
                            disabled={
                              request.status === "Approved" || updatingRequestId === request._id
                            }
                            title="Approve this request"
                          >
                            {updatingRequestId === request._id ? "..." : "✓ Approve"}
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleRequestStatusChange(request._id, "Rejected")}
                            disabled={
                              request.status === "Rejected" || updatingRequestId === request._id
                            }
                            title="Reject this request"
                          >
                            {updatingRequestId === request._id ? "..." : "✗ Reject"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" style={{ textAlign: "center" }}>
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

