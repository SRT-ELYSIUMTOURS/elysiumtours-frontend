import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBookingApi,
  listMyBookingsApi,
  getMyBookingApi,
  cancelMyBookingApi,
} from "../../api/bookings.api";
import { initiatePaymentApi, verifyPaymentApi } from "../../api/payments.api";

export const createBookingThunk = createAsyncThunk(
  "bookings/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createBookingApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create booking.");
    }
  }
);

export const fetchMyBookingsThunk = createAsyncThunk(
  "bookings/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      return await listMyBookingsApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load bookings.");
    }
  }
);

export const fetchMyBookingThunk = createAsyncThunk(
  "bookings/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getMyBookingApi(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Booking not found.");
    }
  }
);

export const cancelBookingThunk = createAsyncThunk(
  "bookings/cancel",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      return await cancelMyBookingApi(id, reason);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to cancel booking.");
    }
  }
);

export const initiatePaymentThunk = createAsyncThunk(
  "bookings/initiatePayment",
  async (data, { rejectWithValue }) => {
    try {
      return await initiatePaymentApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to initiate payment.");
    }
  }
);

export const verifyPaymentThunk = createAsyncThunk(
  "bookings/verifyPayment",
  async (reference, { rejectWithValue }) => {
    try {
      return await verifyPaymentApi(reference);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Payment verification failed.");
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    current: null,
    paymentUrl: null,
    total: 0,
    listStatus: "idle",
    currentStatus: "idle",
    createStatus: "idle",
    paymentStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentBooking(state) {
      state.current = null;
      state.currentStatus = "idle";
    },
    clearPaymentUrl(state) {
      state.paymentUrl = null;
      state.paymentStatus = "idle";
    },
    clearBookingError(state) {
      state.error = null;
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookingThunk.pending, (state) => { state.createStatus = "loading"; state.error = null; })
      .addCase(createBookingThunk.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.current = action.payload;
      })
      .addCase(createBookingThunk.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchMyBookingsThunk.pending, (state) => { state.listStatus = "loading"; })
      .addCase(fetchMyBookingsThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        state.list = Array.isArray(payload) ? payload : (payload.bookings || payload.rows || payload.data || []);
        state.total = payload.total || payload.count || state.list.length;
        state.listStatus = "succeeded";
      })
      .addCase(fetchMyBookingsThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchMyBookingThunk.pending, (state) => { state.currentStatus = "loading"; })
      .addCase(fetchMyBookingThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = "succeeded";
      })
      .addCase(fetchMyBookingThunk.rejected, (state, action) => {
        state.currentStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(cancelBookingThunk.fulfilled, (state, action) => {
        state.current = action.payload;
        const idx = state.list.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      });

    builder
      .addCase(initiatePaymentThunk.pending, (state) => { state.paymentStatus = "loading"; state.paymentUrl = null; })
      .addCase(initiatePaymentThunk.fulfilled, (state, action) => {
        state.paymentUrl = action.payload.authorizationUrl || action.payload.data?.authorization_url;
        state.paymentStatus = "succeeded";
      })
      .addCase(initiatePaymentThunk.rejected, (state, action) => {
        state.paymentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBooking, clearPaymentUrl, clearBookingError } = bookingsSlice.actions;

export const selectBookingsList = (state) => state.bookings.list;
export const selectCurrentBooking = (state) => state.bookings.current;
export const selectBookingsTotal = (state) => state.bookings.total;
export const selectBookingsListStatus = (state) => state.bookings.listStatus;
export const selectCurrentBookingStatus = (state) => state.bookings.currentStatus;
export const selectCreateBookingStatus = (state) => state.bookings.createStatus;
export const selectPaymentUrl = (state) => state.bookings.paymentUrl;
export const selectPaymentStatus = (state) => state.bookings.paymentStatus;
export const selectBookingsError = (state) => state.bookings.error;

export default bookingsSlice.reducer;
