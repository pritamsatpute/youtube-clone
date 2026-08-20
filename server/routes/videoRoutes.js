// Packages
import express from "express";

// Controllers
import {
  create,
  getAll,
  getById,
  getMine,
  getByChannel,
  update,
  remove,
  view,
  like,
  unlike,
  dislike,
  undislike,
  getLiked,
  likeStatus,
} from "../controllers/videoController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";
import optionalAuthMiddleware from "../middleware/optionalAuthMiddleware.js";
import { uploadVideoFiles } from "../middleware/multerMiddleware.js";

// Router
const router = express.Router();

// PUBLIC ROUTES
// Home Feed
router.get(
  "/",
  getAll,
);

// Liked Videos
router.get(
  "/liked",
  authMiddleware,
  getLiked,
);

// Channel Videos
router.get(
  "/channel/:handle",
  getByChannel,
);

// Studio - My Videos
router.get(
  "/me",
  authMiddleware,
  getMine,
);

// Watch Page
router.get(
  "/:id",
  optionalAuthMiddleware,
  getById,
);

// PROTECTED ROUTES
// Register View
router.post(
  "/:id/view",
  authMiddleware,
  view,
);

// Like Video
router.post(
  "/:id/like",
  authMiddleware,
  like,
);

// Unlike Video
router.delete(
  "/:id/like",
  authMiddleware,
  unlike,
);

// Dislike Video
router.post(
  "/:id/dislike",
  authMiddleware,
  dislike,
);

// Undislike Video
router.delete(
  "/:id/dislike",
  authMiddleware,
  undislike,
);

// Like Status
router.get(
  "/:id/like-status",
  authMiddleware,
  likeStatus,
);

// Upload Video
router.post(
  "/",
  authMiddleware,
  uploadVideoFiles,
  create,
);

// Update Video
router.patch(
  "/:id",
  authMiddleware,
  uploadVideoFiles,
  update,
);

// Delete Video
router.delete(
  "/:id",
  authMiddleware,
  remove,
);

export default router;