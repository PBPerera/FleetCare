import React from "react";
import { useNavigate } from "react-router-dom";

export default function Onboard() {
  const navigate = useNavigate();
  return (
    <div style={{padding:40}}>
      <h1>Welcome to FleetCare Onboard</h1>
      <p>This is the onboard screen. (Image placeholders shown in your upload)</p>
      <div style={{display:'flex', gap:10}}>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
        <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
      </div>
      <p style={{marginTop:20}}>Click <strong>Login</strong> to go to the login screen. From login you can go to Signup or Forgot Password. After a successful login you'll be taken to the Dashboard.</p>
    </div>
  );
}
