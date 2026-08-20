// React
import {
  useContext,
} from "react";

// Provider
import {
  ThemeContext,
} from "../providers/ThemeProvider";

// Hook
export default function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
}