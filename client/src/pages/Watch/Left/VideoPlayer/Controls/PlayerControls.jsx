// React
import { useState } from "react";

// Icons
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";

// Components
import PlayerSettings from "../Settings/PlayerSettings";
import ProgressBar from "../ProgressBar/ProgressBar";

// Styles
import "./PlayerControls.css";

// Format Time
const formatTime = (time) => {
  const totalSeconds = Math.max(
    Number(time) || 0,
    0,
  );

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
export default function PlayerControls({
  showControls,
  videoRef,
  isPlaying,
  currentTime,
  duration,
  buffered,
  volume,
  isMuted,
  isFullscreen,
  onPlayPause,
  onSeek,
  onMute,
  onVolumeChange,
  onFullscreen,
}) {
  // Settings
  const [showSettings, setShowSettings] =
    useState(false);

  // Render
  return (
    <div
      className={`yt-player-controls ${
        showControls
          ? "yt-player-controls--visible"
          : "yt-player-controls--hidden"
      }`}
    >
      {/* Progress */}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        onSeek={onSeek}
      />

      {/* Controls Row */}
      <div className="yt-player-controls-row">

        {/* Left Controls */}
        <div className="yt-player-controls-left">

          {/* Play / Pause */}
          <button
            type="button"
            className="yt-player-control-button"
            aria-label={
              isPlaying
                ? "Pause"
                : "Play"
            }
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <PauseRoundedIcon />
            ) : (
              <PlayArrowRoundedIcon />
            )}
          </button>

          {/* Volume */}
          <div className="yt-player-volume">

            <button
              type="button"
              className="yt-player-control-button"
              aria-label={
                isMuted
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

            <div className="yt-player-volume-slider">

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
                aria-label="Volume"
                style={{
                  "--yt-volume": `${
                    (isMuted
                      ? 0
                      : volume) * 100
                  }%`,
                }}
                onChange={(event) =>
                  onVolumeChange?.(
                    Number(
                      event.target.value,
                    ),
                  )
                }
              />

            </div>
          </div>

          {/* Time */}
          <span className="yt-player-time">
            {formatTime(
              currentTime,
            )}
            {" / "}
            {formatTime(duration)}
          </span>

        </div>

        {/* Right Controls */}
        <div className="yt-player-controls-right">

          {/* Settings */}
          <div className="yt-player-settings-wrapper">

            <button
              type="button"
              className="yt-player-control-button"
              aria-label="Settings"
              aria-expanded={
                showSettings
              }
              onClick={() =>
                setShowSettings(
                  (previous) =>
                    !previous,
                )
              }
            >
              <SettingsRoundedIcon />
            </button>

            <PlayerSettings
              videoRef={videoRef}
              isOpen={showSettings}
              onClose={() =>
                setShowSettings(false)
              }
            />

          </div>

          {/* Fullscreen */}
          <button
            type="button"
            className="yt-player-control-button"
            aria-label={
              isFullscreen
                ? "Exit fullscreen"
                : "Fullscreen"
            }
            onClick={onFullscreen}
          >
            {isFullscreen ? (
              <FullscreenExitRoundedIcon />
            ) : (
              <FullscreenRoundedIcon />
            )}
          </button>

        </div>

      </div>
    </div>
  );
}