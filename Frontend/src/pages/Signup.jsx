// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import logo from "../assets/logo-small.png";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nic: "",
    department: "",
    role: "Staff",
    employeeId: "",
    designation: "",
    username: "",
    password: "",
    confirm: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }
    // TODO: replace with real signup API call
    navigate("/login");
  };

  return (
    <div className="su-wrap">
      <TopBar />

      <main className="su-center">
        <section className="su-card">
          <header className="su-header">
            <h1>Create Account</h1>
            <p>Sign up for Admin/Staff access</p>
          </header>

          {/* Scrollable form body */}
          <form className="su-body" onSubmit={handleSubmit}>
            <div className="su-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                className="su-input"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={update}
                required
              />
            </div>

            <div className="su-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="su-input"
                placeholder="Enter your email"
                value={form.email}
                onChange={update}
                required
              />
            </div>

            <div className="su-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                className="su-input"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={update}
                pattern="^[0-9+\-\s()]{7,}$"
                required
              />
            </div>

            <div className="su-field">
              <label htmlFor="nic">NIC</label>
              <input
                id="nic"
                name="nic"
                className="su-input"
                placeholder="Enter your NIC"
                value={form.nic}
                onChange={update}
                required
              />
            </div>

            <div className="su-field">
              <label htmlFor="department">Department / Unit</label>
              <select
                id="department"
                name="department"
                className="su-input su-select"
                value={form.department}
                onChange={update}
                required
              >
                <option value="" disabled>
                  Select your department
                </option>
                <option>Administration</option>
                <option>Logistics</option>
                <option>Maintenance</option>
                <option>Procurement</option>
                <option>Emergency Services</option>
              </select>
            </div>

            <div className="su-field">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                className="su-input su-select"
                value={form.role}
                onChange={update}
              >
                <option>Staff</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Inserted between role and password */}
            <div className="su-field">
              <label htmlFor="employeeId">Employee ID</label>
              <input
                id="employeeId"
                name="employeeId"
                className="su-input"
                placeholder="Enter Employee ID"
                value={form.employeeId}
                onChange={update}
              />
            </div>

            <div className="su-field">
              <label htmlFor="designation">Designation</label>
              <input
                id="designation"
                name="designation"
                className="su-input"
                placeholder="Enter your designation"
                value={form.designation}
                onChange={update}
              />
            </div>

            <div className="su-field">
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                name="username"
                className="su-input"
                placeholder="Enter user name"
                value={form.username}
                onChange={update}
                required
              />
            </div>

            <div className="su-field">
              <label htmlFor="password">Password</label>
              <div className="su-input-pwd">
                <input
                  id="password"
                  name="password"
                  className="su-input"
                  placeholder="Create a password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={update}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="su-eye"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {!showPwd ? (
                    // eye-off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M10.6 10.6A3.2 3.2 0 0012 15.2a3.2 3.2 0 003.2-3.2c0-.6-.16-1.16-.44-1.64" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M21.97 12S18.3 5 12 5c-1.15 0-2.22.2-3.2.56M5.2 7.4C3.5 9 2.4 11 2.4 12c0 0 3.7 7 9.6 7 1.2 0 2.3-.2 3.3-.57" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ) : (
                    // eye
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="su-field">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="su-input-pwd">
                <input
                  id="confirm"
                  name="confirm"
                  className="su-input"
                  placeholder="Re-enter your password"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={update}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="su-eye"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {!showConfirm ? (
                    // eye-off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M10.6 10.6A3.2 3.2 0 0012 15.2a3.2 3.2 0 003.2-3.2c0-.6-.16-1.16-.44-1.64" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M21.97 12S18.3 5 12 5c-1.15 0-2.22.2-3.2.56M5.2 7.4C3.5 9 2.4 11 2.4 12c0 0 3.7 7 9.6 7 1.2 0 2.3-.2 3.3-.57" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ) : (
                    // eye
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Sticky bottom actions like the mock */}
          <footer className="su-footer">
            <button type="submit" form="noop" className="su-hidden" />
            <button className="su-btn" onClick={handleSubmit}>
              Create Account
            </button>
            <div className="su-login">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </footer>
        </section>
      </main>

      {/* Styles */}
      <style>{`
        :root{
          --ink:#0f172a;
          --muted:#6b7280;
          --panel:#ffffff;
          --cardShadow: 0 12px 30px rgba(15,23,42,.12);
          --radius:18px;
          --inputBorder:#e5e7eb;
          --inputBg:#f8fafc;
          --brand1:#4b3cff;
          --brand2:#3cb4ff;

          /* colors shared with Login top bar */
          --blueBar:#66a7ff;
          --blueBar2:#5e9dfc;
        }

        *{box-sizing:border-box}
        html,body,#root{height:100%}
        body{margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial; color:var(--ink)}

        /* Top bar (same styles as Login) */
        .lp-appbar{background:linear-gradient(180deg, var(--blueBar), var(--blueBar2)); box-shadow:0 2px 6px rgba(0,0,0,.08)}
        .lp-appbar-inner{max-width:1200px; margin:0 auto; padding:12px 22px; display:flex; align-items:center}
        .lp-brand{display:flex; align-items:left; gap:10px}
        .lp-logo{width:36px; height:36px; object-fit:contain}
        .lp-brand-text{font-weight:800; letter-spacing:.2px; font-size:18px}

        .su-wrap{
          min-height:100vh;
          background: radial-gradient(1200px 600px at 50% -10%, #eef6ff 0%, #f6fbff 30%, #ffffff 60%);
          display:grid; place-items:start center;
        }

        .su-center{width:100%; padding:40px 16px}
        .su-card{
          margin:0 auto;
          width:min(880px, 100%);
          background:var(--panel);
          border-radius:var(--radius);
          box-shadow:var(--cardShadow);
          display:grid; grid-template-rows: auto minmax(320px, 1fr) auto;
          overflow:hidden;
          border:1px solid #eef2f7;
        }

        .su-header{padding:28px 28px 10px; text-align:center}
        .su-header h1{margin:0; font-size: clamp(22px, 3vw, 30px)}
        .su-header p{margin:6px 0 0; color:var(--muted)}

        .su-body{
          display:flex; flex-direction:column;
          padding: 18px 28px 0;
          overflow:auto;
          max-height: 52vh;
        }

        .su-field{display:flex; flex-direction:column; gap:8px; margin:14px 0}
        .su-field label{font-weight:700; font-size:14px; display:flex; gap:4px; justify-content:left}
        .su-input{
          width:100%;
          padding:12px 14px;
          border-radius:12px;
          border:1px solid var(--inputBorder);
          background:#f9fafb;
          outline:none; font-size:15px;
        }
        .su-input:focus{border-color:#c7d7ff; background:#fff}
        .su-select{appearance:none; background-image: linear-gradient(45deg, transparent 50%, #94a3b8 50%), linear-gradient(135deg, #94a3b8 50%, transparent 50%); background-position: calc(100% - 18px) 16px, calc(100% - 13px) 16px; background-size:5px 5px,5px 5px; background-repeat:no-repeat;}

        .su-input-pwd{position:relative; display:flex; align-items:center}
        .su-eye{
          position:absolute; right:10px; width:34px; height:34px;
          display:grid; place-items:center; border:0; background:transparent; cursor:pointer;
          color:#94a3b8; font-size:18px;
        }

        .su-footer{
          padding:18px 20px 24px;
          border-top:1px solid #eef2f7;
          display:grid; gap:10px; justify-items:center;
        }
        .su-btn{
          width:min(780px, 100%);
          border:0; cursor:pointer; border-radius:12px; padding:14px 18px;
          color:#fff; font-weight:800; letter-spacing:.2px;
          background:linear-gradient(90deg, var(--brand1), var(--brand2));
          box-shadow:0 10px 22px rgba(60,120,255,.25);
        }
        .su-btn:hover{filter:brightness(.98)}
        .su-login{color:var(--muted)}
        .su-login a{color:#3277ff; text-decoration:underline}

        .su-hidden{display:none}

        @media (max-width: 560px){
          .su-header{padding:22px 18px 4px}
          .su-body{padding:12px 18px 0; max-height: 56vh}
          .su-footer{padding:14px 16px 20px}
        }
      `}</style>
    </div>
  );
}
