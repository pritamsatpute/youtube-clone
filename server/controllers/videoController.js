// Services
import {
  createVideo,
  getVideos,
  getVideoById,
  getMyVideos,
  getVideosByChannel,
  updateVideo,
  deleteVideo,
  registerVideoView,
  likeVideo,
  unlikeVideo,
  dislikeVideo,
  undislikeVideo,
  getMyLikedVideos,
  getVideoLikeStatus,
} from "../services/videoService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Video
export const create = asyncHandler(async (req, res) => {
  const video = await createVideo(
    req.user._id,
    req.body,
    req.files
  );

  res.status(201).json(
    new ApiResponse(
      "Video created successfully",
      video
    )
  );
});

// Get All Videos
export const getAll = asyncHandler(async (req, res) => {
  const videos = await getVideos();

  res.json(
    new ApiResponse(
      "Videos fetched successfully",
      videos
    )
  );
});

// Get Video By ID
export const getById =
  asyncHandler(
    async (req, res) => {
      const video =
        await getVideoById(
          req.params.id,
          req.user?._id ||
            null,
        );

      res.json(
        new ApiResponse(
          "Video fetched successfully",
          video,
        ),
      );
    },
  );

// Get My Videos
export const getMine = asyncHandler(async (req, res) => {
  const videos = await getMyVideos(
    req.user._id
  );

  res.json(
    new ApiResponse(
      "My videos fetched successfully",
      videos
    )
  );
});

// Get Videos By Channel
export const getByChannel = asyncHandler(
  async (req, res) => {
    const videos =
      await getVideosByChannel(
        req.params.handle
      );

    res.json(
      new ApiResponse(
        "Channel videos fetched successfully",
        videos
      )
    );
  }
);

// Update Video
export const update = asyncHandler(
  async (req, res) => {
    const video =
      await updateVideo(
        req.user._id,
        req.params.id,
        req.body,
        req.files,
      );

    res.json(
      new ApiResponse(
        "Video updated successfully",
        video,
      ),
    );
  },
);

// Delete Video
export const remove = asyncHandler(async (req, res) => {
  await deleteVideo(
    req.user._id,
    req.params.id
  );

  res.json(
    new ApiResponse(
      "Video deleted successfully"
    )
  );
});

// Register Video View
export const view = asyncHandler(
  async (req, res) => {
    const result =
      await registerVideoView(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        result.counted
          ? "View counted"
          : "View already counted",
        result,
      ),
    );
  },
);

// Like Video
export const like = asyncHandler(
  async (req, res) => {
    const result =
      await likeVideo(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Video liked successfully",
        result,
      ),
    );
  },
);

// Unlike Video
export const unlike = asyncHandler(
  async (req, res) => {
    const result =
      await unlikeVideo(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Video unliked successfully",
        result,
      ),
    );
  },
);

// Dislike Video
export const dislike = asyncHandler(
  async (req, res) => {
    const result =
      await dislikeVideo(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Video disliked successfully",
        result,
      ),
    );
  },
);

// Undislike Video
export const undislike = asyncHandler(
  async (req, res) => {
    const result =
      await undislikeVideo(
        req.user._id,
        req.params.id,
      );

    res.json(
      new ApiResponse(
        "Video undisliked successfully",
        result,
      ),
    );
  },
);

// Get My Liked Videos
export const getLiked = asyncHandler(
  async (req, res) => {
    const videos =
      await getMyLikedVideos(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "Liked videos fetched successfully",
        videos,
      ),
    );
  },
);

// Get Like Status
export const likeStatus =
  asyncHandler(
    async (req, res) => {
      const result =
        await getVideoLikeStatus(
          req.user._id,
          req.params.id,
        );

      res.json(
        new ApiResponse(
          "Like status fetched successfully",
          result,
        ),
      );
    },
  );