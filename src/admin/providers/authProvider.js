import { fetchAndStorePermissions, canAccess as checkPermission, canViewPage } from "../rbac/permissions.js";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("permissions");
};

const authProvider = {
  login: async ({ username, password }) => {
    console.debug("[authProvider] login attempt:", username);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await response.json();
    console.debug("[authProvider] login response:", { ok: response.ok, status: response.status, user: data.user });

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Fetch role-based permissions from backend
    await fetchAndStorePermissions(API_URL, data.accessToken);
  },

  logout: () => {
    console.debug("[authProvider] logout");
    clearAuth();
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Not authenticated");
    }

    // Decode JWT to check expiry
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        // Token expired — attempt refresh
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          clearAuth();
          throw new Error("Session expired");
        }

        console.debug("[authProvider] token expired, refreshing...");
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          clearAuth();
          throw new Error("Session expired");
        }

        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Re-fetch permissions with new token
        await fetchAndStorePermissions(API_URL, data.accessToken);
        console.debug("[authProvider] token refreshed successfully");
      }
    } catch (err) {
      if (err.message === "Session expired") throw err;
      console.error("[authProvider] checkAuth error:", err);
      clearAuth();
      throw new Error("Invalid token");
    }
  },

  checkError: (error) => {
    console.debug("[authProvider] checkError:", error);
    const status = error?.status || error?.response?.status || error?.body?.statusCode;
    if (status === 401 || status === 403) {
      console.warn("[authProvider] 401/403 detected, logging out");
      clearAuth();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return Promise.resolve({
      id: user.id,
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      avatar: user.avatar,
    });
  },

  getPermissions: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return Promise.resolve(user.role || "customer");
  },

  canAccess: async ({ resource, action }) => {
    return checkPermission(resource, action);
  },
};

export default authProvider;
