// Styles
import "./VideoDetails.css";

// Component
export default function VideoDetails({ video }) {
  // Format Date
  const uploadedDate = new Date(
    video.uploadedAt,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Format Views
  const formattedViews =
    Number(video.views || 0).toLocaleString();

  // Render
  return (
    <section className="yt-watch-video-details">

      {/* Title */}
      <h1 className="yt-watch-video-title">
        {video.title}
      </h1>

    </section>
  );
}