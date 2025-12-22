// backend/controllers/auth.controller.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🟢 SIGNUP FUNCTION (Matches your Signup.jsx exactly)

const signupUser = async (req, res) => {
  try {
    // 1️⃣ Get data from frontend
    const {
      fullName,
      email,
      phone,
      nic,
      department,
      role,
      employeeId,
      designation,
      username,
      password,
    } = req.body;

    // 2️⃣ Check if user already exists (email or username)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user object
    const newUser = new User({
      fullName,
      email,
      phone,
      nic,
      department,
      role,
      employeeId,
      designation,
      username,
      password: hashedPassword,
    });

    // 5️⃣ Save user in MongoDB
    await newUser.save();

    console.log("✅ MongoDB user saved:", newUser);

    // 6️⃣ Success response
    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================================
// 🔵 LOGIN FUNCTION (Matches your Login.jsx exactly)
// ==========================================================
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // 🟦 SAVE LAST LOGIN DATE & TIME
const now = new Date();
user.lastLoginDate = now.toISOString().split("T")[0];
user.lastLoginTime = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

await user.save();


    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    // Clean user object (remove password)
    const cleanUser = {
      id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      department: user.department,
      employeeId: user.employeeId,
    };

    // Success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: cleanUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================================
// EXPORT
// ==========================================================
module.exports = {
  signupUser,
  loginUser,
};
