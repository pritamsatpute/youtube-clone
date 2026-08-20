// React
import { useState } from "react";

// Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

// Components
import SidebarItem from "./SidebarItem";

// Component
export default function SidebarSection({
  title,
  items = [],
  collapsed = false,
  expandable = false,
  showArrow = false,
  initialVisibleItems = 3,
}) {
  // State
  const [expanded, setExpanded] =
    useState(false);

  // Visible Items
  const visibleItems =
    !collapsed &&
    expandable &&
    !expanded
      ? items.slice(0, initialVisibleItems)
      : items;

  // Render
  return (
    <section className="yt-sidebar-section">

      {/* Header */}
      {!collapsed && title && (
        <div className="yt-sidebar-section-header">

          <h3 className="yt-sidebar-section-title">
            {title}
          </h3>

          {showArrow && (
            <ChevronRightIcon
              className="yt-sidebar-section-arrow"
            />
          )}

        </div>
      )}

      {/* Items */}
      {visibleItems.map((item) => (
        <SidebarItem
          key={item.title}
          item={item}
          collapsed={collapsed}
        />
      ))}

      {/* Show More */}
      {!collapsed &&
        expandable &&
        items.length >
          initialVisibleItems && (
          <button
            type="button"
            className="yt-sidebar-show-more"
            onClick={() =>
              setExpanded(
                (previous) => !previous,
              )
            }
          >
            {expanded ? (
              <>
                <ExpandLessOutlinedIcon />

                <span>
                  Show fewer
                </span>
              </>
            ) : (
              <>
                <ExpandMoreOutlinedIcon />

                <span>
                  Show more
                </span>
              </>
            )}
          </button>
        )}

    </section>
  );
}