// Services
import {
  recordHistory,
  getMyHistory,
  removeHistoryItem,
  removeHistoryByVideo,
  clearHistory,
  getHistoryStatus,
  updateHistoryStatus,
} from "../services/historyService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Record History
export const record = asyncHandler(
  async (req, res) => {
    const result =
      await recordHistory(
        req.user._id,
        req.params.videoId,
      );

    res.status(201).json(
      new ApiResponse(
        "History recorded successfully",
        result,
      ),
    );
  },
);

// Get My History
export const getMine =
  asyncHandler(async (req, res) => {
    const history =
      await getMyHistory(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "History fetched successfully",
        history,
      ),
    );
  });

// Remove History Item
export const remove =
  asyncHandler(async (req, res) => {
    const result =
      await removeHistoryItem(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        result.message,
      ),
    );
  });

// Remove By Video
export const removeByVideo =
  asyncHandler(async (req, res) => {
    const result =
      await removeHistoryByVideo(
        req.user._id,
        req.params.videoId,
      );

    res.json(
      new ApiResponse(
        result.message,
      ),
    );
  });

// Clear History
export const clear =
  asyncHandler(async (req, res) => {
    const result =
      await clearHistory(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        result.message,
      ),
    );
  });

// Get History Status
export const getStatus =
  asyncHandler(async (req, res) => {
    const result =
      await getHistoryStatus(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "History status fetched successfully",
        result,
      ),
    );
  });

// Update History Status
export const updateStatus =
  asyncHandler(async (req, res) => {
    const result =
      await updateHistoryStatus(
        req.user._id,
        req.body.isPaused,
      );

    res.json(
      new ApiResponse(
        "History status updated successfully",
        result,
      ),
    );
  });