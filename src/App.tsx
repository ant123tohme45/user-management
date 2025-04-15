import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./Components/pages/Login";
import PrivateRoute from "./Components/pages/PrivateRoute";
import Dashboard from "./Components/pages/Dashboard";
import PageNotFound from "./Components/pages/PageNotFound";
import { useRef, useEffect } from "react";
import { useThemeStore } from "./store/themeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply theme on page load based on the local storage value
    if (rootRef.current) {
      if (theme === "dark") {
        rootRef.current.classList.add("dark");
      } else {
        rootRef.current.classList.remove("dark");
      }
    }
  }, [theme]);
  return (
    <div className="dark:bg-primary-dark">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
