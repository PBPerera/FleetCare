import React, { useRef } from "react";
import "./TripAllocation.css";
import { FaSearch, FaUserCircle, FaCalendarAlt, FaAngleDown } from "react-icons/fa";
import { MdDashboard, MdDirectionsCar, MdNotifications, MdOutlineSettings } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const TripAllocation = () => {
  const tripRequests = [
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
      status:  
      <><button className="Approved-btn">Approved</button>
      </> ,
    },
    // Sample rows
    { requestId: "R0002", vehicleId: "AAA-1234", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button></>},
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </>},
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Rejected-btn">Rejected</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",status:  <><button className="Approved-btn">Approved</button> </> },
  ];

  const tableRef = useRef(null);

  const exportToPDF = () => {
    const tableNode = tableRef.current;
    if (!tableNode) return;
    const newWin = window.open('', '_blank', 'noopener,noreferrer');
    newWin.document.write('<html><head><title>Trip Requests</title>');
    newWin.document.write('<style>body{font-family: Arial, Helvetica, sans-serif; padding:20px;} table{width:100%;border-collapse:collapse} th,td{padding:8px 12px;border:1px solid #ddd;text-align:left;} th{font-weight:700}</style>');
    newWin.document.write('</head><body>');
    newWin.document.write(tableNode.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.focus();
    newWin.print();
  };

  return (
    <div className="trip-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <MdDashboard size={30} />
        </div>
        <nav>
          <ul>
            <li><MdDashboard /></li>
            <li><MdDirectionsCar /></li>
            <li><MdNotifications /></li>
            <li><MdOutlineSettings /></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Trip Allocation</h2>
          <FaUserCircle className="user-icon" />
        </header>

        <div>
            <h3 className="section-title">Trip Allocated or Rejected</h3>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input">
            <FaSearch className="input-icon" />
            <input type="text" placeholder="Search by Vehicle ID" />
          </div>
          <div className="status-picker">
            <div className="status-picker-container">
              <span className="status-text">Status</span>
              <FaAngleDown className="down-icon" />
            </div>
          </div>
        </div>

        {/* Table */}
        <section className="trip-allocation">
          <div className="table-header">
            <button className="export-btn" onClick={exportToPDF}>Export PDF</button>
          </div>
          <div className="table-container" ref={tableRef}>
            <table>
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
                {tripRequests.map((trip, index) => (
                  <tr key={index}>
                    <td>{trip.requestId}</td>
                    <td>{trip.vehicleId}</td>
                    <td>{trip.driverName}</td>
                    <td>{trip.contact}</td>
                    <td>{trip.pickup} to {trip.destination}</td>
                    <td>
                      <FaCalendarAlt className="calendar-icon" />{" "}
                      {trip.tripDate}
                    </td>
                    <td>{trip.tripTime}</td>
                    <td>{trip.purpose}</td>
                    <td>{trip.vehicleType}</td>
                    <td>{trip.noOfPassengers}</td>
                    <td>{trip.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TripAllocation;
