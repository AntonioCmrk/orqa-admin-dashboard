import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    onClose();
    navigate("/login");
  }

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? "sidebar-backdrop--open" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div>
          <div className="sidebar__brand">
            <img className="sidebar__logo" src={logo} alt="Orqa logo" />

            <span>Orqa Admin Dashboard</span>

            <button
              className="sidebar__close"
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>

          <nav className="sidebar__nav">
            <NavLink to="/dashboard" onClick={onClose}>
              Dashboard
            </NavLink>

            <NavLink to="/users" onClick={onClose}>
              Users
            </NavLink>

            <NavLink to="/profile" onClick={onClose}>
              Profile Settings
            </NavLink>
          </nav>
        </div>

        <button
          className="sidebar__logout"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
    </>
  );
}
