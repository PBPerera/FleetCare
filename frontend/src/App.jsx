
import React, {useState} from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Onboard from './pages/Onboard'
import Login from './pages/Login'
import ForgotEmail from './pages/ForgotEmail'
import Otp from './pages/Otp'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'
import AdminLayout from './layouts/AdminLayout'
import StaffLayout from './layouts/StaffLayout'
import Vehicle from './pages/Vehicle'
import Users from './pages/Users'
import Drivers from './pages/Drivers'
import Trips from './pages/Trips'
import Maintenance from './pages/Maintenance'

export default function App(){
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Onboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-email" element={<ForgotEmail/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/admin/*" element={<AdminLayout/>} />
        <Route path="/staff/*" element={<StaffLayout/>} />

        {/* shared pages - can be nested under admin or staff via links */}
        <Route path="/vehicle" element={<Vehicle/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/drivers" element={<Drivers/>} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/maintenance" element={<Maintenance/>} />
      </Routes>
    </div>
  )
}
