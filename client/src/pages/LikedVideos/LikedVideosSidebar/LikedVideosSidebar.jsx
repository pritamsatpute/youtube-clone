// Icons
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

// Styles
import "./LikedVideosSidebar.css";

// Component
export default function LikedVideosSidebar({
  count = 0,
}) {
  // Render
  return (
    <aside className="liked-sidebar">

      {/* Header */}
      <div className="liked-sidebar-header">

        <div className="liked-sidebar-icon">
          <FavoriteBorderOutlinedIcon />
        </div>

        <div>
          <h2>
            Liked videos
          </h2>

          <p>
            {count.toLocaleString()} videos
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="liked-sidebar-actions">

        {/* Remove All */}
        <button
          type="button"
          className="liked-sidebar-action"
        >
          <DeleteOutlineOutlinedIcon />

          <span>
            Remove all likes
          </span>
        </button>

        {/* Share */}
        <button
          type="button"
          className="liked-sidebar-action"
        >
          <ShareOutlinedIcon />

          <span>
            Share
          </span>
        </button>

      </div>

    </aside>
  );
}