// React
import { useState } from "react";

// Icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";

// Styles
import "./LikedVideosToolbar.css";

// Component
export default function LikedVideosToolbar() {
  // Search
  const [search, setSearch] =
    useState("");

  // Render
  return (
    <div className="liked-toolbar">

      {/* Search */}
      <div className="liked-search">

        <SearchOutlinedIcon />

        <input
          type="text"
          placeholder="Search liked videos"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>

      {/* Actions */}
      <div className="liked-actions">

        {/* Play All */}
        <button
          type="button"
          className="liked-action"
        >
          <PlayArrowOutlinedIcon />

          <span>
            Play all
          </span>
        </button>

        {/* Shuffle */}
        <button
          type="button"
          className="liked-action"
        >
          <ShuffleOutlinedIcon />

          <span>
            Shuffle
          </span>
        </button>

        {/* Sort */}
        <button
          type="button"
          className="liked-action"
        >
          <SortOutlinedIcon />

          <span>
            Sort
          </span>
        </button>

      </div>

    </div>
  );
}