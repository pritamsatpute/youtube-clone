// MongoDB
import mongoose from "mongoose";

// Video Like Schema
const videoLikeSchema = new mongoose.Schema(
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

// Prevent Duplicate Likes
videoLikeSchema.index(
  {
    video: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

// Video Like Model
const VideoLike = mongoose.model(
  "VideoLike",
  videoLikeSchema,
);

export default VideoLike;