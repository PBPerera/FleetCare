import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, text) => {
  console.log("Sending email to:", to);  // <--- log
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
  console.log("Email sent successfully");
};

<<<<<<< HEAD
export default sendEmail;
=======
export default sendEmail;
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
