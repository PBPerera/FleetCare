import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfileMenu from "../components/UserProfileMenu";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import { apiUrl } from "../lib/apiBase";
import "./Pages.css";

export default function DriverManagement() {
  const navigate = useNavigate();

  // sidebar/header state
  const [collapsed, setCollapsed] = useState(false);

  const routeMap = {
    Dashboard: "/admindashboard",
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

  // ===== Data (load from backend) =====
  const [drivers, setDrivers] = useState([]);

  // Load drivers from backend on component mount
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(apiUrl("/driver"));
        const data = await response.json();
        console.log('Raw API response:', data);
        console.log('Drivers array:', data.drivers);
        
        // Handle different response formats
        let driversArray = [];
        if (data.Drivers && Array.isArray(data.Drivers)) {
          driversArray = data.Drivers;
        } else if (data.drivers && Array.isArray(data.drivers)) {
          driversArray = data.drivers;
        } else if (Array.isArray(data)) {
          driversArray = data;
        }
        
        console.log('Processing drivers:', driversArray);
        
        // Map backend data to frontend format (matching database model)
        const mappedDrivers = driversArray.map(driver => {
          console.log('Mapping driver:', driver);
          return {
            id: driver._id,
            vehicleId: driver.nic_no || '', // Use nic_no as vehicleId for table logic
            driverId: driver.driver_id, // Store driver_id for API calls
            nic: driver.nic_no,
            name: driver.name,
            address: driver.address,
            email: driver.email,
            phone: driver.phone_no,
            licenseNo: driver.licenseNo,
            registerDate: driver.registerDate,
            licenseRenewalDate: driver.licenseRenewalDate,
            licenseExpiry: driver.licenseExpiryDate,
            healthAssessment: driver.healthAssessment,
            status: driver.status || 'Active',
            tripStatus: driver.tripStatus || 'Available for Trip',
            tripDate: driver.tripDate || null,
            tripTime: driver.tripTime || ''
          };
        });
        
        console.log('Mapped drivers:', mappedDrivers);
        setDrivers(mappedDrivers);
      } catch (error) {
        console.error('Error loading drivers:', error);
      }
    };
    
    fetchDrivers();
  }, []);

  // ===== Cards / metrics (same pattern as Vehicles/Maintenance) =====
  const dashboardCards = useMemo(() => {
    const total = drivers.length;
    const available = drivers.filter((d) => d.status === "Available" || d.status === "Active").length;
    // Driven by the Trip Status column (tripStatus), the same field the
    // table's Status dropdown edits - not the legacy status field, which
    // never reliably tracks trip assignment.
    const assigned = drivers.filter((d) => d.tripStatus === "Assigned").length;
    return [
      { title: "Total", count: total, subtitle: "All drivers", icon: "🧑‍✈️" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "Assigned", count: assigned, subtitle: "Currently on a trip", icon: "📌" },
    ];
  }, [drivers]);

  // Trip Status is picked straight from the table (no need to enter row
  // edit mode) - selecting it saves immediately. Picking "Available for
  // Trip" also clears the trip date/time they were held for.
  const handleTripStatusChange = async (row, newStatus) => {
    const isAvailableForTrip = newStatus === 'Available for Trip';
    try {
      const response = await fetch(apiUrl(`/driver/${row.driverId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripStatus: newStatus,
          tripDate: isAvailableForTrip ? null : row.tripDate,
          tripTime: isAvailableForTrip ? '' : row.tripTime,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert('Error updating status: ' + (result.error || result.msg || 'Failed to save'));
        return;
      }

      setDrivers((prev) =>
        prev.map((d) =>
          d.id === row.id
            ? {
                ...d,
                tripStatus: newStatus,
                tripDate: isAvailableForTrip ? null : d.tripDate,
                tripTime: isAvailableForTrip ? '' : d.tripTime,
              }
            : d
        )
      );
    } catch (error) {
      console.error('Error updating trip status:', error);
      alert('Error updating trip status: ' + error.message);
    }
  };

  // ===== Table columns (matching database model) =====
  const columns = useMemo(
    () => [
      { key: "nic", label: "NIC No" },
      { key: "name", label: "Name" },
      { key: "address", label: "Address" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone No" },
      { key: "licenseNo", label: "License No" },
      { key: "registerDate", label: "Register Date" },
      { key: "licenseRenewalDate", label: "License Renewal Date" },
      { key: "licenseExpiry", label: "License Expiry Date" },
      { key: "healthAssessment", label: "Health Assessment" },
      {
        key: "tripStatus",
        label: "Status",
        render: (row) => (
          <select
            className="editable-select wide-select"
            value={row.tripStatus || 'Available for Trip'}
            onChange={(e) => handleTripStatusChange(row, e.target.value)}
          >
            <option>Available for Trip</option>
            <option>Assigned</option>
          </select>
        ),
      },
      {
        key: "tripDateTime",
        label: "Trip Date & Time",
        render: (row) => (
          <span className="cell-content">{formatTripDateTime(row)}</span>
        ),
      },
    ],
    []
  );

  // ===== Filters (kept similar to your prior screen) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("Any"); // Any | Expiring Soon | Expired
  const [licenseExpiryDateFilter, setLicenseExpiryDateFilter] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    const soonMs = 1000 * 60 * 60 * 24 * 30; // 30 days

    return drivers.filter((d) => {
      const q = keyword.trim().toLowerCase();
      const inQuery =
        !q ||
        [d.nic, d.name, d.email, d.licenseNo, d.address, d.phone]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : d.status === statusFilter;

      const byLicense =
        licenseFilter === "Any"
          ? true
          : (() => {
              const exp = new Date(d.licenseExpiry);
              if (isNaN(exp)) return true;
              if (licenseFilter === "Expired") return exp < now;
              if (licenseFilter === "Expiring Soon") return exp >= now && exp - now <= soonMs;
              return true;
            })();

      const byLicenseExpiryDate =
        !licenseExpiryDateFilter || isSameCalendarDate(d.licenseExpiry, licenseExpiryDateFilter);

      return inQuery && byStatus && byLicense && byLicenseExpiryDate;
    });
  }, [drivers, keyword, statusFilter, licenseFilter, licenseExpiryDateFilter]);

  // ===== CRUD handlers (compatible with your TableRow onEdit signature) =====
  const handleAddDriver = () => {
    const newRow = {
      id: Date.now(),
      vehicleId: "", // empty -> new row opens in edit mode (per TableRow logic)
      nic: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      licenseNo: "",
      registerDate: "",
      licenseRenewalDate: "",
      licenseExpiry: "",
      healthAssessment: "",
      status: "Available",
      tripStatus: "Available for Trip",
    };
    setDrivers((prev) => [newRow, ...prev]);
  };

  const handleEdit = async (id, updated) => {
    try {
      // Check if driver exists in current data (means it's an edit)
      const existingDriver = drivers.find(d => d.id === id);
      const isEdit = existingDriver && existingDriver.driverId;

      // Manually marking a driver "Available for Trip" again also clears
      // the trip date/time they were held for - no longer tied to that trip.
      const tripStatus = updated.tripStatus || 'Available for Trip';
      const isAvailableForTrip = tripStatus === 'Available for Trip';

      // Map frontend fields to backend schema
      const payload = {
        driver_id: updated.nic, // Use nic as driver_id
        nic_no: updated.nic,
        name: updated.name,
        address: updated.address,
        email: updated.email,
        phone_no: updated.phone,
        licenseNo: updated.licenseNo,
        registerDate: updated.registerDate,
        licenseRenewalDate: updated.licenseRenewalDate,
        licenseExpiryDate: updated.licenseExpiry,
        healthAssessment: updated.healthAssessment || 'Pending',
        tripStatus,
        tripDate: isAvailableForTrip ? null : (updated.tripDate || null),
        tripTime: isAvailableForTrip ? '' : (updated.tripTime || '')
      };
      
      let response;
      if (isEdit) {
        // PUT for existing driver using driver_id
        response = await fetch(apiUrl(`/driver/${existingDriver.driverId}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // POST for new driver
          response = await fetch(apiUrl("/driver"), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      const result = await response.json();
      
      if (response.ok) {
        alert(isEdit ? 'Driver updated successfully!' : 'Driver added successfully!');
        window.location.reload();
      } else {
        alert('Error: ' + (result.error || result.msg || 'Failed to save'));
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving driver: ' + error.message);
    }
  };

  const handleAction = async (action, row) => {
    if (action === "delete") {
      if (window.confirm('Are you sure you want to delete this driver?')) {
        try {
          const response = await fetch(apiUrl(`/driver/${row.driverId}`), {
            method: 'DELETE'
          });
          
          if (response.ok) {
            alert('Driver deleted successfully!');
            setDrivers((prev) => prev.filter((d) => d.id !== row.id));
          } else {
            const result = await response.json();
            alert('Error deleting driver: ' + (result.error || result.msg));
          }
        } catch (error) {
          console.error('Delete error:', error);
          alert('Error deleting driver: ' + error.message);
        }
      }
    }
    if (action === "details") {
      navigate("/drivers/details", { state: { driver: row } });
    }
    if (action === "assign") {
      navigate("/trip-allocation", { state: { driverNic: row.nic } });
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Driver Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Top Header (same pattern as Vehicles/Maintenance) */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

          <div className="sd-header-title">Driver Management</div>
          <div className="sd-header-right" style={{ marginLeft: "auto" }}>
            <UserProfileMenu />
          </div>
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
               <Cards data={dashboardCards} />
          </div>


          {/* Section title */}
          <h2 className="section-title">Drivers</h2>

          {/* Search by Driver Name + filter by License Expiry date */}
          <SearchBar
            onFilterChange={(f) => {
              setKeyword(f.vehicleId);
              setLicenseExpiryDateFilter(f.filterValue);
            }}
            filterLabel="License Expiry"
            searchPlaceholder="Search by Driver Name"
          />

          {/* Action bar: export + add button (same layout as Maintenance/Vehicles) */}
          {/* <div className="action-bar">
            <ExportPdfBtn data={filtered} filename="drivers" />
            <Button variant="primary" onClick={handleAddDriver}>+ Add Driver</Button>
          </div> */}

          {/* Data table */}
          <Table
            columns={columns}
            rows={filtered}
            showCheckbox
            editable
            onEdit={handleEdit}
            onAction={handleAction}
          />
        </div>
      </main>
    </div>
  );
}

// Shows the trip date + time a driver is currently held for, or a dash
// once they're back to "Available for Trip".
function formatTripDateTime(row) {
  if (row.tripStatus !== 'Assigned' || !row.tripDate) return '-';
  const d = new Date(row.tripDate);
  const dateStr = isNaN(d)
    ? row.tripDate
    : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return row.tripTime ? `${dateStr} • ${row.tripTime}` : dateStr;
}

// Same calendar day? (ignores time-of-day, tolerates either side being a
// Date, an ISO string, or an "YYYY-MM-DD" <input type="date"> value.)
function isSameCalendarDate(a, b) {
  if (!a || !b) return false;
  const da = new Date(a);
  const db = new Date(b);
  if (isNaN(da) || isNaN(db)) return false;
  return da.toISOString().slice(0, 10) === db.toISOString().slice(0, 10);
}
