// React
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import SearchSuggestions from "./SearchSuggestions";

// Styles
import "./SearchBar.css";

// Component
export default function SearchBar({
  isMobileSearch = false,
  onClose,
}) {
  // Hooks
  const navigate = useNavigate();

  // Refs
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // State
  const [search, setSearch] = useState("");

  const [
    isSuggestionsOpen,
    setIsSuggestionsOpen,
  ] = useState(false);

  // Focus Mobile Input
  useEffect(() => {
    if (isMobileSearch) {
      inputRef.current?.focus();
    }
  }, [isMobileSearch]);

  // Close Suggestions On Outside Click
  useEffect(() => {
    const handleClickOutside = (
      event,
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target,
        )
      ) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  // Submit Search
  const handleSubmit = (
    event,
  ) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    setIsSuggestionsOpen(false);

    navigate(
      `/results?search_query=${encodeURIComponent(
        query,
      )}`,
    );

    onClose?.();
  };

  // Handle Input Change
  const handleChange = (
    event,
  ) => {
    const value = event.target.value;

    setSearch(value);

    setIsSuggestionsOpen(
      value.trim().length > 0,
    );
  };

  // Select Suggestion
  const handleSuggestionSelect = (
    value,
  ) => {
    setSearch(value);

    setIsSuggestionsOpen(false);

    navigate(
      `/results?search_query=${encodeURIComponent(
        value,
      )}`,
    );

    onClose?.();
  };

  // Handle Focus
  const handleFocus = () => {
    if (search.trim()) {
      setIsSuggestionsOpen(true);
    }
  };

  // Clear Search
  const handleClear = () => {
    setSearch("");

    setIsSuggestionsOpen(false);

    inputRef.current?.focus();
  };

  // Render
  return (
    <div
      ref={searchRef}
      className={`yt-searchbar ${
        isMobileSearch
          ? "yt-searchbar--mobile"
          : ""
      }`}
    >
      {/* Mobile Back */}
      {isMobileSearch && (
        <button
          type="button"
          className="yt-mobile-search-back"
          aria-label="Back"
          onClick={onClose}
        >
          <ArrowBackIcon />
        </button>
      )}

      {/* Search Form */}
      <form
        className="yt-searchbar-form"
        onSubmit={handleSubmit}
      >
        <div className="yt-searchbar-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="yt-searchbar-input"
            placeholder="Search"
            autoComplete="off"
            spellCheck={false}
            value={search}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          {search && (
            <button
              type="button"
              className="yt-searchbar-clear"
              aria-label="Clear search"
              onClick={handleClear}
            >
              <CloseIcon fontSize="small" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="yt-searchbar-button"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </form>

      {/* Voice Search */}
      {!isMobileSearch && (
        <button
          type="button"
          className="yt-mic-button"
          aria-label="Search with your voice"
        >
          <KeyboardVoiceIcon />
        </button>
      )}

      {/* Suggestions */}
      <SearchSuggestions
        isOpen={isSuggestionsOpen}
        query={search}
        onSelect={
          handleSuggestionSelect
        }
      />
    </div>
  );
}