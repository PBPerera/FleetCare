
import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { Routes, Route, Link } from 'react-router-dom'
import StaffHome from '../pages/StaffHome'
import Trips from '../pages/Trips'
import Maintenance from '../pages/Maintenance'
import Drivers from '../pages/Drivers'

export default function StaffLayout(){
  const [collapsed, setCollapsed] = useState(true)
  return (
    <div className="shell">
      <Sidebar role="staff" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="content card">
        <div className="topbar">
          <div className="kv"><strong>Staff Dashboard</strong></div>
          <div className="kv"><Link to="/login">Sign out</Link></div>
        </div>
        <Routes>
          <Route path="/" element={<StaffHome/>} />
          <Route path="trips" element={<Trips/>} />
          <Route path="maintenance" element={<Maintenance/>} />
          <Route path="drivers" element={<Drivers/>} />
        </Routes>
      </div>
    </div>
  )
}
