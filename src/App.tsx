import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./Components/pages/Login";
import PrivateRoute from "./Components/pages/PrivateRoute";
import Home from "./screens/Home";
import Dashboard from "./Components/pages/Dashboard";
import PageNotFound from "./Components/pages/PageNotFound";
import { useThemeStore } from "./store/themeStore";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-primary-dark' : 'bg-primary-light'}`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Router>
          <Routes>
            {/* Redirect root to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>

        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;