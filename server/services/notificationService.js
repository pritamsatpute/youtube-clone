// Models
import Notification from "../models/Notification.js";

// Constants
import { NOTIFICATION_TYPES } from "../constants/notificationTypes.js";

// Create Notification
export const createNotification = async ({
  receiver,
  sender,
  type,
  video = null,
  comment = null,
}) => {
  // Don't notify yourself
  if (
    receiver.toString() ===
    sender.toString()
  ) {
    return null;
  }

  return Notification.create({
    receiver,
    sender,
    type,
    video,
    comment,
  });
};

// Get Notifications
export const getNotifications =
  async (userId) => {
    return Notification.find({
      receiver: userId,
    })
      .populate({
        path: "sender",
        select: "name avatar channel",
        populate: {
          path: "channel",
          select: "channelName handle avatar",
        },
      })
      .populate(
        "video",
        "title thumbnail",
      )
      .populate(
        "comment",
        "content",
      )
      .sort({
        createdAt: -1,
      });
  };

// Get Unread Count
export const getUnreadCount =
  async (userId) => {
    return Notification.countDocuments({
      receiver: userId,
      isRead: false,
    });
  };

// Mark As Read
export const markAsRead =
  async (
    notificationId,
    userId,
  ) => {
    return Notification.findOneAndUpdate(
      {
        _id: notificationId,
        receiver: userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      },
    );
  };

// Mark All As Read
export const markAllAsRead =
  async (userId) => {
    await Notification.updateMany(
      {
        receiver: userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    return true;
  };

// Delete Notification
export const deleteNotification =
  async (
    notificationId,
    userId,
  ) => {
    return Notification.findOneAndDelete({
      _id: notificationId,
      receiver: userId,
    });
  };

export {
  NOTIFICATION_TYPES,
};