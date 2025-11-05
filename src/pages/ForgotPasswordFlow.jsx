import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ResetPassword from "./ResetPassword";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <>
      {step === 1 && (
        <ForgotPassword
          onNext={(emailInput) => {
            setEmail(emailInput);
            setStep(2);
          }}
        />
      )}
      {step === 2 && <OtpVerification email={email} onVerify={() => setStep(3)} />}
      {step === 3 && <ResetPassword onReset={() => alert("Password reset successfully!")} />}
    </>
  );
}