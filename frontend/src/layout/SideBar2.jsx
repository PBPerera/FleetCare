import React, { useState } from "react";
import Logo from "../assets/logo-small.png";

import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import {
  FaTachometerAlt,
  FaCar,
  FaUser,
  
  FaSearch,
  
  
} from "react-icons/fa";
import "./SideBar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo" onClick={toggleSidebar}>
        <img
          src={Logo}
          alt="logo"
          className="logo-icon"
        />
        {!collapsed && <span className="logo-text">FleetCare</span>}
      </div>

      <ul className="menu">
        <li className="active">
          <MdDashboard className="icon" />
          {!collapsed && <span>Dashboard</span>}
        </li>
        <li>
          <MdPeople className="icon" />
          {!collapsed && <span>User Management</span>}
        </li>
        <li>
          <MdDirectionsCar className="icon" />
          {!collapsed && <span>Vehicle Management</span>}
        </li>
        <li>
          <FaUserTie className="icon" />
          {!collapsed && <span>Driver Management</span>}
        </li>
        <li>
          <MdSchedule className="icon" />
          {!collapsed && <span>Trip Scheduling</span>}
        </li>
        <li>
          <FaClipboardList className="icon" />
          {!collapsed && <span>Trip Allocation</span>}
        </li>
        
        <li>
          <FaTools className="icon" />
          {!collapsed && <span>Maintenance Management</span>}
        </li>
        <li>
          <HiOutlineDocumentReport className="icon" />
          {!collapsed && <span>Reporting And Analytics</span>}
        </li>
        <li>
          <FaBell className="icon" />
          {!collapsed && <span>Notification Management </span>}
        </li>
        <li>
          <RiUserSettingsLine className="icon" />
          {!collapsed && <span>Audit Log</span>}
        </li>
      </ul>

      <div className="logout">
        <FaSignOutAlt className="icon" />
        {!collapsed && <span>Log out</span>}
      </div>
    </div>
  );
}