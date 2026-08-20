// Components
import RecommendationCard from "./RecommendationCard";

// Styles
import "./Recommendations.css";

// Component
export default function Recommendations({
  videos = [],
}) {
  // Empty State
  if (!videos.length) {
    return null;
  }

  // Render
  return (
    <section className="yt-recommendations">
      {videos.map((video) => (
        <RecommendationCard
          key={video.id}
          video={video}
        />
      ))}
    </section>
  );
}