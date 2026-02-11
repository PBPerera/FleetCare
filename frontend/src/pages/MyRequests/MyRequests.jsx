// import React from "react";
// // import "./MyRequests.css";
// import { FaSearch, FaUserCircle, FaCalendarAlt, FaTrashAlt} from "react-icons/fa";
// import { MdDashboard, MdDirectionsCar, MdNotifications, MdOutlineSettings } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";

// const MyRequests = () => {
//   const tripRequests = [
//     {
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
//       status:  
//       <><button className="Approved-btn">Approved</button>
//       </> ,
//       delete: <><button className="Delete-btn"><FaTrashAlt /></button></>,
//     },
//     { requestId: "R0002", vehicleId: "AAA-1234", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button></> , delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//     { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </>, delete: <><button className="Delete-btn"><FaTrashAlt /></button></> },
//   ];

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
//           <h2>My Requests</h2>
//           <FaUserCircle className="user-icon" />
//         </header>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <div className="search-input">
//             <FaSearch className="input-icon" />
//             <input type="text" placeholder="Search by Vehicle ID" />
//           </div>
//           <div className="date-picker">
//             <div className="date-picker-container">
//               <span className="date-text">Trip Date</span>
//               <FaCalendarAlt className="date-icon" />
//             </div>
//           </div>
//           <button className="search-btn">
//             <FaSearch />
//           </button>
//         </div>

//         {/* Table */}
//         <section className="trip-requests">
//           <h3>Trip Requests</h3>
//           <div className="table-container">
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
//                   <th>Delete</th>
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
//                     <td>{trip.delete}</td>
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

// export default MyRequests;


import { React, useState, useRef, useEffect } from "react";
import StaffSidebar from "../../components/StaffSidebar";
import { Search } from "lucide-react";
import {
  FaSearch,
  FaUserCircle,
  FaCalendarAlt,
  FaTrashAlt,
} from "react-icons/fa";
import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdOutlineSettings,
} from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import "./MyRequests.css";
import { useNavigate } from "react-router-dom";

export default function MyRequests() {
  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Vehicle requests state
  const [tripRequests, setTripRequests] = useState([]);

  const routeMap = {
    Dashboard: "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    Notifications: "/staff/notifications",
  };

  const tableRef = useRef(null);

  // Fetch vehicle requests from database
  useEffect(() => {
    const fetchVehicleRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/vehicleRequests",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle requests");
        }

        const data = await response.json();
        console.log(data);

        // Transform the data to match the table format
        const formattedRequests = data.data.map((request) => ({
          requestId: request.requestId,
          vehicleId: request.vehicleId,
          driverName: request.driverName,
          contact: request.driverContact,
          pickup:
            request.pickupDestination.split(" to ")[0] ||
            request.pickupDestination,
          destination: request.pickupDestination.split(" to ")[1] || "",
          tripDate: new Date(request.tripDate).toLocaleDateString("en-US"),
          tripTime: request.tripTime,
          purpose: request.purpose,
          vehicleType: request.vehicleType,
          noOfPassengers: request.noOfPassengers,
          status: (
            <>
              <button className={`${request.status}-btn`} disabled>
                {request.status}
              </button>
            </>
          ),
          delete: (
            <>
              <button
                className="Delete-btn"
                onClick={() => handleDeleteRequest(request._id)}
              >
                <FaTrashAlt />
              </button>
            </>
          ),
          _id: request._id,
        }));

        setTripRequests(formattedRequests);
      } catch (err) {
        console.error("Error fetching vehicle requests:", err);
      }
    };

    fetchVehicleRequests();
  }, []);

  // Handle delete request
  const handleDeleteRequest = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicleRequests/${requestId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      // Remove from state
      setTripRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error("Error deleting request:", err);
      alert("Failed to delete request");
    }
  };

  // Hardcoded fallback data for reference
  const fallbackTripRequests = [
    {
      requestId: "R0001",
      vehicleId: "WWA-2258",
      driverName: "Kumara Silva",
      contact: "07046589",
      pickup: "Panadura Hospital",
      destination: "Colombo Hospital",
      tripDate: "2025-09-25",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: 3,
      status: (
        <>
          <button className="Approved-btn">Approved</button>
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0002",
      vehicleId: "AAA-1234",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Rejected-btn">Rejected</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Rejected-btn">Rejected</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Rejected-btn">Rejected</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Rejected-btn">Rejected</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Rejected-btn">Rejected</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
    {
      requestId: "R0003",
      vehicleId: "BBB-5678",
      driverName: "Name",
      contact: "Number",
      pickup: "Location",
      destination: "Location",
      tripDate: "Date",
      tripTime: "10:00 AM",
      purpose: "Patient Transport",
      vehicleType: "Van",
      noOfPassengers: "3",
      status: (
        <>
          <button className="Approved-btn">Approved</button>{" "}
        </>
      ),
      delete: (
        <>
          <button className="Delete-btn">
            <FaTrashAlt />
          </button>
        </>
      ),
    },
  ];

  const [q, setQ] = useState("");

  return (
    <div className="trip-page">
      {/* Sidebar */}
      <StaffSidebar
        collapsed={collapsed}
        active="My Requests"
        onNavigate={(label) => navigate(routeMap[label] || "/staff/dashboard")}
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
            <span className="mr-burger" />
          </button>

          <div className="mr-header-title">My Requests</div>
        </header>

        {/* Content area */}
        <div className="ad-content" style={{ display: "block" }}>
          <section className="sd-page-title">
            <h1>My Requests</h1>
          </section>
          {/* Toolbar */}
          <div className="mr-toolbar">
            <div className="mr-search">
              <span className="mr-search-ico">
                <Search size={16} />
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by Vehicle ID"
              />
            </div>

            <div className="date-picker">
              <div className="date-picker-container">
                <span className="date-text">Trip Date</span>
                <FaCalendarAlt className="date-icon" />
              </div>
            </div>

            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          {/* Table */}
          <section className="mr-table-container">
            <div className="table-header"></div>
            {tripRequests.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#999",
                  fontSize: "16px",
                }}
              >
                No vehicle requests found. Create a new request to get started!
              </div>
            ) : (
              <div
                className="mr-table-wrapper"
                ref={tableRef}
                style={{
                  maxHeight: "calc(60vh)",
                  overflowY: "auto",
                }}
              >
                <table className="mr-table">
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
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tripRequests.map((trip, index) => (
                      <tr key={index}>
                        <td>{trip.requestId}</td>
                        <td>{trip.vehicleId}</td>
                        <td>{trip.driverName}</td>
                        <td>{trip.contact}</td>
                        <td>
                          {trip.pickup} to {trip.destination}
                        </td>
                        <td>
                          <FaCalendarAlt className="calendar-icon" />{" "}
                          {trip.tripDate}
                        </td>
                        <td>{trip.tripTime}</td>
                        <td>{trip.purpose}</td>
                        <td>{trip.vehicleType}</td>
                        <td>{trip.noOfPassengers}</td>
                        <td>{trip.status}</td>
                        <td>{trip.delete}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}


