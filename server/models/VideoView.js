// MongoDB
import mongoose from "mongoose";

// Video View Schema
const videoViewSchema = new mongoose.Schema(
  {
    // Video
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    // User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// One view per user per video
videoViewSchema.index(
  {
    video: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

// Video View Model
const VideoView = mongoose.model(
  "VideoView",
  videoViewSchema,
);

export default VideoView;