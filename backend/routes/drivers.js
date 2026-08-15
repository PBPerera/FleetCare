import express from 'express';
const router = express.Router();
import Driver from '../models/Driver.js';
import auth from '../middleware/authMiddleware.js';

// GET /api/drivers
router.get('/', auth, async (req, res) => {
  const items = await Driver.find().populate('assignedVehicle');
  res.json(items);
});

// POST /api/drivers
router.post('/', auth, async (req, res) => {
  const d = new Driver(req.body);
  await d.save();
  res.status(201).json(d);
});

// PUT, DELETE similar
router.put('/:id', auth, async (req, res) => {
  const d = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(d);
});
router.delete('/:id', auth, async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

export default router;
