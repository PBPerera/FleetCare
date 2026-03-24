import { Router } from "express";
import {registerUser,loginUser, getLoginLogs} from "../controllers/authController.js"
const router = Router();

router.post('/register',registerUser);

router.post('/login',loginUser )

router.get('/login-logs', getLoginLogs);

export default router;