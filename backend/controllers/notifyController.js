const axios = require("axios");

exports.sendWhatsAppMessage = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ message: "Number and message are required" });
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: number,
      type: "text",
      text: { body: message }
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, payload, { headers });

    return res.json({
      status: "success",
      messageId: response.data.messages[0].id,
    });

  } catch (err) {
    console.error("WhatsApp API Error:", err.response?.data || err.message);
    return res.status(500).json({
      status: "error",
      error: err.response?.data || err.message,
    });
  }
};
