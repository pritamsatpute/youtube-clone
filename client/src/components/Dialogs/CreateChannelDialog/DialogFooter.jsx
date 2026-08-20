// Styles
import "./DialogFooter.css";

// Component
export default function DialogFooter({
  loading,
  canCreate,
  onCancel,
  onCreate,
}) {
  return (
    <div className="yt-dialog-footer">
      <button
        type="button"
        className="yt-dialog-cancel"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </button>

      <button
        type="button"
        className="yt-dialog-create"
        onClick={onCreate}
        disabled={loading || !canCreate}
        aria-disabled={loading || !canCreate}
      >
        {loading
          ? "Creating..."
          : "Create channel"}
      </button>
    </div>
  );
}