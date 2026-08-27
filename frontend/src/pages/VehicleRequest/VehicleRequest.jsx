import { React, useState, useEffect } from "react";
import StaffSidebar from "../../components/StaffSidebar";
import UserProfileMenu from "../../components/UserProfileMenu";
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
import { apiUrl } from "../../lib/apiBase";

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
  const [lastRequestNumber, setLastRequestNumber] = useState(0);

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
  const [vehicleIds, setVehicleIds] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);

  // Full driver/vehicle lists as last fetched from the backend, plus every
  // currently-active (Approved, not yet completed/rejected) trip. A vehicle
  // or driver can be booked again for a *different* date even while it's
  // still holding an earlier trip - a single vehicle/driver can have many
  // separate approved trips at once, each on its own date, without any of
  // the earlier ones needing to be "finished" first. So availability is
  // checked against every one of those trips, not just a single cached
  // "current trip" value.
  const [rawDrivers, setRawDrivers] = useState([]);
  const [rawVehicles, setRawVehicles] = useState([]);

  // Same calendar day? (ignores time-of-day, and tolerates either side
  // being a Date, an ISO string, or an "YYYY-MM-DD" input value.)
  const isSameDate = (a, b) => {
    if (!a || !b) return false;
    const da = new Date(a);
    const db = new Date(b);
    if (isNaN(da) || isNaN(db)) return false;
    return da.toISOString().slice(0, 10) === db.toISOString().slice(0, 10);
  };

  // Available for this date = it doesn't already have an active trip
  // booked on this exact date. This is driven entirely by the real Trip
  // records - the same source the Trip Status column on Vehicle/Driver
  // Management is built from - not the vehicle/driver's own legacy
  // status field (which never reliably tracks trip assignment and was
  // wrongly excluding vehicles/drivers that were actually free).
  // Being assigned to a trip on a *different* date is not a conflict.
  const isFreeForDate = (dateStr, trips, matchKey, idValue) => {
    if (!dateStr || !idValue) return true;
    return !trips.some(
      (trip) => String(trip[matchKey]) === String(idValue) && isSameDate(trip.tripDate, dateStr),
    );
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch(apiUrl("/driver"));
      const data = await response.json();

      const driversArray =
        data.Drivers || data.drivers || data.data ||
        (Array.isArray(data) ? data : []);

      setRawDrivers(driversArray || []);
      return driversArray || [];
    } catch (error) {
      console.error("Error fetching drivers:", error);
      return [];
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch(apiUrl("/vehicle"));
      const data = await response.json();

      const vehiclesArray =
        data.vehicles || data.Vehicles || data.data ||
        (Array.isArray(data) ? data : []);

      setRawVehicles(vehiclesArray || []);
      return vehiclesArray || [];
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }
  };

  // Every currently-active trip (Approved, not yet Completed/Rejected) -
  // this is the real record of who/what is booked on which date, across
  // however many separate trips a vehicle or driver is currently holding.
  const fetchActiveTrips = async () => {
    try {
      const response = await fetch(apiUrl("/trips?status=Approved"));
      const data = await response.json();
      const trips = data.data || (Array.isArray(data) ? data : []);
      return trips;
    } catch (error) {
      console.error("Error fetching active trips:", error);
      return [];
    }
  };

  // Recompute the two "available" lists for the given trip date from
  // whatever driver/vehicle/trip data is currently held.
  const refreshAvailability = (driversArray, vehiclesArray, tripsArray, dateStr) => {
    const availableDriversList = (driversArray || []).filter((driver) =>
      isFreeForDate(dateStr, tripsArray || [], "driverName", driver.name),
    );
    setAvailableDrivers(availableDriversList);
    setDriverNames(
      availableDriversList
        .map((driver) => driver.name || `${driver.firstName || ""} ${driver.lastName || ""}`.trim())
        .filter(Boolean),
    );

    const availableVehiclesList = (vehiclesArray || []).filter((vehicle) =>
      isFreeForDate(
        dateStr,
        tripsArray || [],
        "vehicleId",
        vehicle.vehicle_id ?? vehicle.vehicleId,
      ),
    );
    setAvailableVehicles(availableVehiclesList);
    setVehicleIds(
      availableVehiclesList
        .map((vehicle) => vehicle.vehicle_id || vehicle.vehicleId)
        .filter(Boolean),
    );
  };

  useEffect(() => {
    (async () => {
      const [drivers, vehicles, trips] = await Promise.all([
        fetchDrivers(),
        fetchVehicles(),
        fetchActiveTrips(),
      ]);
      refreshAvailability(drivers, vehicles, trips, formData.tripDate);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchLastRequestNumber = async () => {
      try {
        const response = await fetch(apiUrl("/vehicleRequests"));
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle requests");
        }

        const data = await response.json();
        const maxNumber = data.data.reduce((max, request) => {
          const match = /^R0*(\d+)$/i.exec(request.requestId || "");
          if (!match) return max;
          const num = parseInt(match[1], 10);
          return Number.isFinite(num) ? Math.max(max, num) : max;
        }, 0);

        setLastRequestNumber(maxNumber);
      } catch (error) {
        console.error("Error fetching last request number:", error);
      }
    };

    fetchLastRequestNumber();
  }, []);

  const formatRequestId = (number) => `R${String(number).padStart(4, "0")}`;

  // Generate next request ID
  const generateRequestId = () => {
    return formatRequestId(lastRequestNumber + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle driver selection
  const handleDriverSelect = (driverName) => {
    const selectedDriver = availableDrivers.find(
      (driver) => {
        const driverFullName = driver.name || `${driver.firstName || ""} ${driver.lastName || ""}`.trim();
        return driverFullName === driverName;
      }
    );

    if (selectedDriver) {
      setFormData((prev) => ({
        ...prev,
        driverName: driverName,
        driverContact: selectedDriver.phone_no || selectedDriver.phone || "",
      }));

      // Remove from available lists
      setAvailableDrivers((prev) => prev.filter(
        (driver) => {
          const driverFullName = driver.name || `${driver.firstName || ""} ${driver.lastName || ""}`.trim();
          return driverFullName !== driverName;
        }
      ));
      setDriverNames((prev) => prev.filter((name) => name !== driverName));
    }
  };

  // Handle vehicle selection
  const handleVehicleSelect = (vehicleId) => {
    setFormData((prev) => ({
      ...prev,
      vehicleId: vehicleId,
    }));

    // Remove from available lists
    setAvailableVehicles((prev) => prev.filter(
      (vehicle) => (vehicle.vehicle_id || vehicle.vehicleId) !== vehicleId
    ));
    setVehicleIds((prev) => prev.filter((id) => id !== vehicleId));
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
        apiUrl("/vehicleRequests"),
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
      setLastRequestNumber((prev) => prev + 1);

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
  const handleCancel = async () => {
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
    setShowAvailables(false);

    // Re-fetch availables to reset the lists (no date selected anymore)
    const [drivers, vehicles, trips] = await Promise.all([
      fetchDrivers(),
      fetchVehicles(),
      fetchActiveTrips(),
    ]);
    refreshAvailability(drivers, vehicles, trips, "");
  };

  // Handle "Search Availables" - re-filters drivers/vehicles for whichever
  // trip date is currently selected, so a vehicle/driver already booked on
  // a *different* day still shows up as a valid pick for this one. Active
  // trips are re-fetched fresh each time, since new bookings may have been
  // approved since the page loaded.
  const handleSearchAvailables = async () => {
    const trips = await fetchActiveTrips();
    refreshAvailability(rawDrivers, rawVehicles, trips, formData.tripDate);
    setShowAvailables(true);
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
          <div className="sd-header-right" style={{ marginLeft: "auto" }}>
            <UserProfileMenu />
          </div>
        </header>

        {/* Content area */}
        <div className="vr-ad-content">
          {/* <section className="sd-page-title">
            <h1>Vehicle Requests</h1>
          </section> */}

          <section className="vr-request-form-container">
            <div className="vr-section-title">Trip Date & Time</div>

            <div className="vr-form-row">
              <div className="vr-form-group" style={{ maxWidth: 200 }}>
                <input
                  type="date"
                  name="tripDate"
                  value={formData.tripDate}
                  onChange={handleInputChange}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="vr-form-group" style={{ maxWidth: 140 }}>
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
                className="vr-search-btn"
                onClick={handleSearchAvailables}
                title="Search Availables"
              >
                <FaSearch className="vr-search-icon" aria-hidden="true" />
                Search Availables
              </button>
            </div>

            <div className="vr-form-row wide-gap">
              <div className="vr-form-group">
                <label>Driver Contact</label>
                <input
                  type="text"
                  name="driverContact"
                  value={formData.driverContact}
                  onChange={handleInputChange}
                  placeholder="Driver Contact"
                />
              </div>
              <div className="vr-form-group">
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

            <div className="vr-form-row wide-gap">
              <div className="vr-form-group">
                <label>Vehicle ID</label>
                <input
                  type="text"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleInputChange}
                  placeholder="Vehicle ID"
                />
              </div>
              <div className="vr-form-group">
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

            <div className="vr-form-group">
              <label>Purpose</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="Enter trip purpose"
              />
            </div>

            <div className="vr-form-row">
              <div className="vr-form-group" style={{ maxWidth: 200 }}>
                <label>Vehicle Type</label>
                <div className="vr-select-wrapper">
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
                  <span className="vr-arrow-down">▾</span>
                </div>
              </div>
              <div className="vr-form-group" style={{ maxWidth: 200 }}>
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

            <div className="vr-form-actions">
              <button
                className="vr-submit-btn"
                type="button"
                onClick={saveVehicleRequest}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
              <button
                className="vr-cancel-btn"
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
            <section className="vr-availables-container">
              <div className="vr-tabs-section">
                <div className="vr-tabs-header">
                  <h3>Availables</h3>
                  <FaBars className="vr-menu-icon" aria-hidden="true" />
                </div>
                <div className="vr-tabs-list">
                  <div
                    className={`vr-tab-item ${activeTab === "drivers" ? "active" : ""}`}
                    onClick={() => setActiveTab("drivers")}
                  >
                    <FaUser className="vr-tab-icon" aria-hidden="true" />
                    <font color="black">Drivers</font>
                  </div>
                  <div
                    className={`vr-tab-item ${activeTab === "vehicles" ? "active" : ""}`}
                    onClick={() => setActiveTab("vehicles")}
                  >
                    <FaCar className="vr-tab-icon" aria-hidden="true" />
                    <font color="black">Vehicles</font>
                  </div>
                </div>
              </div>

              <div className="vr-content-section">
                {activeTab === "drivers" && (
                  <>
                    <div className="vr-content-title">Drivers</div>
                    <div className="vr-content-subtitle">Driver Name</div>
                    <div className="vr-items-list">
                      {driverNames.length > 0 ? driverNames.map((name, index) => (
                        <div
                          className="vr-list-item"
                          key={`${name}-${index}`}
                          onClick={() => handleDriverSelect(name)}
                          style={{ cursor: "pointer" }}
                        >
                          {name}
                        </div>
                      )) : (
                        <div className="vr-list-item" style={{ color: "#999" }}>
                          No available drivers
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === "vehicles" && (
                  <>
                    <div className="vr-content-title">Vehicles</div>
                    <div className="vr-content-subtitle">Vehicle ID</div>
                    <div className="vr-items-list">
                      {vehicleIds.map((id) => (
                        <div
                          className="vr-list-item"
                          key={id}
                          onClick={() => handleVehicleSelect(id)}
                          style={{ cursor: "pointer" }}
                        >
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
