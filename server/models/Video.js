// MongoDB
import mongoose from "mongoose";

// Video Schema
const videoSchema = new mongoose.Schema(
  {
    // Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Channel
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    // Title
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Description
    description: {
      type: String,
      default: "",
      maxlength: 5000,
    },

    // Thumbnail URL
    thumbnail: {
      type: String,
      default: "",
    },

    // Video URL
    videoUrl: {
      type: String,
      default: "",
    },

    // Duration (Seconds)
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Visibility
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },

    // Audience
    audience: {
      type: String,
      enum: [
        "made_for_kids",
        "not_for_kids",
      ],
      default: "not_for_kids",
    },

    // Comment Settings
    commentSetting: {
      type: String,
      enum: [
        "allow",
        "hold_inappropriate",
        "hold_all",
        "disable",
      ],
      default: "allow",
    },

    // Comment Sort
    commentSort: {
      type: String,
      enum: [
        "top",
        "newest",
      ],
      default: "top",
    },

    // Category
    category: {
      type: String,
      default: "Entertainment",
      trim: true,
    },

    // Tags
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Views
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Likes
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Dislikes
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Comments Count
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Publish Status
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Video Model
const Video = mongoose.model(
  "Video",
  videoSchema
);

export default Video;