// React
import { useEffect, useState } from "react";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Component
import SelectVideo from "./SelectVideo/SelectVideo";
import VideoDetails from "./VideoDetails/VideoDetails";

// Styles
import "./UploadModal.css";

export default function UploadModal({ open, onClose, onUploaded,}) {
  // State
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="yt-upload-overlay" onClick={onClose}>
      <div
        className="yt-upload-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="yt-upload-header">
          <h2>{videoFile ? "Details" : "Upload videos"}</h2>

          {!videoFile && (
            <button className="yt-upload-close" onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </header>

        <div className="yt-upload-content">
          {!videoFile ? (
            <SelectVideo onSelect={setVideoFile} />
          ) : (
            <VideoDetails
              file={videoFile}
              onCancel={() => setVideoFile(null)}
              onUploaded={() => {
                setVideoFile(null);

                onUploaded?.();
            
                onClose();
              }}
            />
          )}
        </div>

        {!videoFile && (
          <footer className="yt-upload-footer">
           By submitting your videos to YouTube, you acknowledge that you agree to YouTube's Terms of Service and Community Guidelines. Please ensure your videos don't violate anyone else's privacy or copyright.
          </footer>
        )}
      </div>
    </div>
  );
}
