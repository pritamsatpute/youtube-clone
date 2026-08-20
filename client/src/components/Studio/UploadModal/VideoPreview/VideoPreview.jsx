// React
import { useEffect, useState } from "react";

// Icons
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

// Styles
import "./VideoPreview.css";

// Component
export default function VideoPreview({
  file,
  thumbnail,
}) {
  const [videoUrl, setVideoUrl] =
    useState("");

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  useEffect(() => {
    if (!file) return;

    const url =
      URL.createObjectURL(file);

    setVideoUrl(url);

    return () =>
      URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!thumbnail) {
      setThumbnailUrl("");

      return;
    }

    const url =
      URL.createObjectURL(thumbnail);

    setThumbnailUrl(url);

    return () =>
      URL.revokeObjectURL(url);
  }, [thumbnail]);

  const formatSize = (bytes) => {
    if (!bytes) return "0 MB";

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
    ];

    let size = bytes;

    let index = 0;

    while (
      size >= 1024 &&
      index < units.length - 1
    ) {
      size /= 1024;

      index++;
    }

    return `${size.toFixed(
      2
    )} ${units[index]}`;
  };

  return (
    <aside className="yt-video-preview">

      <h3>Video preview</h3>

      <div className="yt-preview-player">

        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
          />
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
          />
        ) : (
          <MovieOutlinedIcon />
        )}

      </div>

      <div className="yt-preview-info">

        <div className="yt-preview-row">
          <span>Filename</span>

          <strong>
            {file.name}
          </strong>
        </div>

        <div className="yt-preview-row">
          <span>File size</span>

          <strong>
            {formatSize(file.size)}
          </strong>
        </div>

        <div className="yt-preview-row">
          <span>Type</span>

          <strong>
            {file.type}
          </strong>
        </div>

        <div className="yt-preview-row">
          <span>Status</span>

          <strong className="ready">
            Ready to upload
          </strong>
        </div>

      </div>

    </aside>
  );
}