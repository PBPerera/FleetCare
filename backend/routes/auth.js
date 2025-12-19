const express = require("express");
const router = express.Router();

// controller එක import කරනවා
const {
  signupUser,
  loginUser
} = require("../controllers/auth.controller");

// 🟢 SIGNUP ROUTE
// Frontend → POST /api/auth/signup
router.post("/signup", signupUser);

// 🔵 LOGIN ROUTE
// Frontend → POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
