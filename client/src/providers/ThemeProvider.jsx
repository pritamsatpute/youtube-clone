// React
import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Context
export const ThemeContext = createContext(null);

// Constants
const STORAGE_KEY = "youtube-clone-theme";

// Helpers
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem(STORAGE_KEY);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
};

// Provider
export default function ThemeProvider({
  children,
}) {
  // State

  const [theme, setTheme] = useState(getInitialTheme);

  const [resolvedTheme, setResolvedTheme] = useState(
    theme === "system"
      ? getSystemTheme()
      : theme
  );

  // Apply Theme
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateTheme = () => {
      const activeTheme =
        theme === "system"
          ? getSystemTheme()
          : theme;

      setResolvedTheme(activeTheme);

      document.documentElement.setAttribute(
        "data-theme",
        activeTheme
      );
    };

    updateTheme();

    mediaQuery.addEventListener(
      "change",
      updateTheme
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateTheme
      );
    };
  }, [theme]);

  // Persist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  }, [theme]);

  // Context Value
  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,

      isLight: resolvedTheme === "light",
      isDark: resolvedTheme === "dark",
      isSystem: theme === "system",

      setTheme,
    }),
    [theme, resolvedTheme]
  );

  // Render
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}