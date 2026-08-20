// React
import { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Components
import VideoMenu from "../../../components/VideoMenu/VideoMenu";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";
import formatDuration from "../../../utils/formatDuration";
import formatViews from "../../../utils/formatViews";
import formatRelativeDate from "../../../utils/formatRelativeDate";

// Styles
import "./VideoCard.css";

// Component
export default function VideoCard({ video, isOwner = false }) {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Open Menu
  const openMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsMenuOpen(true);
  };

  // Close Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Menu Action
  const handleMenuAction = (action) => {
    console.log(action, video.id);
  };

  // Render
  return (
    <article className="video-card">
      {/* Thumbnail */}
      <Link to={`/watch/${video.id}`} className="thumbnail-link">
        <div className="video-thumbnail-wrapper">
          <img
            src={getMediaUrl(video.thumbnail)}
            alt={video.title}
            className="video-thumbnail"
          />

          {/* Duration */}
          {video.duration > 0 && (
            <span className="video-duration">
              {formatDuration(video.duration)}
            </span>
          )}
        </div>
      </Link>

      {/* Video Info */}
      <div className="video-info">
        {/* Channel Avatar */}
        <Link
          to={`/channel/${video.channelHandle}`}
          className="channel-avatar-link"
        >
          <img
            src={getMediaUrl(video.avatar)}
            alt={video.channel}
            className="channel-avatar"
          />
        </Link>

        {/* Video Meta */}
        <div className="video-meta">
          <Link to={`/watch/${video.id}`} className="video-title-link">
            <h3 className="video-title">{video.title}</h3>
          </Link>

          <Link
            to={`/channel/${video.channelHandle}`}
            className="video-channel-link"
          >
            {video.channel}
          </Link>

          <p className="video-stats">
            {formatViews(video.views)}
            {" • "}
            {formatRelativeDate(video.uploadedAt)}
          </p>
        </div>

        {/* Video Menu */}
        <div className="video-menu-wrapper">
          <button
            type="button"
            className="video-menu-btn"
            aria-label="Video options"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <MoreVertIcon />
          </button>

          <VideoMenu
            isOpen={isMenuOpen}
            onClose={closeMenu}
            onAction={handleMenuAction}
            isOwner={isOwner}
          />
        </div>
      </div>
    </article>
  );
}
