// API
import api from "./api";

// Get Home Videos
export const getVideos = () =>
  api.get("/videos");

// Get Video By Id
export const getVideoById = (id) =>
  api.get(`/videos/${id}`);

// Get Channel Videos
export const getVideosByChannel = (
  handle
) =>
  api.get(
    `/videos/channel/${handle}`
  );

// Get My Videos
export const getMyVideos = () =>
  api.get("/videos/me");

// Create Video
export const createVideo = (
  data,
  options = {},
) =>
  api.post(
    "/videos",
    data,
    options,
  );

// Update Video
export const updateVideo = (
  videoId,
  updates,
) => {
  const data =
    new FormData();

  // Title
  if (
    updates.title !==
    undefined
  ) {
    data.append(
      "title",
      updates.title,
    );
  }

  // Description
  if (
    updates.description !==
    undefined
  ) {
    data.append(
      "description",
      updates.description,
    );
  }

  // Category
  if (
    updates.category !==
    undefined
  ) {
    data.append(
      "category",
      updates.category,
    );
  }

  // Tags
  if (
    updates.tags !==
    undefined
  ) {
    data.append(
      "tags",
      Array.isArray(
        updates.tags,
      )
        ? updates.tags.join(",")
        : updates.tags,
    );
  }

  // Audience
  if (
    updates.audience !==
    undefined
  ) {
    data.append(
      "audience",
      updates.audience,
    );
  }

  // Visibility
  if (
    updates.visibility !==
    undefined
  ) {
    data.append(
      "visibility",
      updates.visibility,
    );
  }

  // Comment Setting
  if (
    updates.commentSetting !==
    undefined
  ) {
    data.append(
      "commentSetting",
      updates.commentSetting,
    );
  }

  // Comment Sort
  if (
    updates.commentSort !==
    undefined
  ) {
    data.append(
      "commentSort",
      updates.commentSort,
    );
  }

  // Duration
  if (
    updates.duration !==
    undefined
  ) {
    data.append(
      "duration",
      String(updates.duration),
    );
  }

  // Thumbnail
  if (
    updates.thumbnail
  ) {
    data.append(
      "thumbnail",
      updates.thumbnail,
    );
  }

  return api.patch(
    `/videos/${videoId}`,
    data,
  );
};

// Delete Video
export const deleteVideo = (id) =>
  api.delete(`/videos/${id}`);

// Register Video View
export const registerVideoView = async (
  videoId,
) => {
  return api.post(
    `/videos/${videoId}/view`,
  );
};

// Like Video
export const likeVideo = (
  videoId,
) =>
  api.post(
    `/videos/${videoId}/like`,
  );

// Unlike Video
export const unlikeVideo = (
  videoId,
) =>
  api.delete(
    `/videos/${videoId}/like`,
  );

// Dislike Video
export const dislikeVideo = (
  videoId,
) =>
  api.post(
    `/videos/${videoId}/dislike`,
  );

// Undislike Video
export const undislikeVideo = (
  videoId,
) =>
  api.delete(
    `/videos/${videoId}/dislike`,
  );

// Get Like Status
export const getVideoLikeStatus = (
  videoId,
) =>
  api.get(
    `/videos/${videoId}/like-status`,
  );

// Get My Liked Videos
export const getMyLikedVideos = () =>
  api.get(
    "/videos/liked",
  );