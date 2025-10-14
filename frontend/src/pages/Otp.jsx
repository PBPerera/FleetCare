
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Otp(){
  const [code,setCode]=useState('')
  const nav = useNavigate()
  return (
    <div className="centered">
      <div className="card form">
        <h2>Enter OTP</h2>
        <p style={{color:'var(--muted)'}}>A 6-digit code has been sent to your email.</p>
        <div className="input"><label>OTP</label><input value={code} onChange={e=>setCode(e.target.value)} placeholder="123456"/></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>nav('/reset-password')}>Verify</button>
          <Link to="/forgot-email"><button className="btn" style={{background:'#0ea5a4'}}>Back</button></Link>
        </div>
      </div>
    </div>
  )
}
