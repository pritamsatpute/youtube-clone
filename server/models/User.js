// MongoDB
import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    // Name
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Username
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/,
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Password
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // Profile Image
    avatar: {
      type: String,
      default: "",
    },

    // Channel Reference
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// User Model
const User = mongoose.model(
  "User",
  userSchema,
);

export default User;