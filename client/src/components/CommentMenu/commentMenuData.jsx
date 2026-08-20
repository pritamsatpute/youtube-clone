// Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

// Owner Menu
export const ownerCommentMenuSections = [
  [
    {
      id: "edit",
      label: "Edit",
      icon: <EditOutlinedIcon />,
    },

    {
      id: "delete",
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      danger: true,
    },
  ],

  [
    {
      id: "report",
      label: "Report",
      icon: <FlagOutlinedIcon />,
    },
  ],
];

// Other User Menu
export const otherCommentMenuSections = [
  [
    {
      id: "report",
      label: "Report",
      icon: <FlagOutlinedIcon />,
    },
  ],
];