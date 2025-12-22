import express from "express";
import { addVehicleForm, getVehicleForm } from "../controllers/vehicleFormController.js";

const router = express.Router();

router.post("/add", addVehicleForm);
router.get("/all", getVehicleForm);

export default router;