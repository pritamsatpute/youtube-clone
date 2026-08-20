// React
import { FiSearch } from "react-icons/fi";

// Styles
import "./HistorySearch.css";

// Component
export default function HistorySearch({
  value = "",
  onChange,
}) {
  // Handle Change
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  // Render
  return (
    <div className="yt-history-search">
      {/* Search Icon */}
      <FiSearch className="yt-history-search-icon" />

      {/* Search Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search watch history"
        aria-label="Search watch history"
        className="yt-history-search-input"
      />
    </div>
  );
}