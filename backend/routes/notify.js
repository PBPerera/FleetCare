import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import { sendWhatsAppMessage } from "../controllers/notifyController.js";

router.post("/send", auth, sendWhatsAppMessage);

export default router;
