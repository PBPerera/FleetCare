// import express from 'express';
// import {
//   getDashboardStats,
//   searchMaintenance,
//   getMaintenanceHistory
// } from '../controllers/maintenanceController.js';


// const router = express.Router();
// import Maintenance from '../models/Maintenance.js';
// import auth from '../middleware/authMiddleware.js';

// // GET /api/maintenance
// router.get('/', auth, async (req, res) => {
//   const items = await Maintenance.find().populate('vehicle');
//   res.json(items);
// });

// // POST /api/maintenance
// router.post('/', auth, async (req, res) => {
//   const m = new Maintenance(req.body);
//   await m.save();
//   res.status(201).json(m);
// });

// router.put('/:id', auth, async (req, res) => {
//   const m = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(m);
// });

// router.delete('/:id', auth, async (req, res) => {
//   await Maintenance.findByIdAndDelete(req.params.id);
//   res.json({ message: 'deleted' });
// });


// router.get('/dashboard/stats', getDashboardStats);
// router.get('/search', searchMaintenance);
// router.get('/history/:vehicleId', getMaintenanceHistory);

// export default router;


// backend/routes/maintenance.js
import express from 'express';
const router = express.Router();

import {
  getDashboardStats,
  searchMaintenance,
  getMaintenanceHistory
} from '../controllers/maintenanceController.js';

import Maintenance from '../models/Maintenance.js';
import { required as auth } from '../middleware/authMiddleware.js'; // fixed import

// GET /api/maintenance - protected
router.get('/', auth, async (req, res) => {
  try {
    const items = await Maintenance.find().populate('vehicle');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/maintenance - protected
router.post('/', auth, async (req, res) => {
  try {
    const m = new Maintenance(req.body);
    await m.save();
    res.status(201).json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/maintenance/:id - protected
router.put('/:id', auth, async (req, res) => {
  try {
    const m = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/maintenance/:id - protected
router.delete('/:id', auth, async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: 'deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard, search, and history routes (optional, no auth)
router.get('/dashboard/stats', getDashboardStats);
router.get('/search', searchMaintenance);
router.get('/history/:vehicleId', getMaintenanceHistory);

export default router;