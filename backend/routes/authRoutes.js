import express from "express";
import { forgotPassword, verifyOtp, resetPassword, resendOtp } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => res.json({ ok: true, msg: "auth route working" }));

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);

export default router;