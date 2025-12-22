import express from "express";
import { forgotPassword, verifyOtp, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => res.json({ ok: true, msg: "auth route working" }));

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
