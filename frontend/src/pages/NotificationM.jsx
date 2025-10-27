
import React, { useState } from "react";
import "./NotificationM.css";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPhoneAlt,
  FaBell,
  FaUserTie,
  FaTools,
  FaClipboardList,
} from "react-icons/fa";
import {
  MdDashboard,
  MdPeople,
  MdDirectionsCar,
  MdSchedule,
  MdInfoOutline,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";

export default function Notification1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleUserClick = () => setIsMenuOpen(!isMenuOpen);

  // Data for all tables
  const tableData = [
    // 1️⃣ Trip Schedule
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

    // 2️⃣ Maintenance Alert for Services
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
      data: [
        {
          vehicleId: "WP-CAR-1990",
          driver: "Saman Kumara",
          contact: "0768649704",
          description: "Oil change",
          company: "ABC Pvt Ltd",
        },
        {
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
          description: "Type",
          company: "Company",
        },
        {
          vehicleId: "—",
          driver: "Name",
          contact: "Number",
          description: "Type",
          company: "Company",
        },
      ],
    },

    // 3️⃣ Expired Vehicles Insurance
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

    // 4️⃣ Expired Driver License
    {
      title: "Expired Driver License",
      searchPlaceholder: "Search Driver Name",
      columns: [
        "Driver ID",
        "Driver Name",
        "License Expiry Date",
        "Contact Number",
      ],
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
    const newSearches = [...searches];
    newSearches[index] = value;
    setSearches(newSearches);
  };

  return (
    <div className="app-wrapper">
      <div className={`app-container ${isMenuOpen ? "blurred" : ""}`}>
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-section">
            <FaUserCircle className="logo-icon" />
          </div>
          <ul className="menu">
            <li className="active"><MdDashboard /></li>
            <li><MdPeople /></li>
            <li><MdDirectionsCar /></li>
            <li><FaUserTie /></li>
            <li><MdSchedule /></li>
            <li><FaClipboardList /></li>
            <li><FaTools /></li>
            <li><HiOutlineDocumentReport /></li>
            <li><FaBell /></li>
            <li><RiUserSettingsLine /></li>
          </ul>
          <div className="logout"><FaSignOutAlt /></div>
        </aside>

        {/* Main Content */}
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
          {/* Tables Section */}
          <div className="trip-section">
            {tableData.map((table, index) => {
              const filtered = table.data.filter((item) => {
                const searchValue = searches[index].toLowerCase();
                return (
                  Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(searchValue)
                  )
                );
              });

              return (
                <div key={index} className="trip-table-container">
                  <div className="trip-header">
                    <h3>{table.title}</h3>
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder={table.searchPlaceholder}
                        value={searches[index]}
                        onChange={(e) =>
                          handleSearchChange(index, e.target.value)
                        }
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
                      {filtered.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* User Menu */}
      {isMenuOpen && (
        <div className="user-menu">
          <div className="menu-item"><FaUserCircle /> View Profile</div>
          <div className="menu-item"><MdInfoOutline /> About Us</div>
          <div className="menu-item"><FaPhoneAlt /> Contact Us</div>
        </div>
      )}
    </div>
  );
}
