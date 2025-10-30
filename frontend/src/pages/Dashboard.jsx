import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const navigate = useNavigate();
  return (
    <div style={{padding:40}}>
      <h1>Dashboard</h1>
      <p>This is the dashboard screen you see after a successful login.</p>
      <button onClick={() => navigate('/')}>Sign out (Back to Onboard)</button>
    </div>
  );
}
