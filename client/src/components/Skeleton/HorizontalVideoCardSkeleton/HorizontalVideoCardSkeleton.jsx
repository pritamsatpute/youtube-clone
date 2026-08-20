// Styles
import "./HorizontalVideoCardSkeleton.css";

// Component
export default function HorizontalVideoCardSkeleton() {
  return (
    <article className="yt-horizontal-video-card-skeleton">

      {/* Thumbnail */}
      <div className="yt-horizontal-video-card-skeleton-thumbnail">
        <div className="yt-skeleton-shimmer" />
      </div>

      {/* Details */}
      <div className="yt-horizontal-video-card-skeleton-details">

        {/* Title */}
        <div className="yt-horizontal-video-card-skeleton-title">
          <div className="yt-skeleton-shimmer" />
          <div className="yt-skeleton-shimmer" />
        </div>

        {/* Metadata */}
        <div className="yt-horizontal-video-card-skeleton-meta">
          <div className="yt-skeleton-shimmer" />
          <div className="yt-skeleton-shimmer" />
        </div>

        {/* Description */}
        <div className="yt-horizontal-video-card-skeleton-description">
          <div className="yt-skeleton-shimmer" />
          <div className="yt-skeleton-shimmer" />
        </div>

      </div>

      {/* Menu */}
      <div className="yt-horizontal-video-card-skeleton-menu">
        <div className="yt-skeleton-shimmer" />
      </div>

    </article>
  );
}