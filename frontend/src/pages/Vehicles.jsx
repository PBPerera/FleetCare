import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfileMenu from "../components/UserProfileMenu";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import { addVehicle } from "../api";
import { apiUrl } from "../lib/apiBase";
import "./Pages.css";

export default function Vehicles() {
  const navigate = useNavigate();

  // Sidebar/header UI
  const [collapsed, setCollapsed] = useState(false);

  // map sidebar item → route (kept identical to MaintenanceManagement.jsx)
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
  const [vehicles, setVehicles] = useState([]);

  // Load vehicles from backend on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(apiUrl("/vehicle"));
        const data = await response.json();
        console.log('Loaded vehicles:', data);
        
        // Map backend data to frontend format
        const mappedVehicles = data.vehicles?.map(vehicle => ({
          id: vehicle._id,
          vehicleId: vehicle.vehicle_id,
          type: vehicle.type,
          wheelSerial: vehicle.wheel_serial,
          wheelSize: vehicle.wheel_size,
          engineNo: vehicle.engine_no,
          batteryNo: vehicle.battery_serial,
          chassisNo: vehicle.chassis_no,
          registerdate: vehicle.register_date,
          insurancerenewaldate: vehicle.insurance_renewal_date,
          insuranceExpiry: vehicle.insurance_expiry,
          status: vehicle.status || 'Available',
          tripStatus: vehicle.tripStatus || 'Available for Trip',
          tripDate: vehicle.tripDate || null,
          tripTime: vehicle.tripTime || ''
        })) || [];
        
        setVehicles(mappedVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      }
    };
    
    fetchVehicles();
  }, []);

  // ===== Cards / metrics (same style as Maintenance) =====
  const dashboardCards = useMemo(() => {
    const total = vehicles.length;
    const available = vehicles.filter((v) => v.status === "Available" || v.status === "Active").length;
    const assigned = vehicles.filter((v) => v.status === "In Use").length;
    return [
      { title: "Total", count: total, subtitle: "All vehicles", icon: "🚗" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "Assigned", count: assigned, subtitle: "Assigned trips", icon: "📌" },
    ];
  }, [vehicles]);


  // Trip Status is picked straight from the table (no need to enter row
  // edit mode) - selecting it saves immediately. Picking "Available for
  // Trip" also clears the trip date/time it was holding.
  const handleTripStatusChange = async (row, newStatus) => {
    const isAvailableForTrip = newStatus === 'Available for Trip';
    try {
      const response = await fetch(apiUrl(`/vehicle/${row.vehicleId}`), {
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

      setVehicles((prev) =>
        prev.map((v) =>
          v.id === row.id
            ? {
                ...v,
                tripStatus: newStatus,
                tripDate: isAvailableForTrip ? null : v.tripDate,
                tripTime: isAvailableForTrip ? '' : v.tripTime,
              }
            : v
        )
      );
    } catch (error) {
      console.error('Error updating trip status:', error);
      alert('Error updating trip status: ' + error.message);
    }
  };

  // ===== Table columns (unique keys; with Actions like in repairs table) =====
  const columns = useMemo(
    () => [
      { key: "vehicleId", label: "Vehicle ID" },
      { key: "type", label: "Vehicle Type" },
      { key: "wheelSerial", label: "Wheel Serial No" },
      { key: "wheelSize", label: "Wheel Size" },
      { key: "engineNo", label: "Engine No" },
      { key: "batteryNo", label: "Battery No" },
      { key: "chassisNo", label: "Chassis No" },
      { key: "registerdate", label: "Register Date" },
      { key: "insurancerenewaldate", label: "Insurance Renewal Date" },
      { key: "insuranceExpiry", label: "Insurance Expiry" },
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

  // ===== Filters (kept simple; match Maintenance UX with SearchBar present) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [insuranceExpiryFilter, setInsuranceExpiryFilter] = useState("");

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return vehicles.filter((v) => {
      const inQuery =
        !q ||
        [
          v.vehicleId,
          v.type,
          v.wheelSerial,
          v.wheelSize,
          v.engineNo,
          v.batteryNo,
          v.chassisNo,
          v.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const byStatus = statusFilter === "All" ? true : v.status === statusFilter;
      const byType = typeFilter === "All" ? true : v.type === typeFilter;
      const byInsuranceExpiry =
        !insuranceExpiryFilter || isSameCalendarDate(v.insuranceExpiry, insuranceExpiryFilter);

      return inQuery && byStatus && byType && byInsuranceExpiry;
    });
  }, [vehicles, keyword, statusFilter, typeFilter, insuranceExpiryFilter]);

  // ===== CRUD handlers (compatible with your TableRow onEdit(row.id, updated)) =====
  const handleAddVehicle = () => {
    const newRow = {
      id: Date.now(),       // internal identifier used by TableRow
      vehicleId: "",        // empty so new row opens in edit mode automatically
      type: "",
      wheelSerial: "",
      wheelSize: "",
      engineNo: "",
      batteryNo: "",
      chassisNo: "",
      registerdate: "",
      insurancerenewaldate: "",
      insuranceExpiry: "",
      status: "Available",
      tripStatus: "Available for Trip",
    };
    setVehicles((prev) => [newRow, ...prev]);
  };

  const handleEdit = async (id, updated) => {
    try {
      // Check if vehicle exists in current data (means it's an edit)
      const existingVehicle = vehicles.find(v => v.id === id);
      const isEdit = existingVehicle && existingVehicle.vehicleId;

      // Manually marking a vehicle "Available for Trip" again also clears
      // the trip date/time it was holding - it's no longer tied to that trip.
      const tripStatus = updated.tripStatus || 'Available for Trip';
      const isAvailableForTrip = tripStatus === 'Available for Trip';

      // Map frontend fields to backend schema
      const payload = {
        vehicle_id: updated.vehicleId,
        type: updated.type,
        wheel_serial: updated.wheelSerial,
        wheel_size: updated.wheelSize,
        engine_no: updated.engineNo,
        battery_serial: updated.batteryNo,
        chassis_no: updated.chassisNo,
        register_date: updated.registerdate,
        insurance_renewal_date: updated.insurancerenewaldate,
        insurance_expiry: updated.insuranceExpiry,
        capacity: updated.capacity || '5',
        fuel_average: updated.fuel_average || '15',
        tripStatus,
        tripDate: isAvailableForTrip ? null : (updated.tripDate || null),
        tripTime: isAvailableForTrip ? '' : (updated.tripTime || '')
      };
      
      let response;
      if (isEdit) {
        // PUT for existing vehicle
        response = await fetch(apiUrl(`/vehicle/${existingVehicle.vehicleId}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // POST for new vehicle
        response = await fetch(apiUrl("/vehicle"), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      const result = await response.json();
      
      if (response.ok) {
        alert(isEdit ? 'Vehicle updated successfully!' : 'Vehicle added successfully!');
        window.location.reload();
      } else {
        alert('Error: ' + (result.error || result.msg || 'Failed to save'));
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving vehicle: ' + error.message);
    }
  };

  const handleAction = async (action, row) => {
    if (action === "delete") {
      if (window.confirm('Are you sure you want to delete this vehicle?')) {
        try {
          const response = await fetch(apiUrl(`/vehicle/${row.vehicleId}`), {
            method: 'DELETE'
          });
          
          if (response.ok) {
            alert('Vehicle deleted successfully!');
            setVehicles((prev) => prev.filter((v) => v.id !== row.id));
          } else {
            const result = await response.json();
            alert('Error deleting vehicle: ' + (result.error || result.msg));
          }
        } catch (error) {
          console.error('Delete error:', error);
          alert('Error deleting vehicle: ' + error.message);
        }
      }
    }
    if (action === "details") {
      navigate("/vehicles/details", { state: { vehicle: row } });
    }
    if (action === "service") {
      navigate("/maintenance", { state: { vehicleId: row.vehicleId } });
    }
  };

  return (
    <div className={`ad-shell ${collapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        active="Vehicle Management"
        onNavigate={(label) => navigate(routeMap[label] || "/admindashboard")}
        onLogout={() => (window.location.href = "/login")}
      />

      {/* Main */}
      <main className="ad-main">
        {/* Top Header (same pattern as Maintenance) */}
        <header className="sd-header">
          <button
            className="sd-toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <span className="sd-burger" />
          </button>

        <div className="sd-header-title">Vehicle Management</div>
        <div className="sd-header-right" style={{ marginLeft: "auto" }}>
          <UserProfileMenu />
        </div>
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <Cards data={dashboardCards} />

          {/* Vehicles section (mirrors Maintenance section structure) */}
          <h2 className="section-title">Vehicles</h2>

          {/* Search by Vehicle ID + filter by Insurance Expiry date */}
          <SearchBar
            onFilterChange={(f) => {
              setKeyword(f.vehicleId);
              setInsuranceExpiryFilter(f.filterValue);
            }}
            filterLabel="Insurance Expiry"
            searchPlaceholder="Search by Vehicle ID"
          />

          {/* Action bar: export + add button (same layout as Maintenance) */}
          {/* <div className="action-bar">
            <ExportPdfBtn data={filtered} filename="vehicles" />
            <Button variant="primary" onClick={handleAddVehicle}>+ Add Vehicle</Button>
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

// Shows the trip date + time a vehicle is currently held for, or a dash
// once it's back to "Available for Trip".
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
