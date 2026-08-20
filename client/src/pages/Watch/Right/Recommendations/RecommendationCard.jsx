// React
import { Link } from "react-router-dom";

// Icons
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

// Utils
import formatDuration from "../../../../utils/formatDuration";
import formatViews from "../../../../utils/formatViews";
import formatRelativeDate from "../../../../utils/formatRelativeDate";
import getMediaUrl from "../../../../utils/getMediaUrl";

// Styles
import "./RecommendationCard.css";

// Component
export default function RecommendationCard({ video }) {
  return (
    <article className="yt-recommendation-card">
      <Link
        to={`/watch/${video.id}`}
        className="yt-recommendation-thumbnail-link"
      >
        <div className="yt-recommendation-thumbnail-wrapper">
          <img
            src={getMediaUrl(video.thumbnail)}
            alt={video.title}
            className="yt-recommendation-thumbnail"
          />

          <span className="yt-recommendation-duration">
            {formatDuration(video.duration)}
          </span>
        </div>
      </Link>

      <div className="yt-recommendation-content">
        <div className="yt-recommendation-meta">
          <Link to={`/watch/${video.id}`} className="yt-recommendation-title">
            {video.title}
          </Link>

          <Link
            to={`/channel/${video.channelHandle}`}
            className="yt-recommendation-channel"
          >
            {video.channel}
          </Link>
          <p className="yt-recommendation-stats">
            {formatViews(video.views)}
            {" • "}
            {formatRelativeDate(video.uploadedAt)}
          </p>
        </div>

        <button
          type="button"
          className="yt-recommendation-menu"
          aria-label="Video options"
        >
          <MoreVertOutlinedIcon />
        </button>
      </div>
    </article>
  );
}
