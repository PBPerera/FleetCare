import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date }
});

<<<<<<< HEAD
export default mongoose.model("User", userSchema);
=======
export default mongoose.model("User", userSchema);
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
