import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authModalOpen: false,
  authModalInitialView: "login", // 'login' | 'signup' | 'forgot'
  toast: null,                   // { id, type: 'success'|'error'|'info', message }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal(state, action) {
      state.authModalOpen = true;
      state.authModalInitialView = action.payload || "login";
    },

    closeAuthModal(state) {
      state.authModalOpen = false;
    },

    showToast(state, action) {
      // action.payload: { type, message }
      state.toast = { id: Date.now(), ...action.payload };
    },

    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { openAuthModal, closeAuthModal, showToast, clearToast } =
  uiSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectAuthModalOpen = (state) => state.ui.authModalOpen;
export const selectAuthModalInitialView = (state) =>
  state.ui.authModalInitialView;
export const selectToast = (state) => state.ui.toast;

export default uiSlice.reducer;
