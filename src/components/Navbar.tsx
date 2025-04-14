import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStores';
import { useThemeStore } from '../stores/themeStore';

const Layout: React.FC = () => {
  const { logout } = useAuthStore();
  const { darkMode, toggleTheme } = useThemeStore();

  const handleCreateUser = () => {
    const firstName = prompt("Enter First Name:");
    const lastName = prompt("Enter Last Name:");
    const email = prompt("Enter Email:");
    
    if (firstName && lastName && email) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = { firstName, lastName, email };
      existingUsers.push(user);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert(`User ${firstName} ${lastName} with email ${email} will be added after 24 hours.`);
    } else {
      alert("All fields are required.");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <nav className="bg-[#3251D0] text-white shadow-md dark:bg-gray-800">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold">MyApp</div>
            <ul className="flex space-x-6 items-center">
              <li>
                <span className="text-white dark:text-gray-300">
                  {new Date().toLocaleString()}
                </span>
              </li>
              <li>
                <button
                  onClick={handleCreateUser}
                  className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white"
                >
                  Create User
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 dark:bg-gray-600"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        
        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;