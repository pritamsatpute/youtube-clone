// React Router
import { useNavigate } from "react-router-dom";

// Icons
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";

// Components
import Dropdown from "../../../ui/Dropdown/Dropdown";
import DropdownItem from "../../../ui/Dropdown/DropdownItem";

// Provider
import { useUpload } from "../../../../providers/UploadProvider";

// Styles
import "./CreateMenu.css";

// Component
export default function CreateMenu({ isOpen, onClose }) {
  const { openUpload } = useUpload();

  // Upload Video
  const handleUploadVideo = () => {
    onClose?.();
    openUpload();
  };

  // Go Live
  const handleGoLive = () => {
    onClose?.();

  };

  // Render
  return (
    <Dropdown isOpen={isOpen} onClose={onClose} className="yt-create-menu">
      <DropdownItem
        icon={<UploadOutlinedIcon />}
        label="Upload video"
        onClick={handleUploadVideo}
      />

      <DropdownItem
        icon={<SensorsOutlinedIcon />}
        label="Go live"
        onClick={handleGoLive}
      />
    </Dropdown>
  );
}
