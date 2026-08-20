// Styles
import "./VideoCardSkeleton.css";

// Component
export default function VideoCardSkeleton() {
  return (
    <article className="yt-video-card-skeleton">

      {/* Thumbnail */}
      <div className="yt-video-card-skeleton-thumbnail">
        <div className="yt-skeleton-shimmer" />
      </div>

      {/* Details */}
      <div className="yt-video-card-skeleton-details">

        {/* Avatar */}
        <div className="yt-video-card-skeleton-avatar">
          <div className="yt-skeleton-shimmer" />
        </div>

        {/* Text */}
        <div className="yt-video-card-skeleton-text">

          {/* Title */}
          <div className="yt-video-card-skeleton-title">
            <div className="yt-skeleton-shimmer" />
            <div className="yt-skeleton-shimmer" />
          </div>

          {/* Channel */}
          <div className="yt-video-card-skeleton-channel">
            <div className="yt-skeleton-shimmer" />
          </div>

          {/* Metadata */}
          <div className="yt-video-card-skeleton-meta">
            <div className="yt-skeleton-shimmer" />
          </div>

        </div>

      </div>

    </article>
  );
}