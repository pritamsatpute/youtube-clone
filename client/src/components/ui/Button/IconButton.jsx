// Styles
import "./IconButton.css";

// Component
export default function IconButton({
  children,
  ariaLabel,
  onClick,
  className = "",
  disabled = false,
}) {

  // Render
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`yt-icon-btn ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}