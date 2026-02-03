import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/DashboardCards/Cards.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Table from "../components/DataTable/Table.jsx";
import Button from "../components/Buttons/Button.jsx";
import ExportPdfBtn from "../components/ExportPdfBtn.jsx";
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
        const response = await fetch('http://localhost:5000/api/driver');
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
            status: driver.status || 'Active'
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
    const available = drivers.filter((d) => d.status === "Available").length;
    const onTrip = drivers.filter((d) => d.status === "On Trip").length;
    const offDuty = drivers.filter((d) => d.status === "Off Duty").length;
    return [
      { title: "Total", count: total, subtitle: "All drivers", icon: "🧑‍✈️" },
      { title: "Available", count: available, subtitle: "Free to assign", icon: "✅" },
      { title: "On Trip", count: onTrip, subtitle: "Active trips", icon: "📍" },
      { title: "Off Duty", count: offDuty, subtitle: "Resting", icon: "🌙" },
    ];
  }, [drivers]);

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
      { key: "status", label: "Status" },
      {
        key: "actions",
        label: "Actions",
        render: (row, onAction) => (
          <div className="action-buttons">
            <button className="action-btn approve" onClick={() => onAction("details", row)}>
              Details
            </button>
            <button className="action-btn" onClick={() => onAction("assign", row)}>
              Assign
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

  // ===== Filters (kept similar to your prior screen) =====
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("Any"); // Any | Expiring Soon | Expired

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

      return inQuery && byStatus && byLicense;
    });
  }, [drivers, keyword, statusFilter, licenseFilter]);

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
    };
    setDrivers((prev) => [newRow, ...prev]);
  };

  const handleEdit = async (id, updated) => {
    try {
      // Check if driver exists in current data (means it's an edit)
      const existingDriver = drivers.find(d => d.id === id);
      const isEdit = existingDriver && existingDriver.driverId;
      
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
        status: updated.status || 'Active'
      };
      
      let response;
      if (isEdit) {
        // PUT for existing driver using driver_id
        response = await fetch(`http://localhost:5000/api/driver/${existingDriver.driverId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // POST for new driver
        response = await fetch('http://localhost:5000/api/driver', {
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
          const response = await fetch(`http://localhost:5000/api/driver/${row.driverId}`, {
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
          <div className="sd-header-right" />
        </header>

        {/* Page content */}
        <div className="ad-content">
          {/* Cards */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
               <Cards data={dashboardCards} />
          </div>


          {/* Section title */}
          <h2 className="section-title">Drivers</h2>

          {/* (Optional) helper bar for parity with other pages */}
          <SearchBar onFilterChange={() => {}} filterLabel="License Expiry" />

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
