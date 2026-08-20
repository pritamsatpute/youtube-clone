// MongoDB
import mongoose from "mongoose";

// History Schema
const historySchema = new mongoose.Schema(
  {
    // User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Video
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    // Watched At
    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent Duplicate History
historySchema.index(
  {
    user: 1,
    video: 1,
  },
  {
    unique: true,
  },
);

// History Model
const History = mongoose.model(
  "History",
  historySchema,
);

export default History;