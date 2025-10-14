
import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { Routes, Route, Link } from 'react-router-dom'
import AdminHome from '../pages/AdminHome'
import Vehicle from '../pages/Vehicle'
import Users from '../pages/Users'
import Drivers from '../pages/Drivers'
import Trips from '../pages/Trips'
import Maintenance from '../pages/Maintenance'

export default function AdminLayout(){
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="shell">
      <Sidebar role="admin" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="content card">
        <div className="topbar">
          <div className="kv"><strong>Admin Dashboard</strong></div>
          <div className="kv"><Link to="/login">Sign out</Link></div>
        </div>
        <Routes>
          <Route path="/" element={<AdminHome/>} />
          <Route path="vehicle" element={<Vehicle/>} />
          <Route path="users" element={<Users/>} />
          <Route path="drivers" element={<Drivers/>} />
          <Route path="trips" element={<Trips/>} />
          <Route path="maintenance" element={<Maintenance/>} />
        </Routes>
      </div>
    </div>
  )
}
