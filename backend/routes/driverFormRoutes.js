import express from "express";
import { addDriverForm, getDriverForm } from "../controllers/driverFormController.js";

const router = express.Router();

router.post("/add", addDriverForm);
router.get("/all", getDriverForm);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
