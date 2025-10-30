import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real auth call
    navigate("/dashboard");
  };

  return (
    <div className="fc-wrap">
      {/* Top App Bar */}
      <header className="fc-appbar">
        <div className="fc-appbar-inner">
          <div className="fc-brand">
            <div className="fc-logo" aria-hidden="true">🚗</div>
            <span>FleetCare</span>
          </div>
          <div className="fc-avatar" aria-label="profile" />
        </div>
      </header>

      {/* Center Card */}
      <main className="fc-center">
        <section className="fc-card">
          {/* Left welcome panel */}
          <div className="fc-card-left">
            <h1 className="fc-welcome-title">WELCOME !</h1>
            <p className="fc-welcome-text">
              A monitoring Vehicle Management System built to simplify fleet operations.
              We help organizations track vehicles, manage drivers and streamline requests
              efficiently.
            </p>
          </div>

          {/* Right login form */}
          <div className="fc-card-right">
            <h2 className="fc-login-title">Welcome back&nbsp; to FleetCare</h2>

            <form className="fc-form" onSubmit={handleSubmit}>
              <label className="fc-label">Username</label>
              <input
                className="fc-input"
                placeholder="Enter your  Username"
                required
              />

              <label className="fc-label">Password</label>
              <div className="fc-input-pwd">
                <input
                  className="fc-input"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="fc-eye"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label="toggle password visibility"
                  title="Show/Hide password"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>

              <button type="submit" className="fc-btn-primary">Login</button>
            </form>

            <div className="fc-links">
              <span>
                Don’t have an account?{" "}
                <Link to="/signup" className="fc-link">Sign Up</Link>
              </span>
              <Link to="/forgot-password" className="fc-link">Frogot Password</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
