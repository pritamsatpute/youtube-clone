// MongoDB
import mongoose from "mongoose";

// Constants
import { NOTIFICATION_TYPES } from "../constants/notificationTypes.js";

// Notification Schema
const notificationSchema =
  new mongoose.Schema(
    {
      // Receiver
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      // Sender
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      // Type
      type: {
        type: String,
        enum: Object.values(
          NOTIFICATION_TYPES,
        ),
        required: true,
      },

      // Video
      video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        default: null,
      },

      // Comment
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
      },

      // Read Status
      isRead: {
        type: Boolean,
        default: false,
        index: true,
      },
    },
    {
      timestamps: true,
    },
  );

// Compound Index
notificationSchema.index({
  receiver: 1,
  createdAt: -1,
});

// Model
const Notification =
  mongoose.model(
    "Notification",
    notificationSchema,
  );

export default Notification;