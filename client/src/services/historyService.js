// API
import api from "./api";

// Get My History
export const getHistory = () =>
  api.get("/history");

// Record History
export const recordHistory = (
  videoId,
) =>
  api.post(
    `/history/video/${videoId}`,
  );

// Remove History Item
export const removeHistoryItem = (
  historyId,
) =>
  api.delete(
    `/history/${historyId}`,
  );

// Remove By Video
export const removeHistoryByVideo = (
  videoId,
) =>
  api.delete(
    `/history/video/${videoId}`,
  );

// Clear History
export const clearHistory = () =>
  api.delete("/history");

// Get History Status
export const getHistoryStatus = () =>
  api.get("/history/status");

// Update History Status
export const updateHistoryStatus = (
  isPaused,
) =>
  api.patch(
    "/history/status",
    {
      isPaused,
    },
  );