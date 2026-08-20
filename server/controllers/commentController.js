// Services
import {
  createComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
    likeComment,
  unlikeComment,
  getCommentLikeStatus,
} from "../services/commentService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Comment
export const create = asyncHandler(async (req, res) => {
  const comment = await createComment(
    req.user._id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      "Comment created successfully",
      comment
    )
  );
});

// Get Video Comments
export const getByVideo = asyncHandler(async (req, res) => {
  const comments = await getCommentsByVideo(
    req.params.videoId
  );

  res.json(
    new ApiResponse(
      "Comments fetched successfully",
      comments
    )
  );
});

// Update Comment
export const update = asyncHandler(async (req, res) => {
  const comment = await updateComment(
    req.user._id,
    req.params.id,
    req.body.content
  );

  res.json(
    new ApiResponse(
      "Comment updated successfully",
      comment
    )
  );
});

// Delete Comment
export const remove = asyncHandler(async (req, res) => {
  await deleteComment(
    req.user._id,
    req.params.id
  );

  res.json(
    new ApiResponse(
      "Comment deleted successfully"
    )
  );
});

// Like Comment
export const like = asyncHandler(
  async (req, res) => {
    const result =
      await likeComment(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Comment liked successfully",
        result,
      ),
    );
  },
);

// Unlike Comment
export const unlike = asyncHandler(
  async (req, res) => {
    const result =
      await unlikeComment(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Comment unliked successfully",
        result,
      ),
    );
  },
);

// Get Comment Like Status
export const likeStatus =
  asyncHandler(
    async (req, res) => {
      const result =
        await getCommentLikeStatus(
          req.user._id,
          req.params.id,
        );

      res.json(
        new ApiResponse(
          "Comment like status fetched successfully",
          result,
        ),
      );
    },
  );