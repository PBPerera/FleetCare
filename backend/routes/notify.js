const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { sendWhatsAppMessage } = require("../controllers/notifyController");

router.post("/send", auth, sendWhatsAppMessage);

module.exports = router;
