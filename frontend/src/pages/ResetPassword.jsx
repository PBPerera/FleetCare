import React, { useState } from "react";
import { resetPassword } from "../api";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

export default function ResetPassword({ email, onReset }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // ✅ ADD THIS

  const handleReset = async () => {
    if (!password || !confirm) return alert("Enter password and confirm");
    if (password !== confirm) return alert("Passwords do not match");

    try {
      setLoading(true);
      const res = await resetPassword(email, password);

      alert(res.data.msg || "Password updated successfully");

      navigate("/login");  // ✅ REDIRECT TO LOGIN

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="forgot-main">
      <div className="forgot-card reset-card">
        <h2 className="forgot-title">Create New Password</h2>
        <div className="field">
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="btn-row">
          <button className="gradient-btn" onClick={handleReset}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
