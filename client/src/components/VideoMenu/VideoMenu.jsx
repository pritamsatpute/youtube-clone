// Components
import Dropdown from "../ui/Dropdown/Dropdown";
import DropdownDivider from "../ui/Dropdown/DropdownDivider";
import DropdownItem from "../ui/Dropdown/DropdownItem";

// Data
import { videoMenuSections } from "./videoMenuData";

// Styles
import "./VideoMenu.css";

// Component
export default function VideoMenu({
  isOpen,
  onClose,
  onAction,
  isOwner = false,
  isDeleting = false,
}) {
  // Owner Actions
  const ownerActions = [
    {
      id: "edit",
      label: "Edit",
    },
    {
      id: "delete",
      label: "Delete",
      danger: true,
    },
  ];

  // Render
  return (
    <Dropdown isOpen={isOpen} onClose={onClose} className="yt-video-menu">
      {/* Owner Actions */}
      {isOwner && (
        <>
          {ownerActions.map((item) => (
            <DropdownItem
              key={item.id}
              label={
                item.id === "delete" && isDeleting ? "Deleting..." : item.label
              }
              danger={item.danger}
              onClick={() => {
                if (item.id === "delete" && isDeleting) {
                  return;
                }

                onAction?.(item.id);
                onClose?.();
              }}
            />
          ))}

          <DropdownDivider />
        </>
      )}

      {/* Existing Actions */}
      {videoMenuSections.map((section, sectionIndex) => (
        <div
          key={`video-menu-section-${sectionIndex}`}
          className="yt-video-menu-section"
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

          {sectionIndex < videoMenuSections.length - 1 && <DropdownDivider />}
        </div>
      ))}
    </Dropdown>
  );
}
