// API
import api from "./api";

// Get Notifications
export const getNotifications = () =>
  api.get("/notifications");

// Get Unread Count
export const getUnreadCount = () =>
  api.get(
    "/notifications/unread-count",
  );

// Mark As Read
export const markAsRead = (id) =>
  api.patch(
    `/notifications/${id}/read`,
  );

// Mark All As Read
export const markAllAsRead = () =>
  api.patch(
    "/notifications/read-all",
  );

// Delete Notification
export const deleteNotification = (
  id,
) =>
  api.delete(
    `/notifications/${id}`,
  );