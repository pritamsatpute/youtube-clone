// React
import {
  useRef,
  useState,
} from "react";

// Styles
import "./ProgressBar.css";

// Format Time
const formatTime = (time) => {
  const totalSeconds =
    Math.max(Number(time) || 0, 0);

  const hours = Math.floor(
    totalSeconds / 3600,
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );

  const seconds = Math.floor(
    totalSeconds % 60,
  );

  const formattedMinutes =
    hours > 0
      ? String(minutes).padStart(2, "0")
      : String(minutes);

  const formattedSeconds =
    String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};

// Component
export default function ProgressBar({
  currentTime = 0,
  duration = 0,
  buffered = 0,
  onSeek,
}) {
  // Ref
  const progressRef = useRef(null);

  // State
  const [isHovering, setIsHovering] =
    useState(false);

  const [previewTime, setPreviewTime] =
    useState(0);

  const [previewPosition, setPreviewPosition] =
    useState(0);

  // Calculate Preview
  const updatePreview = (event) => {
    if (!progressRef.current || !duration) {
      return;
    }

    const rect =
      progressRef.current.getBoundingClientRect();

    const position =
      Math.min(
        Math.max(
          event.clientX - rect.left,
          0,
        ),
        rect.width,
      );

    const percentage =
      position / rect.width;

    const time =
      percentage * duration;

    setPreviewTime(time);
    setPreviewPosition(
      percentage * 100,
    );
  };

  // Seek
  const handleSeek = (event) => {
    if (!progressRef.current || !duration) {
      return;
    }

    const rect =
      progressRef.current.getBoundingClientRect();

    const position =
      Math.min(
        Math.max(
          event.clientX - rect.left,
          0,
        ),
        rect.width,
      );

    const percentage =
      position / rect.width;

    onSeek?.(
      percentage * duration,
    );
  };

  // Played Percentage
  const played =
    duration > 0
      ? Math.min(
          Math.max(
            (currentTime / duration) * 100,
            0,
          ),
          100,
        )
      : 0;

  // Buffered Percentage
  const bufferedPercentage =
    duration > 0
      ? Math.min(
          Math.max(
            (buffered / duration) * 100,
            0,
          ),
          100,
        )
      : 0;

  // Render
  return (
    <div
      ref={progressRef}
      className={`yt-progress-bar ${
        isHovering
          ? "yt-progress-bar--hover"
          : ""
      }`}
      onMouseEnter={() =>
        setIsHovering(true)
      }
      onMouseLeave={() =>
        setIsHovering(false)
      }
      onMouseMove={updatePreview}
      onClick={handleSeek}
    >

      {/* Track */}
      <div className="yt-progress-track">

        {/* Buffered */}
        <div
          className="yt-progress-buffered"
          style={{
            width: `${bufferedPercentage}%`,
          }}
        />

        {/* Played */}
        <div
          className="yt-progress-played"
          style={{
            width: `${played}%`,
          }}
        />

        {/* Thumb */}
        <div
          className="yt-progress-thumb"
          style={{
            left: `${played}%`,
          }}
        />

      </div>

      {/* Preview */}
      {isHovering && (
        <div
          className="yt-progress-preview"
          style={{
            left: `${previewPosition}%`,
          }}
        >
          {formatTime(previewTime)}
        </div>
      )}

    </div>
  );
}