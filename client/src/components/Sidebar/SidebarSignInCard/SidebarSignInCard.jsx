// React
import { Link } from "react-router-dom";

// Icons
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// Styles
import "./SidebarSignInCard.css";

// Component
export default function SidebarSignInCard() {

  // Render
  return (
    <div className="yt-sidebar-signin">
      <p className="yt-sidebar-signin-text">
        Sign in to  videos,
        comment and subscribe.
      </p>

      <Link
        to="/login"
        className="yt-sidebar-signin-button"
      >
        <AccountCircleOutlinedIcon />

        <span>Sign in</span>
      </Link>
    </div>
  );
}