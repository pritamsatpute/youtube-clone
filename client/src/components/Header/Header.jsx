// React
import { useState } from "react";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Styles
import "./Header.css";

// Provider
import { useAuth } from "../../providers/AuthProvider";

// Components
import HeaderLeft from "./HeaderLeft";
import HeaderCenter from "./HeaderCenter";
import HeaderRight from "./HeaderRight";
import SearchBar from "./Search/SearchBar";

// Component
export default function Header({
  onMenuClick,
}) {
  // Auth
  const { user } = useAuth();

  // State
  const [
    isMobileSearchOpen,
    setIsMobileSearchOpen,
  ] = useState(false);

  // Open Mobile Search
  const openMobileSearch = () => {
    setIsMobileSearchOpen(true);
  };

  // Close Mobile Search
  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
  };

  // Render
  return (
    <header className="yt-header">
      {/* Normal Header */}
      {!isMobileSearchOpen && (
        <>
          <HeaderLeft
            onMenuClick={onMenuClick}
          />

          <HeaderCenter />

          <HeaderRight user={user} />

          {/* Mobile Search Button */}
          <button
            type="button"
            className="yt-mobile-search-button"
            aria-label="Search"
            onClick={openMobileSearch}
          >
            <SearchIcon />
          </button>
        </>
      )}

      {/* Mobile Search */}
      {isMobileSearchOpen && (
        <SearchBar
          isMobileSearch
          onClose={closeMobileSearch}
        />
      )}
    </header>
  );
}