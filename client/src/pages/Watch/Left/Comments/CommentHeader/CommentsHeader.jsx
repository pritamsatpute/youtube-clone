// React
import { useState } from "react";

// Icons
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

// Styles
import "./CommentsHeader.css";

// Component
export default function CommentsHeader({
  count = 0,
}) {
  // State
  const [sort, setSort] =
    useState("Top comments");

  // Toggle Sort
  const handleToggleSort = () => {
    setSort((previous) =>
      previous === "Top comments"
        ? "Newest first"
        : "Top comments",
    );
  };

  // Render
  return (
    <div className="yt-comments-header">

      {/* Count */}
      <h2 className="yt-comments-title">
        {count} Comments
      </h2>

      {/* Sort */}
      <button
        type="button"
        className="yt-comments-sort"
        onClick={handleToggleSort}
      >
        <SortOutlinedIcon />

        <span>{sort}</span>
      </button>

    </div>
  );
}