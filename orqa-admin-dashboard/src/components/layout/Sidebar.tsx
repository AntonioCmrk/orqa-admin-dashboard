import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";
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
          <img className="sidebar__logo" src={logo} alt="Orqa logo" />
          <span>Orqa Admin Dashboard</span>
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
