// React
import { Link } from "react-router-dom";

// Icons
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";
import formatDuration from "../../../utils/formatDuration";
import formatViews from "../../../utils/formatViews";
import formatRelativeDate from "../../../utils/formatRelativeDate";

// Styles
import "./SearchCard.css";

// Component
export default function SearchCard({ video }) {
  // Render
  return (
    <article className="yt-search-card">

      {/* Thumbnail */}
      <Link
        to={`/watch/${video.id}`}
        className="yt-search-thumbnail-link"
      >
        <div className="yt-search-thumbnail-wrapper">

          <img
            src={getMediaUrl(
              video.thumbnail,
            )}
            alt={video.title}
            className="yt-search-thumbnail"
          />

          {/* Duration */}
          {video.duration > 0 && (
            <span className="yt-search-duration">
              {formatDuration(
                video.duration,
              )}
            </span>
          )}

        </div>
      </Link>

      {/* Details */}
      <div className="yt-search-details">

        {/* Header */}
        <div className="yt-search-header">

          <Link
            to={`/watch/${video.id}`}
            className="yt-search-title"
          >
            {video.title}
          </Link>

          <button
            type="button"
            className="yt-search-menu"
            aria-label="Video options"
          >
            <MoreVertOutlinedIcon />
          </button>

        </div>

        {/* Stats */}
        <p className="yt-search-stats">
          {formatViews(video.views)}
          {" • "}
          {formatRelativeDate(
            video.uploadedAt,
          )}
        </p>

        {/* Channel */}
        <Link
          to={`/channel/${video.channelHandle}`}
          className="yt-search-channel"
        >
          <img
            src={getMediaUrl(
              video.avatar,
            )}
            alt={video.channel}
            className="yt-search-avatar"
          />

          <span>
            {video.channel}
          </span>
        </Link>

        {/* Description */}
        <p className="yt-search-description">
          {video.description}
        </p>

      </div>

    </article>
  );
}