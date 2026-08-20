// React
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

// Styles
import "./VolumeControl.css";

// Component
export default function VolumeControl({
  volume = 1,
  isMuted = false,
  onMute,
  onVolumeChange,
}) {
  // Render
  return (
    <div className="yt-volume-control">

      {/* Mute */}
      <button
        type="button"
        className="yt-volume-button"
        aria-label={
          isMuted || volume === 0
            ? "Unmute"
            : "Mute"
        }
        onClick={onMute}
      >
        {isMuted ||
        volume === 0 ? (
          <VolumeOffRoundedIcon />
        ) : (
          <VolumeUpRoundedIcon />
        )}
      </button>

      {/* Slider */}
      <div className="yt-volume-slider-wrapper">

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={
            isMuted
              ? 0
              : volume
          }
          onChange={onVolumeChange}
          aria-label="Volume"
          className="yt-volume-slider"
          style={{
            "--volume-level":
              `${(isMuted ? 0 : volume) * 100}%`,
          }}
        />

      </div>

    </div>
  );
}