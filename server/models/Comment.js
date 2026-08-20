// MongoDB
import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    // Video
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    // Owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Parent Comment (Reply)
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // Comment Content
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },

    // Likes
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Edited Flag
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Comment Model
const Comment = mongoose.model(
  "Comment",
  commentSchema
);

export default Comment;