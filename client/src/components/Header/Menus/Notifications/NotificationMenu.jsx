// React
import {
  useEffect,
  useState,
} from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Icons
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// Services
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../../../../services/notificationService";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";
import formatRelativeDate from "../../../../utils/formatRelativeDate";

// Components
import Dropdown from "../../../ui/Dropdown/Dropdown";
import IconButton from "../../../ui/Button/IconButton";
import DropdownDivider from "../../../ui/Dropdown/DropdownDivider";

// Styles
import "./NotificationMenu.css";

// Component
export default function NotificationMenu({
  isOpen,
  onClose,
  onUnreadCountChange,
}) {
  // Navigation
  const navigate = useNavigate();

  // State
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // Load Notifications
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadNotifications =
      async () => {
        try {
          setLoading(true);

          const response =
            await getNotifications();

          const data =
            response?.data || [];

          setNotifications(data);

          // Update Unread Count
          const unreadCount =
            data.filter(
              (notification) =>
                !notification.isRead,
            ).length;

          onUnreadCountChange?.(
            unreadCount,
          );
        } catch (error) {
          console.error(
            "Failed to load notifications:",
            error,
          );
        } finally {
          setLoading(false);
        }
      };

    loadNotifications();
  }, [
    isOpen,
    onUnreadCountChange,
  ]);

  // Mark Notification Read
  const handleRead = async (
    notification,
  ) => {
    if (notification.isRead) {
      return;
    }

    try {
      await markAsRead(
        notification._id,
      );

      setNotifications(
        (previous) =>
          previous.map((item) =>
            item._id ===
            notification._id
              ? {
                  ...item,
                  isRead: true,
                }
              : item,
          ),
      );

      // Decrease Unread Count
      onUnreadCountChange?.(
        (previous) =>
          Math.max(previous - 1, 0),
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error,
      );
    }
  };

  // Navigate Notification
  const handleNotificationClick =
    async (notification) => {
      // Mark As Read
      await handleRead(notification);

      // Close Menu
      onClose?.();

      // Video Notification
      if (notification.video?._id) {
        navigate(
          `/watch/${notification.video._id}`,
        );

        return;
      }

      // Channel Notification
      const handle =
        notification.sender
          ?.channel?.handle;

      if (handle) {
        navigate(
          `/channel/${handle}`,
        );
      }
    };

  // Mark All Read
  const handleReadAll =
    async () => {
      try {
        await markAllAsRead();

        setNotifications(
          (previous) =>
            previous.map((item) => ({
              ...item,
              isRead: true,
            })),
        );

        // Reset Unread Count
        onUnreadCountChange?.(0);
      } catch (error) {
        console.error(
          "Failed to mark all notifications as read:",
          error,
        );
      }
    };

  // Notification Message
  const getNotificationMessage =
    (notification) => {
      switch (notification.type) {
        case "comment":
          return "commented on your video.";

        case "reply":
          return "replied to your comment.";

        case "subscribe":
          return "subscribed to your channel.";

        case "video_upload":
          return "uploaded a new video.";

        case "like_comment":
          return "liked your comment.";

        case "like_video":
          return "liked your video.";

        default:
          return "sent you a notification.";
      }
    };

  // Loading
  if (loading) {
    return (
      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        className="yt-notifications-menu"
      >
        <div className="yt-notifications-header">
          <h3>Notifications</h3>

          <IconButton
            ariaLabel="Mark all as read"
            onClick={handleReadAll}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </div>

        <DropdownDivider />

        <div className="yt-notification-empty">
          Loading notifications...
        </div>
      </Dropdown>
    );
  }

  // Render
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="yt-notifications-menu"
    >
      {/* Header */}
      <div className="yt-notifications-header">
        <h3>Notifications</h3>

        <IconButton
          ariaLabel="Mark all as read"
          onClick={handleReadAll}
        >
          <SettingsOutlinedIcon />
        </IconButton>
      </div>

      <DropdownDivider />

      {/* Notifications */}
      <div className="yt-notifications-list">
        {notifications.length === 0 ? (
          <div className="yt-notification-empty">
            <h4>
              You're all caught up
            </h4>

            <p>
              We'll notify you when
              there's something new.
            </p>
          </div>
        ) : (
          notifications.map(
            (notification) => {
              // Sender Avatar
              const senderAvatar =
                notification.sender
                  ?.channel?.avatar ||
                notification.sender
                  ?.avatar ||
                "/images/default-avatar.png";

              // Sender Name
              const senderName =
                notification.sender
                  ?.name ||
                "Someone";

              // Message
              const message =
                getNotificationMessage(
                  notification,
                );

              return (
                <button
                  key={notification._id}
                  type="button"
                  className={`yt-notification-item ${
                    notification.isRead
                      ? "is-read"
                      : "is-unread"
                  }`}
                  onClick={() =>
                    handleNotificationClick(
                      notification,
                    )
                  }
                >
                  {/* Sender Avatar */}
                  <img
                    src={getMediaUrl(
                      senderAvatar,
                    )}
                    alt={senderName}
                    className="yt-notification-avatar"
                  />

                  {/* Content */}
                  <div className="yt-notification-content">
                    <p>
                      <strong>
                        {senderName}
                      </strong>

                      {" "}

                      {message}
                    </p>

                    <span>
                      {formatRelativeDate(
                        notification.createdAt,
                      )}
                    </span>
                  </div>

                  {/* Video Thumbnail */}
                  {notification.video
                    ?.thumbnail && (
                    <img
                      src={getMediaUrl(
                        notification.video
                          .thumbnail,
                      )}
                      alt={
                        notification.video
                          .title ||
                        "Video"
                      }
                      className="yt-notification-thumbnail"
                    />
                  )}

                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <span className="yt-notification-dot" />
                  )}
                </button>
              );
            },
          )
        )}
      </div>
    </Dropdown>
  );
}