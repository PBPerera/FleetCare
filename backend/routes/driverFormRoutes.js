import express from "express";
import { addDriverForm, getDriverForm } from "../controllers/driverFormController.js";

const router = express.Router();

router.post("/staff/add", addDriverForm);
router.get("/all", getDriverForm);

export default router;
