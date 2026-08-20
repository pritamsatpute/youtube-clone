// MongoDB
import mongoose from "mongoose";

// Comment Like Schema
const commentLikeSchema = new mongoose.Schema(
  {
    // Comment
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
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
commentLikeSchema.index(
  {
    comment: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

// Comment Like Model
const CommentLike = mongoose.model(
  "CommentLike",
  commentLikeSchema,
);

export default CommentLike;