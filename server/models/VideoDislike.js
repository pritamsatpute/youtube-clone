// MongoDB
import mongoose from "mongoose";

// Video Dislike Schema
const videoDislikeSchema = new mongoose.Schema(
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

// Prevent Duplicate Dislikes
videoDislikeSchema.index(
  {
    video: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

// Video Dislike Model
const VideoDislike = mongoose.model(
  "VideoDislike",
  videoDislikeSchema,
);

export default VideoDislike;