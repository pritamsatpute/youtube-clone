// Components
import GuestMenu from "./Menus/GuestMenu/GuestMenu";
import UserMenu from "./Menus/UserMenu/UserMenu";

// Component
export default function HeaderRight({ user }) {

  // Render
  return (
    <div className="yt-header-right">
      {user ? <UserMenu user={user} /> : <GuestMenu />}
    </div>
  );
}