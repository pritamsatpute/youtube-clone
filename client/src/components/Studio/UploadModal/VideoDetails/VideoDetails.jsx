// React
import { useEffect, useState } from "react";

// Services
import { createVideo } from "../../../../services/videoService";

// Components
import ThumbnailPicker from "../ThumbnailPicker/ThumbnailPicker";
import VideoPreview from "../VideoPreview/VideoPreview";

// Styles
import "./VideoDetails.css";

// Component
export default function VideoDetails({
  file,
  onCancel,
  onUploaded,
}) {
  // State
  const [isUploading, setIsUploading] =
    useState(false);

  const [duration, setDuration] =
    useState(0);

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    playlist: "",
    tags: "",
    category: "Entertainment",
    audience: "not_for_kids",
    visibility: "private",
  });

  // Read Video Duration
  useEffect(() => {
    if (!file) {
      setDuration(0);
      return;
    }

    const video =
      document.createElement("video");

    const objectUrl =
      URL.createObjectURL(file);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      setDuration(
        Math.round(video.duration),
      );

      URL.revokeObjectURL(objectUrl);
    };

    video.onerror = () => {
      setDuration(0);

      URL.revokeObjectURL(objectUrl);
    };

    video.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // Update Field
  const updateField = (
    field,
    value,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Upload
  const handleUpload = async () => {
    try {
      if (!form.title.trim()) {
        alert("Title is required.");

        return;
      }

      setIsUploading(true);

      const formData =
        new FormData();

      // Video
      formData.append(
        "video",
        file,
      );

      // Thumbnail
      if (form.thumbnail) {
        formData.append(
          "thumbnail",
          form.thumbnail,
        );
      }

      // Details
      formData.append(
        "title",
        form.title,
      );

      formData.append(
        "description",
        form.description,
      );

      formData.append(
        "category",
        form.category,
      );

      formData.append(
        "tags",
        form.tags,
      );

      formData.append(
        "audience",
        form.audience,
      );

      formData.append(
        "visibility",
        form.visibility,
      );

      // Duration
      formData.append(
        "duration",
        String(duration),
      );

      // Upload
      await createVideo(
        formData,
      );

      onUploaded?.();
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Upload failed.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Render
  return (
    <>
      {/* Details Content */}
      <div className="yt-video-details">

        {/* Left Side */}
        <section className="yt-details-form">

          {/* Title */}
          <div className="yt-input-group">

            <label>
              Title (required)
            </label>

            <textarea
              rows={3}
              maxLength={100}
              placeholder="Add a title that describes your video"
              value={form.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value,
                )
              }
            />

            <span>
              {form.title.length}/100
            </span>

          </div>

          {/* Description */}
          <div className="yt-input-group">

            <label>
              Description
            </label>

            <textarea
              rows={8}
              maxLength={5000}
              placeholder="Tell viewers about your video"
              value={
                form.description
              }
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
            />

            <span>
              {form.description.length}/5000
            </span>

          </div>

          {/* Thumbnail */}
          <ThumbnailPicker
            file={form.thumbnail}
            onChange={(image) =>
              updateField(
                "thumbnail",
                image,
              )
            }
          />

          {/* Playlist */}
          <section className="yt-card">

            <h3>
              Playlist
            </h3>

            <select
              value={form.playlist}
              onChange={(event) =>
                updateField(
                  "playlist",
                  event.target.value,
                )
              }
            >
              <option value="">
                No playlist
              </option>
            </select>

          </section>

          {/* Tags */}
          <div className="yt-input-group">

            <label>
              Tags
            </label>

            <textarea
              rows={2}
              placeholder="react, javascript, tutorial"
              value={form.tags}
              onChange={(event) =>
                updateField(
                  "tags",
                  event.target.value,
                )
              }
            />

            <span>
              Separate tags with commas
            </span>

          </div>

          {/* Category */}
          <section className="yt-card">

            <h3>
              Category
            </h3>

            <select
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value,
                )
              }
            >
              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Gaming">
                Gaming
              </option>

              <option value="Music">
                Music
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Science & Technology">
                Science & Technology
              </option>

              <option value="Travel & Events">
                Travel & Events
              </option>

              <option value="People & Blogs">
                People & Blogs
              </option>

              <option value="News & Politics">
                News & Politics
              </option>
            </select>

          </section>

          {/* Audience */}
          <section className="yt-card">

            <h3>
              Audience
            </h3>

            <label>
              <input
                type="radio"
                checked={
                  form.audience ===
                  "made_for_kids"
                }
                onChange={() =>
                  updateField(
                    "audience",
                    "made_for_kids",
                  )
                }
              />

              Yes, it's made for kids
            </label>

            <label>
              <input
                type="radio"
                checked={
                  form.audience ===
                  "not_for_kids"
                }
                onChange={() =>
                  updateField(
                    "audience",
                    "not_for_kids",
                  )
                }
              />

              No, it's not made for kids
            </label>

          </section>

          {/* Visibility */}
          <section className="yt-card">

            <h3>
              Visibility
            </h3>

            <select
              value={form.visibility}
              onChange={(event) =>
                updateField(
                  "visibility",
                  event.target.value,
                )
              }
            >
              <option value="private">
                Private
              </option>

              <option value="unlisted">
                Unlisted
              </option>

              <option value="public">
                Public
              </option>
            </select>

          </section>

        </section>

        {/* Right Side */}
        <VideoPreview
          file={file}
          thumbnail={
            form.thumbnail
          }
        />

      </div>

      {/* Footer */}
      <footer className="yt-details-footer">

        {/* Cancel */}
        <button
          type="button"
          className="yt-cancel-btn"
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </button>

        {/* Upload */}
        <button
          type="button"
          className="yt-next-btn"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading
            ? "Uploading..."
            : "Upload Video"}
        </button>

      </footer>
    </>
  );
}