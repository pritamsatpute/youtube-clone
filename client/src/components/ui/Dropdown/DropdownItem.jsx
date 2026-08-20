// Styles
import "./DropdownItem.css";

// Component
export default function DropdownItem({
  icon,
  label,
  secondary,
  endIcon,
  danger = false,
  disabled = false,
  startSpacer = false,
  onClick,
}) {
    
  // Render
  return (
    <button
      type="button"
      className={`yt-dropdown-item ${danger ? "danger" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {(icon || startSpacer) && (
        <span className="yt-dropdown-item-icon">
          {icon}
        </span>
      )}

      <span className="yt-dropdown-item-content">
        <span className="yt-dropdown-item-label">
          {label}
        </span>

        {secondary && (
          <span className="yt-dropdown-item-secondary">
            {secondary}
          </span>
        )}
      </span>

      {endIcon && (
        <span className="yt-dropdown-item-end">
          {endIcon}
        </span>
      )}
    </button>
  );
}