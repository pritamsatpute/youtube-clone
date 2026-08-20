// Styles
import "./Skeleton.css";

// Component
export default function Skeleton({
  className = "",
}) {
  return (
    <span
      className={`yt-skeleton ${className}`}
      aria-hidden="true"
    />
  );
}