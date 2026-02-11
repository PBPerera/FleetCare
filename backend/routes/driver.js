import { Router } from "express";
import {createDriver,getDrivers,getDriversById,updateDriver,deleteDriver} from "../controllers/driverController.js";


const router = Router();

router.get("/",getDrivers);
router.get("/:driver_id", getDriversById);
router.post("/",createDriver);
router.put("/:driver_id", updateDriver);
router.delete("/:driver_id", deleteDriver);

export default router;