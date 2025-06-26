import express from 'express';
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);

export default router;
