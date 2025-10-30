import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    // Mock create account action - go to login after creating.
    navigate("/login");
  };

  return (
    <div style={{minHeight: "100vh", background: "#fff"}}>
      <header className="fc-appbar">
        <div className="fc-appbar-inner">
          <div className="fc-brand">
            <div className="fc-logo" aria-hidden="true">🚗</div>
            <span>FleetCare</span>
          </div>
          <div className="fc-avatar" aria-label="profile" />
        </div>
      </header>

      <main style={{display:"flex", justifyContent:"center", padding: "36px 20px 80px"}}>
        <div style={{maxWidth:1100, width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
          {/* Card */}
          <div className="signup-large-card" role="region" aria-label="Create account card">
            <div className="signup-card-inner">
              <h2 className="signup-title">Create Account</h2>

              <form className="signup-form-scroll" onSubmit={handleCreate}>
                <div className="form-row">
                  <label>Full Name</label>
                  <input className="fc-input" placeholder="Full Name" required />
                </div>

                <div className="form-row">
                  <label>Email Address</label>
                  <input className="fc-input" placeholder="Email Address" type="email" required />
                </div>

                <div className="form-row">
                  <label>Phone Number</label>
                  <input className="fc-input" placeholder="Phone Number" required />
                </div>

                <div className="form-row">
                  <label>NIC</label>
                  <input className="fc-input" placeholder="NIC" required />
                </div>

                <div className="form-row">
                  <label>Department / Unit</label>
                  <input className="fc-input" placeholder="Department / Unit" required />
                </div>

 

<label>Employee ID</label>
<input className="fc-input" placeholder="Employee ID" required />

<label>Designation</label>
<input className="fc-input" placeholder="Designation" required />

<label>User Name</label>
<input className="fc-input" placeholder="User Name" required />

<label>Password</label>
<input
  className="fc-input"
  placeholder="Password"
  type="password"
  required
/>

<label>Confirm Password</label>
<input
  className="fc-input"
  placeholder="Confirm Password"
  type="password"
  required
/>


                {/* Add extra space so scrollbar appears like screenshot */}
                <div style={{height:36}} />
              </form>
            </div>
          </div>

          {/* Centered button under the card */}
          <div style={{marginTop:30}}>
            <button className="fc-btn-primary" onClick={handleCreate}>Create Account</button>
          </div>
        </div>
      </main>
    </div>
  );
}
