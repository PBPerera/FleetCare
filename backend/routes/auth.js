const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ success: true, message: 'Register - to be implemented' });
});

router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Login - to be implemented' });
});

module.exports = router;