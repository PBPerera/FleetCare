import express from "express";
const router = express.Router();
import { required as auth } from "../middleware/authMiddleware.js";
import { sendWhatsAppMessage } from "../controllers/notifyController.js";

router.post("/send", auth, sendWhatsAppMessage);

export default router;
