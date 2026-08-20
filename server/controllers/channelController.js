// Services
import {
  createChannel,
  getMyChannel,
  getChannelByHandle,
  updateChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
  getSubscriptionStatus,
  getMySubscriptions,
  getMySubscriptionVideos,
} from "../services/channelService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Channel
export const create = asyncHandler(async (req, res) => {
  const channel = await createChannel(
    req.user._id,
    req.body,
    req.files
  );

  res.status(201).json(
    new ApiResponse(
      "Channel created successfully",
      channel
    )
  );
});

// Get My Channel
export const getMy = asyncHandler(async (req, res) => {
  const channel = await getMyChannel(req.user._id);

  res.json(
    new ApiResponse(
      "Channel fetched successfully",
      channel
    )
  );
});

// Get Channel By Handle
export const getByHandle = asyncHandler(async (req, res) => {
  const channel = await getChannelByHandle(
    req.params.handle
  );

  res.json(
    new ApiResponse(
      "Channel fetched successfully",
      channel
    )
  );
});

// Update Channel
export const update = asyncHandler(async (req, res) => {
  const channel = await updateChannel(
    req.user._id,
    req.body,
    req.files
  );

  res.json(
    new ApiResponse(
      "Channel updated successfully",
      channel
    )
  );
});

// Subscribe
export const subscribe = asyncHandler(
  async (req, res) => {
    const result =
      await subscribeToChannel(
        req.user._id,
        req.params.channelId,
      );

    res.status(201).json(
      new ApiResponse(
        "Subscribed successfully",
        result,
      ),
    );
  },
);

// Unsubscribe
export const unsubscribe =
  asyncHandler(async (req, res) => {
    const result =
      await unsubscribeFromChannel(
        req.user._id,
        req.params.channelId,
      );

    res.json(
      new ApiResponse(
        "Unsubscribed successfully",
        result,
      ),
    );
  });

// Subscription Status
export const subscriptionStatus =
  asyncHandler(async (req, res) => {
    const result =
      await getSubscriptionStatus(
        req.user._id,
        req.params.channelId,
      );

    res.json(
      new ApiResponse(
        "Subscription status fetched successfully",
        result,
      ),
    );
  });

// My Subscriptions
export const mySubscriptions =
  asyncHandler(async (req, res) => {
    const channels =
      await getMySubscriptions(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "Subscriptions fetched successfully",
        channels,
      ),
    );
  });

// My Subscription Videos
export const mySubscriptionVideos =
  asyncHandler(async (req, res) => {
    const videos =
      await getMySubscriptionVideos(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "Subscription videos fetched successfully",
        videos,
      ),
    );
  });