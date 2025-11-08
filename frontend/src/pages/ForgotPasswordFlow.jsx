import React, { useState } from "react";
<<<<<<< HEAD
=======
import TopBarSlim from "../components/Topbar";
>>>>>>> f228393dd7466d879628ceb235fb697fb0130342
import ForgotPassword from "./ForgotPassword";
import OtpVerification from "./OtpVerification";
import ResetPassword from "./ResetPassword";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
<<<<<<< HEAD
    <>
=======
    <div className="forgot-page">
      <TopBarSlim />
>>>>>>> f228393dd7466d879628ceb235fb697fb0130342
      {step === 1 && (
        <ForgotPassword
          onNext={(emailInput) => {
            setEmail(emailInput);
            setStep(2);
          }}
        />
      )}
<<<<<<< HEAD
      {step === 2 && <OtpVerification email={email} onVerify={() => setStep(3)} />}
      {step === 3 && <ResetPassword onReset={() => alert("Password reset successfully!")} />}
    </>
=======
      {step === 2 && (
        <OtpVerification email={email} onVerify={() => setStep(3)} />
      )}
      {step === 3 && (
        <ResetPassword onReset={() => alert("Password reset!")} />
      )}
    </div>
>>>>>>> f228393dd7466d879628ceb235fb697fb0130342
  );
}