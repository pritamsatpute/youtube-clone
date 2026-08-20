// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Hooks
import useDialog from "../../../../hooks/useDialog";
import useMenuNavigation from "../../../../hooks/useMenuNavigation";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import IconButton from "../../../ui/Button/IconButton";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import DropdownItem from "../../../ui/Dropdown/DropdownItem";
import DropdownDivider from "../../../ui/Dropdown/DropdownDivider";

import AppearanceView from "../Views/AppearanceView";
import LanguageView from "../Views/LanguageView";
import KeyboardShortcutsDialog from "../Views/KeyboardShortcutsDialog";

// Styles
import "./GuestMenu.css";

// Component
export default function GuestMenu() {
  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation
  const { view, openView, goBack, reset } = useMenuNavigation();

  // Dialogs
  const keyboardDialog = useDialog();

  // Handlers
  const toggleMenu = () => {
    setIsMenuOpen((previous) => {
      const next = !previous;

      if (!next) {
        reset();
      }

      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

    reset();
  };

  const openKeyboardShortcuts = () => {
    keyboardDialog.open();

    closeMenu();
  };

  // Main View
  const renderMainView = () => (
    <>
      <DropdownItem
        icon={<PaletteOutlinedIcon />}
        label="Appearance"
        endIcon={<ChevronRightIcon />}
        onClick={() => openView("appearance")}
      />

      <DropdownItem
        icon={<LanguageOutlinedIcon />}
        label="Language"
        endIcon={<ChevronRightIcon />}
        onClick={() => openView("language")}
      />

      <DropdownItem icon={<VisibilityOutlinedIcon />} label="Restricted Mode" />

      <DropdownItem icon={<PublicOutlinedIcon />} label="Location" />

      <DropdownItem
        icon={<KeyboardOutlinedIcon />}
        label="Keyboard shortcuts"
        onClick={openKeyboardShortcuts}
      />

      <DropdownDivider />

      <DropdownItem icon={<SettingsOutlinedIcon />} label="Settings" />

      <DropdownItem icon={<HelpOutlineOutlinedIcon />} label="Help" />

      <DropdownItem icon={<FeedbackOutlinedIcon />} label="Send feedback" />
    </>
  );

  // Render
  return (
    <>
      <div className="yt-guest-menu">
        <div className="yt-guest-menu-wrapper">
          <IconButton ariaLabel="More options" onClick={toggleMenu}>
            <MoreVertIcon />
          </IconButton>

          <Dropdown
            isOpen={isMenuOpen}
            onClose={closeMenu}
            className="yt-guest-dropdown"
          >
            {view === "main" && renderMainView()}

            {view === "appearance" && <AppearanceView onBack={goBack} />}

            {view === "language" && <LanguageView onBack={goBack} />}
          </Dropdown>
        </div>

        <Link to="/login" className="yt-signin-btn">
          <AccountCircleOutlinedIcon />

          <span>Sign in</span>
        </Link>
      </div>

      <KeyboardShortcutsDialog
        isOpen={keyboardDialog.isOpen}
        onClose={keyboardDialog.close}
      />
    </>
  );
}
