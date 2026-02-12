import express from "express";
const router = express.Router();


import Trip from '../models/Trip.js';
import auth from '../middleware/authMiddleware.js';

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

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Trips endpoint', data: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Create trip', data: req.body });
});

export default router;
