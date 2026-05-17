import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Navbar.css";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "User Management",
  "/profile": "Profile Settings",
};

export function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const title = pageTitles[location.pathname] ?? "Dashboard";
  const initials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="navbar">
      <div>
        <p className="navbar__eyebrow">Admin Panel</p>
        <h1>{title}</h1>
      </div>

      <div className="navbar__user">
        <div className="navbar__avatar">{initials}</div>
        <div>
          <strong>{user?.name}</strong>
          <span>{user?.role}</span>
        </div>
      </div>
    </header>
  );
}
