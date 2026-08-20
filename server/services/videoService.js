// Models
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import VideoView from "../models/VideoView.js";
import VideoLike from "../models/VideoLike.js";
import VideoDislike from "../models/VideoDislike.js";

// Utils
import ApiError from "../utils/ApiError.js";
import { buildVideoResponse } from "../utils/videoResponse.js";

// History
import {
  recordHistory,
} from "./historyService.js";

// Create Video
export const createVideo = async (
  userId,
  {
    title,
    description,
    duration,
    visibility,
    audience,
    commentSetting,
    commentSort,
    category,
    tags,
  },
  files,
) => {
  // Find Channel
  const channel = await Channel.findOne({
    owner: userId,
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  // Validate Title
  if (!title?.trim()) {
    throw new ApiError(400, "Video title is required");
  }

  const thumbnail = files?.thumbnail?.[0]
    ? `/uploads/thumbnails/${files.thumbnail[0].filename}`
    : "";

  const videoUrl = files?.video?.[0]
    ? `/uploads/videos/${files.video[0].filename}`
    : "";

  // Create Video
  const video = await Video.create({
    owner: userId,
    channel: channel._id,

    title: title.trim(),
    description: description?.trim() || "",

    thumbnail: thumbnail?.trim() || "",

    videoUrl: videoUrl?.trim() || "",

    duration: Number(duration) || 0,

    visibility:
      visibility || "public",

    isPublished:
      (visibility || "public") ===
      "public",

    audience:
      audience || "not_for_kids",

    commentSetting:
      commentSetting || "allow",

    commentSort:
      commentSort || "top",

    category: category?.trim() || "Entertainment",

    tags:
      Array.isArray(tags)
        ? tags
        : typeof tags === "string"
          ? tags
            .split(",")
            .map((tag) =>
              tag.trim(),
            )
            .filter(Boolean)
          : [],
  });

  // Update Channel Count
  channel.videosCount += 1;

  await channel.save();

  // Populate Channel
  await video.populate(
    "channel",
    "channelName handle avatar subscribersCount",
  );

  return buildVideoResponse(video);
};

// Get All Videos
export const getVideos = async () => {
  const videos = await Video.find({
    isPublished: true,
    visibility: "public",
  })
    .populate(
      "channel",
      "channelName handle avatar subscribersCount",
    )
    .sort({
      createdAt: -1,
    });

  return videos.map(buildVideoResponse);
};

// Get Video By ID
export const getVideoById = async (
  videoId,
  userId = null,
) => {
  const video =
    await Video.findById(videoId)
      .populate(
        "channel",
        "channelName handle avatar subscribersCount",
      )
      .populate(
        "owner",
        "name avatar",
      );

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Private Video
  if (
    video.visibility ===
    "private" &&
    String(video.owner?._id) !==
    String(userId)
  ) {
    throw new ApiError(
      403,
      "This video is private",
    );
  }

  return buildVideoResponse(
    video,
  );
};

// Get My Videos
export const getMyVideos = async (userId) => {
  const videos = await Video.find({
    owner: userId,
  })
    .populate(
      "channel",
      "channelName handle avatar subscribersCount",
    )
    .sort({
      createdAt: -1,
    });

  return videos.map(buildVideoResponse);
};

// Get Videos By Channel
export const getVideosByChannel = async (handle) => {
  const channel = await Channel.findOne({
    handle: handle.toLowerCase(),
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const videos = await Video.find({
    channel: channel._id,
    isPublished: true,
    visibility: "public",
  })
    .populate(
      "channel",
      "channelName handle avatar subscribersCount",
    )
    .sort({
      createdAt: -1,
    });

  return videos.map(buildVideoResponse);
};

// Update Video
export const updateVideo = async (
  userId,
  videoId,
  updates,
  files,
) => {
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Ownership Check
  if (
    video.owner.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized",
    );
  }

  // Title
  if (
    updates.title !==
    undefined
  ) {
    if (
      !updates.title.trim()
    ) {
      throw new ApiError(
        400,
        "Video title is required",
      );
    }

    video.title =
      updates.title.trim();
  }

  // Description
  if (
    updates.description !==
    undefined
  ) {
    video.description =
      updates.description.trim();
  }

  // Thumbnail
  if (
    files?.thumbnail?.[0]
  ) {
    video.thumbnail =
      `/uploads/thumbnails/${files.thumbnail[0].filename}`;
  }

  // Video URL
  if (
    updates.videoUrl !==
    undefined
  ) {
    video.videoUrl =
      updates.videoUrl.trim();
  }

  // Duration
  if (
    updates.duration !==
    undefined
  ) {
    video.duration =
      Number(
        updates.duration,
      ) || 0;
  }

  // Visibility
  if (
    updates.visibility !==
    undefined
  ) {
    video.visibility =
      updates.visibility;

    video.isPublished =
      updates.visibility ===
      "public";
  }

  // Audience
  if (
    updates.audience !==
    undefined
  ) {
    video.audience =
      updates.audience;
  }

  // Comment Setting
  if (
    updates.commentSetting !==
    undefined
  ) {
    video.commentSetting =
      updates.commentSetting;
  }

  // Comment Sort
  if (
    updates.commentSort !==
    undefined
  ) {
    video.commentSort =
      updates.commentSort;
  }

  // Category
  if (
    updates.category !==
    undefined
  ) {
    video.category =
      updates.category.trim();
  }

  // Tags
  if (
    updates.tags !==
    undefined
  ) {
    if (
      Array.isArray(
        updates.tags,
      )
    ) {
      video.tags =
        updates.tags;
    } else if (
      typeof updates.tags ===
      "string"
    ) {
      video.tags =
        updates.tags
          .split(",")
          .map((tag) =>
            tag.trim(),
          )
          .filter(Boolean);
    }
  }

  await video.save();

  await video.populate(
    "channel",
    "channelName handle avatar subscribersCount",
  );

  return buildVideoResponse(
    video,
  );
};

// Delete Video
export const deleteVideo = async (
  userId,
  videoId,
) => {
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Ownership Check
  if (
    video.owner.toString() !==
    userId.toString()
  ) {
    throw new ApiError(403, "Unauthorized");
  }

  // Update Channel Count
  await Channel.findByIdAndUpdate(
    video.channel,
    {
      $inc: {
        videosCount: -1,
      },
    },
  );

  await video.deleteOne();

  return {
    success: true,
    message: "Video deleted successfully",
  };
};

// Register Video View
export const registerVideoView =
  async (
    userId,
    videoId,
  ) => {
    // Find Video
    const video =
      await Video.findById(
        videoId,
      );

    if (!video) {
      throw new ApiError(
        404,
        "Video not found",
      );
    }

    // Record Watch History
    await recordHistory(
      userId,
      videoId,
    );

    // Owner Cannot Increase View
    if (
      video.owner.toString() ===
      userId.toString()
    ) {
      return {
        counted: false,
        views: video.views,
      };
    }

    // Check Existing View
    const existingView =
      await VideoView.findOne({
        video: videoId,
        user: userId,
      });

    // Already Counted
    if (existingView) {
      return {
        counted: false,
        views: video.views,
      };
    }

    // Create View
    try {
      await VideoView.create({
        video: videoId,
        user: userId,
      });
    } catch (error) {
      // Duplicate Request
      if (
        error.code === 11000
      ) {
        const currentVideo =
          await Video.findById(
            videoId,
          );

        return {
          counted: false,
          views:
            currentVideo.views,
        };
      }

      throw error;
    }

    // Increment View Count
    const updatedVideo =
      await Video.findByIdAndUpdate(
        videoId,
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        },
      );

    return {
      counted: true,
      views:
        updatedVideo.views,
    };
  };

// Like Video
export const likeVideo = async (
  userId,
  videoId,
) => {
  // Find Video
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Check Existing Like
  const existingLike =
    await VideoLike.findOne({
      video: videoId,
      user: userId,
    });

  // Already Liked
  if (existingLike) {
    return {
      liked: true,
      disliked: false,
      likes: video.likes,
      dislikes: video.dislikes,
    };
  }

  // Remove Existing Dislike
  const deletedDislike =
    await VideoDislike.findOneAndDelete({
      video: videoId,
      user: userId,
    });

  if (deletedDislike) {
    video.dislikes = Math.max(
      video.dislikes - 1,
      0,
    );
  }

  // Create Like
  try {
    await VideoLike.create({
      video: videoId,
      user: userId,
    });
  } catch (error) {
    // Duplicate Request
    if (error.code === 11000) {
      return {
        liked: true,
        disliked: false,
        likes: video.likes,
        dislikes: video.dislikes,
      };
    }

    throw error;
  }

  // Increment Like Count
  video.likes += 1;

  await video.save();

  return {
    liked: true,
    disliked: false,
    likes: video.likes,
    dislikes: video.dislikes,
  };
};

// Unlike Video
export const unlikeVideo = async (
  userId,
  videoId,
) => {
  // Find Video
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Remove Like
  const deletedLike =
    await VideoLike.findOneAndDelete({
      video: videoId,
      user: userId,
    });

  // Already Unliked
  if (!deletedLike) {
    return {
      liked: false,
      disliked: false,
      likes: video.likes,
      dislikes: video.dislikes,
    };
  }

  // Decrease Like Count
  video.likes = Math.max(
    video.likes - 1,
    0,
  );

  await video.save();

  return {
    liked: false,
    disliked: false,
    likes: video.likes,
    dislikes: video.dislikes,
  };
};

// Dislike Video
export const dislikeVideo = async (
  userId,
  videoId,
) => {
  // Find Video
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Check Existing Dislike
  const existingDislike =
    await VideoDislike.findOne({
      video: videoId,
      user: userId,
    });

  // Already Disliked
  if (existingDislike) {
    return {
      liked: false,
      disliked: true,
      likes: video.likes,
      dislikes: video.dislikes,
    };
  }

  // Remove Existing Like
  const deletedLike =
    await VideoLike.findOneAndDelete({
      video: videoId,
      user: userId,
    });

  if (deletedLike) {
    video.likes = Math.max(
      video.likes - 1,
      0,
    );
  }

  // Create Dislike
  try {
    await VideoDislike.create({
      video: videoId,
      user: userId,
    });
  } catch (error) {
    // Duplicate Request
    if (error.code === 11000) {
      return {
        liked: false,
        disliked: true,
        likes: video.likes,
        dislikes: video.dislikes,
      };
    }

    throw error;
  }

  // Increment Dislike Count
  video.dislikes += 1;

  await video.save();

  return {
    liked: false,
    disliked: true,
    likes: video.likes,
    dislikes: video.dislikes,
  };
};

// Undislike Video
export const undislikeVideo = async (
  userId,
  videoId,
) => {
  // Find Video
  const video =
    await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Remove Dislike
  const deletedDislike =
    await VideoDislike.findOneAndDelete({
      video: videoId,
      user: userId,
    });

  // Already Undisliked
  if (!deletedDislike) {
    return {
      liked: false,
      disliked: false,
      likes: video.likes,
      dislikes: video.dislikes,
    };
  }

  // Decrease Dislike Count
  video.dislikes = Math.max(
    video.dislikes - 1,
    0,
  );

  await video.save();

  return {
    liked: false,
    disliked: false,
    likes: video.likes,
    dislikes: video.dislikes,
  };
};

// Get My Liked Videos
export const getMyLikedVideos = async (
  userId,
) => {
  const likedVideos =
    await VideoLike.find({
      user: userId,
    })
      .populate({
        path: "video",
        populate: {
          path: "channel",
          select:
            "channelName handle avatar subscribersCount",
        },
      })
      .sort({
        createdAt: -1,
      });

  return likedVideos
    .filter(
      (item) => item.video,
    )
    .map((item) =>
      buildVideoResponse(
        item.video,
      ),
    );
};

// Get Like Status
export const getVideoLikeStatus =
  async (
    userId,
    videoId,
  ) => {
    const like =
      await VideoLike.findOne({
        video: videoId,
        user: userId,
      });

    const dislike =
      await VideoDislike.findOne({
        video: videoId,
        user: userId,
      });

    const video =
      await Video.findById(videoId)
        .select(
          "likes dislikes",
        );

    if (!video) {
      throw new ApiError(
        404,
        "Video not found",
      );
    }

    return {
      liked: Boolean(like),
      disliked: Boolean(dislike),
      likes: video.likes,
      dislikes: video.dislikes,
    };
  };