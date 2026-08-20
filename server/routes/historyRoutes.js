// Packages
import express from "express";

// Controllers
import {
  record,
  getMine,
  remove,
  removeByVideo,
  clear,
  getStatus,
  updateStatus,
} from "../controllers/historyController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";

// Router
const router =
  express.Router();

// Get My History
router.get(
  "/",
  authMiddleware,
  getMine,
);

// History Status
router.get(
  "/status",
  authMiddleware,
  getStatus,
);

// Update History Status
router.patch(
  "/status",
  authMiddleware,
  updateStatus,
);

// Clear History
router.delete(
  "/",
  authMiddleware,
  clear,
);

// Remove By Video
router.delete(
  "/video/:videoId",
  authMiddleware,
  removeByVideo,
);

// Remove History Item
router.delete(
  "/:id",
  authMiddleware,
  remove,
);

// Record History
router.post(
  "/video/:videoId",
  authMiddleware,
  record,
);

export default router;