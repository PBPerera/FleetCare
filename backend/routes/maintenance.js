<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const auth = require('../middleware/auth');

// GET /api/maintenance
router.get('/', auth, async (req, res) => {
  const items = await Maintenance.find().populate('vehicle');
  res.json(items);
});

// POST /api/maintenance
router.post('/', auth, async (req, res) => {
  const m = new Maintenance(req.body);
  await m.save();
  res.status(201).json(m);
});

router.put('/:id', auth, async (req, res) => {
  const m = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(m);
});

router.delete('/:id', auth, async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

module.exports = router;
=======
import express from 'express';
import {
  getDashboardStats,
  searchMaintenance,
  getMaintenanceHistory
} from '../controllers/maintenanceController.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/search', searchMaintenance);
router.get('/history/:vehicleId', getMaintenanceHistory);

export default router;
>>>>>>> 5b84578c8ca635edd4e638b2fb695f4a3e73f852
