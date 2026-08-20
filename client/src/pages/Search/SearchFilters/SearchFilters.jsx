// React
import { useState } from "react";

// Icons
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

// Styles
import "./SearchFilters.css";

// Filter Data
const FILTER_GROUPS = [
  {
    title: "Upload date",
    options: [
      "Last hour",
      "Today",
      "This week",
      "This month",
      "This year",
    ],
  },
  {
    title: "Type",
    options: [
      "Video",
      "Channel",
      "Playlist",
      "Movie",
    ],
  },
  {
    title: "Duration",
    options: [
      "Under 4 minutes",
      "4–20 minutes",
      "Over 20 minutes",
    ],
  },
  {
    title: "Sort by",
    options: [
      "Relevance",
      "Upload date",
      "View count",
      "Rating",
    ],
  },
];

// Component
export default function SearchFilters() {

  // State
  const [expanded, setExpanded] =
    useState(false);

  // Render
  return (
    <section className="yt-search-filters">

      <button
        type="button"
        className="yt-search-filter-button"
        onClick={() =>
          setExpanded((previous) => !previous)
        }
      >
        <TuneOutlinedIcon />

        <span>Filters</span>

        <ExpandMoreOutlinedIcon
          className={
            expanded
              ? "expanded"
              : ""
          }
        />
      </button>

      {expanded && (

        <div className="yt-search-filter-panel">

          {FILTER_GROUPS.map((group) => (

            <div
              key={group.title}
              className="yt-search-filter-group"
            >

              <h3>{group.title}</h3>

              <div className="yt-search-filter-options">

                {group.options.map((option) => (

                  <button
                    key={option}
                    type="button"
                    className="yt-search-filter-chip"
                  >
                    {option}
                  </button>

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}