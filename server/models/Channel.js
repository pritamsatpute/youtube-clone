// MongoDB
import mongoose from "mongoose";

// Channel Schema
const channelSchema = new mongoose.Schema(
  {
    // Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Channel Name
    channelName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Channel Handle
    handle: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      default: "",
      maxlength: 1000,
    },

    // Avatar
    avatar: {
      type: String,
      default: "",
    },

    // Banner
    banner: {
      type: String,
      default: "",
    },

    // Subscribers
    subscribersCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Videos
    videosCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Total Views
    totalViews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Channel Model
const Channel = mongoose.model(
  "Channel",
  channelSchema
);

export default Channel;