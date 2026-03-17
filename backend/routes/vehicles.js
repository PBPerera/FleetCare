
import {createVehicle,getVehicles,getVehicleById,updateVehicle,deleteVehicle} from "../controllers/vehicleController.js";

import express from "express";
const router = express.Router();
import Vehicle from '../models/Vehicle.js';
import auth from "../middleware/authMiddleware.js";

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





router.get("/",getVehicles);
router.get("/:vehicle_id", getVehicleById);
router.post("/",createVehicle);
router.put("/:vehicle_id", updateVehicle);
router.delete("/:vehicle_id", deleteVehicle);

export default router;

