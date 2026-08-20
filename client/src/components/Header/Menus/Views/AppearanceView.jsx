// Hooks
import useTheme from "../../../../hooks/useTheme";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";

// Components
import DropdownDivider from "../../../ui/Dropdown/DropdownDivider";
import DropdownItem from "../../../ui/Dropdown/DropdownItem";

// Styles
import "./AppearanceView.css";

// Theme Options
const THEME_OPTIONS = [
  {
    id: "system",
    label: "Use device theme",
  },
  {
    id: "dark",
    label: "Dark theme",
  },
  {
    id: "light",
    label: "Light theme",
  },
];

// Component
export default function AppearanceView({
  onBack,
}) {

  // Hooks
  const {
    theme,
    setTheme,
  } = useTheme();

  // Render
  return (
    <>
      <DropdownItem
        icon={<ArrowBackIcon />}
        label="Appearance"
        onClick={onBack}
      />

      <DropdownDivider />

      {THEME_OPTIONS.map((option) => (
        <DropdownItem
          key={option.id}
          label={option.label}
          startSpacer
          endIcon={
            theme === option.id ? (
              <CheckIcon className="yt-check-icon" />
            ) : null
          }
          onClick={() => setTheme(option.id)}
        />
      ))}
    </>
  );
}