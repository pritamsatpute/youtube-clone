// Icons
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

export const videoMenuSections = [
  [
    {
      id: "not-interested",
      label: "Not interested",
      icon: <ThumbDownOffAltOutlinedIcon />,
    },
    {
      id: "dont-recommend",
      label: "Don't recommend channel",
      icon: <BlockOutlinedIcon />,
    },
  ],

  [
    {
      id: "share",
      label: "Share",
      icon: <ShareOutlinedIcon />,
    },
  ],

  [
    {
      id: "report",
      label: "Report",
      icon: <FlagOutlinedIcon />,
      danger: true,
    },
  ],
];