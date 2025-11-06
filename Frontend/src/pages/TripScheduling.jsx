import React from "react";
import "./TripScheduling.css"; 

import { FaSearch, FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard, MdDirectionsCar, MdNotifications, MdOutlineSettings } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

const TripScheduling = () => {
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
      approveOrReject:  
      <><button className="Approve-btn">Approve</button>
      <button className="Reject-btn">Reject</button>
      </> ,
    },
    // Sample rows
    { requestId: "R0002", vehicleId: "AAA-1234", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></>},
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></>},
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
    { requestId: "R0003", vehicleId: "BBB-5678", driverName: "Name", contact: "Number", pickup: "Location", destination: "Location", tripDate: "Date", tripTime: "10:00 AM", purpose: "Patient Transport", vehicleType: "Van", noOfPassengers: "3",approveOrReject:  <><button className="Approve-btn">Approve</button><button className="Reject-btn">Reject</button></> },
  ];

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
          <h2>Trip Scheduling</h2>
          <FaUserCircle className="user-icon" />
        </header>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input">
            <FaSearch className="input-icon" />
            <input type="text" placeholder="Search by Vehicle ID" />
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
        <section className="trip-requests">
          <h3>Trip Requests</h3>
          <div className="table-container">
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
                  <th>Approve/Reject</th>
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
                    <td>{trip.approveOrReject}</td>
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

export default TripScheduling;
