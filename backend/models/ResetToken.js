import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true, lowercase: true, trim: true },
    otpHash: { type: String },
    otpExpiresAt: { type: Date },
    used: { type: Boolean, default: false },
    resetTokenHash: { type: String },
    resetTokenExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("ResetToken", resetTokenSchema);
