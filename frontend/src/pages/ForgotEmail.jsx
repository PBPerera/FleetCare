
import React from 'react'
import { Link } from 'react-router-dom'
export default function ForgotEmail(){
  return (
    <div className="centered">
      <div className="card form">
        <h2>Find your account</h2>
        <p style={{color:'var(--muted)'}}>Enter the email associated with your account. We'll send an OTP.</p>
        <div className="input"><label>Email</label><input placeholder="you@example.com"/></div>
        <div style={{display:'flex',gap:8}}>
          <Link to="/otp"><button className="btn">Send OTP</button></Link>
          <Link to="/login"><button className="btn" style={{background:'#0ea5a4'}}>Back</button></Link>
        </div>
      </div>
    </div>
  )
}
