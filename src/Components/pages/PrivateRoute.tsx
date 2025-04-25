import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function PrivateRoute() {
  const { accessToken } = useAuthStore();
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}