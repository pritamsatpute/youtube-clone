// React
import { useEffect } from "react";

// Styles
import "./Dialog.css";

// Component
export default function Dialog({
  isOpen,
  onClose,
  children,
  className = "",
}) {

  // Effects
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Don't Render
  if (!isOpen) {
    return null;
  }

  // Handlers
  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  // Render
  return (
    <div
      className="yt-dialog-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className={`yt-dialog ${className}`}
        onClick={handleDialogClick}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}