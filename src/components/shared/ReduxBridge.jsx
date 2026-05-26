import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectUser,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";
import { useAuth } from "../../context/AuthContext";

/**
 * Invisible bridge component — keeps the legacy AuthContext in sync with
 * Redux auth state so existing components that call useAuth() continue to
 * work without modification.
 *
 * Rendered inside <AuthProvider> but outside <BrowserRouter> so it has
 * access to the context but no dependency on routing.
 */
export default function ReduxBridge() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { login, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      login({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        role: user.role,
      });
    } else {
      logout();
    }
  }, [isAuthenticated, user, login, logout]);

  return null;
}
