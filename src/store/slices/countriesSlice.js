import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listCountriesApi,
  getCountryApi,
  getCountryBySlugApi,
} from "../../api/countries.api";

export const fetchCountriesThunk = createAsyncThunk(
  "countries/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      return await listCountriesApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load countries.");
    }
  }
);

export const fetchCountryThunk = createAsyncThunk(
  "countries/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getCountryApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Country not found.");
    }
  }
);

export const fetchCountryBySlugThunk = createAsyncThunk(
  "countries/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      return await getCountryBySlugApi(slug);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Country not found.");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    current: null,
    listStatus: "idle",
    currentStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentCountry(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesThunk.pending, (state) => { state.listStatus = "loading"; })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.list = Array.isArray(payload) ? payload : (payload.rows || payload.data || []);
        state.listStatus = "succeeded";
      })
      .addCase(fetchCountriesThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchCountryThunk.pending, (state) => { state.currentStatus = "loading"; })
      .addCase(fetchCountryThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchCountryThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchCountryBySlugThunk.pending, (state) => { state.currentStatus = "loading"; })
      .addCase(fetchCountryBySlugThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchCountryBySlugThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCountry } = countriesSlice.actions;

export const selectCountriesList = (state) => state.countries.list;
export const selectCurrentCountry = (state) => state.countries.current;
export const selectCountriesListStatus = (state) => state.countries.listStatus;
export const selectCurrentCountryStatus = (state) => state.countries.currentStatus;

export default countriesSlice.reducer;
