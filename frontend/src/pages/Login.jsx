import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      // If you have backend, replace with API call
      // const api = (await import('../api')).default;
      // const res = await api.post('/auth/login', { email: username, password });
      // localStorage.setItem('token', res.data.token);
      // nav(res.data.user.role === 'admin' ? '/admin' : '/staff');

      // temporary demo behaviour:
      if (!username || !password) throw new Error("Enter username & password");
      if (username === "admin") nav("/admin");
      else nav("/staff");
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Login failed");
    }
  };

  return (
    <div className="login-page centered" style={{ padding: 24 }}>
      <div className="login-card card">
        <div className="login-left">
          <div className="welcome-title">WELCOME !</div>
          <p className="welcome-desc">
            A monitoring Vehicle Management System built to simplify fleet
            operations. We help organizations track vehicles, manage drivers and
            streamline requests efficiently.
          </p>
        </div>

        <div className="login-right">
          <h2 style={{ marginBottom: 8 }}>Welcome back to FleetCare</h2>

          <form onSubmit={handleLogin} style={{ marginTop: 6 }}>
            <label className="field-label">Username</label>
            <input
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
            />

            <label className="field-label" style={{ marginTop: 12 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="input-field"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShow((s) => !s)}
                aria-label="toggle password"
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>

            {err && <div className="form-error">{err}</div>}

            <div style={{ marginTop: 18 }}> 
              <button type="submit" className="btn gradient-btn">
                Login
              </button>
            </div>

            <div className="form-links">
              <div>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
              <div>
                <Link to="/forgot-email">Forgot Password</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
