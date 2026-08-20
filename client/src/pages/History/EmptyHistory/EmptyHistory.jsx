// Icons
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

// Styles
import "./EmptyHistory.css";

// Component
export default function EmptyHistory() {
  // Render
  return (
    <section className="yt-history-empty">
      {/* Icon */}
      <div className="yt-history-empty-icon">
        <HistoryOutlinedIcon />
      </div>

      {/* Content */}
      <div className="yt-history-empty-content">
        {/* Title */}
        <h2 className="yt-history-empty-title">
          No watch history
        </h2>

        {/* Description */}
        <p className="yt-history-empty-description">
          Videos that you watch will appear
          here.
        </p>
      </div>
    </section>
  );
}