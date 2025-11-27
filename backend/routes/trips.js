const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Trips endpoint', data: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create trip', data: req.body });
});

module.exports = router;