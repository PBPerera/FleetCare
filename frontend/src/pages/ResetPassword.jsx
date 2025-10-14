
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function ResetPassword(){
  const nav = useNavigate()
  return (
    <div className="centered">
      <div className="card form">
        <h2>Reset password</h2>
        <div className="input"><label>New password</label><input/></div>
        <div className="input"><label>Confirm password</label><input/></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>nav('/login')}>Save & Sign in</button>
          <Link to="/login"><button className="btn" style={{background:'#0ea5a4'}}>Cancel</button></Link>
        </div>
      </div>
    </div>
  )
}
