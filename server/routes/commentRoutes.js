// Packages
import express from "express";

// Controllers
import {
  create,
  getByVideo,
  update,
  remove,
  like,
  unlike,
  likeStatus,
} from "../controllers/commentController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";

// Router
const router = express.Router();

// Public Routes

// Get Comments By Video
router.get(
  "/video/:videoId",
  getByVideo,
);

// Protected Routes

// Create Comment
router.post(
  "/",
  authMiddleware,
  create,
);

// Like Comment
router.post(
  "/:id/like",
  authMiddleware,
  like,
);

// Unlike Comment
router.delete(
  "/:id/like",
  authMiddleware,
  unlike,
);

// Get Comment Like Status
router.get(
  "/:id/like-status",
  authMiddleware,
  likeStatus,
);

// Update Comment
router.patch(
  "/:id",
  authMiddleware,
  update,
);

// Delete Comment
router.delete(
  "/:id",
  authMiddleware,
  remove,
);

export default router;