// Styles
import "./ChannelSkeleton.css";

// Component
export default function ChannelSkeleton() {
  return (
    <div className="yt-channel-skeleton">

      {/* Banner */}
      <div className="yt-channel-skeleton-banner">
        <div className="yt-channel-skeleton-shimmer" />
      </div>

      {/* Header */}
      <section className="yt-channel-skeleton-header">

        {/* Avatar */}
        <div className="yt-channel-skeleton-avatar">
          <div className="yt-channel-skeleton-shimmer" />
        </div>

        {/* Information */}
        <div className="yt-channel-skeleton-info">

          {/* Channel Name */}
          <div className="yt-channel-skeleton-name">
            <div className="yt-channel-skeleton-shimmer" />
          </div>

          {/* Meta */}
          <div className="yt-channel-skeleton-meta">
            <div className="yt-channel-skeleton-meta-line">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

            <div className="yt-channel-skeleton-meta-line short">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

            <div className="yt-channel-skeleton-meta-line shorter">
              <div className="yt-channel-skeleton-shimmer" />
            </div>
          </div>

          {/* Description */}
          <div className="yt-channel-skeleton-description">
            <div className="yt-channel-skeleton-description-line">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

            <div className="yt-channel-skeleton-description-line medium">
              <div className="yt-channel-skeleton-shimmer" />
            </div>
          </div>

          {/* Links */}
          <div className="yt-channel-skeleton-links">
            <div className="yt-channel-skeleton-link">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

            <div className="yt-channel-skeleton-link short">
              <div className="yt-channel-skeleton-shimmer" />
            </div>
          </div>

          {/* Actions */}
          <div className="yt-channel-skeleton-actions">

            <div className="yt-channel-skeleton-action">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

            <div className="yt-channel-skeleton-action secondary">
              <div className="yt-channel-skeleton-shimmer" />
            </div>

          </div>

        </div>
      </section>

      {/* Navigation */}
      <nav className="yt-channel-skeleton-tabs">

        <div className="yt-channel-skeleton-tab active">
          <div className="yt-channel-skeleton-shimmer" />
        </div>

        <div className="yt-channel-skeleton-tab">
          <div className="yt-channel-skeleton-shimmer" />
        </div>

        <div className="yt-channel-skeleton-tab">
          <div className="yt-channel-skeleton-shimmer" />
        </div>

      </nav>

      {/* Content */}
      <section className="yt-channel-skeleton-content">

        {/* Video Skeletons */}
        <div className="yt-channel-skeleton-video-grid">

          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="yt-channel-skeleton-video"
              >

                {/* Thumbnail */}
                <div className="yt-channel-skeleton-thumbnail">
                  <div className="yt-channel-skeleton-shimmer" />
                </div>

                {/* Video Info */}
                <div className="yt-channel-skeleton-video-info">

                  <div className="yt-channel-skeleton-video-title">
                    <div className="yt-channel-skeleton-shimmer" />
                  </div>

                  <div className="yt-channel-skeleton-video-title second">
                    <div className="yt-channel-skeleton-shimmer" />
                  </div>

                  <div className="yt-channel-skeleton-video-meta">
                    <div className="yt-channel-skeleton-shimmer" />
                  </div>

                </div>

              </div>
            ),
          )}

        </div>

      </section>

    </div>
  );
}