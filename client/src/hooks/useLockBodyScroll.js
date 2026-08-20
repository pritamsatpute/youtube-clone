// React
import { useEffect } from "react";

// Hook
export default function useLockBodyScroll(
  locked = false,
) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    // Previous Body Styles
    const previousOverflow =
      document.body.style.overflow;

    const previousPaddingRight =
      document.body.style.paddingRight;

    // Scrollbar Width
    const scrollbarWidth =
      window.innerWidth -
      document.documentElement
        .clientWidth;

    // Lock Body Scroll
    document.body.style.overflow =
      "hidden";

    // Prevent Layout Shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    // Restore Body
    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.style.paddingRight =
        previousPaddingRight;
    };
  }, [locked]);
}