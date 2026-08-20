// Components
import SearchFilters from "./SearchFilters/SearchFilters";
import SearchResults from "./SearchResults/SearchResults";

// Styles
import "./Search.css";

// Component
export default function Search() {

  // Render
  return (
    <div className="yt-search-page">

      <SearchFilters />

      <main className="yt-search-content">
        <SearchResults />
      </main>

    </div>
  );
}