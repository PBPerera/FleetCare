const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

// GET /api/vehicles
router.get('/', auth, async (req, res) => {
  const items = await Vehicle.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/vehicles
router.post('/', auth, async (req, res) => {
  const { registrationNumber, model, make, year, status } = req.body;
  const v = new Vehicle({ registrationNumber, model, make, year, status });
  await v.save();
  res.status(201).json(v);
});

// PUT /api/vehicles/:id
router.put('/:id', auth, async (req, res) => {
  const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(v);
});

// DELETE /api/vehicles/:id
router.delete('/:id', auth, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

module.exports = router;
