const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Users endpoint', data: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create user', data: req.body });
});

module.exports = router;