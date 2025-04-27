import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/authStore";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
