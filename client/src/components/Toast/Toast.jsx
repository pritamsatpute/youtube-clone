// Styles
import "./Toast.css";

// Component
export default function Toast({
  open,
  message,
}) {

  if (!open) return null;

  return (
    <div className="yt-toast">
      {message}
    </div>
  );
}