// Styles
import "./PillButton.css";

// Component
export default function PillButton({
  icon,
  text,
  onClick,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type="button"
      className={`yt-pill-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon}

      <span>{text}</span>
    </button>
  );
}