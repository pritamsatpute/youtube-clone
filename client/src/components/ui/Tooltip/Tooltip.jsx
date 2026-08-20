// React
import {
  useState,
} from "react";

// Styles
import "./Tooltip.css";

// Component
export default function Tooltip({
  children,
  title,
  position = "bottom",
  delay = 500,
}) {

  // State
  const [visible, setVisible] = useState(false);

  let timer;

  // Handlers
  const handleMouseEnter = () => {
    timer = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);

    setVisible(false);
  };

  // Render
  return (
    <div
      className="yt-tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {visible && (
        <div
          className={`yt-tooltip yt-tooltip-${position}`}
          role="tooltip"
        >
          {title}
        </div>
      )}
    </div>
  );
}