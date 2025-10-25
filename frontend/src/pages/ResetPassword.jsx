import React, { useState } from "react";

export default function ResetPassword({ onReset }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="forgot-main">
      <div className="forgot-card reset-card">
        <h2 className="forgot-title">Create New Password</h2>

        <div className="field">
          <input
            type="password"
            className="input-field"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="New password"
          />
        </div>

        <div className="field">
          <input
            type="password"
            className="input-field"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-label="Confirm password"
          />
        </div>

        <div className="btn-row">
          <button
            className="gradient-btn"
            onClick={() => onReset && onReset(password, confirm)}
            aria-label="Reset Password"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}