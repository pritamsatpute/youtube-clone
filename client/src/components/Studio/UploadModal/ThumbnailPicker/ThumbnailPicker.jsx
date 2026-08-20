// React
import {
  useEffect,
  useRef,
  useState,
} from "react";

// Icons
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

// Styles
import "./ThumbnailPicker.css";

// Component
export default function ThumbnailPicker({
  file,
  onChange,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");

      return;
    }

    const url =
      URL.createObjectURL(file);

    setPreview(url);

    return () =>
      URL.revokeObjectURL(url);
  }, [file]);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleSelect = (event) => {
    const selected =
      event.target.files?.[0];

    if (!selected) {
      return;
    }

    if (
      !selected.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please choose an image."
      );

      return;
    }

    onChange?.(selected);
  };

  return (
    <section className="yt-thumbnail-picker">
      <div className="yt-thumbnail-header">
        <h3>Thumbnail</h3>

        <span>
          Set a thumbnail that
          stands out and draws
          viewers' attention.
        </span>
      </div>

      <div className="yt-thumbnail-grid">

        <button
          type="button"
          className="yt-thumbnail-upload"
          onClick={openPicker}
        >
          {preview ? (
            <img
              src={preview}
              alt="Thumbnail"
            />
          ) : (
            <>
              <ImageOutlinedIcon />

              <strong>
                Upload thumbnail
              </strong>

              <small>
                JPG, PNG, WEBP
              </small>
            </>
          )}
        </button>

      </div>

      <p className="yt-thumbnail-note">
        Recommended: 1280 × 720
        pixels (16:9)
      </p>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleSelect}
      />
    </section>
  );
}