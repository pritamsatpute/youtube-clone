// Packages
import express from "express";

// Controllers
import {
  register,
  login,
  me,
  logout,
} from "../controllers/authController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";

// Router
const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", authMiddleware, logout);

// Current User
router.get("/me", authMiddleware, me);

export default router;