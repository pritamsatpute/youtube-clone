// Components
import VideoCard from "../VideoCard/VideoCard";

// Styles
import "./VideoGrid.css";

// Component
export default function VideoGrid({
  videos = [],
}) {
  // Empty State
  if (!videos.length) {
    return (
      <div className="video-grid-empty">

        <h3>
          No videos found
        </h3>

        <p>
          There are no videos available.
        </p>

      </div>
    );
  }

  // Render
  return (
    <div className="video-grid">

      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
        />
      ))}

    </div>
  );
}