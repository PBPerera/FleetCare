// // src/pages/TripScheduling/TripScheduling.jsx
// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Cards from "../../components/DashboardCards/Cards.jsx";
// import SearchBar from "../../components/SearchBar/SearchBar.jsx";
// import Table from "../../components/DataTable/Table.jsx";
// import Button from "../../components/Buttons/Button.jsx";
// import ExportPdfBtn from "../../components/ExportPdfBtn.jsx";
// import "../Pages.css";

// export default function TripScheduling() {
//   const navigate = useNavigate();

//   // sidebar/header state
//   const [collapsed, setCollapsed] = useState(false);

//   const routeMap = {
//     Dashboard: "/admindashboard",
//     "User Management": "/user-management",
//     "Vehicle Management": "/vehicles",
//     "Driver Management": "/driver-management",
//     "Trip Scheduling": "/trip-scheduling",
//     "Trip Allocation": "/trip-allocation",
//     "Maintenance Management": "/maintenance",
//     "Reporting & Analytics": "/reports",
//     "Notification Management": "/notification-management",
//     "Audit Log": "/audit-log",
//   };

//   // ===== Demo data (swap with API/Context later) =====
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       requestId: "R0001",
//       vehicleId: "WWA-2258",
//       driverName: "Kumara Silva",
//       contact: "07046589",
//       pickup: "Panadura Hospital",
//       destination: "Colombo Hospital",
//       tripDate: "2025-09-25",
//       tripTime: "10:00 AM",
//       purpose: "Patient Transport",
//       vehicleType: "Van",
//       noOfPassengers: 3,
//       status: "Pending",
//     },
//     {
//       id: 2,
//       requestId: "R0002",
//       vehicleId: "AAA-1234",
//       driverName: "Nuwan Perera",
//       contact: "0771234567",
//       pickup: "Galle Hospital",
//       destination: "Karapitiya",
//       tripDate: "2025-09-26",
//       tripTime: "08:30 AM",
//       purpose: "Patient Transfer",
//       vehicleType: "Van",
//       noOfPassengers: 2,
//       status: "Approved",
//     },
//     {
//       id: 3,
//       requestId: "R0003",
//       vehicleId: "BBB-5678",
//       driverName: "Ajith Pushpakumara",
//       contact: "0719998888",
//       pickup: "Kurunegala",
//       destination: "Colombo",
//       tripDate: "2025-09-27",
//       tripTime: "01:00 PM",
//       purpose: "Supplies",
//       vehicleType: "Lorry",
//       noOfPassengers: 1,
//       status: "Rejected",
//     },
//   ]);

//   // ===== Cards / metrics (same style as your other screens) =====
//   const dashboardCards = useMemo(() => {
//     const total = requests.length;
//     const approved = requests.filter((r) => r.status === "Approved").length;
//     const pending = requests.filter((r) => r.status === "Pending").length;
//     const rejected = requests.filter((r) => r.status === "Rejected").length;
//     return [
//       { title: "Total", count: total, subtitle: "All requests", icon: "🧾" },
//       { title: "Approved", count: approved, subtitle: "Ready to dispatch", icon: "✅" },
//       { title: "Pending", count: pending, subtitle: "Awaiting review", icon: "⏳" },
//       { title: "Rejected", count: rejected, subtitle: "Declined", icon: "❌" },
//     ];
//   }, [requests]);

//   // ===== Table columns (unique keys + Actions) =====
//   const columns = useMemo(
//     () => [
//       { key: "requestId", label: "Request ID" },
//       { key: "vehicleId", label: "Vehicle ID" },
//       { key: "driverName", label: "Driver Name" },
//       { key: "contact", label: "Driver Contact No" },
//       {
//         key: "route",
//         label: "Pickup → Destination",
//         render: (row) => (
//           <span>
//             {row.pickup} → {row.destination}
//           </span>
//         ),
//       },
//       { key: "tripDate", label: "Trip Date" },
//       { key: "tripTime", label: "Trip Time" },
//       { key: "purpose", label: "Purpose" },
//       { key: "vehicleType", label: "Vehicle Type" },
//       { key: "noOfPassengers", label: "Passengers" },
//       { key: "status", label: "Status" },
//       {
//         key: "actions",
//         label: "Actions",
//         render: (row, onAction) => (
//           <div className="action-buttons">
//             <button className="action-btn approve" onClick={() => onAction("approve", row)}>
//               Approve
//             </button>
//             <button className="action-btn reject" onClick={() => onAction("reject", row)}>
//               Reject
//             </button>
//             <button className="action-btn" onClick={() => onAction("allocate", row)}>
//               Allocate
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   // ===== Filters (similar structure to your Driver screen) =====
//   const [keyword, setKeyword] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All"); // Van | Car | Bus | Lorry

