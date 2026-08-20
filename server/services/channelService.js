// Models
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import Subscription from "../models/Subscription.js";
import Video from "../models/Video.js";

// Utils
import ApiError from "../utils/ApiError.js";
import {
  buildVideoResponse,
} from "../utils/videoResponse.js";

// Create Channel
export const createChannel = async (
  userId,
  {
    channelName,
    handle,
    description,
  },
  files,
) => {
  // Find User
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check Existing Channel
  if (user.channel) {
    throw new ApiError(409, "User already owns a channel");
  }

  // Check Handle
  const existingHandle = await Channel.findOne({
    handle: handle.toLowerCase(),
  });

  if (existingHandle) {
    throw new ApiError(409, "Channel handle already exists");
  }

  const avatar =
    files?.avatar?.[0]
      ? `/uploads/avatars/${files.avatar[0].filename}`
      : user.avatar;

  const banner =
    files?.banner?.[0]
      ? `/uploads/banners/${files.banner[0].filename}`
      : "";

  // Create Channel
  const channel = await Channel.create({
    owner: user._id,
    channelName,
    handle: handle.toLowerCase(),
    description,
    avatar,
    banner,
  });

  // Update User
  user.channel = channel._id;

  await user.save();

  return channel;
};

// Get My Channel
export const getMyChannel = async (userId) => {
  const channel = await Channel.findOne({
    owner: userId,
  });

  // No Channel
  if (!channel) {
    return null;
  }

  return channel;
};

// Get Channel By Handle
export const getChannelByHandle = async (handle) => {
  const channel = await Channel.findOne({
    handle: handle.toLowerCase(),
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  return channel;
};

// Update Channel
export const updateChannel = async (userId, updates, files,) => {
  const channel = await Channel.findOne({
    owner: userId,
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  // Channel Name
  if (updates.channelName !== undefined) {
    channel.channelName = updates.channelName.trim();
  }

  // Description
  if (updates.description !== undefined) {
    channel.description = updates.description?.trim();
  }

  // Avatar
  if (files?.avatar?.[0]) {
    channel.avatar =
      `/uploads/avatars/${files.avatar[0].filename}`;
  }

  // Banner
  if (files?.banner?.[0]) {
    channel.banner =
      `/uploads/banners/${files.banner[0].filename}`;
  }
  await channel.save();

  return channel;
};

// Subscribe To Channel
export const subscribeToChannel = async (
  userId,
  channelId,
) => {
  // Find Channel
  const channel = await Channel.findById(
    channelId,
  );

  if (!channel) {
    throw new ApiError(
      404,
      "Channel not found",
    );
  }

  // Prevent Self Subscription
  if (
    channel.owner.toString() ===
    userId.toString()
  ) {
    throw new ApiError(
      400,
      "You cannot subscribe to your own channel",
    );
  }

  // Check Existing Subscription
  const existingSubscription =
    await Subscription.findOne({
      subscriber: userId,
      channel: channelId,
    });

  if (existingSubscription) {
    throw new ApiError(
      409,
      "Already subscribed",
    );
  }

  // Create Subscription
  await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  // Increment Subscriber Count
  channel.subscribersCount += 1;

  await channel.save();

  return {
    subscribed: true,
    subscribersCount:
      channel.subscribersCount,
  };
};

// Unsubscribe From Channel
export const unsubscribeFromChannel = async (
  userId,
  channelId,
) => {
  // Find Subscription
  const subscription =
    await Subscription.findOne({
      subscriber: userId,
      channel: channelId,
    });

  if (!subscription) {
    throw new ApiError(
      404,
      "Subscription not found",
    );
  }

  // Delete Subscription
  await subscription.deleteOne();

  // Decrement Subscriber Count
  const channel =
    await Channel.findByIdAndUpdate(
      channelId,
      {
        $inc: {
          subscribersCount: -1,
        },
      },
      {
        new: true,
      },
    );

  if (!channel) {
    throw new ApiError(
      404,
      "Channel not found",
    );
  }

  // Safety
  if (channel.subscribersCount < 0) {
    channel.subscribersCount = 0;

    await channel.save();
  }

  return {
    subscribed: false,
    subscribersCount:
      channel.subscribersCount,
  };
};

// Get Subscription Status
export const getSubscriptionStatus =
  async (
    userId,
    channelId,
  ) => {
    // Find Subscription
    const subscription =
      await Subscription.findOne({
        subscriber: userId,
        channel: channelId,
      });

    // Return Status
    return {
      subscribed:
        Boolean(subscription),
    };
  };

// Get My Subscriptions
export const getMySubscriptions =
  async (userId) => {
    // Find Subscriptions
    const subscriptions =
      await Subscription.find({
        subscriber: userId,
      })
        .populate(
          "channel",
          "channelName handle avatar subscribersCount",
        )
        .sort({
          createdAt: -1,
        });

    // Return Channels
    return subscriptions
      .filter(
        (subscription) =>
          subscription.channel,
      )
      .map(
        (subscription) =>
          subscription.channel,
      );
  };

  // Get Videos From My Subscriptions
export const getMySubscriptionVideos = async (
  userId,
) => {
  // Find Subscriptions
  const subscriptions =
    await Subscription.find({
      subscriber: userId,
    }).select("channel");

  // No Subscriptions
  if (!subscriptions.length) {
    return [];
  }

  // Channel IDs
  const channelIds =
    subscriptions.map(
      (subscription) =>
        subscription.channel,
    );

  // Find Videos
  const videos = await Video.find({
    channel: {
      $in: channelIds,
    },
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

  // Build Response
  return videos.map(buildVideoResponse);
};