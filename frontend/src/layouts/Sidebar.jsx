
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const itemsAdmin = [
  {to:'/admin', label:'Dashboard', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"/></svg>},
  {to:'/vehicle', label:'Vehicles', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M5 11h14l1 3H4l1-3zm0 6h14v2H5v-2zM6 6h12v3H6V6z"/></svg>},
  {to:'/drivers', label:'Drivers', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"/></svg>},
  {to:'/trips', label:'Trips', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>},
  {to:'/maintenance', label:'Maintenance', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 13.35l-2.45-2.45-1.9 1.9-3.3-3.3 1.9-1.9L10.65 2.3 8.3 4.65l3.3 3.3-1.9 1.9 3.3 3.3 1.9-1.9 2.45 2.45 3.35-3.35z"/></svg>},
  {to:'/users', label:'Users', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM6 11c1.7 0 3-1.3 3-3S7.7 5 6 5 3 6.3 3 8s1.3 3 3 3zm0 2c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z"/></svg>},
]

const itemsStaff = [
  {to:'/staff', label:'Dashboard', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"/></svg>},
  {to:'/trips', label:'Trips', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>},
  {to:'/maintenance', label:'Maintenance', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 13.35l-2.45-2.45-1.9 1.9-3.3-3.3 1.9-1.9L10.65 2.3 8.3 4.65l3.3 3.3-1.9 1.9 3.3 3.3 1.9-1.9 2.45 2.45 3.35-3.35z"/></svg>},
  {to:'/drivers', label:'Drivers', icon: <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"/></svg>},
]

export default function Sidebar({role='admin',collapsed, setCollapsed}){
  const navigate = useNavigate()
  const items = role==='admin' ? itemsAdmin : itemsStaff
  return (
    <div className={"sidebar" + (collapsed? ' collapsed':'')}>
      <div className="logo">
        <div style={{width:36,height:36,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',borderRadius:8}}/>
        <div className="title">FleetCare</div>
        <div style={{marginLeft:'auto'}}>
          <button className="toggle-btn" onClick={()=>setCollapsed(!collapsed)} aria-label="toggle sidebar">☰</button>
        </div>
      </div>
      <div className="menu">
        {items.map(i=>(
          <NavLink key={i.to} to={i.to} className={({isActive})=> 'menu-item' + (isActive? ' active':'')}>
            <div>{i.icon}</div>
            <div className="label">{i.label}</div>
          </NavLink>
        ))}
      </div>
      <div className="footer">Signed in as <strong style={{color:'white'}}>User</strong></div>
    </div>
  )
}
