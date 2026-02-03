import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
import { addVehicle } from "../api";
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
        const response = await fetch('http://localhost:5000/api/vehicle');
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
          status: vehicle.status || 'Available'
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
    const available = vehicles.filter((v) => v.status === "Available").length;
    const assigned = vehicles.filter((v) => v.status === "Assigned").length;
    const maintenance = vehicles.filter((v) => v.status === "Maintenance").length;
    return [
      { title: "Total", count: total, subtitle: "All vehicles", icon: "🚗" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "Assigned", count: assigned, subtitle: "In use", icon: "📌" },
      { title: "Maintenance", count: maintenance, subtitle: "In service", icon: "🛠️" },
    ];
  }, [vehicles]);

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
      { key: "status", label: "Status" },
      {
        key: "actions",
        label: "Actions",
        render: (row, onAction) => (
          <div className="action-buttons">
            <button className="action-btn approve" onClick={() => onAction("details", row)}>
              Details
            </button>
            <button className="action-btn" onClick={() => onAction("service", row)}>
              Service
            </button>
            <button className="action-btn reject" onClick={() => onAction("delete", row)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // ===== Filters (kept simple; match Maintenance UX with SearchBar present) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

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

      return inQuery && byStatus && byType;
    });
  }, [vehicles, keyword, statusFilter, typeFilter]);

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
    };
    setVehicles((prev) => [newRow, ...prev]);
  };

  const handleEdit = async (id, updated) => {
    try {
      // Check if vehicle exists in current data (means it's an edit)
      const existingVehicle = vehicles.find(v => v.id === id);
      const isEdit = existingVehicle && existingVehicle.vehicleId;
      
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
        status: updated.status || 'Available'
      };
      
      let response;
      if (isEdit) {
        // PUT for existing vehicle
        response = await fetch(`http://localhost:5000/api/vehicle/${existingVehicle.vehicleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // POST for new vehicle
        response = await fetch('http://localhost:5000/api/vehicle', {
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
          const response = await fetch(`http://localhost:5000/api/vehicle/${row.vehicleId}`, {
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
        <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <Cards data={dashboardCards} />

          {/* Vehicles section (mirrors Maintenance section structure) */}
          <h2 className="section-title">Vehicles</h2>

          {/* Helper bar (kept for visual parity; you can wire date logic later) */}
          <SearchBar onFilterChange={() => {}} filterLabel="Insurance Expiry" />

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
