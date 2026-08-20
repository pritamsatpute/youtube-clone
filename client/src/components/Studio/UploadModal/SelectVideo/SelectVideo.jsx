// React
import { useRef, useState } from "react";

// Icons
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

// Styles
import "./SelectVideo.css";

// Component
export default function SelectVideo({
  onSelect,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] =
    useState(false);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleFile = (file) => {
    if (!file) return;

    if (
      !file.type.startsWith("video/")
    ) {
      alert(
        "Please select a video file."
      );

      return;
    }

    onSelect?.(file);
  };

  return (
    <div
      className={`yt-select-video ${
        dragging
          ? "dragging"
          : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();

        setDragging(true);
      }}
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={(event) => {
        event.preventDefault();

        setDragging(false);

        handleFile(
          event.dataTransfer.files[0]
        );
      }}
    >
      <div className="yt-upload-icon">
        <CloudUploadOutlinedIcon />
      </div>

      <h3>
        Drag and drop video files
        to upload
      </h3>

      <button
        type="button"
        className="yt-select-btn"
        onClick={openPicker}
      >
        Select files
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="video/*"
        onChange={(event) =>
          handleFile(
            event.target.files[0]
          )
        }
      />
    </div>
  );
}