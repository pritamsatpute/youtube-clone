// React
import { useCallback, useState } from "react";

// Hook
export default function useMenuNavigation(
  initialView = "main"
) {

  // State
  const [view, setView] = useState(initialView);

  // Navigation
  const openView = useCallback((nextView) => {
    setView(nextView);
  }, []);

  const goBack = useCallback(() => {
    setView(initialView);
  }, [initialView]);

  const reset = useCallback(() => {
    setView(initialView);
  }, [initialView]);

  // Helpers
  const isMainView = view === initialView;

  // API
  return {
    view,

    isMainView,

    openView,
    goBack,
    reset,
  };
}