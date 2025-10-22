// ...existing code...
import React, { useState } from "react";

export default function ForgotPassword({ onNext }) {
  const [email, setEmail] = useState("");

  return (
    <div className="forgot-main">
      <div className="forgot-card">
        <h2 className="forgot-title">Forgot Password?</h2>
       

        <div className="field">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            className="input-field"
          />
        </div>

        {/* button on its own line */}
        <div className="btn-row">
          <button
            className="gradient-btn"
            onClick={() => onNext(email)}
            aria-label="Send OTP"
          >
            Send the OTP
          </button>
        </div>
      </div>
    </div>
  );
}
// ...existing code...