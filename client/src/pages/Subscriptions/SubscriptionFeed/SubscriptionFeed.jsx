// Components
import VideoGrid from "../../Home/VideoGrid/VideoGrid";

// Styles
import "./SubscriptionFeed.css";

// Component
export default function SubscriptionFeed({
  videos = [],
}) {
  // Render
  return (
    <section className="subscription-feed">
      {/* Video Grid */}
      <VideoGrid
        videos={videos}
      />
    </section>
  );
}