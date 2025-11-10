import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ResetToken from "../models/ResetToken.js";
import { sendOtpEmail } from "../utils/email.js";

const router = express.Router();
const OTP_TTL_MS = 15 * 60 * 1000;

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Do not reveal existence
      return res.json({ message: "If account exists, OTP sent" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = sha256(otp);
    const otpExpiresAt = new Date(Date.now() + OTP_TTL_MS);

    await ResetToken.findOneAndUpdate(
      { email: user.email },
      {
        userId: user._id,
        email: user.email,
        otpHash,
        otpExpiresAt,
        used: false,
        resetTokenHash: null,
        resetTokenExpiresAt: null,
      },
      { upsert: true, new: true }
    );

    await sendOtpEmail(user.email, otp);
    return res.json({ message: "If account exists, OTP sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const rec = await ResetToken.findOne({ email: email.toLowerCase() });
    if (!rec || rec.used || !rec.otpHash || rec.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (sha256(otp) !== rec.otpHash) return res.status(400).json({ message: "Invalid OTP" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    rec.used = true;
    rec.resetTokenHash = sha256(resetToken);
    rec.resetTokenExpiresAt = new Date(Date.now() + OTP_TTL_MS);
    await rec.save();

    return res.json({ message: "OTP verified", resetToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, resetToken, password } = req.body;
    if (!email || !resetToken || !password) return res.status(400).json({ message: "Missing fields" });

    const rec = await ResetToken.findOne({ email: email.toLowerCase() });
    if (!rec || !rec.resetTokenHash || rec.resetTokenExpiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    if (rec.resetTokenHash !== sha256(resetToken)) return res.status(400).json({ message: "Invalid reset token" });

    const user = await User.findById(rec.userId);
    if (!user) return res.status(400).json({ message: "Invalid user" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    rec.resetTokenHash = null;
    rec.resetTokenExpiresAt = null;
    rec.used = true;
    await rec.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
