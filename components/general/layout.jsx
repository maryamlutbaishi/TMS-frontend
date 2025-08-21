import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="logo">ZAHRA APP</h2>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/lists">My Lists</NavLink>
        </nav>

        <div
          className="user-section"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <span>{user.username}</span>
          {showUserMenu && (
            <div className="user-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
