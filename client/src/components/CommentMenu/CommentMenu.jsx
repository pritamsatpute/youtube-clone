// Components
import Dropdown from "../ui/Dropdown/Dropdown";
import DropdownDivider from "../ui/Dropdown/DropdownDivider";
import DropdownItem from "../ui/Dropdown/DropdownItem";

// Data
import {
  ownerCommentMenuSections,
  otherCommentMenuSections,
} from "./commentMenuData";

// Styles
import "./CommentMenu.css";

// Component
export default function CommentMenu({
  isOpen,
  onClose,
  onAction,
  isOwner = false,
}) {
  // Menu Sections
  const sections = isOwner
    ? ownerCommentMenuSections
    : otherCommentMenuSections;

  // Render
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="yt-comment-menu-dropdown"
    >
      {sections.map(
        (section, sectionIndex) => (
          <div
            key={`comment-menu-section-${sectionIndex}`}
          >
            {section.map((item) => (
              <DropdownItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                danger={item.danger}
                onClick={() => {
                  onAction?.(item.id);
                  onClose?.();
                }}
              />
            ))}

            {sectionIndex !==
              sections.length - 1 && (
              <DropdownDivider />
            )}
          </div>
        ),
      )}
    </Dropdown>
  );
}