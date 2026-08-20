// Services
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService.js";

// Utils
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get Notifications
export const getAll = asyncHandler(
  async (req, res) => {
    const notifications =
      await getNotifications(
        req.user._id,
      );

    res.json(
      new ApiResponse(
        "Notifications fetched successfully",
        notifications,
      ),
    );
  },
);

// Get Unread Count
export const unreadCount =
  asyncHandler(
    async (req, res) => {
      const count =
        await getUnreadCount(
          req.user._id,
        );

      res.json(
        new ApiResponse(
          "Unread count fetched successfully",
          {
            count,
          },
        ),
      );
    },
  );

// Mark Notification As Read
export const read =
  asyncHandler(
    async (req, res) => {
      const notification =
        await markAsRead(
          req.params.id,
          req.user._id,
        );

      res.json(
        new ApiResponse(
          "Notification marked as read",
          notification,
        ),
      );
    },
  );

// Mark All Notifications As Read
export const readAll =
  asyncHandler(
    async (req, res) => {
      await markAllAsRead(
        req.user._id,
      );

      res.json(
        new ApiResponse(
          "All notifications marked as read",
          null,
        ),
      );
    },
  );

// Delete Notification
export const remove =
  asyncHandler(
    async (req, res) => {
      await deleteNotification(
        req.params.id,
        req.user._id,
      );

      res.json(
        new ApiResponse(
          "Notification deleted successfully",
          null,
        ),
      );
    },
  );