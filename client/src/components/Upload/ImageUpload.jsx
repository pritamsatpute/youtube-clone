import "./ImageUpload.css";

export default function ImageUpload({
  label,
  preview,
  accept = "image/*",
  onChange,
}) {
  return (
    <div className="image-upload">
      <label className="image-upload-label">
        {label}
      </label>

      <div className="image-upload-box">
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="image-preview"
          />
        ) : (
          <div className="upload-placeholder">
            <span>📷</span>
            <p>Choose Image</p>
          </div>
        )}

        <input
          type="file"
          accept={accept}
          onChange={onChange}
        />
      </div>
    </div>
  );
}