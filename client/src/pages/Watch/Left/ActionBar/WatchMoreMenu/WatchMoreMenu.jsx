// Icons
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

// Components
import Dropdown from "../../../../../components/ui/Dropdown/Dropdown";
import DropdownItem from "../../../../../components/ui/Dropdown/DropdownItem";

// Styles
import "./WatchMoreMenu.css";

// Component
export default function WatchMoreMenu({
  isOpen,
  onClose,
}) {
  // Render
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="yt-watch-more-menu"
    >

      <DropdownItem
        icon={<PlaylistAddOutlinedIcon />}
        label="Save"
        onClick={onClose}
      />

      <DropdownItem
        icon={<DownloadOutlinedIcon />}
        label="Download"
        onClick={onClose}
      />

      <DropdownItem
        icon={<ContentCutOutlinedIcon />}
        label="Clip"
        onClick={onClose}
      />

      <div className="yt-watch-more-divider" />

      <DropdownItem
        icon={<FlagOutlinedIcon />}
        label="Report"
        onClick={onClose}
      />

      <DropdownItem
        icon={<BlockOutlinedIcon />}
        label="Not interested"
        onClick={onClose}
      />

      <DropdownItem
        icon={<PersonOffOutlinedIcon />}
        label="Don't recommend channel"
        onClick={onClose}
      />

    </Dropdown>
  );
}