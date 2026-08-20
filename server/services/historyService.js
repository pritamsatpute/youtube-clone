// Models
import History from "../models/History.js";
import HistorySetting from "../models/HistorySetting.js";
import Video from "../models/Video.js";

// Utils
import ApiError from "../utils/ApiError.js";
import { buildVideoResponse } from "../utils/videoResponse.js";

// Video Population
const videoPopulate = [
  {
    path: "video",
    populate: {
      path: "channel",
      select:
        "channelName handle avatar subscribersCount",
    },
  },
];

// Get History Setting
const getHistorySetting = async (
  userId,
) => {
  let setting =
    await HistorySetting.findOne({
      user: userId,
    });

  if (!setting) {
    setting =
      await HistorySetting.create({
        user: userId,
        isPaused: false,
      });
  }

  return setting;
};

// Record History
export const recordHistory = async (
  userId,
  videoId,
) => {
  // Validate Video
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Check History Setting
  const setting =
    await getHistorySetting(userId);

  // History Paused
  if (setting.isPaused) {
    return {
      recorded: false,
      paused: true,
    };
  }

  // Current Time
  const watchedAt = new Date();

  // Find Or Create History
  const history =
    await History.findOneAndUpdate(
      {
        user: userId,
        video: videoId,
      },
      {
        $set: {
          watchedAt,
        },
        $setOnInsert: {
          user: userId,
          video: videoId,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

  // Return
  return {
    recorded: true,
    updated:
      history.createdAt
        ? history.createdAt.getTime() !==
          history.updatedAt.getTime()
        : true,
    historyId: history._id,
  };
};

// Get My History
export const getMyHistory = async (
  userId,
) => {
  // Fetch History
  const history =
    await History.find({
      user: userId,
    })
      .populate(videoPopulate)
      .sort({
        watchedAt: -1,
      });

  // Remove Deleted Videos
  const validHistory =
    history.filter(
      (item) => item.video,
    );

  // Build Response
  return validHistory.map(
    (item) => ({
      id: item._id,

      watchedAt:
        item.watchedAt,

      video:
        buildVideoResponse(
          item.video,
        ),
    }),
  );
};

// Remove History Item
export const removeHistoryItem =
  async (
    userId,
    historyId,
  ) => {
    // Find History
    const history =
      await History.findOne({
        _id: historyId,
        user: userId,
      });

    // Validate
    if (!history) {
      throw new ApiError(
        404,
        "History item not found",
      );
    }

    // Delete
    await history.deleteOne();

    // Response
    return {
      success: true,
      message:
        "History item removed successfully",
    };
  };

// Remove History By Video
export const removeHistoryByVideo =
  async (
    userId,
    videoId,
  ) => {
    // Delete
    await History.deleteOne({
      user: userId,
      video: videoId,
    });

    // Response
    return {
      success: true,
      message:
        "Video removed from history",
    };
  };

// Clear History
export const clearHistory = async (
  userId,
) => {
  // Delete All History
  await History.deleteMany({
    user: userId,
  });

  // Response
  return {
    success: true,
    message:
      "Watch history cleared successfully",
  };
};

// Get History Status
export const getHistoryStatus =
  async (userId) => {
    // Get Setting
    const setting =
      await getHistorySetting(
        userId,
      );

    // Response
    return {
      isPaused:
        setting.isPaused,
    };
  };

// Update History Status
export const updateHistoryStatus =
  async (
    userId,
    isPaused,
  ) => {
    // Update Setting
    const setting =
      await HistorySetting.findOneAndUpdate(
        {
          user: userId,
        },
        {
          $set: {
            isPaused:
              Boolean(isPaused),
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

    // Response
    return {
      isPaused:
        setting.isPaused,
    };
  };