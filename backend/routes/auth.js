import { Router } from "express";
import { registerUser, loginUser, getLoginLogs, getAllUsers } from "../controllers/authController.js";
const router = Router();

router.post('/register',registerUser);

router.post('/login',loginUser )

router.get('/login-logs', getLoginLogs);

router.get('/users', getAllUsers);

export default router;
