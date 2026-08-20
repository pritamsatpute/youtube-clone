// React
import { Link } from "react-router-dom";

// Hooks
import useTheme from "../../hooks/useTheme";

// Icons
import MenuIcon from "@mui/icons-material/Menu";

// Assets
import youtubeLightLogo from "../../assets/logos/youtube-light.svg";
import youtubeDarkLogo from "../../assets/logos/youtube-dark.svg";

// Component
export default function HeaderLeft({ onMenuClick }) {

  // Hooks
  const { isDark } = useTheme();

  // Logo
  const logo = isDark
    ? youtubeDarkLogo
    : youtubeLightLogo;

  // Render
  return (
    <div className="yt-header-left">
      <button
        type="button"
        className="yt-icon-button"
        aria-label="Toggle navigation menu"
        aria-haspopup="menu"
        onClick={onMenuClick}
      >
        <MenuIcon className="yt-menu-icon" />
      </button>

      <Link to="/" className="yt-logo-link" aria-label="YouTube Home">
        <img src={logo} alt="YouTube" className="yt-logo" />
      </Link>
    </div>
  );
}