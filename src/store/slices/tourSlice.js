import { createSlice } from '@reduxjs/toolkit';

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    currentTour: null,
    loading: false,
    error: null,
  },
  reducers: {
    setTours: (state, action) => {
      state.tours = action.payload;
    },
    setCurrentTour: (state, action) => {
      state.currentTour = action.payload;
    }
  },
});

export const { setTours, setCurrentTour } = tourSlice.actions;
export default tourSlice.reducer;
