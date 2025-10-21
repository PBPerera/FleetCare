import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const nav = useNavigate?.() ?? (() => {});
  const [form, setForm] = useState({
    employeeId: "",
    designation: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    phone: "",
    nic: "",
    department: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function toggleShow(which) {
    if (which === "pwd") setShowPwd((s) => !s);
    else setShowConfirm((s) => !s);
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    // basic validation
    if (!form.username || !form.password) {
      alert("Please enter username and password.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Demo behaviour: pretend to call API then redirect to login
    setTimeout(() => {
      setLoading(false);
      alert("Account created (demo). Please login.");
      try { nav("/login"); } catch (err) {}
    }, 900);
  }

  return (
    <div className="signup-root">
      <div className="lc-topbar">
        <div className="lc-brand">
          <div className="lc-logo" />
          <div className="lc-brand-text">FleetCare</div>
        </div>
        <div className="lc-user-circle" />
      </div>

      <main className="signup-main">
        <div className="signup-card-wrapper">
          <form className="signup-card" onSubmit={handleSubmit}>
            <h2 className="signup-title">Create Account</h2>


{/* Additional personal info */}
            <div className="signup-field">
              <label>Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div className="signup-field">
              <label>Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                type="email"
                placeholder="Email address"
              />
            </div>

            <div className="signup-field">
              <label>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Phone number"
              />
            </div>

            <div className="signup-field">
              <label>NIC</label>
              <input
                name="nic"
                value={form.nic}
                onChange={(e) => updateField("nic", e.target.value)}
                placeholder="NIC"
              />
            </div>

            <div className="signup-field">
              <label>Department / Unit</label>
              <input
                name="department"
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="Department / Unit"
              />
            </div>
            {/* Row 1: employee fields */}
            <div className="signup-field">
              <label>Employee ID</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={(e) => updateField("employeeId", e.target.value)}
                placeholder="Employee ID"
              />
            </div>

            <div className="signup-field">
              <label>Designation</label>
              <input
                name="designation"
                value={form.designation}
                onChange={(e) => updateField("designation", e.target.value)}
                placeholder="Designation"
              />
            </div>

            <div className="signup-field">
              <label>User Name</label>
              <input
                name="username"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                placeholder="User Name"
                required
              />
            </div>

            {/* Password with toggle */}
            <div className="signup-field" style={{ position: "relative" }}>
              <label>Password</label>
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="password"
                required
              />
              <button
                type="button"
                onClick={() => toggleShow("pwd")}
                aria-label="toggle password"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 34,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showPwd ? "👁️" : "🙈"}
              </button>
            </div>

            <div className="signup-field" style={{ position: "relative" }}>
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                aria-label="toggle confirm password"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 34,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showConfirm ? "👁️" : "🙈"}
              </button>
            </div>

            <hr style={{ width: "100%", border: "none", height: 12 }} />

            

            {/* spacer so card's content can scroll comfortably */}
            <div style={{ height: 8 }} />
          </form>
        </div>

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button
            className="lc-btn big-center"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </main>
    </div>
  );
}
