import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
      >
        Home
      </NavLink>
      <a className="nav-item" href="#saved">
        Saved
      </a>
      <a className="nav-item" href="#messages">
        Messages
      </a>
      <NavLink
        to="/profile"
        className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
      >
        Profile
      </NavLink>
    </div>
  );
}
