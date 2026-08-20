// Icons
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

// Styles
import "./EmptyLikedVideos.css";

// Component
export default function EmptyLikedVideos() {
  // Render
  return (
    <div className="empty-liked">

      {/* Icon */}
      <div className="empty-liked-icon">
        <ThumbUpOutlinedIcon />
      </div>

      {/* Title */}
      <h2>
        No liked videos
      </h2>

      {/* Description */}
      <p>
        Videos you like will appear here.
      </p>

    </div>
  );
}