// MongoDB
import mongoose from "mongoose";

// Subscription Schema
const subscriptionSchema = new mongoose.Schema(
  {
    // Subscriber
    subscriber: {
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
  },
  {
    timestamps: true,
  },
);

// Prevent Duplicate Subscription
subscriptionSchema.index(
  {
    subscriber: 1,
    channel: 1,
  },
  {
    unique: true,
  },
);

// Subscription Model
const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema,
);

export default Subscription;