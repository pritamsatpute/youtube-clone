// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";

// Components
import DropdownDivider from "../../../ui/Dropdown/DropdownDivider";
import DropdownItem from "../../../ui/Dropdown/DropdownItem";

// Styles
import "./LanguageView.css";

// Language Options
const LANGUAGE_OPTIONS = [
  { id: "en-US", label: "English (US)" },
  { id: "en-GB", label: "English (UK)" },
  { id: "hi", label: "हिन्दी" },
  { id: "mr", label: "मराठी" },
  { id: "bn", label: "বাংলা" },
  { id: "ta", label: "தமிழ்" },
  { id: "te", label: "తెలుగు" },
  { id: "kn", label: "ಕನ್ನಡ" },
  { id: "gu", label: "ગુજરાતી" },
  { id: "ml", label: "മലയാളം" },
];

// Component

export default function LanguageView({
  selected = "en-US",
  onBack,
  onSelect,
}) {

  // Render
  return (
    <>
      <DropdownItem
        icon={<ArrowBackIcon />}
        label="Language"
        onClick={onBack}
      />

      <DropdownDivider />

      {LANGUAGE_OPTIONS.map((language) => (
        <DropdownItem
          key={language.id}
          label={language.label}
          startSpacer
          endIcon={
            selected === language.id ? (
              <CheckIcon className="yt-check-icon" />
            ) : null
          }
          onClick={() => onSelect?.(language.id)}
        />
      ))}
    </>
  );
}