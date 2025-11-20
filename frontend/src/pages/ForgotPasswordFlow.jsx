import React, { useState } from "react";
import TopBarSlim from "../components/TopBar";   // Add this
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ResetPassword from "./ResetPassword";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Top Bar */}
      <TopBar title="Forgot Password" to="/login" />

      {/* Page Content */}
      <div className="fc-wrap">
        {step === 1 && (
          <ForgotPassword
            onNext={(emailInput) => {
              setEmail(emailInput);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <OtpVerification email={email} onVerify={() => setStep(3)} />
        )}

        {step === 3 && (
          <ResetPassword onReset={() => alert("Password reset successfully!")} />
        )}
      </div>
    </>
  );
}
