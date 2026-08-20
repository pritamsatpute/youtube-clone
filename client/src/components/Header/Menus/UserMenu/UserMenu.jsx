// React
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Icons
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";

// Services
import { getUnreadCount } from "../../../../services/notificationService";

// Components
import CreateMenu from "../Create/CreateMenu";
import NotificationMenu from "../Notifications/NotificationMenu";
import ProfileMenu from "../Profile/ProfileMenu";

import IconButton from "../../../ui/Button/IconButton";
import PillButton from "../../../ui/Button/PillButton";

// Styles
import "./UserMenu.css";

// Component
export default function UserMenu({ user }) {
  // State
  const notificationRef =
    useRef(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const [
    isNotificationsOpen,
    setIsNotificationsOpen,
  ] = useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);

  // Load Unread Count
  const loadUnreadCount =
    useCallback(async () => {
      if (!user) {
        setUnreadCount(0);

        return;
      }

      try {
        const response =
          await getUnreadCount();

        setUnreadCount(
          response?.data?.count || 0,
        );
      } catch (error) {
        console.error(
          "Failed to load notification count:",
          error,
        );
      }
    }, [user]);

  // Load Unread Count
  useEffect(() => {
    loadUnreadCount();

    if (!user) {
      return undefined;
    }

    // Refresh Notification Count
    const intervalId =
      setInterval(() => {
        loadUnreadCount();
      }, 30000);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [user, loadUnreadCount]);

  // Channel Avatar
  const avatar =
    user?.channel?.avatar ||
    user?.avatar ||
    "/images/default-avatar.png";

  // Channel Name
  const channelName =
    user?.channel?.channelName ||
    user?.name ||
    "User";

  // Close All Menus
  const closeAllMenus = () => {
    setIsCreateOpen(false);

    setIsNotificationsOpen(false);

    setIsProfileOpen(false);
  };

  // Toggle Create Menu
  const toggleCreateMenu = () => {
    const nextState =
      !isCreateOpen;

    closeAllMenus();

    setIsCreateOpen(nextState);
  };

  // Toggle Notification Menu
  const toggleNotificationMenu = () => {
    const nextState =
      !isNotificationsOpen;

    closeAllMenus();

    setIsNotificationsOpen(
      nextState,
    );
  };

  // Toggle Profile Menu
  const toggleProfileMenu = () => {
    const nextState =
      !isProfileOpen;

    closeAllMenus();

    setIsProfileOpen(
      nextState,
    );
  };

  // Render
  return (
    <div className="yt-user-menu">
      {/* Create */}
      <div className="yt-create-wrapper">
        <PillButton
          icon={<AddIcon />}
          text="Create"
          aria-haspopup="menu"
          aria-expanded={
            isCreateOpen
          }
          onClick={
            toggleCreateMenu
          }
        />

        <CreateMenu
          isOpen={
            isCreateOpen
          }
          onClose={
            closeAllMenus
          }
        />
      </div>

      {/* Notifications */}
      <div
        ref={notificationRef}
        className="yt-notification-wrapper"
      >
        <IconButton
          ariaLabel="Notifications"
          aria-haspopup="menu"
          aria-expanded={
            isNotificationsOpen
          }
          onClick={
            toggleNotificationMenu
          }
        >
          <NotificationsNoneIcon />
        </IconButton>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="yt-notification-badge">
            {unreadCount > 9
              ? "9+"
              : unreadCount}
          </span>
        )}

        <NotificationMenu
          isOpen={
            isNotificationsOpen
          }
          onClose={
            closeAllMenus
          }
          triggerRef={
            notificationRef
          }
          onUnreadCountChange={
            setUnreadCount
          }
        />
      </div>

      {/* Profile */}
      <div className="yt-avatar-wrapper">
        <button
          type="button"
          className="yt-avatar-btn"
          aria-label="Open account menu"
          aria-haspopup="menu"
          aria-expanded={
            isProfileOpen
          }
          onClick={
            toggleProfileMenu
          }
        >
          <img
            src={getMediaUrl(
              avatar,
            )}
            alt={channelName}
            className="yt-avatar"
          />
        </button>

        <ProfileMenu
          isOpen={
            isProfileOpen
          }
          onClose={
            closeAllMenus
          }
          user={user}
        />
      </div>
    </div>
  );
}