//   const filtered = useMemo(() => {
//     const q = keyword.trim().toLowerCase();
//     return requests.filter((r) => {
//       const inQuery =
//         !q ||
//         [
//           r.requestId,
//           r.vehicleId,
//           r.driverName,
//           r.contact,
//           r.pickup,
//           r.destination,
//           r.purpose,
//           r.vehicleType,
//           String(r.noOfPassengers),
//           r.status,
//         ]
//           .join(" ")
//           .toLowerCase()
//           .includes(q);

//       const byStatus = statusFilter === "All" ? true : r.status === statusFilter;
//       const byType = typeFilter === "All" ? true : r.vehicleType === typeFilter;

//       return inQuery && byStatus && byType;
//     });
//   }, [requests, keyword, statusFilter, typeFilter]);

//   // ===== CRUD-ish handlers (compatible with TableRow onEdit) =====
//   const handleEdit = (id, updated) => {
//     setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
//   };

//   const handleAction = (action, row) => {
//     if (action === "approve") {
//       setRequests((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "Approved" } : r)));
//       return;
//     }
//     if (action === "reject") {
//       setRequests((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: "Rejected" } : r)));
//       return;
//     }
//     if (action === "allocate") {
//       navigate("/trip-allocation", { state: { request: row } });
//       return;
//     }
//   };

//   return (
//     <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
//       {/* Sidebar */}
//       <Sidebar
//         collapsed={collapsed}
//         active="Trip Scheduling"
//         onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
//         onLogout={() => (window.location.href = "/login")}
//       />

//       {/* Main */}
//       <main className="ad-main">
//         {/* Top Header (same pattern as your other screens) */}
//         <header className="sd-header">
//           <button
//             className="sd-toggle"
//             onClick={() => setCollapsed((v) => !v)}
//             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             title={collapsed ? "Expand" : "Collapse"}
//           >
//             <span className="sd-burger" />
//           </button>

//           <div className="sd-header-title">Trip Scheduling</div>
//           <div className="sd-header-right" />
//         </header>

//         {/* Page content */}
//         <div className="ad-content">
//           {/* Cards (forced to one line as you requested) */}
//           <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
//             <Cards data={dashboardCards} />
//           </div>

//           {/* Section title */}
//           <h2 className="section-title">Trip Requests</h2>

//           {/* Helper bar for parity with other pages */}
//           <SearchBar onFilterChange={() => {}} filterLabel="Trip Date" />

//           {/* Action bar (filters on left, export on right) */}
//           <div className="action-bar" style={{ gap: 12, flexWrap: "wrap" }}>
//             {/* Keyword */}
//             <div className="fc-input-wrap" style={{ minWidth: 260 }}>
//               <input
//                 className="fc-input"
//                 placeholder="Search by driver, vehicle, route, purpose..."
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//               />
//             </div>

//             {/* Status filter */}
//             <select
//               className="fc-input"
//               style={{ minWidth: 160 }}
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option>All</option>
//               <option>Pending</option>
//               <option>Approved</option>
//               <option>Rejected</option>
//             </select>

//             {/* Vehicle type filter */}
//             <select
//               className="fc-input"
//               style={{ minWidth: 160 }}
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//             >
//               <option>All</option>
//               <option>Van</option>
//               <option>Car</option>
//               <option>Lorry</option>
//               <option>Bus</option>
//             </select>

//             {/* Right-side actions */}
//             <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
//               <ExportPdfBtn data={filtered} filename="trip-requests" />
//             </div>
//           </div>

//           {/* Data table */}
//           <Table
//             columns={columns}
//             rows={filtered}
//             showCheckbox
//             editable
//             onEdit={handleEdit}
//             onAction={handleAction}
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

import { React, useState, useRef, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Search } from "lucide-react";
import { FaSearch, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdOutlineSettings,
} from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import "./TripScheduling.css";

