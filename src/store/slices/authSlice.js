import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Async Thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      // Save token in cookies as per SOP 1.3
      cookies.set('auth_token', token, { path: '/', maxAge: 2592000 }); // 30 days
      
      return { user, token };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: cookies.get('auth_token') || null,
    isAuthenticated: !!cookies.get('auth_token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      cookies.remove('auth_token', { path: '/' });
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
