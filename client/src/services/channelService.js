// API
import api from "./api";

// Create Channel
export const createChannel = (form) => {
  const data = new FormData();

  data.append(
    "channelName",
    form.channelName || "",
  );

  data.append(
    "handle",
    form.handle || "",
  );

  data.append(
    "description",
    form.description || "",
  );

  if (form.avatar) {
    data.append(
      "avatar",
      form.avatar,
    );
  }

  if (form.banner) {
    data.append(
      "banner",
      form.banner,
    );
  }

  return api.post(
    "/channels",
    data,
  );
};

// Get My Channel
export const getMyChannel = () =>
  api.get("/channels/me");

// Get Channel By Handle
export const getChannelByHandle = (
  handle,
) =>
  api.get(
    `/channels/handle/${handle}`,
  );

// Update Channel
export const updateChannel = (
  form,
) => {
  // Already FormData
  if (form instanceof FormData) {
    return api.patch(
      "/channels/me",
      form,
    );
  }

  // Create FormData
  const data = new FormData();

  // Text Fields
  if (
    form.channelName !==
    undefined
  ) {
    data.append(
      "channelName",
      form.channelName,
    );
  }

  if (
    form.handle !==
    undefined
  ) {
    data.append(
      "handle",
      form.handle,
    );
  }

  if (
    form.description !==
    undefined
  ) {
    data.append(
      "description",
      form.description,
    );
  }

  if (
    form.website !==
    undefined
  ) {
    data.append(
      "website",
      form.website,
    );
  }

  if (
    form.businessEmail !==
    undefined
  ) {
    data.append(
      "businessEmail",
      form.businessEmail,
    );
  }

  if (
    form.country !==
    undefined
  ) {
    data.append(
      "country",
      form.country,
    );
  }

  // Links
  if (
    form.links !==
    undefined
  ) {
    data.append(
      "links",
      JSON.stringify(
        form.links,
      ),
    );
  }

  // Avatar
  if (form.avatar) {
    data.append(
      "avatar",
      form.avatar,
    );
  }

  // Banner
  if (form.banner) {
    data.append(
      "banner",
      form.banner,
    );
  }

  return api.patch(
    "/channels/me",
    data,
  );
};

// Get My Subscriptions
export const getMySubscriptions =
  () =>
    api.get(
      "/channels/subscriptions",
    );

// Get My Subscription Videos
export const getMySubscriptionVideos =
  () =>
    api.get(
      "/channels/subscriptions/videos",
    );

// Subscribe
export const subscribeToChannel = (
  channelId,
) =>
  api.post(
    `/channels/${channelId}/subscribe`,
  );

// Unsubscribe
export const unsubscribeFromChannel = (
  channelId,
) =>
  api.delete(
    `/channels/${channelId}/subscribe`,
  );

// Get Subscription Status
export const getSubscriptionStatus = (
  channelId,
) =>
  api.get(
    `/channels/${channelId}/subscription-status`,
  );