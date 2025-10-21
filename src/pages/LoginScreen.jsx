// src/pages/LoginScreen.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";
// import { login } from "../services/api"; // uncomment when you wire real API

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // If you have a backend `login` API, use it here:
      // const res = await login({ email: username, password });
      // if (res.ok) { localStorage.setItem('user', JSON.stringify(res.user)); nav('/dashboard'); return; }
      // else alert(res.message || 'Login failed');

      // demo fallback (remove after wiring API)
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify({ name: username || "Demo User" }));
        nav("/dashboard");
      }, 700);
    } catch (err) {
      console.error(err);
      alert("Server error");
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      

      <main className="lc-main">
        <div className="lc-card">
          <div className="lc-left">
            <h1 className="lc-welcome">WELCOME !</h1>
            <p className="lc-desc">
              A monitoring Vehicle Management System built to simplify fleet operations.
              We help organizations track vehicles, manage drivers and streamline requests efficiently.
            </p>
          </div>

          <div className="lc-right">
            <h2 className="lc-heading">Welcome back to FleetCare</h2>

            <form className="lc-form" onSubmit={handleSubmit}>
              <label className="lc-label">Username</label>
              <input
                className="lc-input"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label className="lc-label">Password</label>
              <div className="lc-pwd-row">
                <input
                  className="lc-input"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="lc-eye"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label="toggle password"
                >
                  {showPwd ? "👁️" : "🙈"}
                </button>
              </div>

              <button className="lc-btn" type="submit" disabled={loading}>
                {loading ? "Logging..." : "Login"}
              </button>
            </form>

            <div className="lc-links">
              <div className="lc-left-link">Don't have an account? <a href="/signup">Sign Up</a></div>
              <div className="lc-right-link"><a href="/forgot">Forgot Password</a></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
