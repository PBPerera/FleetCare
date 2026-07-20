import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import User from "../models/User.js";

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(e) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
