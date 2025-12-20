import React, { useState } from "react";
import { sendOtp } from "../api";

export default function ForgotPassword({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
  console.log("Sending OTP for", email); // log
  try {
    const res = await sendOtp(email);
    console.log("OTP response:", res.data);
    onNext(email);
  } catch (err) {
    console.error("Error sending OTP:", err.response?.data || err);
    alert(err.response?.data?.message || "Error sending OTP");
  }
};

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
            className="input-field"
          />
        </div>
        <div className="btn-row">
          <button className="gradient-btn" onClick={handleSendOtp}>
            {loading ? "Sending..." : "Send The OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
