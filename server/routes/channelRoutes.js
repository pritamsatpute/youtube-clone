// Packages
import express from "express";

// Controllers
import {
  create,
  getMy,
  getByHandle,
  update,
  subscribe,
  unsubscribe,
  subscriptionStatus,
  mySubscriptions,
  mySubscriptionVideos,
} from "../controllers/channelController.js";

// Middleware
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadChannelImages,
} from "../middleware/multerMiddleware.js";

// Router
const router = express.Router();

// Create Channel
router.post(
  "/",
  authMiddleware,
  uploadChannelImages,
  create
);

// Get My Channel
router.get("/me", authMiddleware, getMy);

// My Subscriptions
router.get(
  "/subscriptions",
  authMiddleware,
  mySubscriptions,
);

// My Subscription Videos
router.get(
  "/subscriptions/videos",
  authMiddleware,
  mySubscriptionVideos,
);

// Subscription Status
router.get(
  "/:channelId/subscription-status",
  authMiddleware,
  subscriptionStatus,
);

// Subscribe
router.post(
  "/:channelId/subscribe",
  authMiddleware,
  subscribe,
);

// Unsubscribe
router.delete(
  "/:channelId/subscribe",
  authMiddleware,
  unsubscribe,
);

// Get Channel By Handle
router.get("/handle/:handle", getByHandle);

// Update My Channel
router.patch(
  "/me",
  authMiddleware,
  uploadChannelImages,
  update
);

export default router;