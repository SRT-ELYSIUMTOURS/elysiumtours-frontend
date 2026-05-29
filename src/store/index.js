import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { setCredentials, logout } from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import toursReducer from "./slices/toursSlice";
import destinationsReducer from "./slices/destinationsSlice";
import countriesReducer from "./slices/countriesSlice";
import cmsReducer from "./slices/cmsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import partnersReducer from "./slices/partnersSlice";
import galleryReducer from "./slices/gallerySlice";
import {
  setTokens,
  setLogoutCallback,
  setTokenRefreshCallback,
} from "../api/client";

// ─── Persist config ───────────────────────────────────────────────────────────
// Key is intentionally different from the admin's raw localStorage keys
// ('token', 'refreshToken', 'user', 'permissions') to prevent collision.
const persistConfig = {
  key: "__elysium_tourist__",
  storage,
  whitelist: ["auth"], // Only persist auth — tours/cms/ui are always re-fetched
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  tours: toursReducer,
  destinations: destinationsReducer,
  countries: countriesReducer,
  cms: cmsReducer,
  bookings: bookingsReducer,
  partners: partnersReducer,
  gallery: galleryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ─── Store ────────────────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serialisable actions internally
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// ─── Wire client.js to the store ─────────────────────────────────────────────
// Whenever auth state changes, push the latest tokens into client.js so the
// axios request interceptor always sends the current Bearer token.
store.subscribe(() => {
  const { accessToken, refreshToken } = store.getState().auth;
  setTokens(accessToken, refreshToken);
});

// Called by the 401 interceptor when a token refresh succeeds.
// Updates Redux (which triggers the subscriber above to sync client.js).
setTokenRefreshCallback((accessToken, refreshToken) => {
  store.dispatch(setCredentials({ accessToken, refreshToken }));
});

// Called by the 401 interceptor when the refresh token is expired/invalid.
// Clears Redux auth state so the UI reacts (e.g. shows login modal).
setLogoutCallback(() => {
  store.dispatch(logout());
});
