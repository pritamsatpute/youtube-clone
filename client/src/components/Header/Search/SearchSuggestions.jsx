// React
import SearchIcon from "@mui/icons-material/Search";

// Styles
import "./SearchSuggestions.css";

// Temporary Suggestions
const suggestions = [
  "How to build a YouTube Clone",
  "MERN Stack Tutorial",
  "React JS Full Course",
  "Node.js Authentication",
  "MongoDB Atlas Setup",
  "JavaScript Interview Questions",
  "Next.js Crash Course",
  "Express.js REST API",
  "React Router DOM v7",
  "Redux Toolkit Tutorial",
  "Tailwind CSS Guide",
  "TypeScript for Beginners",
  "Firebase Authentication",
  "Docker for Developers",
  "Git and GitHub Tutorial",
  "VS Code Extensions",
  "OpenAI API Tutorial",
  "AI SaaS Project",
  "YouTube Clone React",
  "Portfolio Website React",
];

// Component
export default function SearchSuggestions({
  isOpen,
  query,
  onSelect,
}) {

  // Don't render if closed
  if (!isOpen) {
    return null;
  }

  // Filter Suggestions
  const filteredSuggestions = suggestions.filter((item) =>
    item
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Render
  return (
    <div className="yt-search-suggestions">
      {filteredSuggestions.length > 0 ? (
        filteredSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="yt-search-suggestion"
            onClick={() => onSelect?.(suggestion)}
          >
            <SearchIcon />

            <span>{suggestion}</span>
          </button>
        ))
      ) : (
        <div className="yt-search-empty">
          No suggestions
        </div>
      )}
    </div>
  );
}