// React
import { useCallback, useEffect, useRef, useState } from "react";

// Icons
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

// Utils
import getMediaUrl from "../../../../utils/getMediaUrl";

// Components
import PlayerControls from "./Controls/PlayerControls";

// Styles
import "./VideoPlayer.css";

// Component
export default function VideoPlayer({ video }) {
  // Refs
  const controlsTimerRef = useRef(null);

  const videoRef = useRef(null);

  const containerRef = useRef(null);

  // Playback
  const [showControls, setShowControls] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [buffered, setBuffered] = useState(0);

  // Volume
  const [volume, setVolume] = useState(1);

  const [isMuted, setIsMuted] = useState(false);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  const [hasError, setHasError] = useState(false);

  // Video URL
  const videoUrl = getMediaUrl(video?.videoUrl);

  const thumbnailUrl = getMediaUrl(video?.thumbnail);

  // Update Buffered
  const updateBuffered = useCallback(() => {
    const player = videoRef.current;

    if (!player || !player.buffered.length) {
      setBuffered(0);
      return;
    }

    try {
      const bufferedEnd = player.buffered.end(player.buffered.length - 1);

      setBuffered(bufferedEnd);
    } catch {
      setBuffered(0);
    }
  }, []);

  // Play / Pause
  const handlePlayPause = useCallback(async () => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    try {
      if (player.paused) {
        await player.play();
      } else {
        player.pause();
      }
    } catch (error) {
      console.error("Failed to control video:", error);
    }
  }, []);

  // Time Update
  const handleTimeUpdate = useCallback(() => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    setCurrentTime(player.currentTime);

    updateBuffered();
  }, [updateBuffered]);

  // Loaded Metadata
  const handleLoadedMetadata = useCallback(() => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    setDuration(Number(player.duration) || 0);

    setCurrentTime(Number(player.currentTime) || 0);

    updateBuffered();

    setIsLoading(false);
  }, [updateBuffered]);

  // Progress
  const handleProgress = useCallback(() => {
    updateBuffered();
  }, [updateBuffered]);

  // Waiting
  const handleWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  // Can Play
  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Video Playing
  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
    setIsLoading(false);
  }, []);

  // Video Paused
  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Video Ended
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(duration);
  }, [duration]);

  // Video Error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Seek
  const handleSeek = useCallback(
    (time) => {
      const player = videoRef.current;

      if (!player) {
        return;
      }

      const nextTime = Math.min(Math.max(Number(time) || 0, 0), duration || 0);

      player.currentTime = nextTime;

      setCurrentTime(nextTime);
    },
    [duration],
  );

  // Volume
  const handleVolumeChange = useCallback((nextVolume) => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    const nextValue = Math.min(Math.max(Number(nextVolume) || 0, 0), 1);

    player.volume = nextValue;

    player.muted = nextValue === 0;

    setVolume(nextValue);
    setIsMuted(nextValue === 0);
  }, []);

  // Mute
  const handleMute = useCallback(() => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    if (player.muted) {
      player.muted = false;

      const restoredVolume = volume > 0 ? volume : 1;

      player.volume = restoredVolume;

      setVolume(restoredVolume);

      setIsMuted(false);

      return;
    }

    player.muted = true;

    setIsMuted(true);
  }, [volume]);

  // Clear Controls Timer
  const clearControlsTimer = useCallback(() => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
      controlsTimerRef.current = null;
    }
  }, []);

  // Show Controls
  const showPlayerControls = useCallback(() => {
    clearControlsTimer();

    setShowControls(true);
  }, [clearControlsTimer]);

  // Hide Controls After Delay
  const hidePlayerControls = useCallback(() => {
    clearControlsTimer();

    if (!isPlaying) {
      return;
    }

    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  }, [isPlaying, clearControlsTimer]);

  // Mouse Move
  const handlePlayerMouseMove = useCallback(() => {
    // Always show immediately
    setShowControls(true);

    // Restart hide timer
    if (isPlaying) {
      hidePlayerControls();
    }
  }, [isPlaying, hidePlayerControls]);

  // Mouse Enter
  const handlePlayerMouseEnter = useCallback(() => {
    showPlayerControls();

    if (isPlaying) {
      hidePlayerControls();
    }
  }, [isPlaying, showPlayerControls, hidePlayerControls]);

  // Player Click
  const handlePlayerClick = useCallback(
    (event) => {
      // Ignore control clicks
      if (event.target.closest(".yt-player-controls")) {
        return;
      }

      // Ignore center button clicks
      if (event.target.closest(".yt-video-player-center-button")) {
        return;
      }

      handlePlayPause();

      setShowControls(true);
    },
    [handlePlayPause],
  );

  // Playback Visibility
  useEffect(() => {
    clearControlsTimer();

    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);

    return clearControlsTimer;
  }, [isPlaying, clearControlsTimer]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearControlsTimer();
    };
  }, [clearControlsTimer]);

  // Fullscreen
  const handleFullscreen = useCallback(async () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  }, []);

  // Fullscreen Change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Reset When Video Changes
  useEffect(() => {
    const player = videoRef.current;

    if (!player) {
      return;
    }

    player.pause();

    player.currentTime = 0;

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
    setIsLoading(true);
    setHasError(false);
  }, [videoUrl]);

  // Render
  return (
    <section className="yt-video-player">
      <div
        ref={containerRef}
        className="yt-video-player-container"
        onMouseEnter={handlePlayerMouseEnter}
        onMouseMove={handlePlayerMouseMove}
        onClick={handlePlayerClick}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="yt-video-player-media"
          src={videoUrl}
          poster={thumbnailUrl}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onProgress={handleProgress}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
        >
          Your browser does not support the video tag.
        </video>

        {/* Center Play / Pause */}
        {!hasError && !isPlaying && (
          <button
            type="button"
            className="yt-video-player-center-button"
            aria-label="Play"
            onClick={(event) => {
              event.stopPropagation();

              handlePlayPause();

              setShowControls(true);
            }}
          >
            <PlayArrowRoundedIcon />
          </button>
        )}

        {/* Loading */}
        {isLoading && !hasError && (
          <div className="yt-video-player-loading">
            <div className="yt-video-player-spinner" />
          </div>
        )}

        {/* Error */}
        {hasError && (
          <div className="yt-video-player-error">
            <span>This video couldn't be loaded.</span>

            <button
              type="button"
              onClick={() => {
                const player = videoRef.current;

                if (!player) {
                  return;
                }

                setHasError(false);
                setIsLoading(true);

                player.load();
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Controls */}
        {!hasError && (
          <PlayerControls
            showControls={showControls}
            videoRef={videoRef}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            buffered={buffered}
            volume={volume}
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            onPlayPause={handlePlayPause}
            onSeek={handleSeek}
            onMute={handleMute}
            onVolumeChange={handleVolumeChange}
            onFullscreen={handleFullscreen}
          />
        )}
      </div>
    </section>
  );
}
