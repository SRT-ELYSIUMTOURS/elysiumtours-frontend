import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listGalleryImagesApi, getPartnerGallerySummaryApi } from "../../api/gallery.api";

// Fetches all highlight images for the gallery overview page (no section filter)
export const fetchOverviewGalleryThunk = createAsyncThunk(
  "gallery/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      return await listGalleryImagesApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load gallery.");
    }
  }
);

// Fetches images for a specific category page
// section: "destinations" → no filter (all highlights); "nature"|"culture"|"activities" → filtered
export const fetchCategoryGalleryThunk = createAsyncThunk(
  "gallery/fetchCategory",
  async (section, { rejectWithValue }) => {
    try {
      const params = section && section !== "destinations" ? { section } : {};
      return await listGalleryImagesApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load gallery.");
    }
  }
);

export const fetchPartnerGallerySummaryThunk = createAsyncThunk(
  "gallery/fetchPartnerSummary",
  async (_, { rejectWithValue }) => {
    try {
      return await getPartnerGallerySummaryApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load partner gallery.");
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    overviewImages: [],
    categoryImages: [],
    partnerSummary: [],
    overviewStatus: "idle",
    categoryStatus: "idle",
    partnerSummaryStatus: "idle",
    error: null,
  },
  reducers: {
    clearCategoryImages(state) {
      state.categoryImages = [];
      state.categoryStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewGalleryThunk.pending, (state) => { state.overviewStatus = "loading"; })
      .addCase(fetchOverviewGalleryThunk.fulfilled, (state, action) => {
        state.overviewImages = Array.isArray(action.payload) ? action.payload : (action.payload?.rows || []);
        state.overviewStatus = "succeeded";
      })
      .addCase(fetchOverviewGalleryThunk.rejected, (state, action) => {
        state.overviewStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchCategoryGalleryThunk.pending, (state) => { state.categoryStatus = "loading"; })
      .addCase(fetchCategoryGalleryThunk.fulfilled, (state, action) => {
        state.categoryImages = Array.isArray(action.payload) ? action.payload : (action.payload?.rows || []);
        state.categoryStatus = "succeeded";
      })
      .addCase(fetchCategoryGalleryThunk.rejected, (state, action) => {
        state.categoryStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchPartnerGallerySummaryThunk.pending, (state) => { state.partnerSummaryStatus = "loading"; })
      .addCase(fetchPartnerGallerySummaryThunk.fulfilled, (state, action) => {
        state.partnerSummary = Array.isArray(action.payload) ? action.payload : [];
        state.partnerSummaryStatus = "succeeded";
      })
      .addCase(fetchPartnerGallerySummaryThunk.rejected, (state, action) => {
        state.partnerSummaryStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCategoryImages } = gallerySlice.actions;

export const selectOverviewGalleryImages = (state) => state.gallery.overviewImages;
export const selectCategoryGalleryImages = (state) => state.gallery.categoryImages;
export const selectPartnerSummary = (state) => state.gallery.partnerSummary;
export const selectOverviewGalleryStatus = (state) => state.gallery.overviewStatus;
export const selectCategoryGalleryStatus = (state) => state.gallery.categoryStatus;
export const selectPartnerSummaryStatus = (state) => state.gallery.partnerSummaryStatus;

export default gallerySlice.reducer;
