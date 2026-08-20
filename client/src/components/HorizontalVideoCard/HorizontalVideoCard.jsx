// React Router
import { Link } from "react-router-dom";

// Icons
import { MdMoreVert } from "react-icons/md";

// Utils
import getMediaUrl from "../../utils/getMediaUrl";
import formatRelativeDate from "../../utils/formatRelativeDate";

// Services
import { removeHistoryItem } from "../../services/historyService";

// Styles
import "./HorizontalVideoCard.css";

// Format Duration
const formatDuration = (seconds) => {
  const totalSeconds =
    Number(seconds) || 0;

  if (totalSeconds <= 0) {
    return "";
  }

  const hours = Math.floor(
    totalSeconds / 3600,
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );

  const remainingSeconds =
    totalSeconds % 60;

  const formattedSeconds =
    String(
      remainingSeconds,
    ).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(
      minutes,
    ).padStart(
      2,
      "0",
    )}:${formattedSeconds}`;
  }

  return `${minutes}:${formattedSeconds}`;
};

// Horizontal Video Card
export default function HorizontalVideoCard({
  video,
  historyId,
  onRemove,
  showMenu = true,
}) {
  // Remove From History
  const handleRemoveFromHistory =
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      // History ID Required
      if (!historyId) {
        return;
      }

      try {
        await removeHistoryItem(
          historyId,
        );

        onRemove?.(historyId);
      } catch (error) {
        console.error(
          "Failed to remove history item:",
          error,
        );
      }
    };

  // Channel Name
  const channelName =
    video?.channel ||
    video?.channelName ||
    "Unknown channel";

  // Views
  const views =
    Number(video?.views || 0)
      .toLocaleString();

  // Uploaded Date
  const uploadedDate =
    video?.uploadedAt
      ? formatRelativeDate(
          video.uploadedAt,
        )
      : video?.uploaded ||
        "";

  // Duration
  const duration =
    formatDuration(
      video?.duration,
    );

  // Video ID
  const videoId =
    video?.id ||
    video?._id;

  // Render
  return (
    <article className="yt-horizontal-video-card">

      {/* Video Link */}
      <Link
        to={`/watch/${videoId}`}
        className="yt-horizontal-video-card-link"
      >

        {/* Thumbnail */}
        <div className="yt-horizontal-video-card-thumbnail">

          <img
            src={getMediaUrl(
              video.thumbnail,
            )}
            alt={video.title}
          />

          {/* Duration */}
          {duration && (
            <span className="yt-horizontal-video-card-duration">
              {duration}
            </span>
          )}

        </div>

        {/* Details */}
        <div className="yt-horizontal-video-card-details">

          {/* Title */}
          <h3 className="yt-horizontal-video-card-title">
            {video.title}
          </h3>

          {/* Metadata */}
          <div className="yt-horizontal-video-card-meta">

            <span>
              {channelName}
            </span>

            <span>
              {views} views
              {uploadedDate &&
                ` • ${uploadedDate}`}
            </span>

          </div>

          {/* Description */}
          {video.description && (
            <p className="yt-horizontal-video-card-description">
              {video.description}
            </p>
          )}

        </div>

      </Link>

      {/* Menu */}
      {showMenu && (
        <button
          type="button"
          className="yt-horizontal-video-card-menu"
          aria-label={
            historyId
              ? "Remove from watch history"
              : "More actions"
          }
          onClick={
            historyId
              ? handleRemoveFromHistory
              : (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }
          }
        >
          <MdMoreVert />
        </button>
      )}

    </article>
  );
}