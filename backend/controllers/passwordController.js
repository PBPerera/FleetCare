import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import ResetToken from "../models/ResetToken.js";

//  Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password: "temp_password_to_be_reset" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 1 * 60 * 1000; // 1 minute (changed from 10)

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Save ResetToken document to user_reset_password collection
    const resetDoc = new ResetToken({
      userId: user._id,
      email: user.email,
      otpHash: otp, // ideally store a hashed value
      otpExpiresAt: new Date(otpExpires),
      used: false,
    });
    await resetDoc.save(); // <-- ensures token stored in user_reset_password
    console.log("ResetToken saved:", resetDoc._id);

    console.log(`OTP sent to ${email}: ${otp}`); // For debugging

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 📌 Resend OTP (NEW FUNCTION)
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 1 * 60 * 1000; // 1 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

     // Save new ResetToken doc
    const resetDoc = new ResetToken({
      userId: user._id,
      email: user.email,
      otpHash: otp,
      otpExpiresAt: new Date(otpExpires),
      used: false,
    });
    await resetDoc.save();
    console.log("ResetToken (resend) saved:", resetDoc._id);

    console.log(`OTP resent to ${email}: ${otp}`); // For debugging

    await sendEmail(email, "Your New OTP Code", `Your new OTP is: ${otp}`);

    res.json({ msg: "New OTP sent to your email" });
  } catch (error) {
    console.error("resendOtp error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 📌 Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ msg: "OTP has expired" });

    res.json({ msg: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOtp error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// 📌 Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    // Mark ResetToken(s) for this email as used so they appear updated in user_reset_password
    await ResetToken.updateMany(
      { email: user.email, used: false },
      { $set: { used: true, resetTokenExpiresAt: new Date() } }
    );

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("resetPassword error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};