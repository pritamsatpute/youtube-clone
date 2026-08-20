// React
import { useEffect, useRef } from "react";

// Styles
import "./Dropdown.css";

// Component
export default function Dropdown({
  isOpen,
  onClose,
  children,
  className = "",
  triggerRef,
}) {

  // Refs
  const dropdownRef = useRef(null);

  // Effects
useEffect(() => {
  if (!isOpen) return;

  const handleClickOutside = (event) => {
    const clickedInsideDropdown =
      dropdownRef.current?.contains(
        event.target,
      );

    const clickedTrigger =
      triggerRef?.current?.contains(
        event.target,
      );

    if (
      !clickedInsideDropdown &&
      !clickedTrigger
    ) {
      onClose?.();
    }
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      onClose?.();
    }
  };

  const timeout = setTimeout(() => {
    document.addEventListener(
      "click",
      handleClickOutside,
    );
  }, 0);

  document.addEventListener(
    "keydown",
    handleEscape,
  );

  return () => {
    clearTimeout(timeout);

    document.removeEventListener(
      "click",
      handleClickOutside,
    );

    document.removeEventListener(
      "keydown",
      handleEscape,
    );
  };
}, [isOpen, onClose, triggerRef]);

  // Render
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`yt-dropdown ${className}`}
    >
      {children}
    </div>
  );
}