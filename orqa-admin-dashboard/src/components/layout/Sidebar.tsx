import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

export function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__brand">
          <span className="sidebar__logo">O</span>
          <span>Orqa Admin</span>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/profile">Profile Settings</NavLink>
        </nav>
      </div>

      <button className="sidebar__logout" type="button" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
