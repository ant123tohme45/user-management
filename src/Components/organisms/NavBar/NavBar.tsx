// import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router";
import { useThemeStore } from "../../../store/themeStore";
import { Sun, Moon } from "lucide-react";

const NavBar = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="main-navbar">
      <h1 className="nav-header">User Management</h1>
      <div className="nav-buttons-container">
        <button className="create-user-btn">Create User</button>
        <button className="logout-user-btn" onClick={handleLogout}>
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className="moonicon-btn"
          aria-label="Toggle dark/light mode"
          title="Toggle dark/light mode"
        >
          {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
