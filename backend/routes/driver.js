const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Drivers endpoint', data: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create driver', data: req.body });
});

module.exports = router; 