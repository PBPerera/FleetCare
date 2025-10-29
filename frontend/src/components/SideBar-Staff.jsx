import React, { useState } from "react";
import Logo from "../assets/logo-small.png";

import { FaUserCircle, FaSignOutAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdDirectionsCar, MdSchedule, MdInfoOutline, MdReport, MdNotifications,MdAssignment } from "react-icons/md";
import { FaUserTie, FaBell, FaTools, FaClipboardList } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import {
  FaTachometerAlt,
  FaCar,
  FaUser,
  
  FaSearch,
  
  
} from "react-icons/fa";
import "./SideBar-Staff.css";

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
          <MdDirectionsCar className="icon" />
          {!collapsed && <span>Vehicle Request</span>}
        </li>
        <li>
          <MdAssignment className="icon" />
          {!collapsed && <span>My Requests</span>}
        </li>
        <li>
          <MdDirectionsCar className="icon" />
          {!collapsed && <span>Vehicle Details</span>}
        </li>
        <li>
          <FaUserTie className="icon" />
          {!collapsed && <span>Driver Details</span>}
        </li>
        <li>
          <FaSearch className="icon" />
          {!collapsed && <span>Search and Reports</span>}
        </li>
        <li>
          <FaBell className="icon" />
          {!collapsed && <span>Notifications</span>}
        </li>
      </ul>

      <div className="logout">
        <FaSignOutAlt className="icon" />
        {!collapsed && <span>Log out</span>}
      </div>
    </div>
  );
}