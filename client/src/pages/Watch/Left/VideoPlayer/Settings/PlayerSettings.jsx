// React
import {
  useEffect,
  useRef,
  useState,
} from "react";

// Icons
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

// Styles
import "./PlayerSettings.css";

// Playback Speeds
const PLAYBACK_SPEEDS = [
  0.25,
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  1.75,
  2,
];

// Format Speed
const formatSpeed = (speed) => {
  if (speed === 1) {
    return "Normal";
  }

  return `${speed}x`;
};

// Component
export default function PlayerSettings({
  videoRef,
  isOpen,
  onClose,
}) {
  // Ref
  const settingsRef =
    useRef(null);

  // State
  const [activeMenu, setActiveMenu] =
    useState("main");

  const [playbackRate, setPlaybackRate] =
    useState(1);

  // Close Outside
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (
      event,
    ) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(
          event.target,
        )
      ) {
        onClose?.();
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [isOpen, onClose]);

  // Reset Menu
  useEffect(() => {
    if (!isOpen) {
      setActiveMenu("main");
    }
  }, [isOpen]);

  // Playback Speed
  const handlePlaybackSpeed = (
    speed,
  ) => {
    const player =
      videoRef?.current;

    if (player) {
      player.playbackRate = speed;
    }

    setPlaybackRate(speed);

    setActiveMenu("main");
  };

  // Don't Render
  if (!isOpen) {
    return null;
  }

  // Render
  return (
    <div
      ref={settingsRef}
      className="yt-player-settings"
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      {/* Main */}
      {activeMenu === "main" && (
        <div className="yt-player-settings-menu">

          {/* Playback Speed */}
          <button
            type="button"
            className="yt-player-settings-item"
            onClick={() =>
              setActiveMenu(
                "playback-speed",
              )
            }
          >
            <span>
              Playback speed
            </span>

            <span className="yt-player-settings-value">
              {formatSpeed(
                playbackRate,
              )}

              <KeyboardArrowRightRoundedIcon />
            </span>
          </button>


          {/* Quality */}
          <button
            type="button"
            className="yt-player-settings-item"
            onClick={() =>
              setActiveMenu(
                "quality",
              )
            }
          >
            <span>
              Quality
            </span>

            <span className="yt-player-settings-value">
              Auto

              <KeyboardArrowRightRoundedIcon />
            </span>
          </button>

        </div>
      )}


      {/* Playback Speed */}
      {activeMenu ===
        "playback-speed" && (
        <div className="yt-player-settings-menu">

          {/* Header */}
          <button
            type="button"
            className="yt-player-settings-header"
            onClick={() =>
              setActiveMenu("main")
            }
          >
            <KeyboardArrowLeftRoundedIcon />

            <span>
              Playback speed
            </span>
          </button>


          {/* Options */}
          <div className="yt-player-settings-options">

            {PLAYBACK_SPEEDS.map(
              (speed) => (
                <button
                  key={speed}
                  type="button"
                  className={`yt-player-settings-option ${
                    playbackRate ===
                    speed
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePlaybackSpeed(
                      speed,
                    )
                  }
                >
                  <span>
                    {formatSpeed(
                      speed,
                    )}
                  </span>

                  {playbackRate ===
                    speed && (
                    <CheckRoundedIcon />
                  )}
                </button>
              ),
            )}

          </div>

        </div>
      )}


      {/* Quality */}
      {activeMenu === "quality" && (
        <div className="yt-player-settings-menu">

          {/* Header */}
          <button
            type="button"
            className="yt-player-settings-header"
            onClick={() =>
              setActiveMenu("main")
            }
          >
            <KeyboardArrowLeftRoundedIcon />

            <span>
              Quality
            </span>
          </button>


          {/* Auto */}
          <button
            type="button"
            className="yt-player-settings-option active"
          >
            <span>
              Auto
            </span>

            <CheckRoundedIcon />
          </button>


          {/* Quality Options */}
          <button
            type="button"
            className="yt-player-settings-option"
            disabled
          >
            <span>
              1080p
            </span>
          </button>

          <button
            type="button"
            className="yt-player-settings-option"
            disabled
          >
            <span>
              720p
            </span>
          </button>

          <button
            type="button"
            className="yt-player-settings-option"
            disabled
          >
            <span>
              480p
            </span>
          </button>

          <button
            type="button"
            className="yt-player-settings-option"
            disabled
          >
            <span>
              360p
            </span>
          </button>

          <p className="yt-player-settings-note">
            Additional quality options
            will become available when
            multiple video resolutions
            are supported.
          </p>

        </div>
      )}

    </div>
  );
}