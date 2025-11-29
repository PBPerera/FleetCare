const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Vehicles endpoint', data: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create vehicle', data: req.body });
});

module.exports = router;