import nodemailer from "nodemailer";

export async function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // dev fallback: Ethereal
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

export async function sendOtpEmail(to, otp) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || "no-reply@fleetcare.local",
    to,
    subject: "FleetCare — Your OTP",
    text: `Your FleetCare OTP is: ${otp}. It expires in 15 minutes.`,
    html: `<p>Your FleetCare OTP is: <b>${otp}</b></p><p>It expires in 15 minutes.</p>`,
  });

  try {
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log("Ethereal preview URL:", preview);
  } catch (e) {}

  return info;
}
