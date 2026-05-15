import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listDestinationsApi,
  getDestinationApi,
  getDestinationBySlugApi,
} from "../../api/destinations.api";

export const fetchDestinationsThunk = createAsyncThunk(
  "destinations/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      return await listDestinationsApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load destinations.");
    }
  }
);

export const fetchDestinationThunk = createAsyncThunk(
  "destinations/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getDestinationApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Destination not found.");
    }
  }
);

export const fetchDestinationBySlugThunk = createAsyncThunk(
  "destinations/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      return await getDestinationBySlugApi(slug);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Destination not found.");
    }
  }
);

const destinationsSlice = createSlice({
  name: "destinations",
  initialState: {
    list: [],
    current: null,
    total: 0,
    listStatus: "idle",
    currentStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentDestination(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinationsThunk.pending, (state) => { state.listStatus = "loading"; })
      .addCase(fetchDestinationsThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.list = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        state.total = payload.total || payload.count || state.list.length;
        state.listStatus = "succeeded";
      })
      .addCase(fetchDestinationsThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchDestinationThunk.pending, (state) => { state.currentStatus = "loading"; })
      .addCase(fetchDestinationThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchDestinationThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchDestinationBySlugThunk.pending, (state) => { state.currentStatus = "loading"; })
      .addCase(fetchDestinationBySlugThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchDestinationBySlugThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentDestination } = destinationsSlice.actions;

export const selectDestinationsList = (state) => state.destinations.list;
export const selectCurrentDestination = (state) => state.destinations.current;
export const selectDestinationsTotal = (state) => state.destinations.total;
export const selectDestinationsListStatus = (state) => state.destinations.listStatus;
export const selectCurrentDestinationStatus = (state) => state.destinations.currentStatus;

export default destinationsSlice.reducer;
