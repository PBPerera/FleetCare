import { React, useState, useEffect } from "react";
import StaffSidebar from "../../components/StaffSidebar";
import { Search } from "lucide-react";
import {
  FaSearch,
  FaUser,
  FaCar,
  FaFileAlt,
  FaSyncAlt,
  FaUsers,
  FaBell,
  FaUndo,
  FaBars,
  FaTh,
  FaNetworkWired,
  FaUserCircle,
} from "react-icons/fa";
import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdOutlineSettings,
} from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import "./VehicleRequest.css";
import { useNavigate } from "react-router-dom";

export default function VehicleRequest() {
  // Sidebar + header state
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [showAvailables, setShowAvailables] = useState(false);
  const [activeTab, setActiveTab] = useState("drivers");

  // Form state
  const [formData, setFormData] = useState({
    tripDate: "",
    tripTime: "",
    pickupDestination: "",
    vehicleId: "",
    driverName: "",
    driverContact: "",
    purpose: "",
    vehicleType: "Car",
    noOfPassengers: 1,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const routeMap = {
    Dashboard: "/staff/dashboard",
    "Vehicle Request": "/staff/vehicle-request",
    "My Requests": "/staff/my-requests",
    "Vehicle Details": "/staff/add-vehicle",
    "Driver Details": "/staff/add-driver",
    "Search and Reports": "/staff/reports",
    Notifications: "/staff/notifications",
  };

  const [driverNames, setDriverNames] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/driver");
        const data = await response.json();
        const availableDrivers = data.Drivers.filter(
          (driver) => driver.status === "Available",
        );
        setDriverNames(availableDrivers.map((driver) => driver.name));
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  const [vehicleIds, setVehicleIds] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vehicle");
        const data = await response.json();
        console.log("Fetched vehicles:", data);
        setVehicleIds(
          data.vehicles
            .filter((vehicle) => vehicle.status === "Available")
            .map((vehicle) => vehicle.vehicleId),
        );
        console.log("Available vehicle IDs:", vehicleIds);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const [q, setQ] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate unique request ID
  const generateRequestId = () => {
    return (
      "R" + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()
    );
  };

  // Save vehicle request function
  const saveVehicleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Validate required fields
      if (
        !formData.tripDate ||
        !formData.tripTime ||
        !formData.pickupDestination ||
        !formData.vehicleId ||
        !formData.driverName ||
        !formData.purpose ||
        !formData.vehicleType ||
        !formData.noOfPassengers
      ) {
        setMessage("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Prepare request payload
      const requestPayload = {
        requestId: generateRequestId(),
        vehicleId: formData.vehicleId,
        driverName: formData.driverName,
        driverContact: formData.driverContact,
        pickupDestination: formData.pickupDestination,
        tripDate: new Date(formData.tripDate).toISOString(),
        tripTime: formData.tripTime,
        purpose: formData.purpose,
        vehicleType: formData.vehicleType,
        noOfPassengers: parseInt(formData.noOfPassengers),
        status: "Pending",
      };

      console.log("Request Payload:", requestPayload);
      // Send request to backend
      const response = await fetch(
        "http://localhost:5000/api/vehicleRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload),
        },
      );

      console.log("Response status:", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating vehicle request:", errorData);
        throw new Error(
          errorData.message || "Failed to create vehicle request",
        );
      }

      const result = await response.json();
      setMessage("Vehicle request submitted successfully!");

      // Reset form
      setFormData({
        tripDate: "",
        tripTime: "",
        pickupDestination: "",
        vehicleId: "",
        driverName: "",
        driverContact: "",
        purpose: "",
        vehicleType: "Car",
        noOfPassengers: 1,
      });

      // Redirect to my requests after successful submission
      setTimeout(() => {
        navigate("/staff/my-requests");
      }, 1500);
    } catch (error) {
      console.error("Error saving vehicle request:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      tripDate: "",
      tripTime: "",
      pickupDestination: "",
      vehicleId: "",
      driverName: "",
      driverContact: "",
      purpose: "",
      vehicleType: "Car",
      noOfPassengers: 1,
    });
    setMessage("");
  };

  return (
    <div className="trip-page">
      {/* Sidebar */}
      <StaffSidebar
        collapsed={collapsed}
        active="Vehicle Request"
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

          <div className="mr-header-title">Vehicle Requests</div>
        </header>

        {/* Content area */}
        <div className="ad-content">
          {/* <section className="sd-page-title">
            <h1>Vehicle Requests</h1>
          </section> */}

          <section className="request-form-container">
            <div className="section-title">Trip Date & Time</div>

            <div className="form-row">
              <div className="form-group" style={{ maxWidth: 200 }}>
                <input
                  type="date"
                  name="tripDate"
                  value={formData.tripDate}
                  onChange={handleInputChange}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="form-group" style={{ maxWidth: 140 }}>
                <input
                  type="time"
                  name="tripTime"
                  value={formData.tripTime}
                  onChange={handleInputChange}
                  placeholder="00:00"
                />
              </div>
              <button
                type="button"
                className="search-btn"
                onClick={() => setShowAvailables(true)}
                title="Search Availables"
              >
                <FaSearch className="search-icon" aria-hidden="true" />
                Search Availables
              </button>
            </div>

            <div className="form-row wide-gap">
              <div className="form-group">
                <label>Driver Contact</label>
                <input
                  type="text"
                  name="driverContact"
                  value={formData.driverContact}
                  onChange={handleInputChange}
                  placeholder="Driver Contact"
                />
              </div>
              <div className="form-group">
                <label>Pickup & Destination</label>
                <input
                  type="text"
                  name="pickupDestination"
                  value={formData.pickupDestination}
                  onChange={handleInputChange}
                  placeholder="Pickup & Destination"
                />
              </div>
            </div>

            <div className="form-row wide-gap">
              <div className="form-group">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleInputChange}
                  placeholder="Vehicle ID"
                />
              </div>
              <div className="form-group">
                <label>Driver Name</label>
                <input
                  type="text"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleInputChange}
                  placeholder="Driver name"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="Enter trip purpose"
              />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ maxWidth: 200 }}>
                <label>Vehicle Type</label>
                <div className="select-wrapper">
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                  >
                    <option>Car</option>
                    <option>Van</option>
                    <option>Bus</option>
                    <option>SUV</option>
                  </select>
                  <span className="arrow-down">▾</span>
                </div>
              </div>
              <div className="form-group" style={{ maxWidth: 200 }}>
                <label>Number of Passengers</label>
                <input
                  type="number"
                  name="noOfPassengers"
                  value={formData.noOfPassengers}
                  onChange={handleInputChange}
                  min={1}
                />
              </div>
            </div>

            {message && (
              <div
                className={`message ${message.includes("Error") ? "error" : "success"}`}
                style={{
                  padding: "12px",
                  marginBottom: "12px",
                  borderRadius: "4px",
                  backgroundColor: message.includes("Error")
                    ? "#f8d7da"
                    : "#d4edda",
                  color: message.includes("Error") ? "#721c24" : "#155724",
                }}
              >
                {message}
              </div>
            )}

            <div className="form-actions">
              <button
                className="submit-btn"
                type="button"
                onClick={saveVehicleRequest}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </section>

          {/* Right: Availables - appears only after search */}
          {showAvailables && (
            <section className="availables-container">
              <div className="tabs-section">
                <div className="tabs-header">
                  <h3>Availables</h3>
                  <FaBars className="menu-icon" aria-hidden="true" />
                </div>
                <div className="tabs-list">
                  <div
                    className={`tab-item ${activeTab === "drivers" ? "active" : ""}`}
                    onClick={() => setActiveTab("drivers")}
                  >
                    <FaUser className="tab-icon" aria-hidden="true" />
                    <font color="black">Drivers</font>
                  </div>
                  <div
                    className={`tab-item ${activeTab === "vehicles" ? "active" : ""}`}
                    onClick={() => setActiveTab("vehicles")}
                  >
                    <FaCar className="tab-icon" aria-hidden="true" />
                    <font color="black">Vehicles</font>
                  </div>
                </div>
              </div>

              <div className="content-section">
                {activeTab === "drivers" && (
                  <>
                    <div className="content-title">Drivers</div>
                    <div className="content-subtitle">Driver Name</div>
                    <div className="items-list">
                      {driverNames.map((name) => (
                        <div className="list-item" key={name}>
                          {name}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === "vehicles" && (
                  <>
                    <div className="content-title">Vehicles</div>
                    <div className="content-subtitle">Vehicle ID</div>
                    <div className="items-list">
                      {vehicleIds.map((id) => (
                        <div className="list-item" key={id}>
                          {id}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
