// React
import { useState } from "react";

// Styles
import "./Description.css";

// Component
export default function Description({
  video,
}) {
  // State
  const [expanded, setExpanded] =
    useState(false);

  // Views
  const views = Number(
    video.views || 0,
  ).toLocaleString();

  // Date
  const uploadedDate = new Date(
    video.uploadedAt,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Description
  const description =
    video.description || "";

  const isLong =
    description.length > 220;

  const content =
    expanded || !isLong
      ? description
      : `${description.slice(
          0,
          220,
        )}...`;

  // Render
  return (
    <section className="yt-description">

      {/* Meta */}
      <div className="yt-description-meta">

        <span>
          {views} views
        </span>

        <span>•</span>

        <span>
          {uploadedDate}
        </span>

      </div>

      {/* Description */}
      {description && (
        <p className="yt-description-text">
          {content}
        </p>
      )}

      {/* Toggle */}
      {isLong && (
        <button
          type="button"
          className="yt-description-toggle"
          onClick={() =>
            setExpanded(
              (previous) =>
                !previous,
            )
          }
        >
          {expanded
            ? "Show less"
            : "Show more"}
        </button>
      )}

    </section>
  );
}