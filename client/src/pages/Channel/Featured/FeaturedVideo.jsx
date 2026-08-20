// React Router
import { Link } from "react-router-dom";

// Utils
import getMediaUrl from "../../../utils/getMediaUrl";
import formatRelativeDate from "../../../utils/formatRelativeDate";

// Styles
import "./FeaturedVideo.css";

// Component
export default function FeaturedVideo({
  channel,
  video,
}) {
  // Empty State
  if (!video) {
    return null;
  }

  // Thumbnail
  const thumbnailUrl = getMediaUrl(
    video.thumbnail,
  );

  // Views
  const views = Number(
    video.views || 0,
  ).toLocaleString();

  // Uploaded Date
  const uploadedDate =
    video.uploadedAt
      ? formatRelativeDate(
          video.uploadedAt,
        )
      : "";

  // Description
  const description =
    video.description || "";

  // Render
  return (
    <section className="yt-featured-video">

      {/* Thumbnail */}
      <Link
        to={`/watch/${video.id}`}
        className="yt-featured-thumbnail-link"
      >
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="yt-featured-thumbnail"
        />
      </Link>

      {/* Content */}
      <div className="yt-featured-content">

        {/* Title */}
        <Link
          to={`/watch/${video.id}`}
          className="yt-featured-title"
        >
          {video.title}
        </Link>

        {/* Metadata */}
        <p className="yt-featured-meta">
          {channel.name}

          {" • "}

          {views} views

          {uploadedDate && (
            <>
              {" • "}
              {uploadedDate}
            </>
          )}
        </p>

        {/* Description */}
        {description && (
          <p className="yt-featured-description">
            {description}
          </p>
        )}

        {/* Watch Button */}
        <Link
          to={`/watch/${video.id}`}
          className="yt-featured-button"
        >
          Watch now
        </Link>

      </div>

    </section>
  );
}