// API
import api from "./api";

// Get Comments
export const getComments = (videoId) =>
  api.get(
    `/comments/video/${videoId}`,
  );

// Create Comment
export const createComment = (
  data,
) =>
  api.post(
    "/comments",
    data,
  );

// Update Comment
export const updateComment = (
  id,
  data,
) =>
  api.patch(
    `/comments/${id}`,
    data,
  );

// Delete Comment
export const deleteComment = (
  id,
) =>
  api.delete(
    `/comments/${id}`,
  );

// Like Comment
export const likeComment = (
  commentId,
) =>
  api.post(
    `/comments/${commentId}/like`,
  );

// Unlike Comment
export const unlikeComment = (
  commentId,
) =>
  api.delete(
    `/comments/${commentId}/like`,
  );

// Get Comment Like Status
export const getCommentLikeStatus = (
  commentId,
) =>
  api.get(
    `/comments/${commentId}/like-status`,
  );