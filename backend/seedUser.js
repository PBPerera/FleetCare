import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = "user@example.com";
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("User already exists:", email);
    process.exit(0);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("password123", salt);
  await User.create({ email, password: hash, name: "Demo User" });
  console.log("Seeded user:", email);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
