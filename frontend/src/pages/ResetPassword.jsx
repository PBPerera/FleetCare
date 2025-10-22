import React, { useState } from "react";

export default function ResetPassword({ onReset }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="centered-container">
      <div className="card">
        <h2>Create New Password</h2>
        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <button onClick={() => onReset(password, confirm)}>Reset Password</button>
      </div>
    </div>
  );
}