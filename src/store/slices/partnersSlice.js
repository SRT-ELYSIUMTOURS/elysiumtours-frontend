import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PARTNER_API_MAP, getPartnerByIdApi } from "../../api/partners.api";

// Categories with a live backend endpoint
const WIRED_CATEGORIES = Object.keys(PARTNER_API_MAP);

export const fetchPartnerDetailThunk = createAsyncThunk(
  "partners/fetchDetail",
  async ({ category, id }, { rejectWithValue }) => {
    try {
      const data = await getPartnerByIdApi(category, id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load partner.");
    }
  }
);

export const fetchPartnersThunk = createAsyncThunk(
  "partners/fetchByCategory",
  async ({ category, params = {} }, { rejectWithValue }) => {
    const apiFn = PARTNER_API_MAP[category];
    if (!apiFn) return rejectWithValue("No backend for this category");
    try {
      const result = await apiFn({ isActive: true, ...params });
      const rows  = Array.isArray(result) ? result : (result.rows || result.data || []);
      const total = result.total ?? result.count ?? rows.length;
      return { category, rows, total };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load partners.");
    }
  }
);

const makeCategory = () => ({ list: [], total: 0, status: "idle", error: null });

const initialState = WIRED_CATEGORIES.reduce((acc, cat) => {
  acc[cat] = makeCategory();
  return acc;
}, { detail: { data: null, status: "idle", error: null } });

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    clearPartnerDetail(state) {
      state.detail = { data: null, status: "idle", error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnersThunk.pending, (state, action) => {
        const cat = action.meta.arg.category;
        if (state[cat]) state[cat].status = "loading";
      })
      .addCase(fetchPartnersThunk.fulfilled, (state, action) => {
        const { category, rows, total } = action.payload;
        if (state[category]) {
          state[category].list   = rows;
          state[category].total  = total;
          state[category].status = "succeeded";
        }
      })
      .addCase(fetchPartnerDetailThunk.pending, (state) => {
        state.detail.status = "loading";
        state.detail.error  = null;
      })
      .addCase(fetchPartnerDetailThunk.fulfilled, (state, action) => {
        state.detail.data   = action.payload;
        state.detail.status = "succeeded";
      })
      .addCase(fetchPartnerDetailThunk.rejected, (state, action) => {
        state.detail.status = "failed";
        state.detail.error  = action.payload;
      })
      .addCase(fetchPartnersThunk.rejected, (state, action) => {
        const cat = action.meta.arg?.category;
        if (cat && state[cat]) {
          state[cat].status = "failed";
          state[cat].error  = action.payload;
        }
      });
  },
});

export const { clearPartnerDetail } = partnersSlice.actions;

// Selectors — inline factory so pages don't need to know state shape
export const selectPartnerList          = (cat) => (state) => state.partners[cat]?.list   ?? [];
export const selectPartnerTotal         = (cat) => (state) => state.partners[cat]?.total  ?? 0;
export const selectPartnerStatus        = (cat) => (state) => state.partners[cat]?.status ?? "idle";
export const selectCurrentPartner       = (state) => state.partners.detail.data;
export const selectCurrentPartnerStatus = (state) => state.partners.detail.status;

export default partnersSlice.reducer;
