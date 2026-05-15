import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ openAuthModal: true, from: location.pathname }} replace />;
  }

  return children;
}
