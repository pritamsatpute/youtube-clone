// React
import { useCallback, useState } from "react";

// Hook
export default function useDialog(
  initialState = false
) {

  // State
  const [isOpen, setIsOpen] = useState(initialState);

  // Handlers
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  // API
  return {
    isOpen,

    open,
    close,
    toggle,
  };
}