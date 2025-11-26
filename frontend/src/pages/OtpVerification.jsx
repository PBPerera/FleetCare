import React, { useState, useRef, useEffect } from "react";
import { verifyOtp } from "../api";

export default function OtpVerification({ email = "", onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputsRef.current?.[0]?.focus();
  }, []);

  const handleChange = (val, idx) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const submit = async () => {
    const code = otp.join("");
    if (code.length < 6) return alert("Enter full OTP");
    try {
      setLoading(true);
      const res = await verifyOtp(email, code);
      alert(res.data.message); // backend returns { message: "OTP verified" }
      onVerify(); // move to ResetPassword component
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-main">
      <div className="forgot-card-otp">
        <h2 className="forgot-title">Check Your E-mail</h2>
        <p className="forgot-instruction">
          We sent an OTP code to <b>{email || "your email"}</b>
          <br />
          <br />
          Enter 6 digit code
        </p>
        <div className="otp-inputs">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="otp-input"
            />
          ))}
        </div>
        <div className="btn-row">
          <button className="gradient-btn" onClick={submit}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
        
        <div className="otp-meta" style={{ marginTop: 12, fontSize: 13 }}>
          OTP expires in <b>01:00</b> minutes
          
        </div>

        <div style={{ marginTop: 14}}>
          <button
            className="link-btn"
            onClick={() => alert("Resend OTP (implement API call)")}
            aria-label="Resend OTP"
          >
            Resend New OTP
          </button>
        </div>
      </div>
    </div>
  );
}
