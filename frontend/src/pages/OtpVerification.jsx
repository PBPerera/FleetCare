import React, { useState, useRef, useEffect } from "react";
import { verifyOtp, resendOtp } from "../api";

export default function OtpVerification({ email = "", onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

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

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...otp];
      
      if (otp[idx]) {
        // Clear current box if it has a value
        next[idx] = "";
        setOtp(next);
      } else if (idx > 0) {
        // Move to previous box and clear it
        next[idx - 1] = "";
        setOtp(next);
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const res = await resendOtp(email);
      alert(res.data.msg || "New OTP sent to your email");
      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current?.[0]?.focus();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to resend OTP");
    } finally {
      setResending(false);
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
              onKeyDown={(e) => handleKeyDown(e, idx)}  // ADD THIS LINE
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
            onClick={handleResend}
            disabled={resending}
            aria-label="Resend OTP"
          >
            {resending ? "Sending..." : "Resend New OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
