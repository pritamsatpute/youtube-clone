// React
import VideoCardSkeleton from "../VideoCardSkeleton/VideoCardSkeleton";
import HorizontalVideoCardSkeleton from "../HorizontalVideoCardSkeleton/HorizontalVideoCardSkeleton";

// Styles
import "./SkeletonList.css";

// Component
export default function SkeletonList({
  count = 8,
  type = "video",
}) {
  // Items
  const items = Array.from(
    { length: count },
    (_, index) => index,
  );

  // Render
  return (
    <div
      className={`yt-skeleton-list yt-skeleton-list--${type}`}
    >
      {items.map((index) => (
        <div
          key={index}
          className="yt-skeleton-list-item"
        >
          {type === "horizontal" ? (
            <HorizontalVideoCardSkeleton />
          ) : (
            <VideoCardSkeleton />
          )}
        </div>
      ))}
    </div>
  );
}