export default function TripScheduling() {
  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const [q, setQ] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tripRequests, setTripRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tableRef = useRef(null);

  // Fetch pending vehicle requests on mount
  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/vehicleRequests?status=Pending"
        );
        const data = await response.json();
        if (data.data) {
          setTripRequests(data.data);
        }
      } catch (err) {
        setError("Failed to fetch trip requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  // Filter trips based on vehicle ID search and selected date
  const filteredTrips = useMemo(() => {
    return tripRequests.filter((trip) => {
      const matchesVehicleId = trip.vehicleId
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesDate =
        !selectedDate || new Date(trip.tripDate).toISOString().split("T")[0] === selectedDate;
      return matchesVehicleId && matchesDate;
    });
  }, [q, selectedDate, tripRequests]);

  // Handle approve button click
  const handleApprove = async (requestId, vehicleRequest) => {
    try {
      const tripData = {
        requestId: vehicleRequest.requestId,
        vehicleId: vehicleRequest.vehicleId,
        driverName: vehicleRequest.driverName,
        driverContact: vehicleRequest.driverContact,
        pickupDestination: vehicleRequest.pickupDestination,
        tripDate: vehicleRequest.tripDate,
        tripTime: vehicleRequest.tripTime,
        purpose: vehicleRequest.purpose,
        vehicleType: vehicleRequest.vehicleType,
        noOfPassengers: vehicleRequest.noOfPassengers,
        status: "Approved",
        vehicleRequestId: vehicleRequest._id,
      };

      // Create trip in Trip collection
      const tripResponse = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!tripResponse.ok) {
        throw new Error("Failed to create trip");
      }

      // Update vehicle request status to Approved
      const updateResponse = await fetch(
        `http://localhost:5000/api/vehicleRequests/${vehicleRequest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update vehicle request");
      }

      // Remove from pending list
      setTripRequests((prev) =>
        prev.filter((trip) => trip.requestId !== requestId)
      );
    } catch (err) {
      console.error(err);
      alert("Error approving trip: " + err.message);
    }
  };

  // Handle reject button click
  const handleReject = async (requestId, vehicleRequest) => {
    try {
      const tripData = {
        requestId: vehicleRequest.requestId,
        vehicleId: vehicleRequest.vehicleId,
        driverName: vehicleRequest.driverName,
        driverContact: vehicleRequest.driverContact,
        pickupDestination: vehicleRequest.pickupDestination,
        tripDate: vehicleRequest.tripDate,
        tripTime: vehicleRequest.tripTime,
        purpose: vehicleRequest.purpose,
        vehicleType: vehicleRequest.vehicleType,
        noOfPassengers: vehicleRequest.noOfPassengers,
        status: "Rejected",
        vehicleRequestId: vehicleRequest._id,
      };

      // Create trip in Trip collection
      const tripResponse = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!tripResponse.ok) {
        throw new Error("Failed to create trip");
      }

      // Update vehicle request status to Rejected
      const updateResponse = await fetch(
        `http://localhost:5000/api/vehicleRequests/${vehicleRequest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Rejected" }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update vehicle request");
      }

      // Remove from pending list
      setTripRequests((prev) =>
        prev.filter((trip) => trip.requestId !== requestId)
      );
    } catch (err) {
      console.error(err);
      alert("Error rejecting trip: " + err.message);
    }
  };

  return (
    <div className="trip-page">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Trip Scheduling"
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main section */}
      <main className="main-content">
        {/* Top Header */}
        <header className="ts-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="ts-burger" />
          </button>

          <div className="ts-header-title">Trip Scheduling</div>
        </header>

        {/* Content area */}
        <div className="ad-content" style={{ display: "block" }}>
          {/* Toolbar */}
          <div className="ts-toolbar">
            <div className="ts-search">
              <span className="ts-search-ico">
                <Search size={16} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Vehicle ID"
              />
            </div>

            <div className="date-picker">
              <div
                className="date-picker-container"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <span className="date-text">Trip Date</span>
                <FaCalendarAlt
                  className="date-icon"
                  style={{ cursor: "pointer" }}
                />
              </div>

              {showDatePicker && (
                <div className="date-picker-modal">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setShowDatePicker(false);
                    }}
                    className="date-input"
                  />
                  {selectedDate && (
                    <button
                      className="clear-date-btn"
                      onClick={() => {
                        setSelectedDate("");
                        setShowDatePicker(false);
                      }}
                    >
                      Clear Date
                    </button>
                  )}
                </div>
              )}
              {selectedDate && (
                <span className="selected-date-display">{selectedDate}</span>
              )}
            </div>

            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          {/* Loading/Error Messages */}
          {loading && <div className="info-message">Loading trip requests...</div>}
          {error && <div className="error-message">{error}</div>}

          {/* Table */}
          <section className="ts-table-container">
            <h3 className="ts-title">Trip Requests - Pending Approval</h3>
            <div className="table-header"></div>
            <div
              className="ts-table-wrapper"
              ref={tableRef}
              style={{
                maxHeight: "calc(60vh)",
                overflowY: "auto",
              }}
            >
              <table className="ts-table">
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
                    <th>Approve/Reject</th>
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
                        <td>
                          {trip.pickupDestination}
                        </td>
                        <td>
                          <FaCalendarAlt className="calendar-icon" />{" "}
                          {new Date(trip.tripDate).toISOString().split("T")[0]}
                        </td>
                        <td>{trip.tripTime}</td>
                        <td>{trip.purpose}</td>
                        <td>{trip.vehicleType}</td>
                        <td>{trip.noOfPassengers}</td>
                        <td>
                          <button
                            className="Approve-btn"
                            onClick={() => handleApprove(trip.requestId, trip)}
                          >
                            Approve
                          </button>
                          <button
                            className="Reject-btn"
                            onClick={() => handleReject(trip.requestId, trip)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>
                        No pending trip requests
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
