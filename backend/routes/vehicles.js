import { Router } from "express";
import {createVehicle,getVehicles,getVehicleById,updateVehicle,deleteVehicle} from "../controllers/vehicleController.js";


const router = Router();

router.get("/",getVehicles);
router.get("/:vehicle_id", getVehicleById);
router.post("/",createVehicle);
router.put("/:vehicle_id", updateVehicle);
router.delete("/:vehicle_id", deleteVehicle);

export default router;