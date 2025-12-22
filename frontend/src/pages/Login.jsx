// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import logo from "../assets/logo-small.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real auth call
    navigate("/admindashboard");
  };

  return (
    
    <div className="login-page">
      <TopBar /> 
    

      {/* Main Card */}
      <main className="lp-main">
        <section className="lp-card">
          {/* Left */}
          <div className="lp-left">
            <div className="lp-left-inner">
              <h1 className="lp-welcome">WELCOME !</h1>
              <p className="lp-desc">
                A monitoring Vehicle Management System built to simplify fleet
                operations. We help organizations track vehicles, manage drivers
                and streamline requests efficiently.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="lp-divider" aria-hidden />

          {/* Right */}
          <div className="lp-right">
            <h2 className="lp-title">Welcome back&nbsp; to FleetCare</h2>

            <form className="lp-form" onSubmit={handleSubmit}>
              <label htmlFor="username" className="lp-label">Username</label>
              <input
                id="username"
                className="lp-input"
                placeholder="Enter your  Username"
                autoComplete="username"
                required
              />

              <label htmlFor="password" className="lp-label">Password</label>
              <div className="lp-input-pwd">
                <input
                  id="password"
                  className="lp-input"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "ShowHide password"}
                  title="Show/Hide password"
                >
                  {!showPwd ? (
                    // eye
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M10.6 10.6A3.2 3.2 0 0012 15.2a3.2 3.2 0 003.2-3.2c0-.6-.16-1.16-.44-1.64" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M21.97 12S18.3 5 12 5c-1.15 0-2.22.2-3.2.56M5.2 7.4C3.5 9 2.4 11 2.4 12c0 0 3.7 7 9.6 7 1.2 0 2.3-.2 3.3-.57" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                    
                  ) : (
                    // eye-off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>

              <button type="submit" className="lp-btn">Login</button>
            </form>

            <div className="lp-links">
              <span>
                Don’t have an account?{" "}
                <Link to="/signup" className="lp-link">Sign Up</Link>
              </span>
              <Link to="/forgotpassword" className="lp-link">Forgot Password</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Styles */}
      <style>{`
        :root{
          --blueBar:#66a7ff;
          --blueBar2:#5e9dfc;
          --ink:#111827;
          --muted:#6b7280;
          --cardShadow:0 12px 28px rgba(15,23,42,.12);
          --radius:18px;
          --outline:#835b5b; /* thin maroon-ish outline */
          --rightGrey:#d9d9d9;
          --inputGrey:#eef0f3;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%}
        body{margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; color:var(--ink)}

        /* Top bar */
        .lp-appbar{background:linear-gradient(180deg, var(--blueBar), var(--blueBar2)); box-shadow:0 2px 6px rgba(0,0,0,.08) }
        .lp-appbar-inner{max-width:1200px; margin:0 auto; padding:12px 22px; display:flex; align-items:center}
        .lp-brand{display:flex; align-items:center; gap:10px}
        .lp-logo{width:36px; height:36px; object-fit:contain}
        .lp-brand-text{font-weight:800; letter-spacing:.2px; font-size:18px}

        /* Main */
        .lp-main{padding:75px 18px 46px; display:grid; place-items:center}
        .lp-card{
          width:min(1040px, 100%);
          border-radius:var(--radius);
          border:1.5px solid var(--outline);
          overflow:hidden;
          box-shadow: var(--cardShadow);
          background:#fff;
          display:grid;
          grid-template-columns: 1fr 1px 1fr;
        }

        /* Left panel */
        .lp-left{
          background:#fff;
          display:flex; align-items:stretch; justify-content:center;
        }
        .lp-left-inner{
          width:100%;
          padding:34px 28px;
          background:radial-gradient(120% 120% at 0% 0%, #bfe0ff 0%, #cfe6ff 30%, #e9f3ff 60%, #ffffff 100%);
          display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;
          min-height:470px;
        }
        .lp-welcome{margin:0 0 14px; font-size:clamp(24px, 4.5vw, 44px); font-weight:900; letter-spacing:1px}
        .lp-desc{margin:0; max-width:520px; line-height:1.65; font-weight:600}

        /* Divider */
        .lp-divider{width:1px; background:#cfcfcf}

        /* Right panel */
        .lp-right{
          background:var(--rightGrey);
          min-height:470px;
          padding:40px 32px;
          display:flex; flex-direction:column; justify-content:center;
        }
        .lp-title{margin:0 0 18px; font-size:clamp(18px, 2.6vw, 28px); font-weight:800}

        /* Form */
        .lp-form{display:flex; flex-direction:column; gap:4px}
        .lp-label{font-size:13.5px; font-weight:700 ; color:var(--muted); letter-spacing:.4px ;justify-content:left; display:flex;gap:4px ;margin-top:12px;}
        .lp-input{
          width:100%; padding:12px 12px; border-radius:10px;
          border:1px solid #d1d5db; background:#f3f4f6;
          outline:none; font-size:15px;
        }
        .lp-input:focus{border-color:#a7c8ff; background:#fff}
        .lp-input-pwd{position:relative; display:flex; align-items:center}
        .lp-eye{
          position:absolute; right:8px; width:34px; height:34px; border:0; background:transparent;
          display:grid; place-items:center; color:#94a3b8; cursor:pointer;
        }

        /* Button */
        .lp-btn{
          margin-top:16px;
          width:100%;
          padding:12px;
          border:0; border-radius:10px; cursor:pointer;
          color:#fff; font-weight:800;
          background:linear-gradient(90deg, #5f2bff, #2f7bff);
          box-shadow:0 10px 20px rgba(47,123,255,.25);
        }
        .lp-btn:hover{filter:brightness(.98)}

        /* Links */
        .lp-links{
          margin-top:16px; display:flex; justify-content:space-between; align-items:center; gap:10px;
          color:var(--muted); font-size:14px; flex-wrap:wrap;
        }
        .lp-link{color:#3b82f6; text-decoration:underline}
        .lp-link:hover{opacity:.9}

        /* Responsive */
        @media (max-width: 980px){
          .lp-card{grid-template-columns: 1fr; }
          .lp-divider{display:none}
          .lp-left-inner{min-height:auto; padding:26px 22px}
          .lp-right{min-height:auto; padding:28px 22px}
        }
      `}</style>
    </div>
  );
}
