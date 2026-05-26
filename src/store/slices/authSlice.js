import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import {
  loginApi,
  registerApi,
  verifyOtpApi,
  resendOtpApi,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi,
} from "../../api/auth.api";

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginApi({ email, password });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed.");
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password, travelAs }, { rejectWithValue }) => {
    try {
      return await registerApi({ firstName, lastName, email, password, travelAs });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed.");
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      return await verifyOtpApi({ email, otp });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid or expired code.");
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      return await resendOtpApi({ email });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend code.");
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi({ email });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email.");
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi({ token, password });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Password reset failed.");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  pendingEmail: null,
  otpContext: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken, refreshToken } = action.payload;
      if (user !== undefined) state.user = user;
      if (accessToken !== undefined) state.accessToken = accessToken;
      if (refreshToken !== undefined) state.refreshToken = refreshToken;
      if (user || accessToken) state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      state.pendingEmail = null;
      state.otpContext = null;
    },

    setPendingEmail(state, action) {
      state.pendingEmail = action.payload;
    },

    setOtpContext(state, action) {
      state.otpContext = action.payload;
    },

    setAuthLoading(state) {
      state.status = "loading";
      state.error = null;
    },

    setAuthSuccess(state) {
      state.status = "succeeded";
      state.error = null;
    },

    setAuthError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },

    clearAuthError(state) {
      state.error = null;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      state.status = "idle";
      state.error = null;
      state.pendingEmail = null;
      state.otpContext = null;
    });

    // Login
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Register — success means OTP sent, not logged in yet
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.pendingEmail = action.payload.email || action.meta.arg.email;
        state.otpContext = "registration";
        state.status = "idle";
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Verify OTP
    builder
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
        state.pendingEmail = null;
        state.otpContext = null;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  setCredentials,
  logout,
  setPendingEmail,
  setOtpContext,
  setAuthLoading,
  setAuthSuccess,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectPendingEmail = (state) => state.auth.pendingEmail;
export const selectOtpContext = (state) => state.auth.otpContext;

export default authSlice.reducer;
