// Imports Primary
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";

// Imports Library
// Outlined
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// Filled
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// Imports Explore
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import SportsCricketOutlinedIcon from "@mui/icons-material/SportsCricketOutlined";

// Imports More from YouTube
import youtubeLogo from "../../assets/logos/youtube.svg";
import youtubeMusicLogo from "../../assets/logos/youtube-music.svg";
import youtubeKidsLogo from "../../assets/logos/youtube-kids.svg";

// Imports Settings
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";

// Primary
export const primaryItems = [
  {
    title: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Subscriptions",
    icon: <SubscriptionsOutlinedIcon />,
    activeIcon: <SubscriptionsIcon />,
    path: "/subscriptions",
  },
];

// Guest Items
export const guestPrimaryItems = [
  {
    title: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Subscriptions",
    icon: <SubscriptionsOutlinedIcon />,
    activeIcon: <SubscriptionsIcon />,
    path: "/subscriptions",
  },
  {
    title: "You",
    icon: <AccountCircleOutlinedIcon />,
    activeIcon: <AccountCircleIcon />,
    path: "/login",
  },
  {
    title: "History",
    icon: <HistoryOutlinedIcon />,
    activeIcon: <HistoryIcon />,
    path: "/history",
  },
];

// Logged-in Library
export const youItems = [
  {
    title: "Your Channel",
    icon: <AccountCircleOutlinedIcon />,
    activeIcon: <AccountCircleIcon />,
    path: "/channel/me",
  },
  {
    title: "History",
    icon: <HistoryOutlinedIcon />,
    activeIcon: <HistoryIcon />,
    path: "/history",
  },
  {
    title: "Liked videos",
    icon: <ThumbUpOutlinedIcon />,
    activeIcon: <ThumbUpIcon />,
    path: "/liked-videos",
  },
];

// Mini Sidebar
export const miniSidebarItems = [
  {
    title: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Subscriptions",
    icon: <SubscriptionsOutlinedIcon />,
    activeIcon: <SubscriptionsIcon />,
    path: "/subscriptions",
  },
  {
    title: "You",
    icon: <AccountCircleOutlinedIcon />,
    activeIcon: <AccountCircleIcon />,
    path: "/login",
  },
];

// Explore
export const exploreItems = [
  {
    title: "Shopping",
    icon: <ShoppingBagOutlinedIcon />,
    path: "/shopping",
  },
  {
    title: "Music",
    icon: <MusicNoteOutlinedIcon />,
    path: "/music",
  },
  {
    title: "Movies & TV",
    icon: <MovieOutlinedIcon />,
    path: "/movies",
  },
  {
    title: "Live",
    icon: <SensorsOutlinedIcon />,
    path: "/live",
  },
  {
    title: "Gaming",
    icon: <SportsEsportsOutlinedIcon />,
    path: "/gaming",
  },
  {
    title: "News",
    icon: <NewspaperOutlinedIcon />,
    path: "/news",
  },
  {
    title: "Sports",
    icon: <SportsCricketOutlinedIcon />,
    path: "/sports",
  },
  {
    title: "Courses",
    icon: <SchoolOutlinedIcon />,
    path: "/courses",
  },
  {
    title: "Fashion & Beauty",
    icon: <CheckroomOutlinedIcon />,
    path: "/fashion",
  },
  {
    title: "Podcasts",
    icon: <PodcastsOutlinedIcon />,
    path: "/podcasts",
  },
  {
    title: "Membership",
    icon: <EmojiEventsOutlinedIcon />,
    path: "/membership",
  },
];
// More from YouTube
export const moreFromYoutubeItems = [
  {
    title: "YouTube Premium",
    icon: <img src={youtubeLogo} alt="YouTube Premium" />,
    path: "https://www.youtube.com/premium",
  },
  {
    title: "YouTube Music",
    icon: <img src={youtubeMusicLogo} alt="YouTube Music" />,
    path: "https://music.youtube.com/",
  },
  {
    title: "YouTube Kids",
    icon: <img src={youtubeKidsLogo} alt="YouTube Kids" />,
    path: "https://www.youtubekids.com/",
  },
];

// Settings
export const settingsItems = [
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    path: "/settings",
  },
  {
    title: "Report history",
    icon: <FlagOutlinedIcon />,
    path: "/report-history",
  },
  {
    title: "Help",
    icon: <HelpOutlineOutlinedIcon />,
    path: "/help",
  },
  {
    title: "Send feedback",
    icon: <FeedbackOutlinedIcon />,
    path: "/feedback",
  },
];
