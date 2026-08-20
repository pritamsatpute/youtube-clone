// Models
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import CommentLike from "../models/CommentLike.js";

// Notification
import {
  createNotification,
  NOTIFICATION_TYPES,
} from "./notificationService.js";

// Utils
import ApiError from "../utils/ApiError.js";
import { buildCommentResponse } from "../utils/commentResponse.js";

// Owner Population
const ownerPopulate = {
  path: "owner",
  select: "name username avatar channel",
  populate: {
    path: "channel",
    select: "handle channelName avatar",
  },
};

// Create Comment / Reply
export const createComment = async (
  userId,
  {
    videoId,
    content,
    parentComment = null,
  },
) => {
  // Validate Content
  if (!content?.trim()) {
    throw new ApiError(
      400,
      "Comment content is required",
    );
  }

  // Find Video
  const video = await Video.findById(
    videoId,
  ).populate("owner", "_id");

  if (!video) {
    throw new ApiError(
      404,
      "Video not found",
    );
  }

  // Validate Parent Comment
  if (parentComment) {
    const parent =
      await Comment.findById(
        parentComment,
      );

    if (!parent) {
      throw new ApiError(
        404,
        "Parent comment not found",
      );
    }

    if (
      parent.video.toString() !==
      videoId.toString()
    ) {
      throw new ApiError(
        400,
        "Invalid parent comment",
      );
    }
  }

  // Create Comment
  const comment = await Comment.create({
    video: videoId,
    owner: userId,
    parentComment,
    content: content.trim(),
  });

  // Increment Comment Count
  video.commentsCount += 1;

  await video.save();

  // Populate Owner + Channel
  await comment.populate(
    ownerPopulate,
  );

  // Reply Notification
  if (parentComment) {
    const parent =
      await Comment.findById(
        parentComment,
      );

    if (
      parent &&
      parent.owner.toString() !==
        userId.toString()
    ) {
      await createNotification({
        receiver: parent.owner,
        sender: userId,
        type: NOTIFICATION_TYPES.REPLY,
        video: video._id,
        comment: comment._id,
      });
    }
  }

  // Comment Notification
  else if (
    video.owner._id.toString() !==
    userId.toString()
  ) {
    await createNotification({
      receiver: video.owner._id,
      sender: userId,
      type: NOTIFICATION_TYPES.COMMENT,
      video: video._id,
      comment: comment._id,
    });
  }

  // Response
  return buildCommentResponse(
    comment,
  );
};

// Get Comments By Video
export const getCommentsByVideo = async (
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

  // Fetch Comments
  const comments =
    await Comment.find({
      video: videoId,
    })
      .populate(ownerPopulate)
      .sort({
        createdAt: -1,
      });

  // Parent Comments
  const parents =
    comments.filter(
      (comment) =>
        !comment.parentComment,
    );

  // Build Nested Structure
  return parents.map((parent) => {
    const replies = comments
      .filter(
        (reply) =>
          reply.parentComment?.toString() ===
          parent._id.toString(),
      )
      .map((reply) =>
        buildCommentResponse(
          reply,
        ),
      );

    return buildCommentResponse(
      parent,
      replies,
    );
  });
};

// Update Comment
export const updateComment = async (
  userId,
  commentId,
  content,
) => {
  // Find Comment
  const comment =
    await Comment.findById(
      commentId,
    );

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found",
    );
  }

  // Ownership Check
  if (
    comment.owner.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized",
    );
  }

  // Validate Content
  if (!content?.trim()) {
    throw new ApiError(
      400,
      "Comment content is required",
    );
  }

  // Update
  comment.content =
    content.trim();

  comment.isEdited = true;

  await comment.save();

  // Populate Owner + Channel
  await comment.populate(
    ownerPopulate,
  );

  // Response
  return buildCommentResponse(
    comment,
  );
};

// Delete Comment
export const deleteComment = async (
  userId,
  commentId,
) => {
  // Find Comment
  const comment =
    await Comment.findById(
      commentId,
    );

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found",
    );
  }

  // Ownership Check
  if (
    comment.owner.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Unauthorized",
    );
  }

  // Count Replies
  const repliesCount =
    await Comment.countDocuments({
      parentComment:
        comment._id,
    });

  // Delete Replies
  await Comment.deleteMany({
    parentComment:
      comment._id,
  });

  // Delete Comment
  await comment.deleteOne();

  // Update Video Comment Count
  await Video.findByIdAndUpdate(
    comment.video,
    {
      $inc: {
        commentsCount:
          -(repliesCount + 1),
      },
    },
  );

  // Response
  return {
    success: true,
    message:
      "Comment deleted successfully",
  };
};

// Like Comment
export const likeComment = async (
  userId,
  commentId,
) => {
  // Find Comment
  const comment =
    await Comment.findById(
      commentId,
    );

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found",
    );
  }

  // Check Existing Like
  const existingLike =
    await CommentLike.findOne({
      comment: commentId,
      user: userId,
    });

  // Already Liked
  if (existingLike) {
    return {
      liked: true,
      likes: comment.likes,
    };
  }

  // Create Like
  try {
    await CommentLike.create({
      comment: commentId,
      user: userId,
    });
  } catch (error) {
    // Duplicate Request
    if (error.code === 11000) {
      return {
        liked: true,
        likes: comment.likes,
      };
    }

    throw error;
  }

  // Increment Like Count
  const updatedComment =
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true,
      },
    );

  return {
    liked: true,
    likes: updatedComment.likes,
  };
};

// Unlike Comment
export const unlikeComment = async (
  userId,
  commentId,
) => {
  // Find Comment
  const comment =
    await Comment.findById(
      commentId,
    );

  if (!comment) {
    throw new ApiError(
      404,
      "Comment not found",
    );
  }

  // Remove Like
  const deletedLike =
    await CommentLike.findOneAndDelete({
      comment: commentId,
      user: userId,
    });

  // Already Unliked
  if (!deletedLike) {
    return {
      liked: false,
      likes: comment.likes,
    };
  }

  // Decrease Like Count
  const updatedComment =
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $inc: {
          likes: -1,
        },
      },
      {
        new: true,
      },
    );

  return {
    liked: false,
    likes: Math.max(
      updatedComment.likes,
      0,
    ),
  };
};

// Get Comment Like Status
export const getCommentLikeStatus =
  async (
    userId,
    commentId,
  ) => {
    // Find Comment
    const comment =
      await Comment.findById(
        commentId,
      ).select("likes");

    if (!comment) {
      throw new ApiError(
        404,
        "Comment not found",
      );
    }

    // Find Like
    const existingLike =
      await CommentLike.findOne({
        comment: commentId,
        user: userId,
      });

    return {
      liked: Boolean(
        existingLike,
      ),
      likes: comment.likes,
    };
  };