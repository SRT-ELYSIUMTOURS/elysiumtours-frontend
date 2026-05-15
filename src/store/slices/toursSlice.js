import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listToursApi, searchToursApi, getTourApi, getTourBySlugApi } from "../../api/tours.api";

export const fetchToursThunk = createAsyncThunk(
  "tours/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      return await listToursApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load tours.");
    }
  }
);

export const fetchFeaturedToursThunk = createAsyncThunk(
  "tours/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      return await listToursApi({ featured: true, limit: 4 });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load featured tours.");
    }
  }
);

export const fetchTourThunk = createAsyncThunk(
  "tours/fetchOne",
  async (slugOrId, { rejectWithValue }) => {
    try {
      return await getTourBySlugApi(slugOrId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Tour not found.");
    }
  }
);

export const searchToursThunk = createAsyncThunk(
  "tours/search",
  async (params, { rejectWithValue }) => {
    try {
      return await searchToursApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed.");
    }
  }
);

const toursSlice = createSlice({
  name: "tours",
  initialState: {
    list: [],
    featured: [],
    current: null,
    searchResults: [],
    total: 0,
    page: 1,
    pageSize: 12,
    listStatus: "idle",
    featuredStatus: "idle",
    currentStatus: "idle",
    searchStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentTour(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursThunk.pending, (state) => { state.listStatus = "loading"; })
      .addCase(fetchToursThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.list = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        state.total = payload.total || payload.count || state.list.length;
        state.listStatus = "succeeded";
      })
      .addCase(fetchToursThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchFeaturedToursThunk.pending, (state) => { state.featuredStatus = "loading"; })
      .addCase(fetchFeaturedToursThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.featured = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        state.featuredStatus = "succeeded";
      })
      .addCase(fetchFeaturedToursThunk.rejected, (state, action) => {
        state.featuredStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchTourThunk.pending, (state) => { state.currentStatus = "loading"; state.current = null; })
      .addCase(fetchTourThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchTourThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(searchToursThunk.pending, (state) => { state.searchStatus = "loading"; })
      .addCase(searchToursThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.searchResults = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        state.searchStatus = "succeeded";
      })
      .addCase(searchToursThunk.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTour, clearSearchResults } = toursSlice.actions;

export const selectToursList = (state) => state.tours.list;
export const selectFeaturedTours = (state) => state.tours.featured;
export const selectCurrentTour = (state) => state.tours.current;
export const selectToursTotal = (state) => state.tours.total;
export const selectToursListStatus = (state) => state.tours.listStatus;
export const selectFeaturedToursStatus = (state) => state.tours.featuredStatus;
export const selectCurrentTourStatus = (state) => state.tours.currentStatus;
export const selectSearchResults = (state) => state.tours.searchResults;

export default toursSlice.reducer;
