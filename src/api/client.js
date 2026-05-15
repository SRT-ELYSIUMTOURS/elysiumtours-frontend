import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

// ─── Token state ─────────────────────────────────────────────────────────────
// Set by store/index.js via store.subscribe() so client.js never imports the
// store directly (which would create a circular dependency).
let _accessToken = null;
let _refreshToken = null;
let _onLogout = null;
let _onTokenRefresh = null;

export const setTokens = (access, refresh) => {
  _accessToken = access;
  _refreshToken = refresh;
};

export const setLogoutCallback = (cb) => {
  _onLogout = cb;
};

export const setTokenRefreshCallback = (cb) => {
  _onTokenRefresh = cb;
};

// ─── Axios instance ───────────────────────────────────────────────────────────
const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — inject auth token
client.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// ─── 401 refresh interceptor ──────────────────────────────────────────────────
// Serialises concurrent 401s: all failed requests queue up while one refresh
// call is in flight, then retry together with the new token.
let isRefreshing = false;
let requestQueue = [];

const processQueue = (error, token = null) => {
  requestQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  requestQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only handle 401s. Skip if this request was already a retry.
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // No refresh token available — logout immediately
    if (!_refreshToken) {
      if (_onLogout) _onLogout();
      return Promise.reject(error);
    }

    // Another refresh is already in flight — queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return client(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Use base axios (not client) to avoid hitting this interceptor again
      const { data } = await axios.post(
        `${BASE_URL}/auth/refresh-token`,
        { refreshToken: _refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, refreshToken } = data;

      // Update module-level tokens
      setTokens(accessToken, refreshToken);

      // Persist new tokens into Redux store
      if (_onTokenRefresh) _onTokenRefresh(accessToken, refreshToken);

      // Retry all queued requests
      processQueue(null, accessToken);

      original.headers.Authorization = `Bearer ${accessToken}`;
      return client(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      if (_onLogout) _onLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default client;
