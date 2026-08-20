// MongoDB
import mongoose from "mongoose";

// History Setting Schema
const historySettingSchema =
  new mongoose.Schema(
    {
      // User
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      // Pause History
      isPaused: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );

// History Setting Model
const HistorySetting =
  mongoose.model(
    "HistorySetting",
    historySettingSchema,
  );

export default HistorySetting;