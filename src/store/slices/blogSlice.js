import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/blogs');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch blogs');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
