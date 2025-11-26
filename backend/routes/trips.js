const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// GET /api/trips
router.get('/', auth, async (req, res) => {
  const items = await Trip.find().populate('vehicle driver');
  res.json(items);
});

// POST /api/trips
router.post('/', auth, async (req, res) => {
  const t = new Trip(req.body);
  await t.save();
  res.status(201).json(t);
});

router.put('/:id', auth, async (req, res) => {
  const t = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
});

router.delete('/:id', auth, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

module.exports = router;
