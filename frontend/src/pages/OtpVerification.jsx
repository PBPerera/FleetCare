import React, { useState, useRef, useEffect } from "react";

export default function OtpVerification({ email = "", onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

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
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const prev = idx - 1;
      inputsRef.current[prev].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const digits = paste.split("").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    digits.forEach((d, i) => (next[i] = d));
    setOtp(next);
    const focusIndex = digits.length >= 6 ? 5 : digits.length;
    inputsRef.current[focusIndex]?.focus();
    e.preventDefault();
  };

  const submit = () => {
    const code = otp.join("");
    if (code.length < 6) return; 
    onVerify && onVerify(code);
  };

  return (
    <div className="forgot-main">
      <div className="forgot-card-otp">
        <h2 className="forgot-title">Check Your E-mail</h2>

        <p className="forgot-instruction">
          We sent an OTP code to <b>{email || "your email"}</b>
          <br></br><br></br>Enter 6 digit code that mentioned in the email
        </p>

        <div
          className="otp-inputs"
          onPaste={handlePaste}
          aria-label="OTP inputs"
        >
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value.trim(), idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="otp-input"
              aria-label={`OTP digit ${idx + 1}`}
            />
          ))}
        </div>

        <div className="btn-row">
          <button className="gradient-btn" onClick={submit} aria-label="Verify">
            Verify OTP
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