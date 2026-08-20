// React Router
import { useNavigate } from "react-router-dom";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";

// Provider
import { useAuth } from "../../../../providers/AuthProvider";

// Hooks
import useDialog from "../../../../hooks/useDialog";
import useMenuNavigation from "../../../../hooks/useMenuNavigation";

// Icons
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

// Components
import Dropdown from "../../../ui/Dropdown/Dropdown";
import DropdownItem from "../../../ui/Dropdown/DropdownItem";
import DropdownDivider from "../../../ui/Dropdown/DropdownDivider";

import CreateChannelDialog from "../../../Dialogs/CreateChannelDialog/CreateChannelDialog";

import AppearanceView from "../Views/AppearanceView";
import LanguageView from "../Views/LanguageView";
import KeyboardShortcutsDialog from "../Views/KeyboardShortcutsDialog";
import SwitchAccountView from "../Views/SwitchAccountView";

// Styles
import "./ProfileMenu.css";

// Component
export default function ProfileMenu({
  isOpen,
  onClose,
  user,
}) {
  // Navigation
  const navigate = useNavigate();

  // Auth
  const { logout } = useAuth();

  // Menu Navigation
  const {
    view,
    openView,
    goBack,
    reset,
  } = useMenuNavigation();

  // Dialogs
  const keyboardDialog =
    useDialog();

  const createChannelDialog =
    useDialog();

  // Channel
  const hasChannel =
    Boolean(user?.channel);

  // Display Name
  const displayName =
    user?.channel?.channelName ||
    user?.name ||
    "User";

  // Display Username
  const displayUsername =
    user?.username
      ? `@${user.username}`
      : user?.email || "";

  // Avatar
  const avatar =
    hasChannel
      ? user?.channel?.avatar
      : user?.avatar;

  // Close Menu
  const handleClose = () => {
    onClose?.();

    reset();
  };

  // Logout
  const handleLogout =
    async () => {
      await logout();

      handleClose();

      navigate("/login", {
        replace: true,
      });
    };

  // View / Create Channel
  const openChannel = () => {
    handleClose();

    if (hasChannel) {
      navigate(
        `/channel/${user.channel.handle}`,
      );

      return;
    }

    createChannelDialog.open();
  };

  // Keyboard Shortcuts
  const openKeyboardShortcuts =
    () => {
      keyboardDialog.open();

      handleClose();
    };

  // Main View
  const renderMainView = () => (
    <>
      {/* Header */}
      <div className="yt-profile-header">
        <img
          src={getMediaUrl(
            avatar ||
              "/images/default-avatar.png",
          )}
          alt={displayName}
          className="yt-profile-avatar"
        />

        <div className="yt-profile-info">
          <h4>
            {displayName}
          </h4>

          {/* Email / Channel Handle */}
          <p>
            {hasChannel
              ? `@${user?.channel?.handle}`
              : user?.email}
          </p>

          <button
            type="button"
            className="yt-view-channel"
            onClick={
              openChannel
            }
          >
            {hasChannel
              ? "View your channel"
              : "Create channel"}
          </button>
        </div>
      </div>

      <DropdownDivider />

      {/* Switch Account */}
      <DropdownItem
        icon={
          <SwitchAccountOutlinedIcon />
        }
        label="Switch account"
        endIcon={
          <ChevronRightOutlinedIcon />
        }
        onClick={() =>
          openView(
            "switch-account",
          )
        }
      />

      {/* Logout */}
      <DropdownItem
        icon={
          <LogoutOutlinedIcon />
        }
        label="Sign out"
        onClick={
          handleLogout
        }
      />

      <DropdownDivider />

      {/* Appearance */}
      <DropdownItem
        icon={
          <PaletteOutlinedIcon />
        }
        label="Appearance"
        endIcon={
          <ChevronRightOutlinedIcon />
        }
        onClick={() =>
          openView(
            "appearance",
          )
        }
      />

      {/* Language */}
      <DropdownItem
        icon={
          <LanguageOutlinedIcon />
        }
        label="Language"
        endIcon={
          <ChevronRightOutlinedIcon />
        }
        onClick={() =>
          openView(
            "language",
          )
        }
      />

      {/* Location */}
      <DropdownItem
        icon={
          <PublicOutlinedIcon />
        }
        label="Location"
      />

      {/* Keyboard */}
      <DropdownItem
        icon={
          <KeyboardOutlinedIcon />
        }
        label="Keyboard shortcuts"
        onClick={
          openKeyboardShortcuts
        }
      />

      <DropdownDivider />

      {/* Settings */}
      <DropdownItem
        icon={
          <SettingsOutlinedIcon />
        }
        label="Settings"
      />

      {/* Help */}
      <DropdownItem
        icon={
          <HelpOutlineOutlinedIcon />
        }
        label="Help"
      />

      {/* Feedback */}
      <DropdownItem
        icon={
          <FeedbackOutlinedIcon />
        }
        label="Send feedback"
      />
    </>
  );

  // Render
  return (
    <>
      <Dropdown
        isOpen={isOpen}
        onClose={handleClose}
        className="yt-profile-menu"
      >
        {/* Main */}
        {view === "main" &&
          renderMainView()}

        {/* Switch Account */}
        {view ===
          "switch-account" && (
          <SwitchAccountView
            onBack={goBack}
          />
        )}

        {/* Appearance */}
        {view ===
          "appearance" && (
          <AppearanceView
            onBack={goBack}
          />
        )}

        {/* Language */}
        {view === "language" && (
          <LanguageView
            onBack={goBack}
          />
        )}
      </Dropdown>

      {/* Keyboard Shortcuts */}
      <KeyboardShortcutsDialog
        isOpen={
          keyboardDialog.isOpen
        }
        onClose={
          keyboardDialog.close
        }
      />

      {/* Create Channel */}
      <CreateChannelDialog
        isOpen={
          createChannelDialog.isOpen
        }
        onClose={
          createChannelDialog.close
        }
      />
    </>
  );
}