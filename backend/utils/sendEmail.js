import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  console.log("Sending email to:", to);
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Changed from EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify connection
  await transporter.verify();
  console.log("SMTP connection verified");

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html: `<p>${text}</p>`,
  });
  
  console.log("Email sent successfully to", to);
};

export default sendEmail;