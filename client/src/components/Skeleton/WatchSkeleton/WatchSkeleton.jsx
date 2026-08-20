// Styles
import "./WatchSkeleton.css";

// Component
export default function WatchSkeleton() {
  return (
    <div className="yt-watch-skeleton">

      {/* Main Layout */}
      <div className="yt-watch-skeleton-layout">

        {/* Left */}
        <main className="yt-watch-skeleton-main">

          {/* Video Player */}
          <div className="yt-watch-skeleton-player">
            <div className="yt-watch-skeleton-shimmer" />
          </div>

          {/* Title */}
          <div className="yt-watch-skeleton-title">
            <div className="yt-watch-skeleton-shimmer" />
          </div>

          <div className="yt-watch-skeleton-title second">
            <div className="yt-watch-skeleton-shimmer" />
          </div>

          {/* Meta + Actions */}
          <div className="yt-watch-skeleton-video-meta">

            {/* Views */}
            <div className="yt-watch-skeleton-meta-text">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

            {/* Actions */}
            <div className="yt-watch-skeleton-actions">

              <div className="yt-watch-skeleton-action">
                <div className="yt-watch-skeleton-shimmer" />
              </div>

              <div className="yt-watch-skeleton-action">
                <div className="yt-watch-skeleton-shimmer" />
              </div>

              <div className="yt-watch-skeleton-action">
                <div className="yt-watch-skeleton-shimmer" />
              </div>

            </div>
          </div>

          {/* Channel */}
          <section className="yt-watch-skeleton-channel">

            {/* Avatar */}
            <div className="yt-watch-skeleton-channel-avatar">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

            {/* Channel Info */}
            <div className="yt-watch-skeleton-channel-info">

              <div className="yt-watch-skeleton-channel-name">
                <div className="yt-watch-skeleton-shimmer" />
              </div>

              <div className="yt-watch-skeleton-subscribers">
                <div className="yt-watch-skeleton-shimmer" />
              </div>

            </div>

            {/* Subscribe */}
            <div className="yt-watch-skeleton-subscribe">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

          </section>

          {/* Description */}
          <section className="yt-watch-skeleton-description">

            <div className="yt-watch-skeleton-description-line">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

            <div className="yt-watch-skeleton-description-line">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

            <div className="yt-watch-skeleton-description-line medium">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

          </section>

          {/* Comments */}
          <section className="yt-watch-skeleton-comments">

            <div className="yt-watch-skeleton-comments-title">
              <div className="yt-watch-skeleton-shimmer" />
            </div>

            {/* Comment */}
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="yt-watch-skeleton-comment"
                >

                  <div className="yt-watch-skeleton-comment-avatar">
                    <div className="yt-watch-skeleton-shimmer" />
                  </div>

                  <div className="yt-watch-skeleton-comment-body">

                    <div className="yt-watch-skeleton-comment-name">
                      <div className="yt-watch-skeleton-shimmer" />
                    </div>

                    <div className="yt-watch-skeleton-comment-line">
                      <div className="yt-watch-skeleton-shimmer" />
                    </div>

                    <div className="yt-watch-skeleton-comment-line medium">
                      <div className="yt-watch-skeleton-shimmer" />
                    </div>

                  </div>

                </div>
              ),
            )}

          </section>

        </main>

        {/* Right */}
        <aside className="yt-watch-skeleton-sidebar">

          {/* Recommended Videos */}
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <div
                key={index}
                className="yt-watch-skeleton-recommended"
              >

                {/* Thumbnail */}
                <div className="yt-watch-skeleton-recommended-thumbnail">
                  <div className="yt-watch-skeleton-shimmer" />
                </div>

                {/* Info */}
                <div className="yt-watch-skeleton-recommended-info">

                  <div className="yt-watch-skeleton-recommended-title">
                    <div className="yt-watch-skeleton-shimmer" />
                  </div>

                  <div className="yt-watch-skeleton-recommended-title second">
                    <div className="yt-watch-skeleton-shimmer" />
                  </div>

                  <div className="yt-watch-skeleton-recommended-meta">
                    <div className="yt-watch-skeleton-shimmer" />
                  </div>

                  <div className="yt-watch-skeleton-recommended-meta short">
                    <div className="yt-watch-skeleton-shimmer" />
                  </div>

                </div>

              </div>
            ),
          )}

        </aside>

      </div>

    </div>
  );
}