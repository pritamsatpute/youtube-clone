// Packages
import express from "express";

// Controllers
import {
  getAll,
  unreadCount,
  read,
  readAll,
  remove,
} from "../controllers/notificationController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";

// Router
const router = express.Router();

// Get Notifications
router.get(
  "/",
  authMiddleware,
  getAll,
);

// Get Unread Count
router.get(
  "/unread-count",
  authMiddleware,
  unreadCount,
);

// Mark All As Read
router.patch(
  "/read-all",
  authMiddleware,
  readAll,
);

// Mark As Read
router.patch(
  "/:id/read",
  authMiddleware,
  read,
);

// Delete Notification
router.delete(
  "/:id",
  authMiddleware,
  remove,
);

export default router;