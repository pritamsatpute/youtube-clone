// React
import {
  useEffect,
  useRef,
  useState,
} from "react";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Data
import categories from "../../../data/categories";

// Styles
import "./FilterBar.css";

// Component
export default function FilterBar({
  activeCategory = "All",
  onCategoryChange,
}) {
  // State
  const [showLeft, setShowLeft] =
    useState(false);

  const [showRight, setShowRight] =
    useState(false);

  // Ref
  const scrollRef =
    useRef(null);

  // Update Arrows
  const updateArrows = () => {
    const element =
      scrollRef.current;

    if (!element) {
      return;
    }

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = element;

    setShowLeft(
      scrollLeft > 1,
    );

    setShowRight(
      scrollLeft +
        clientWidth <
        scrollWidth - 1,
    );
  };

  // Scroll
  const scroll = (
    direction,
  ) => {
    const element =
      scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left:
        direction === "left"
          ? -300
          : 300,
      behavior: "smooth",
    });
  };

  // Effects
  useEffect(() => {
    const element =
      scrollRef.current;

    if (!element) {
      return;
    }

    updateArrows();

    element.addEventListener(
      "scroll",
      updateArrows,
    );

    window.addEventListener(
      "resize",
      updateArrows,
    );

    return () => {
      element.removeEventListener(
        "scroll",
        updateArrows,
      );

      window.removeEventListener(
        "resize",
        updateArrows,
      );
    };
  }, []);

  // Render
  return (
    <nav
      className="filter-wrapper"
      aria-label="Video categories"
    >

      {/* Left Arrow */}
      {showLeft && (
        <button
          type="button"
          className="filter-arrow filter-arrow-left"
          aria-label="Scroll categories left"
          onClick={() =>
            scroll("left")
          }
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        className="filter-bar"
      >
        {categories.map(
          (category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory ===
                category
                  ? "filter-chip active"
                  : "filter-chip"
              }
              onClick={() =>
                onCategoryChange?.(
                  category,
                )
              }
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Right Arrow */}
      {showRight && (
        <button
          type="button"
          className="filter-arrow filter-arrow-right"
          aria-label="Scroll categories right"
          onClick={() =>
            scroll("right")
          }
        >
          <ChevronRightIcon />
        </button>
      )}

    </nav>
  );
}